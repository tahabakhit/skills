---
name: pickup
description: Resume work on one of the user's tsk tasks. Use when the user runs /pickup, with or without a task number such as T12, or asks to pick up or continue a board task. Not for general catch-up questions without a task; not for dispatched or agent-assigned tasks.
---

# Pick up a task

Board commands follow `tsk guide`; read with `--json` only. The board is the
user's: this skill reads tasks and starts one, nothing else.

## 1. Find the board scope

Inside Git, use the main checkout's project even from a worktree, because tsk
treats each worktree as its own project:

```sh
main=$(dirname "$(git rev-parse --path-format=absolute --git-common-dir)")
tsk list -p "$main" --json
```

Outside Git, plain `tsk list --json` reads the desk. `--all` from the user widens
the scope to every project.

## 2. Choose the task

- **Number given:** read it with `tsk list T12 --json`.
- **No number:** list up to five candidates in this order and ask which to take;
  never start one unasked:
  1. `started` tasks with feedback the user sent back (the last `past_reviews`
     entry has `feedback` or failed `checks`), in board order.
  2. Other `started` tasks, in board order.
  3. `ready` tasks whose `after` tasks are done, in board order.

  Skip `blocked` and `review` tasks that wait on the user. Mark the first
  candidate as recommended with one reason. With no candidates, show the `open`
  tasks and ask; promoting from the inbox is the user's call.

## 3. Refuse what belongs elsewhere

- An agent `assignee` or a `dispatch` record: that agent owns it. Say so.
- Already `started` with recent activity: tsk has no claim lock, so ask whether
  another session is working on it before continuing.

## 4. Load the state

- The task: notes (the user's text and the `## State` section), the open block
  or review, the last `past_reviews` feedback and failed checks, and `activity`.
  Without a State section, the user's text is the goal; State is written at the
  first verified step or handoff.
- The repository: branch, `git status`, ahead and behind, and the docs the
  task touches.
- Session history through `cass`, only when State is missing and the task has
  earlier activity.

## 5. Check State still holds

State is the record of what is done: do not redo finished steps or reopen
settled decisions. It can be stale, so check what the next step relies on: the
branch exists, its commits match, the pull request state, and the files named
under **Current step**. Treat "verified" in State as a claim until its evidence
still holds. Report any mismatch in the report below instead of quietly
re-planning.

## 6. Start and report

Run `tsk status T12 started --no-dispatch` unless it is already started; without
`--no-dispatch` an assigned task launches its agent instead. Then report in three
to five lines: the task, where it stands, the next step and any open question.
Continue with that step only if the user asked you to.
