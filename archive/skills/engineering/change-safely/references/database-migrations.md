# Relational database migrations

Use alongside [the migration procedure](migration.md) when schema or stored data changes. The examples below focus on PostgreSQL; verify the actual server version, table layout and migration runner. They are not a zero-downtime guarantee or permission to modify a live database.

## Inspect the execution contract

Identify table size, write rate, long-running transactions, replicas and available disk space. Check whether the runner wraps migrations in a transaction, retries failures, sets timeouts or records completion separately from committing data. Use bounded lock/statement timeouts suited to the operation; a timeout may leave partial nontransactional work to inspect before retrying.

Rehearse on the same database engine and representative data. Include a concurrent writer and a transaction holding a conflicting lock. A tiny empty table cannot establish acceptable lock duration on the target. Monitor lock waits, replication lag, storage and application errors during an authorized rollout; define when to stop.

## Choose operations by their real cost

| Change | PostgreSQL consideration |
| --- | --- |
| Add a column | Avoiding a rewrite does not avoid locks. Since PostgreSQL 11, many non-volatile defaults avoid a table rewrite; volatile defaults can still require one. Check the actual type, default and version. |
| Build an index | `CREATE INDEX CONCURRENTLY` permits ordinary writes but adds work and waits. It cannot run inside a transaction block; the runner needs an explicit nontransactional path. Partitioned tables need version-specific handling. |
| Enforce a constraint | For supported constraints, separate adding `NOT VALID` from `VALIDATE CONSTRAINT`. New writes are still checked; existing violations need repair before validation succeeds. This does not make every phase lock-free. |
| Change type, rename or drop | Check rewrite and lock requirements and all deployed readers/writers. Use expand/contract when direct changes break supported versions. |

After a failed concurrent index build, inspect validity and uniqueness enforcement before retrying. An invalid index can still consume write overhead; a failed unique build can continue enforcing uniqueness. `IF NOT EXISTS` does not prove the existing index is valid or matches the desired definition. Choose cleanup or repair only after inspecting the actual state.

## Backfill without overwriting newer work

Use an immutable indexed key or another stable traversal boundary, not mutable offsets. A bounded transaction should select a range, apply a repeat-safe transform and commit its checkpoint with the data when supported. Choose batch size from measured transaction time, lock pressure and replication lag, not a universal row count.

Specify who owns each value during coexistence. For a `username` to `display_name` transition, copying only where `display_name IS NULL` prevents overwriting a new non-null value, but does not by itself handle concurrent username changes or distinguish an intentionally null display name from an unprocessed row. Use explicit progress/version state when null is a valid result. Check old writers, dual-write failures, deletes and retries before declaring convergence.

If batches use `SKIP LOCKED`, skipped records are not completed records. Advancing a high-water mark past them requires a durable revisit strategy. Test interruption after the data commit but before acknowledgement, plus a concurrent change to the same row. Compare identities and meaningful values, not just affected-row totals.

## Example: tighten nullability in stages

For a PostgreSQL column that must become required:

1. Define a valid value for missing historical rows and deploy compatible writers. Do not invent defaults to satisfy the schema.
2. Where supported, add an enforced `CHECK (column IS NOT NULL) NOT VALID` in a short transaction. Account for existing null rows whose updates may now be rejected.
3. Backfill missing values in bounded transactions; reconcile rejected and concurrently changed rows.
4. Validate the check separately. Validation scans data and takes locks, even though ordinary writes can continue.
5. Set `NOT NULL` once the check is valid. A suitable validated check can avoid another scan, but the metadata operation still needs its lock. Remove the helper constraint only after successful tightening, in a later statement.

Consult the target version's [ALTER TABLE](https://www.postgresql.org/docs/18/sql-altertable.html) and [CREATE INDEX](https://www.postgresql.org/docs/18/sql-createindex.html) contracts before turning this sequence into SQL.

## Recover without losing writes

An additive column is not disposable merely because the schema change was additive: new writers may already store unique information there. Before reverting code or dropping storage, establish whether old code can read the current data and where post-cutover writes will go. Reconcile or preserve those writes first.

A pre-migration table copy alone is not a complete recovery plan for later updates or deletes. Name the snapshot/replay boundary, restoration procedure and acceptable data-loss window. Rehearse recovery at the authorized stage; do not call a reverse DDL statement a data rollback.

Adapted from DROO's database migration reference, with revised concurrency, locking and recovery guidance. Pinned inputs and changes are in `../PROVENANCE.json`; the full notice is in `../LICENSE-DROO`.
