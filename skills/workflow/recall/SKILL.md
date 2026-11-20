---
name: recall
description: Look up prior work from Linear issues, repository docs, native memory and session history across Claude, Codex, Pi and Copilot (via cass), and rebuild where things stand. Use for "recall my work on X", "catch me up", "where did I leave off", "did we already decide/try X", "what have I been working on", or when missing history could change the current task. Read only.
---

# Recall

Two sizes. A **lookup** answers one question ("did we pick X?", "what was that
command?") with a cited answer in a few lines. A **catch-up** rebuilds the state
of a topic or of recent work and ends in the brief below. Pick the smaller one
when unsure. Context already loaded in this session comes first; look further
only when it could change the task.

## 1. Set the scope and say it

Pin three things before searching, and state them in one line:

- **Window:** default the last 7 days. Widen only on request or after an empty,
  completed search; never quietly shrink "all" to "recent".
- **Topic:** the feature, file, ticket or question, if named.
- **Place:** default the current repository or workspace. Read another
  project's history only when asked.

If the user already gave the state (branch, paths, what changed), skip to step 5.

## 2. Tasks, docs and memory first

Cheapest and most authoritative:

1. The Linear issue for the topic, read through the Linear MCP tools: its
   description, status and latest comments. Without a Linear MCP server in
   this session, say Linear was skipped.
2. Repository docs for durable facts.
3. Native memory, read in place, never copied into another store. Search the
   native folders of the harnesses this machine has; skip any that don't exist:

| Harness | Native folder |
| --- | --- |
| Claude Code | `~/.claude/projects/<project-slug>/memory/` (index `MEMORY.md`; one store per git repository, shared by its worktrees and subfolders) |
| Codex | `~/.codex/memories/` (`MEMORY.md`, `memory_summary.md`, `rollout_summaries/`) |
| Pi | `~/.pi/agent/project-memory/projects/<project-key>/memory/` (pi-project-memory; index `MEMORY.md`) |

Where `memory-links` is installed, run it and search `~/.agents/memory/`
instead (`rg -L` follows its symlinks into the same folders). The legacy
archive `~/.agents/memory-archive/basic-memory/`, where present, is searched
with `rg` only when the rest falls short.

A lookup often ends here.

## 3. Session history with cass

`cass` indexes every harness's sessions. This section is the bounded path; the
`cass` skill is the full reference for other commands and flags. Never run bare
`cass` (it opens a TUI); always pass `--json`. Check health once:
`cass health --json`.

Search, bounded:

```sh
cass search "terms" --days 7 --mode lexical --no-maintenance --json --robot-meta \
  --fields minimal --limit 5 --max-tokens 2000 --timeout 3000
```

- `--workspace` is the directory a session started in, not the repository; many
  sessions start in a parent such as `~/dev`. Use it to narrow, and drop it
  when results look thin.
- Skip hits under `/subagents/` unless the question is what a worker did.
- `budget.timed_out: true`, an error or `maintenance-required` is not an empty
  result. Report it and stop; do not index, repair or install models.
- Open a hit before relying on it: `cass view <source_path> -n <line> --json`.
  One JSONL line can be large; check size before quoting.

Other useful views:

- `cass timeline --since 7d --json`: activity by day, for "what have I been
  working on".
- `cass sessions --workspace "$PWD" --json --limit 5`: recent sessions here.
- `cass context <file> --json`: sessions that touched a file.

For a catch-up that needs more than three sessions read, hand the reading to
read-only subagents on a cheap model where the harness has them, one slice of
sessions each. Each returns per session: goal, decisions, open threads,
corrections from the user, and artifacts (branches, PRs, tickets), citing the
session path. Raw transcripts stay with the subagents.

## 4. The shared record

When the topic names a feature, file, ticket or bug, also check what happened
around it outside your sessions: pull requests with `gh`, related Linear
issues, and chat tools if available. Ask what the current state is, what was
tried and did not hold, and what is still reported. A source without a working tool gets
one line saying it was skipped. Skip this step for pure activity recall ("what
did I do this week").

## 5. Check against live state

Confirm branches and PRs from steps 2 to 4 with `git` and `gh`, and issue
status through Linear, before reporting them. A summary that says "merged" or
"verified" is a claim until the live state agrees.

## 6. Answer

A **lookup**: the answer, its source (Linear issue, doc, memory file, session
path and line, PR), and its date. Say if the source is stale.

A **catch-up**, in this order:

- **Capsule:** at most 5 bullets on what the work is and where it stands.
- **Threads:** one line each with exactly one tag: `[merged #N]`,
  `[open PR #N]`, `[in flight <branch>]`, `[uncommitted]`, `[reverted #N]`,
  `[Linear ABC-12 <status>]` or `[not started]`.
- **Problems:** at most 5 recurring ones, including fixes that were reverted,
  so the next attempt starts where the last one failed.
- **Next move:** the single most useful next action.

Stay on the topic; leave adjacent work out unless it blocks this one. Cut
detail before cutting threads.

## Where facts go

Recall reads; it does not file. One authoritative copy of each fact:
repository facts in repository docs, unfinished task state in its Linear
issue, approved personal facts in the writing agent's own memory. Do not copy other
agents' notes into a second store, delete memories automatically or bulk-import
old notes. Native memory is written by its own agent; `/reflect` and
`/reflect memory` only propose changes, which apply after the user approves. For an
approved Codex memory, follow the session's write route (a small note in
`~/.codex/memories/extensions/ad_hoc/notes/`), never editing generated
summaries.
