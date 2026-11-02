---
name: data-pipelines
description: Build, change, diagnose, or plan replay of data transformations and scheduled ingestion with explicit contracts, late-data handling, idempotence, and candidate-bound verification. Use for dbt models, orchestrated assets, incremental loads, schema evolution, or backfills. Not for an analytical answer alone or automatic production execution.
---

# Data pipelines

Own the requested pipeline outcome, not a second delivery process. A diagnostic request ends with evidence and a supported cause or gap. Authorized implementation can continue without another default plan-approval pause. Production runs, destructive rebuilds and publication remain separate effects governed by the actual task authority.

## Establish the contract

Identify source and destination, record grain, business keys, schema/types, ownership, consumers, freshness target, and acceptable data loss or duplication. Inspect the existing transformation and orchestration configuration. Separate event time, ingestion time, processing time, watermark, and partition timezone.

Determine what the request changes: transformation logic, ingestion, schema, schedule, dependency selection, runtime configuration, or existing stored data. Record the exact code/configuration revision, adapter/engine versions, target environment and source snapshot or observation cutoff. Do not infer a tool's syntax from another platform.

For renamed, removed or retyped fields, inspect consumers beyond the local DAG, including exports and BI interfaces. Preserve compatibility through an explicit version, bridge or staged migration. Missing external-consumer evidence limits the claim that a change is safe.

## Account for state and retries

State the delivery behavior and its mechanism. A retry flag does not establish exactly-once processing. Identify checkpoints, deduplication keys, merge predicates, transaction boundaries and side effects such as notifications or external writes. Determine what happens if processing succeeds but acknowledgement fails.

For incremental work, define how updates, deletes, duplicates, out-of-order events and corrected historical records become visible. A filter on the newest event timestamp can omit late updates. Choose an overlap/reconciliation strategy or source change position appropriate to the real source. Document the retained state and limits rather than inventing a universal watermark rule.

For replay/backfill, enumerate affected partitions, upstream prerequisites, downstream consumers, overwrite/append/merge behavior, expected cost and side effects. Specify resume and cancellation behavior. Decide how concurrent scheduled work is isolated or coordinated. A plan-only request must not launch materialization, pause schedules or pull secrets.

## Diagnose or change narrowly

Use existing native diagnostics and official version-specific documentation. Preserve failed-run identifiers and original failure evidence. Distinguish code defects from unavailable credentials, stale sources, capacity limits and partial retrieval. Do not repair unrelated failures or install an orchestrator integration implicitly.

Use a disposable development target when execution is authorized. Keep the candidate bound to the inspected code/configuration and target. Do not treat an empty build as harmless: creating schema-only objects, full refreshes, truncation and overwrite can destroy useful state. If a rollback cannot restore data, name that limitation before irreversible work.

## Verify the outcome

Check transformation logic with controlled input/output cases, then separately check storage and orchestration behavior. Include relevant null/duplicate keys, empty inputs, late changes, schema boundaries, partition edges and retry conditions. Tests of rows emitted for a merge do not prove the final merged table.

Reconcile counts, key uniqueness, selected totals and rejected rows against an independent expectation. Reprocess the same input and verify unchanged final state or explicitly intended repeat effects. Check downstream compatibility and freshness for the changed scope. A submitted or successful run identifier is not proof that the intended data landed correctly.

Report the candidate, environment, partitions, source cutoff, executed checks, reconciliation results and unresolved coverage. Keep dry-run plans, local tests, remote execution and production acceptance distinct. Optional platform details are in `references/platform-evidence.md`; they are not required instructions or a substitute for installed tools.
