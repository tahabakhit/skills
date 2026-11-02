# Behavior-preserving refactoring

## Define what must remain stable

List observable inputs, outputs, errors and side effects for the affected boundary. Include public names, configuration, wire/storage shape, callback ordering, cancellation and resource lifetime when consumers can observe them.

Distinguish an intended compatibility quirk from a bug being fixed in the same task. If behavior changes intentionally, give that change its own criterion and proof. Do not silently redefine the baseline to match the new structure.

Capture existing test results before structural edits. Existing failures must remain visible. If the baseline is not runnable, identify a smaller executable seam or state the unproven part. Do not present a broken or unavailable baseline as green.

## Characterize the risky paths

Add focused checks where existing evidence cannot detect a structural regression. Use literal contractual expectations when available. Differential old/new execution can compare behavior, but the old implementation is not an independent oracle for intentional corrections.

For asynchronous ownership, compare traces rather than only final values. A timeout move can preserve the final error while leaking the worker or changing which operation owns cancellation. Assert relevant start, completion, cancellation and cleanup ordering.

For an extraction, check the actual caller-facing behavior at the new boundary. Duplicating every private-helper test can preserve obsolete implementation details while missing wiring errors.

## Move in attributable steps

Choose one seam and move one responsibility. Update its consumers together where the repository can accept an atomic change. Use a temporary adapter when external or independently deployed consumers need a transition.

After each coherent move, run the focused checks and inspect the diff for accidental semantic edits. Keep renames, ownership changes and deliberate feature changes distinguishable. Do not combine a new framework, unrelated formatting and a contract rewrite under one refactor label.

## Retire the old path

Search for remaining references and inspect dynamic registration, config, plugins, generated artifacts and external documentation. Deletion needs evidence about consumers, not just a local unused-symbol result.

Keep compatibility code when a real external obligation remains. State the condition for later removal. Where the same process owns all callers and no external contract exists, avoid inventing an unnecessary migration ceremony.

## Verify preservation

Run the established before/after cases on the final candidate. Inspect error and cleanup behavior as well as success. Compare produced artifacts if build structure changed. A source-only test can miss a missing packaged module.

Report preserved behavior, deliberate differences, remaining adapters, baseline failures and unexecuted checks. If results differ unexpectedly, investigate or revert only owned changes. Do not rewrite the oracle or discard another writer's work to make the new structure appear equivalent.
