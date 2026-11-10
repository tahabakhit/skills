---
name: testing-work
description: Write behavior tests, run a test-first change, assess test adequacy, or add targeted property or mutation tests. Use for regression protection, weak assertions, over-mocking, and meaningful invariants. Not for deciding product requirements, broad PR review, or claiming acceptance from a coverage percentage.
license: MIT
---

# Test behavior

Choose proof that can detect the named defect without rejecting harmless implementation changes.

## Establish the contract

Identify the behavior, valid inputs, observable outcome and source of expected results. Use the agreed specification, a literal worked example, an external protocol or an independently written simpler model. An expected value obtained from the same production helper can reproduce the bug.

Inspect the existing runner and nearby tests before adding dependencies. Check whether required services, fixtures and runtime versions are available. Use the current project stack where it can prove the behavior. If the necessary environment is missing, report the proof gap. A mocked substitute does not establish the behavior of the missing service.

## Choose the branch

Read [behavior and boundaries](references/behavior-tests.md) for authoring or TDD. Read [adequacy](references/adequacy.md) for an audit, property tests or mutation tests.

- **Author or TDD:** select one observable behavior. Write the assertion and observe its intended failure when a reproducible regression exists. Distinguish behavioral failure from collection, import or setup failure. Test-only work returns the test and evidence without repairing production code. When repair is already authorized, implement the narrow change, rerun it, then check surrounding behavior. Work in short behavior-sized increments rather than writing an entire speculative suite first.
- **Audit:** inspect assertions, executed branches and substitutes. Identify the particular promised behavior that is absent or weakly proven. Do not edit tests in audit-only mode. Do not equate a green run with a useful assertion.
- **Property:** state a meaningful invariant or relation and its domain. Add generators that reach relevant cases, deterministic edge fixtures and a reproducible seed. Pair algebraic properties with independent examples where correlated bugs could cancel out.
- **Mutation:** choose realistic defects for the named behavior. Run the test against defective and known-correct variants. A surviving change needs semantic investigation. An equivalent mutation or timeout is not automatically missing coverage.

Tests of boundary enforcement must use that boundary. A fake database cannot establish locking, rollback or tenant filtering. A unit test with an internal substitute may still prove its caller's decision logic. State that narrower claim rather than condemning or overstating the test.

## Return evidence

Report the behavior, independent expectation, tested boundary, commands and observed outcomes. State what plausible defect the test rejects and what it leaves unproven. Preserve seeds and minimized counterexamples. Distinguish defects in production code, test setup, generator, asserted property and unresolved requirements. Do not delete existing work or require a new framework merely because the change did not begin with tests.
