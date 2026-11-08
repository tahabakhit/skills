---
name: repository-delivery
description: "Use when preparing commits, GitHub issues or pull requests, or addressing their review. Not a replacement for repository tracker or approval rules."
---

Read the requested outcome, relevant discussion and repository delivery/tracker
rules. Establish the intended diff or commit range, current branch, target branch,
unrelated work and existing submission before preparing a change for delivery.
Use the existing review and secret-scan gates; this skill grants no new commit,
push, publication or merge authority. A requested draft is not a request to publish.

For authorized commits:

- Stage only the intended change and inspect the staged diff. Keep supporting
  tests, docs and migrations with the behavior they explain.
- Split by independently understandable or shippable state, not file count.
  Keep coupled changes together when a split creates an unsafe partial state.
- Write a subject naming the actual effect with concrete nouns and an active verb.
  Follow repository grammar. Add a body for reasons, constraints, compatibility or
  deliberate limitations not evident from the diff, not a narration of files.
- Preserve useful review/failure history. Amend a small immediate correction only
  when it completes the same unpushed state; use a new commit for materially different
  work. A failed hook/rejected commit created no new commit: fix and retry, never
  amend the preceding commit as a consequence. Do not rewrite shared published
  history. Preserve verified authorship and required repository/harness trailers;
  do not fabricate contributor identities.
- Verify identity when accounts/contributors are ambiguous. Never switch identities
  silently or use another account to bypass review or branch protection.

Load only the relevant branch:

- Issue creation or update: `references/issues.md`.
- Pull request preparation, update or review feedback: `references/pull-requests.md`.

Keep observation, expected behavior and inferred cause distinct in submission
text. Report the actual validation outcome and material limits, not a command list
that implies success. Return links only for artifacts actually published.
