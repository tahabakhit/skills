# Behavior tests and boundaries

## Pick an observable seam

Start from the behavior the caller relies on, not the implementation's helper list. Identify the existing public entrypoint and the lowest test level that can exercise the complete claim.

A pure decision table can be a unit test. A tenant-filtering query needs the actual query and suitable database state. A route serialization claim needs the route's real mapping and output. A browser layout claim needs a rendering engine that computes layout. A class-name assertion in a DOM emulator proves the class string, not target size or visibility.

If reaching the behavior is difficult, inspect the existing boundary before adding a new exported helper just for tests. A small design seam can be justified by a real caller or replaceable dependency. Do not make every private collaborator a public API.

## Build a discriminating case

Write down the input, expected observable result and plausible wrong result before editing production code. The expected result needs independent grounds.

For a specified sum operation, inputs 10 and 5 should yield 15 because of the arithmetic contract. Computing the expectation by invoking the production total helper cannot expose a defect in that helper. For a protocol encoder, use a hand-derived byte fixture from the protocol, not bytes copied from its current output.

Choose cases that separate branches: empty/nonempty, valid/invalid, boundary on each side, failure and retry, or two distinct tenants where isolation matters. Do not add every category when it is irrelevant to the requested behavior.

## Use a short test-first cycle where useful

This repair cycle applies only when production changes are already authorized.
For test-only work, add and exercise the discriminating test, report its observed
failure or limitation, and stop before the implementation step.

1. Add one case for the chosen behavior.
2. Run it and inspect why it fails. A missing dependency, malformed fixture or unrelated exception is not the intended regression.
3. Make the smallest coherent implementation change.
4. Rerun that case and the relevant surrounding tests.
5. Restructure only with the behavior still checked. Add the next case when another requirement or risk needs proof.

For existing untested code, characterization can establish a baseline before structural change. Do not delete completed work because it predates the test. When the defective implementation is unavailable, state that sensitivity was not observed there and use another justified validation method if practical.

## Substitute only within the claim

Use real owned behavior when claiming an integration boundary. Substitute uncontrollable external services, clocks or randomness at their actual boundary when necessary for a deterministic test.

An internal fake can help isolate caller decisions. Explain what remains real. A fake repository returning a fixed row can prove response mapping, but it cannot prove the query's tenant constraint. A fake transaction callback cannot prove database atomicity. An in-memory database cannot automatically prove another engine's locking or isolation.

An interaction assertion is useful when the interaction is the contract: no external charge after validation failure, an exact conditional-write token, or a bounded retry sequence. Counting calls to a private helper solely to preserve current structure is weaker than observing the promised result.

## Keep failures reproducible

Control clocks, locale, timezone and random sources where they affect output. Await an observable condition rather than sleeping for a guessed interval. Isolate files and database state per test and clean up owned resources.

Do not convert an unexpected exception into a skip. A legitimate platform/dependency skip needs a declared execution path elsewhere if that platform remains supported. Capture enough context to distinguish a product regression from setup failure without logging credentials.
