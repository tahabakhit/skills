# Plan

Plan the supplied task without implementing it.

1. Read an existing `notes/<task-slug>.md` first and continue from it. Read the
   repository's AGENTS.md/CLAUDE.md and applicable skills, docs and code. Treat
   repository PLAN/TODO/spec/issue files as input; the notes file is the plan.
2. Before any notes write, run `git ls-files notes`. If it lists tracked files,
   stop and ask where to put working notes. Otherwise run
   `git check-ignore -q notes/x`. If not ignored, resolve this repository's
   exclusion file with `git rev-parse --git-path info/exclude` and append a
   `notes/` rule there, preserving existing contents. Never edit a tracked
   ignore file or global Git configuration for working notes.
3. Check the notes' `Owner:` line before claiming it. Record harness and actual
   native session ID when available (otherwise say unavailable), task slug and
   last checkpoint. A different owner requires explicit transfer; age is not
   permission to take over. This is advisory, not a concurrency lock: never
   start a second writer in the same repo.
4. Write Goal, Acceptance checks (exact commands), Constraints, Approach
   (numbered steps naming files), Current step, Verified facts (with evidence),
   and Open questions. Name the session/task consistently using the
   [Herdr procedure](herdr.md). Naming failure does not authorize modifying
   transcripts or renaming another session.
5. Ask the official read-only Opus critic:
   `kro ask critic "Critique the plan in <absolute notes path>. Task: <one-line task>"`.
   Use at least an 1800-second tool timeout (or background execution when the
   harness caps it). If kro is not deployed yet, use `agent-consult critic`
   with the same task. If consultation fails, preserve any printed answer,
   show its diagnostic and stop; follow the [Herdr cleanup guidance](herdr.md)
   rather than automatically re-asking.
6. Verify every finding against code. Revise confirmed findings; record rejected
   findings and reasons under Open questions.
7. Ask every owner-only question in one numbered reply, one line per question,
   lettered choices with recommendation marked. Record answers; repeat until
   none remain. Answers that change the approach require another critique.
8. Stop and summarize the plan. Do not implement until the owner approves.
