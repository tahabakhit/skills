---
name: triage
description: Build the user's triage of what needs doing now, from the tsk board, open pull requests and the extra sources a local triage.md lists for this folder (for example a work tracker, chat or calendar). Use when the user asks what to do, for a plan or a daily update, or runs /triage. Read only; suggests actions and adds tsk tasks only for the ones the user picks. Not for single board questions such as "what's next" (tsk-cli).
---

# Triage

A triage printed in the chat: what needs the user, what is in motion, and a
short list of suggested actions. Nothing is changed except tsk tasks the user
picks in this session, the folder's `triage.md` on first setup, and local
files `triage.md` names, after the user confirms.

## Rules

- Read only. Never write to trackers, chat, pull requests or memory. The only
  writes are tsk tasks the user picks, `triage.md` during setup and, when
  `triage.md` names them, local files updated with answers the user gives in
  this session.
- A source whose tool is missing or unauthenticated gets one line saying it
  was skipped and why; continue with the rest.
- Link items (URL, key or task number) instead of quoting their contents.

## 1. Find this folder's triage.md

Walk up from the current directory and use the nearest `triage.md`; it applies
to that folder and everything below it. It lists extra sources with the
commands or tools to read them, report rules (exclusions, how to name people)
and the source order, where `Board` and `Pull requests` may appear as entries.
Its rules may add sources, exclusions and formatting, and name local files the
triage may update; they never relax the Rules above. Without it, or when it
leaves them out, the order is its sources, then the board, then pull requests.

**First run, no `triage.md` found:** offer to set one up before the report.

1. Propose where: the repository root inside Git, else the current folder.
   The user may pick a parent so it covers more.
2. List what this session can actually reach: work trackers, chat, calendar
   and mail tools that are surfaced, and every account and host in
   `gh auth status`. Ask which to include and any rules to add.
3. Write `triage.md` there with a one-line header saying it is local and not
   committed, then the rules and sources in the shape above. Never put
   secrets in it. Inside Git, add `triage.md` to `.git/info/exclude` (local,
   unlike `.gitignore`) unless it is already ignored; check with
   `git check-ignore -q triage.md`.

If the user declines, run with the board and pull requests only and do not
ask again this session.

## 2. Board

Read with `--json` only (`tsk guide` has the reading rules):

```sh
tsk list --all --json
```

Show three groups in board order: **needs me** (`blocked` or `review` rows
whose `block.on` or `review.on` is `you` or absent, or `task:<n>` when T<n> is
done or gone), **in
motion** (`started`, and blocked or review rows waiting elsewhere) and **on
deck** (`ready`). The list has no timestamps: for `started`, `open` and `ready`
rows (at most 20), read `tsk list T<n> --json` and use `activity[0].at`
(seconds first) to flag `started` tasks idle for 3+ days and `open` or `ready`
tasks untouched for 14+ days.

## 3. Pull requests

```sh
gh search prs --author=@me --state open --json repository,title,url,updatedAt
gh search prs --review-requested=@me --state open --json repository,title,url,createdAt,updatedAt
```

Add any extra hosts or accounts `triage.md` names, in one table. Flag your
pull requests untouched for 7+ days (`updatedAt`) and review requests opened
more than 2 days ago (`createdAt`).

## 4. Report

Print each source's table in the source order, then **Suggested actions**: at most eight,
ordered by urgency, each naming its task, pull request, link or key. Drop items
an existing tsk task already covers. Mark the first as the recommended next
move with one reason. Stop and let the user pick.

For each picked action the user wants tracked, add one task and print its
number: `tsk add --desk -t "<key or repo>: <action>" -n "<link>" --json`, or
`-p <project>` when it belongs to a repository on the board. Never add steps or
set a task `done`.
