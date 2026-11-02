# Optional platform evidence

This note identifies specialist questions. It does not grant tool access or supply a complete dbt/Dagster command reference. Resolve commands from the installed version's help and official product documentation before execution.

## dbt projects

Inspect the project target and adapter before running anything. Separate manifest-defined lineage from known external consumers. A selected model's successful compilation does not establish correct row grain, consumer compatibility, or final incremental merge behavior.

Use fixture-based transformation checks for emitted records. Verify the resulting stored relation separately, including duplicate-key behavior and repeat execution. A fixture for an incremental branch must model existing target state as well as incoming records. Ephemeral dependencies and adapter-specific types can require different fixture formats.

Commands that create zero-row relations still write to a warehouse. Never use schema-only construction against populated targets on the assumption that it is a non-mutating preview. Preserve the development/production target distinction in evidence.

The labels `state:modified`, manifest deferral and the commercial dbt State service describe different mechanisms. Confirm the configured mechanism rather than substituting a familiar one.

Primary documentation entry points:

- https://docs.getdbt.com/docs/build/unit-tests
- https://docs.getdbt.com/reference/commands/build
- https://docs.getdbt.com/reference/node-selection/syntax

These URLs are documentation leads, not claims that a current page has been checked for the installed version in this draft's evaluation.

## Dagster projects

Separate local project execution from operations on a deployed organization. A local definition check does not prove a remote deployment runs the same candidate.

Resolve actual asset keys, partition keys, repository and code location before proposing a remote run. Do not pass a local selection expression to an endpoint that accepts only enumerated asset keys. Check whether a requested asset set can run in the same repository/location. A single-partition launch is not a backfill of a partition range.

Treat environment export, run launch, cancellation and schedule changes as separate effects. Inspect permission and failure evidence without silently retrieving secret values. If the connected MCP service lacks a required operation, report that capability gap instead of guessing a tool name.

Primary documentation entry point:

- https://docs.dagster.io/

## Other engines and orchestrators

The entrypoint's contract, replay and reconciliation checks still apply. Syntax, partition semantics, scheduling, transaction guarantees and recovery mechanisms require the actual product's documentation and configured capabilities. An absent specialist reference is not permission to claim equivalent coverage.
