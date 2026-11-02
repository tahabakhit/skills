# Security path procedures

## Build a reachable path

For a suspected issue, identify attacker-controlled input, entrypoint, transformations, security decision, sensitive operation and consequence. Check preconditions against actual callers and deployment. Record any assumed attacker privilege.

Use history and both revisions when reviewing a change that removes a guard or changes a trust boundary. A dangerous primitive in unreachable code is not the same finding as an externally reachable exploit. Missing information limits confidence rather than proving safety.

## Serialization and secret holders

Start with the concrete credential holder and every wholesale sink it can reach. Include object spread/copy, argument arrays, generic logging, error serialization, telemetry and HTTP responses in unchanged callers.

Distinguish language-level access checking from runtime representation. An ordinary TypeScript property marked private can still be an enumerable JavaScript property. A native JavaScript private field has different enumeration behavior, but custom methods can still expose its value. Inspect the emitted/runtime object and the serializer actually used.

Field suppression can be sink-specific. A representation flag may protect one formatter while a dictionary conversion or raw attribute path still leaks. Test with a synthetic sentinel through the real sink and inspect both success and failure outputs.

A scanner cannot prove a generic logger safe merely because it does not recognize a fixture value as a secret. Avoid collecting real credentials for reproduction.

## Authorization, tenancy and durable operations

Trace how the effective principal and tenant are derived and carried into reads and writes. Look beyond the visible route to shared query helpers, background work and alternate entrypoints. A two-tenant fixture can distinguish accidental cross-tenant access from a correctly scoped operation.

Check failure and unknown-input defaults. Inspect role/org switching, revocation and stale in-flight work when those states exist. A paused UI or pending network call must not unintentionally prolong access after revocation under the stated policy.

For single-use or idempotent operations, exercise concurrent or repeated requests at the actual durable boundary. A sequential fake that always succeeds cannot establish atomic consumption. Verify final persisted state as well as returned status.

For protocol/cryptographic validation, derive accepted issuers, audiences, algorithms, lifetimes and endpoints from the real protocol and provider contract. Do not invent defaults or accept an unfamiliar pattern as safe because it has a familiar function name.

## CI and model-driven automation

Trace fork/event data, repository files, local actions, install scripts and model instruction files into execution. Then trace execution to token scope, secrets, network access, deployment and runner persistence.

A trusted top-level workflow can still execute untrusted local code. A string passed to an action may later be interpreted by a shell. Model-readable repository instructions can redirect an agent's tools when it runs with privileged access. Evaluate the complete consumer path and constrain access mechanically where possible.

Use synthetic values and disposable execution to demonstrate the path. Do not expose real secrets to prove that a boundary is unsafe.

## Validate a repair

Pin the vulnerable and repaired candidates. Where feasible, run the original attack on both, a distinct case exercising the same root cause, legitimate behavior and nearby security constraints. Confirm the important assertions executed. A setup error that prevents reaching the dangerous operation is not a successful repair result.

Keep checks independent of which side they run against so they do not simply assert the known patch version. Preserve input, environment, command and result artifacts without sensitive data.

Report confirmed findings, unresolved evidence and review limits separately. Scanner output and a passing suite inform the result but do not establish security of unexamined boundaries.
