---
name: handoff
description: Save the current task's state before stopping so another session can resume it. Use when the user runs /handoff, or says to wrap up, hand off, or stop for now; not for "keep going". Writes the task's State section in tsk, at most one wip commit and at most one tsk status change.
---

# Hand off a task

## 1. Stop at a safe point

Finish the current small step or back it out; start nothing new. Stop
background subagents this session started. Builders that own their own tsk
tasks keep running.

## 2. Identify the task

Use the tsk task this session picked up or the user named. Without one, ask
whether to add a task for this work; state never goes into a file instead.

## 3. Update the task's State

Read the task (`tsk list T12 --json`), then replace its notes with the user's
text exactly as it was, followed by one `## State` section (drop the previous
one; never append a diary):

- **Goal and acceptance checks:** unchanged unless the user changed them.
- **Current step:** what is half done, with file paths.
- **Next steps:** ordered and concrete enough to start without this session.
- **Verified facts:** each with its evidence (command, file, result).
- **Open questions:** only calls the user alone can make (a product choice,
  an approval, an irreversible step, missing access). For each: the call, your
  pick, the evidence and the risk. Leave it empty rather than pad it.
- **Artifacts:** branches, commits, pull requests, worktrees, downloads.

Write it with `tsk edit T12 --notes "$notes"`, then read the task back to
confirm the user's text survived. Lasting knowledge the work produced goes in
the repository's docs through the `docs` skill, not in State.

## 4. Save uncommitted work

A worktree can be removed later, so uncommitted edits are not safe. On the task
branch, run `gitleaks git --staged --no-banner --redact` after staging, then
commit everything as one `wip: <what is half done>` commit, saying in
the body if the tree does not build or tests fail. On `main` or a shared branch,
ask first. Never push or open a pull request here. Add the commit to
**Artifacts**.

## 5. Scan before it leaves the session

Before writing State, put the text in a temporary file and run
`gitleaks dir "$tmpfile" --no-banner --redact`. Remove any finding and tell the
user what was removed. Apply the same check to text for a pull request.

## 6. Set the board status once

- **Finished:** `tsk status T12 review --done "…" --check "…" [--next "…"]`.
- **Waiting on the user:** `tsk status T12 blocked --why "…" [--option "…"]`.
- **Unfinished:** leave it `started`; State carries the resume point.

Never change the user's text, add steps or set `done`.

## 7. Continue elsewhere

The board is per machine. When the work continues on another host, ask before
pushing; then commit to the task branch, push that branch (never `main`) and put
the next steps in its pull request or issue.

## 8. Report

One line on where it stands, any commit made and whether the tree is clean,
then the resume command: `/pickup T12`.
