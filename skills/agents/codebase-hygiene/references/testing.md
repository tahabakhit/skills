Tests should reject credible failures. Proof that the current code exists is insufficient. Treat every test as maintained code with ongoing cost.

Do not add low-signal tests that only do the following unless they protect a real repository-required structural contract. Flag existing low-signal tests rather than deleting them outside the requested scope. Repository test conventions win.

Low-signal examples:

- confirm a feature, command, route, export, component, field, or registration exists
- repeat a guarantee already enforced by the typechecker, schema compiler, or another deterministic check
- assert implementation structure, private helper calls, or mock choreography
- render a component or execute a happy path without protecting consequential behavior
- raise coverage or test counts without rejecting a credible defect

Test contracts, not feature presence. Prefer project-owned invariants, state transitions, normalization, permissions, error behavior, persistence, ordering, idempotency, cancellation, cleanup, and public serialization.

Do not handroll an external provider and call the result compatibility coverage. Invented Discord, inference, payment, cloud, database, or framework behavior can pass forever while the real provider changes. Static provider-shaped fixtures prove only how the project handles that fixture.

For external boundaries:

- validate untrusted input at runtime
- test normalization and decisions the project owns
- use examples captured or verified from the real boundary only when they protect owned parsing behavior
- use a controlled integration or smoke check when actual provider compatibility matters
- keep credentials, rate limits, cost, nondeterminism, and destructive effects out of ordinary test runs

Use mocks only at owned boundaries and only when the interaction is itself part of the contract. Prefer small fakes when they can preserve the relevant semantics. Do not create an interface solely to make mocking possible.

Assess UI and UX tests by the user behavior they protect. Prefer a lower, more stable boundary when it establishes the same contract; do not delete existing tests outside the approved scope. Registration, rendering, snapshots, selector choreography, and framework plumbing are not valuable merely because they are easy to assert.

A regression test must reject the real failure mechanism. Before adding a test, name a plausible incorrect implementation that it would catch. If no meaningful defect would fail it, do not add it.

Run existing tests to discover failures. Do not spend the implementation budget rewriting tests so they approve code that has not changed yet. Update a test when the owned contract intentionally changes, not when the implementation makes the old assertion inconvenient.

Match test effort to risk and repository fit. Deterministic parsers, reducers, state machines, validators, lifecycle transitions, and contract translation usually deserve direct tests. Thin framework glue and live provider behavior often do not.

Do not score test volume, coverage percentage, fixture count, snapshot count, or end-to-end breadth as quality by default. A small suite can score highly when it protects the real risks. A large suite scores poorly when it is slow, flaky, fictional, redundant, or coupled to internals.
