"""Read-only, bounded queries over saved Pi logs. Python standard library only."""

import argparse
from collections import defaultdict
from datetime import datetime, timedelta, timezone
import hashlib
import json
import math
import os
from pathlib import Path
import re
import sys


MAX_OUTPUT = 40000


def date(value):
    relative = re.fullmatch(r"(\d+)([dhwm])", value)
    if relative:
        amount, unit = relative.groups()
        seconds = {"d": 86400, "h": 3600, "w": 604800, "m": 60}[unit]
        return datetime.now(timezone.utc) - timedelta(seconds=int(amount) * seconds)
    result = datetime.fromisoformat(value.replace("Z", "+00:00"))
    if result.tzinfo is None:
        result = result.replace(tzinfo=timezone.utc)
    return result.astimezone(timezone.utc)


def safe_files(root, warnings):
    """Do not follow file or directory symlinks, including ancestors of root."""
    if any(part.is_symlink() for part in [root, *root.parents]):
        warnings["symlinked_roots_skipped"] += 1
        return
    if not root.exists():
        return
    def failed(_error):
        warnings["unreadable_directories"] += 1
    for directory, dirs, files in os.walk(root, followlinks=False, onerror=failed):
        dirs[:] = sorted(d for d in dirs if not (Path(directory) / d).is_symlink())
        for name in sorted(files):
            path = Path(directory) / name
            if name.endswith('.jsonl') and not path.is_symlink() and path.is_file():
                yield path


def read_log(path, warnings):
    # Streaming reads tolerate an incomplete final line from a live writer.
    records = []
    try:
        with path.open(encoding="utf-8", errors="replace") as stream:
            for line in stream:
                try:
                    value = json.loads(line)
                except (ValueError, RecursionError):
                    warnings["malformed_records"] += 1
                    continue
                if isinstance(value, dict):
                    records.append(value)
    except OSError:
        warnings["unreadable_files"] += 1
    header = next((r for r in records if r.get("type") == "session"), None)
    if (not header or not isinstance(header.get("id"), str) or not header["id"]
            or not isinstance(header.get("cwd"), str)
            or not isinstance(header.get("timestamp"), str)):
        warnings["invalid_headers"] += 1
        return None
    return {"id": header["id"], "cwd": header.get("cwd", ""),
            "started": header.get("timestamp", ""), "path": str(path),
            "records": records, "subagent": False, "parent": None}


def messages(log):
    for record in log["records"]:
        message = record.get("message")
        if record.get("type") == "message" and isinstance(message, dict):
            yield message


def text(message):
    content = message.get("content", [])
    if isinstance(content, str):
        return content
    if not isinstance(content, list):
        return ""
    return "\n".join(block["text"] for block in content
                     if isinstance(block, dict) and block.get("type") == "text"
                     and isinstance(block.get("text"), str))


def timestamp(log):
    try:
        return date(log["started"])
    except (TypeError, ValueError, OverflowError):
        return None


def discover(args, warnings):
    agent = args.agent_dir.expanduser().absolute()
    session_root = agent / "sessions"
    parents = []
    # Only direct <encoded-cwd>/<session>.jsonl files are human sessions.
    if not session_root.exists():
        warnings["missing_session_root"] += 1
    for path in safe_files(session_root, warnings):
        if len(path.relative_to(session_root).parts) != 2:
            continue
        log = read_log(path, warnings)
        if not log:
            continue
        if args.cwd and os.path.abspath(os.path.expanduser(log["cwd"])) != os.path.abspath(os.path.expanduser(args.cwd)):
            continue
        if args.session and not log["id"].startswith(args.session):
            continue
        started = timestamp(log)
        if started is None:
            warnings["invalid_timestamps"] += 1
            continue
        if started < args.since or (args.until and started >= args.until):
            continue
        parents.append(log)
    if args.session and len({log["id"] for log in parents}) > 1:
        raise ValueError("Ambiguous session prefix; use a longer ID")
    logs = list(parents)
    if args.include_subagents:
        for parent in parents:
            owner = hashlib.sha256(parent["id"].encode()).hexdigest()[:20]
            roots = [agent / "minimal-subagents" / owner,
                     Path(parent["path"]).with_suffix(""),
                     Path(parent["path"]).parent / parent["id"]]
            for root in dict.fromkeys(roots):
                for path in safe_files(root, warnings):
                    # Current runs use <run-id>/transcript/*.jsonl. Older
                    # parent-nested logs are accepted, without reading run.json paths.
                    if root.parent.name == "minimal-subagents" and path.parent.name != "transcript":
                        continue
                    child = read_log(path, warnings)
                    if child:
                        child.update(subagent=True, parent=parent["id"])
                        logs.append(child)
    unique = {}
    for log in logs:
        if log["id"] in unique:
            warnings["duplicate_session_ids"] += 1
            continue
        unique[log["id"]] = log
    return sorted(unique.values(), key=lambda log: log["started"], reverse=True)


def number(value):
    return isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value) and value >= 0


def usage(message):
    value = message.get("usage")
    return value if isinstance(value, dict) else {}


def recorded_cost(message):
    cost = usage(message).get("cost")
    value = cost.get("total") if isinstance(cost, dict) else None
    return value if number(value) else None


def clipped(value, limit):
    return value if len(value) <= limit else value[:limit] + "\n[truncated]"


def identify(log):
    return {key: log[key] for key in ("id", "cwd", "started", "subagent", "parent")}


def query(logs, args):
    if args.command == "cost":
        groups = defaultdict(lambda: {"assistant_cost": 0, "assistant_messages": 0,
                                      "missing_cost_messages": 0, "input_tokens": 0,
                                      "output_tokens": 0, "cache_read_tokens": 0,
                                      "cache_write_tokens": 0, "tool_reported_cost": 0})
        for log in logs:
            for message in messages(log):
                role = message.get("role")
                if role not in ("assistant", "toolResult"):
                    continue
                key = {"project": log["cwd"], "session": log["id"],
                       "day": log["started"][:10],
                       "model": message.get("model") if isinstance(message.get("model"), str) else "unknown",
                       "total": "total"}[args.by]
                row = groups[key]
                amount = recorded_cost(message)
                if role == "toolResult":
                    # Tool usage can overlap separately saved subagent logs.
                    # Report separately; never silently add it a second time.
                    row["tool_reported_cost"] += amount or 0
                    continue
                row["assistant_messages"] += 1
                row["assistant_cost"] += amount or 0
                row["missing_cost_messages"] += amount is None
                for source, target in [("input", "input_tokens"), ("output", "output_tokens"),
                                       ("cacheRead", "cache_read_tokens"), ("cacheWrite", "cache_write_tokens")]:
                    value = usage(message).get(source)
                    row[target] += value if number(value) else 0
        rows = [{"group": key, **value} for key, value in groups.items()]
        rows.sort(key=lambda row: (-row["assistant_cost"], row["group"]))
        return rows
    rows = []
    for log in logs:
        if args.command == "list":
            rows.append({**identify(log), "messages": sum(1 for _ in messages(log))})
            continue
        for message in messages(log):
            role = message.get("role")
            body = text(message)
            if args.command == "prompts" and role != "user":
                continue
            if args.command == "search":
                if role not in (["user", "assistant"] if args.role == "both" else [args.role]):
                    continue
                if args.term.casefold() not in body.casefold():
                    continue
                offset = body.casefold().find(args.term.casefold())
                body = body[max(0, offset - 160):]
            if args.command == "show" and role not in ("user", "assistant", "toolResult"):
                continue
            if body:
                rows.append({**identify(log), "role": role,
                             "timestamp": message.get("timestamp"),
                             "text": clipped(body, args.max_chars)})
    return rows


def bounded_report(rows, args, warnings, count):
    report = {"command": args.command, "sessions_scanned": count,
              "scope": {"cwd": args.cwd, "session": args.session, "all": args.all,
                        "since": args.since.isoformat(),
                        "until": args.until.isoformat() if args.until else None,
                        "include_subagents": args.include_subagents},
              "warnings": dict(warnings), "rows": [], "omitted_rows": len(rows),
              "notes": ["Selection uses parent session start time, not individual message dates.",
                        "Saved records include abandoned branches; this is not an active-branch projection.",
                        "Recorded assistant costs are estimates, not billing. Tool costs are separate and may overlap.",
                        "Subagent coverage: selected parents' nested logs and minimal-subagents owner-hash transcripts only."]}
    for row in rows[:args.limit]:
        report["rows"].append(row)
        if len(json.dumps(report, ensure_ascii=True)) > MAX_OUTPUT - 100:
            report["rows"].pop()
            break
    report["omitted_rows"] = len(rows) - len(report["rows"])
    return report


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=["list", "cost", "prompts", "search", "show"])
    scope = parser.add_mutually_exclusive_group(required=True)
    scope.add_argument("--cwd", help="Exact project cwd; not a substring")
    scope.add_argument("--session", help="Unique session ID or prefix")
    scope.add_argument("--all", action="store_true", help="Explicit cross-project scope")
    parser.add_argument("--agent-dir", type=Path,
                        default=Path(os.environ.get("PI_CODING_AGENT_DIR", "~/.pi/agent")))
    parser.add_argument("--since", default="7d", help="Session start lower bound, UTC ISO or 7d/2w/3h/30m")
    parser.add_argument("--until", help="Exclusive UTC session start upper bound")
    parser.add_argument("--include-subagents", action="store_true")
    parser.add_argument("--limit", type=int, default=20, help="Maximum output rows, 1–1000")
    parser.add_argument("--max-chars", type=int, default=1500, help="Characters per text result, 1–10000")
    parser.add_argument("--by", choices=["total", "day", "project", "model", "session"], default="total")
    parser.add_argument("--term", help="Literal case-insensitive search, no regex execution")
    parser.add_argument("--role", choices=["user", "assistant", "both"], default="both")
    args = parser.parse_args(argv)
    if not 1 <= args.limit <= 1000 or not 1 <= args.max_chars <= 10000:
        parser.error("limits must be within their documented ranges")
    if args.command == "search" and not args.term:
        parser.error("search requires --term")
    if args.command == "show" and not args.session:
        parser.error("show requires --session; use list first")
    if args.session is not None and not args.session.strip():
        parser.error("session prefix must not be empty")
    if args.cwd is not None and not args.cwd.strip():
        parser.error("cwd must not be empty")
    try:
        args.since = date(args.since)
        args.until = date(args.until) if args.until else None
        if args.until and args.until <= args.since:
            raise ValueError("until must be after since")
        warnings = defaultdict(int)
        logs = discover(args, warnings)
        rows = query(logs, args)
        report = bounded_report(rows, args, warnings, len(logs))
    except (ValueError, OverflowError) as error:
        parser.error(str(error))
    print(json.dumps(report, ensure_ascii=True, allow_nan=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
