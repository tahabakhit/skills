# Compatibility transition procedure

## Define stages and preservation

Name the starting and destination contracts and the permitted stage endpoint. Specify which identities, values, ordering, references and invariants must survive. Counts and checksums can help reconcile data, but counts alone do not prove record-level preservation.

Build a reader/writer matrix for the versions that can coexist. Include old reader/new writer and new reader/old writer only where those combinations are actually supported. Explain incompatible combinations and how deployment prevents them.

Example: adding a derived field can begin with nullable storage and readers that tolerate its absence. A new writer must not emit a representation that old readers reject while old readers are still serving. The concrete defaults and fallback semantics come from the application's contract, not this example.

## Expand

Introduce additive compatibility before switching consumers. Assess lock duration, table size, defaults, validation and deployment order using the real database/runtime behavior. A fake transaction cannot prove migration locking or rollback.

Identify every source and destination write path. For dual writes, define what happens when one write succeeds and the other fails. If atomicity is unavailable, specify a durable repair record and reconciliation strategy. Do not call best-effort dual writes consistent.

## Migrate in repeat-safe batches

Choose stable operation and record identity. Define a bounded batch, checkpoint and success condition. Prefer durable progress that is committed with the corresponding data change where the platform supports it. If not, make replay safe and reconcile before advancing.

Test interruption before the write, after the write but before acknowledgement, and between batches. A retry must not duplicate records, reapply a non-idempotent transform or skip a partially completed range. Pagination by mutable offsets may miss or repeat rows when concurrent writes change ordering.

Handle concurrent updates explicitly. Use a version/precondition, captured source boundary or another justified reconciliation method. A backfill that overwrites newer values can lose data even when its row count matches.

Preserve original values or a recoverable source where the transition loses information. Record rejected and unmapped cases without hiding them in a successful aggregate.

## Cut over and reconcile

Compare stable record identities and contract-relevant values. Exercise the supported reader/writer combinations and representative boundary inputs. Verify the chosen target rather than inferring production state from a local test.

Switch consumers only under the authorized plan. Observe the selected environment and reconcile pending work. A new-version happy path is not sufficient evidence that old writers or long-running workers have stopped using the old format.

## Recover or contract

Test rollback at each relevant stage. Restoring an old column definition cannot recover discarded values. State whether recovery requires a snapshot restore, reverse transform, replay or forward repair. Include effects on writes made after the transition began.

Remove old fields, adapters or formats only when contraction is requested and retirement conditions are met. Identify remaining consumers, recovery window and irreversible actions before deletion. Expand-and-migrate permission does not imply contract permission.

Return stage reached, matrix results, preservation/reconciliation evidence, interruption tests, remaining work and recovery limits. If live state is ambiguous, stop further mutation rather than replaying a destructive step.
