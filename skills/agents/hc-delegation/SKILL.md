---
name: hc-delegation
description: "Delegate scoped implementation, research or independent review through herdr-core hc terminals, then collect results and clean up owned children. Not for native in-harness subagents or generic delegation without hc."
---

# Delegate through hc

Use the owner's current orchestration policy and `hc templates` for roles, models,
permissions and commands; do not invent or copy a personal model roster. Read
`hc --skill` for the installed CLI's lifecycle and readiness contract. If hc or the
required parent address is unavailable, work directly or report the capability gap;
do not start or reconfigure the user's server.

Delegate only when independence or parallel work pays for setup. Give one writer
per worktree a bounded scope; read-only reviewers may share a checkout. Allocate
shared ports, data and generated outputs separately from Git isolation.

## Choose the reporting contract before launch

Capture the orchestrator's `HC_TERMINAL_ID` **before launching**. Expand it in the
parent and embed that literal address in the brief: for example, if the parent is
t12, say `hc send t12`, not a variable that the child will expand to its own ID.

- **Children allowed to send:** ask for findings or a handoff with the literal
  parent address. Request a file only in an explicitly writable report location.
- **Read-only reviewers without messaging permission:** ask for findings on screen
  ending `REVIEW COMPLETE`. Collect with `hc wait` and `hc read`; do not also demand
  a findings file or an hc send. A host/user policy requiring messaging takes
  precedence: establish the authorized send path or report the missing permission.
- A permission prompt is not completion or authority to bypass the sandbox. Read it,
  apply the governing approval policy and involve the user where required. Do not
  broaden permissions merely to obtain a convenient report.

## Launch and collect

1. Use an interactive background terminal, never one-shot print mode. Include cwd,
   exact scope, notes path, constraints, no further agents and the selected reporting
   contract in the first task. For Codex use `--no-daemon` when the installed hc
   documentation requires it.
2. Check readiness and whether the first message was actually sent. A startup dialog
   or `first_message.sent: false` requires inspection before resending; avoid duplicate
   tasks. Do not enable unknown hooks or trust unrelated configuration incidentally.
3. Do useful work or `hc wait`; never sleep/poll for results. When blocked, inspect
   the screen and report the actual missing permission or decision. An idle screen
   without the agreed report is not proof the task finished.
4. Treat findings as evidence. Read the result, verify claims against the candidate,
   resolve confirmed findings and refresh affected checks. No majority-vote verdict.
5. After collecting results, kill and remove only children you started. Confirm none
   remain unless the user asked to keep them. Never stop/restart the user's hc server
   as cleanup. Preserve a resumable handoff when a child cannot finish.
