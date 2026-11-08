---
name: change-safely
description: Restructure existing code without changing its contract, or execute a compatibility-preserving schema, data, API, protocol, or configuration migration. Use when preservation, mixed-version operation, rollback, or staged contraction matters. Not for hiding feature changes as cleanup or treating a destructive transition as an ordinary refactor.
license: MIT
---

# Change an existing contract safely

Choose the preservation contract before changing structure or transitioning versions.

## Select the branch

**Refactor** preserves externally relevant behavior while changing ownership or structure. **Migration** deliberately changes a contract through explicit compatible stages. If the task contains both, track the preserved and intentionally changed behaviors separately.

Inspect consumers, stored data, generated outputs and external integrations. Check the available test/runtime environment and whether representative old versions or data snapshots can be exercised. Use disposable fixtures where available. Missing historical versions, recovery access or domain expertise are limitations to resolve, not evidence of compatibility.

Do not interpret a request for a migration plan as permission to write live data. Identify the exact permitted environment and transition stages. Continue already-authorized local work without inventing a universal approval gate.

## Refactor branch

Read [refactor procedure](references/refactor.md).

1. Record the current contract and baseline results, including existing failures. Cover success, error, cancellation and resource ownership where affected.
2. Select a structural seam and a small sequence of moves. Keep behavior changes separate so a regression has an attributable cause.
3. Move one responsibility, adapt its callers and compare observable results against the baseline.
4. Investigate differences. Do not regenerate snapshots or weaken assertions solely to make the new structure pass.
5. Remove compatibility code or old paths only after checking real consumers, including dynamic and external ones.

## Migration branch

Read [migration procedure](references/migration.md). For relational schema or data changes, also read [database migrations](references/database-migrations.md) for lock, backfill, constraint and recovery decisions.

1. Specify old/new reader and writer behavior for each permitted stage.
2. Expand compatibility before migrating data or switching traffic. Preserve enough source information to reconcile the transition.
3. Process bounded batches with stable identity, progress and repeat-safe writes. Reconcile interrupted and ambiguous outcomes before retrying.
4. Prove preservation and intended changes on representative fixtures, then verify the selected environment within permission.
5. Contract only when explicitly in scope and the old consumers and recovery window have been addressed.

A reverse schema edit is not necessarily a data rollback. If information is lost, describe the restore or forward-repair requirement and test it where possible.

## Return the result

Report the starting and resulting candidate, preservation evidence, intended differences, stage reached, compatibility matrix and remaining risks. For migrations include reconciliation totals, partial progress and recovery evidence. A green new-version suite alone does not prove old consumers still work. Hand back any missing stage evidence instead of declaring the entire transition complete.
