# Test-boundary judgment

The active testing workflow owns test authoring, adequacy and execution. Use available
testing-work guidance for that task; this reference only identifies architectural
boundaries worth protecting. Do not start a parallel test campaign while implementing
or reviewing another request.

Prefer project-owned invariants, normalization, permissions, persistence, transitions,
ordering, cancellation, cleanup and serialization. Name a credible wrong implementation
that the test rejects. A test can directly protect a required public export, route
registration, rendering or type contract; mere existence is not evidence of broader
behavior. Follow repository conventions and do not delete existing tests outside scope.

External-provider fakes establish only fixture handling unless their semantics are
verified against the boundary. Use captured/verified inputs for owned parsing and
controlled integration evidence when real compatibility matters. Keep credentials,
cost, destructive effects and uncontrolled nondeterminism out of ordinary runs.

Place mocks at owned boundaries; interaction assertions earn their place when the
interaction is the contract. Do not add an interface only for mocking. Prefer the
lowest stable boundary that proves the claim, without replacing a required UI or
integration check with a weaker surrogate.

Test count, coverage percentage and framework choreography are not quality scores.
A small suite rejecting consequential defects is stronger than broad self-mirroring
assertions. Scoring, when explicitly requested, uses the local scoring rubric with
evidence and an inspected scope—not an automatic review verdict.
