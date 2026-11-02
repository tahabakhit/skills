# Trust, revisions and check coverage

## Trace the event to execution

For each relevant event, record who controls its fields and repository files, which ref is checked out, and what later interprets that content. Include local actions, dependency lifecycle scripts, reusable workflows and instructions supplied to an AI agent.

Then record available tokens, secrets, deployment rights and persistent runner access. A privileged job that checks out a fork's local action can cross a trust boundary even when its top-level workflow is trusted. A field passed through an action input can become a command in that action. Inspect the downstream interpretation.

Separate untrusted computation from privileged reporting or publication. If an untrusted job produces an artifact consumed by a privileged job, validate its data-only contract. Do not execute its scripts or accept arbitrary paths as trusted instructions. An apparent artifact boundary is not sufficient by itself.

Minimize permissions per job. Pin external action or workflow identities according to the repository's policy. Review update behavior so an immutable pin does not become a permanently unmaintained dependency. Long-lived self-hosted runners need a separate persistence and cleanup threat assessment.

## Identify the revision under test

Distinguish feature head, target base, synthetic merge and merge-queue candidate. Record which one each job builds and which identity the provider attaches to the result. A required gate must prove the candidate that policy intends, not whichever branch checkout defaults to.

Reused caches and downloaded artifacts must correspond to the relevant toolchain and content. A restore keyed too broadly can hide a missing build or reuse another candidate's outputs. A cache hit is an optimization, not execution evidence.

## Model the final gate

List required and genuinely optional producers for each event/path case. Write an expected outcome table before changing conditions. At minimum consider:

| Producer state | Expected treatment when its evidence is required |
| --- | --- |
| Success with valid result | Eligible for pass |
| Failure | Fail |
| Cancelled or timeout | Non-pass |
| Skipped despite required work | Non-pass |
| No job/check emitted | Non-pass, with diagnosis |
| Explicitly not applicable under agreed policy | Only the declared exemption may apply |

A final aggregation job must still run when a producer fails so it can report the correct outcome. It must not mistake an empty dependency set or missing result for success. Avoid assigning a required name to a job whose path filter prevents the provider from creating it on an event where the rule still requires it.

## Exercise the coverage

Use controlled cases for relevant changed and unchanged paths, fork inputs, failure, skip and queue behavior. Validate reusable workflow refs and inputs at the exact version being used. Parsing can detect malformed syntax, but only suitable provider/runner evidence can establish event behavior.

Do not test privilege boundaries by exposing real secrets to an untrusted probe. Use a disposable environment and synthetic values. If authorized provider execution is unavailable, retain the event-level claim as unverified.

Report the trust graph, expected check matrix, tested identities and actual exercised cases. Flag any change to required-check or privilege policy separately from the implementation that enforces it.
