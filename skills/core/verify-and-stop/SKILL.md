---
name: verify-and-stop
description: Check that an existing artifact, answer, event plan, analysis, or software change meets its acceptance conditions without expanding scope. Use for validation-only tasks, completion checks, and last-mile proof; not a mandatory stage for every task.
license: MIT
---

# Verify and stop

Translate acceptance conditions into the smallest sufficient proof set. Use the
criteria already agreed; do not create a new approval gate or broaden the task.
One agent can check the work. If a coordinator is already active, return proof
to that coordinator instead of starting another workflow.

For each material condition, identify the observable result, the exact candidate
it applies to, and a check capable of rejecting a violating result. Select evidence
suited to the claim: source comparison, recalculation, artifact inspection,
rendering, or a focused test. For software, check that any command actually selects
the relevant tests or assertions; runtime checks apply only when the claim depends
on runtime behavior. A zero exit status, empty findings list, or model confidence
alone does not establish correctness. When a new or suspect check might pass
vacuously, try a known failing example in a disposable copy or fixture without
weakening the criterion or mutating the delivery candidate.

Examples, not extra requirements:

- For an invitation, compare its date, timezone and venue against the approved
  event record. A polished layout does not excuse a wrong arrival time.
- For an analytical report, recompute a material total from the cited inputs and
  check the denominator and period. A bibliography alone does not prove the total.
- For a requested prose edit, compare the selected passage with the source to
  confirm that facts, quotations and required qualifiers survived.

## Proof discipline

- Reuse results only when the candidate, source evidence, dependencies and relevant assumptions still match. For software, this includes checked files, configuration and runtime conditions. Record the method (and command, if any), inputs and scope so a previous pass is not mistaken for proof of later changes.
- Start with focused checks. Run wider gates only when required by the task or applicable instructions, or necessary to prove a material condition.
- Distinguish pass, fail, unavailable, and blocked exactly.
- Do not change the candidate artifact or product code unless the verification request includes fixes.
- Do not add polish, cleanup, or unrelated tests after criteria pass.

For failed conditions, report the affected unit, expected and observed result,
evidence, and the narrow correction or missing prerequisite. Return that receipt
to an existing coordinator. Preserve valid proof for unaffected inputs, but
invalidate it when a changed dependency or assumption alters what was checked.
Verification-only authority does not include performing the correction.

Once acceptance proof is complete, end verification and return the result to the active task owner. Report any already-required delivery steps still outstanding; the delivery owner performs them under existing authority, not as another verification pass. Do not infer permission to commit, push or publish from passing checks. Report results and any verification gaps without starting another improvement pass.

If the broader task already includes delivery or publication follow-through, return proof to its active coordinator. An available `deliver-work` skill may own an already-authorized endpoint, but is not a dependency or reason to restart an active workflow. Otherwise continue already-authorized steps using the applicable documented procedure; if a required capability is missing, report the precise gap instead of inventing delivery or installing a specialist. A validation-only request ends with its results and does not start publication, PR monitoring or release work.
