# Review passes

Use these passes for coverage. They do not require four agents or four separate reports.

## Requirements and compatibility

Identify the agreed outcome and explicit constraints. Follow the changed behavior through real callers, supported versions and persisted or wire formats. Compare exact error, cancellation and retry semantics when callers depend on them.

If the specification is silent, establish whether a suspected omission violates a real contract or is an unresolved product choice. A preference for extra robustness is not automatically an unmet requirement.

Before recommending deletion, inspect static imports, dynamic lookup, configuration, generated registries, plugin loading and documented external use. A search with no local result cannot prove an externally consumed entrypoint is unused.

## Correctness and state

Trace values across seams rather than reviewing each function in isolation. Use a concrete input and write down its path and expected output.

For concurrency, enumerate at least the orderings that could change the result. For example, older request A can finish after newer B. Does A overwrite B's state? For retryable writes, distinguish a failure before durable commit from a lost response after commit. Repeating the same call can have different consequences.

For durable state, compare validation limits with storage limits. A value accepted by an API may overflow the database column. For money, check units, conversion direction, rounding step and immutability of issued records against the stated contract. Do not invent financial policy.

For authentication or tenancy, follow the actual runtime principal into every affected read/write. Include failure defaults and role/tenant switching. A fixture with one tenant cannot distinguish scoped from unscoped queries.

## Test evidence

Inspect the assertions for the changed behavior. Ask whether a plausible defective implementation would still pass. Look for correlated oracles, internal fakes hiding the defect, broad rejection assertions and silently skipped cases.

Check whether the run belongs to the reviewed candidate and appropriate environment. Source tests cannot prove the contents of a generated package. A successful formatter cannot prove its input command passed. Missing execution is a limitation or required-proof gap, not a fabricated production defect.

## Project standards and operational effects

Apply standards that govern the touched work. Trace build/install/deploy effects, required checks and recovery behavior when relevant. Do not expand review into unrelated architecture cleanup.

For unfamiliar security or protocol behavior, use authoritative technical evidence or state the uncertainty. A library name or checklist category is not an exploit proof.

## Findings and disposition

Use this shape for an actionable finding:

- location in the reviewed candidate
- condition and affected caller
- expected result and concrete wrong result
- reproduction or traced evidence
- impact, confidence and suggested correction direction

Recheck each suspected finding against existing guards and runtime semantics. Report only what the evidence supports. Put unavailable checks and uncertain assumptions in a separate limits section.

When multiple reviewers disagree, inspect their inputs and counterexamples. Count of reviewers is not evidence. Preserve unresolved material findings. A retry cap can end the review budget but cannot make a confirmed failure acceptable.

After repair, identify the delta and its affected callers, tests and assumptions. Reuse unaffected evidence with explicit scope. Review new content before extending a whole-candidate verdict to it.
