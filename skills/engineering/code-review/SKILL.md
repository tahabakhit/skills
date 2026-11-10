---
name: code-review
description: Review a specified working-tree, staged, commit-range, branch, or PR candidate without editing it. Use for concrete correctness, requirement, test, compatibility, and security findings or for evaluating review feedback. Not for implementing fixes, posting remote reviews unasked, or reviewing an unspecified candidate as though its boundary were known.
license: MIT
---

# Review a candidate

Identify defects in the requested candidate and report the evidence needed to act on them.

## Freeze the review boundary

Determine whether the request concerns staged content, unstaged content, a complete working tree, explicit before/after trees, or a PR against its actual target. Do not assume the default branch is the PR base. Use a merge-base comparison only when that is the requested branch-change boundary. A request to compare two snapshots needs those snapshots.

Capture the base and candidate identities. For uncommitted content, distinguish index from working-tree bytes. An unstaged repair does not repair a staged defect. Do not switch branches, modify the index, run formatters in write mode, or disturb another writer to inspect history.

Check whether the relevant runtime and isolated test environment exist. Read-only review does not authorize network writes or project commands with unknown external effects. Use safe probes where possible. Record unavailable checks as not run.

## Inspect the behavior

Read [review surfaces](references/review-passes.md). For disputed evidence or a material claim needing a decisive counterexample, optionally read [evidence judgment](references/review-judgment/guide.md); it supplements this workflow rather than defining another review procedure. Trace changed values through their producers, consumers, persistence and failure paths. Review the tests and their expected results rather than relying on test names or a green badge. Consult project requirements and standards that apply to the touched behavior.

For each suspected defect, build a counterexample or identify an explicit unmet requirement. Check whether existing guards, callers or runtime behavior invalidate it. Separate security exploitability, confidence and impact. Missing tests can be a required-proof gap without proving that production code is wrong.

Use independent reviewers only when available and warranted or required. Do not fabricate their agreement. Reconcile findings by evidence rather than majority vote. A fresh reviewer should receive the contract and candidate, not a proposed verdict to repeat.

## Report and reconcile

Each actionable finding needs a location, triggering conditions, consequence, evidence and severity tied to impact. Avoid style preferences and speculative requirements. Put material evidence gaps in a separate section. Include the reviewed identities, surfaces covered and tests actually run, even when no defect is found.

When evaluating feedback, verify it against real callers and compatibility obligations before changing anything. Record accepted, disproved and unresolved findings with reasons. After a fix, review the affected change and refresh invalidated proof. Never attach an unqualified whole-candidate pass to a later revision that has not been reviewed. Budget exhaustion leaves an open finding or gap, not acceptance.
