# Deepening

How to deepen a cluster of shallow modules safely, given its dependencies. Assumes the vocabulary in [SKILL.md](SKILL.md) — **module**, **interface**, **seam**, **adapter**.

## Dependency categories

When assessing a candidate for deepening, classify its dependencies. The category determines how the deepened module is tested across its seam.

### 1. In-process

Pure computation, in-memory state, no I/O. Consider combining modules only after checking ownership, invariants, callers, and whether the existing boundary serves a distinct contract. Test through the retained interface. Pure computation alone does not justify a merge.

### 2. Local-substitutable

Dependencies with local test stand-ins, such as PGLite for Postgres or an in-memory filesystem. Check transaction, concurrency, failure, and runtime differences before relying on the stand-in. Its availability does not prove production equivalence or justify removing a useful boundary. Test the retained contract with appropriate integration evidence.

### 3. Remote but owned (Ports & Adapters)

Your own services across a network boundary (microservices, internal APIs). Define a **port** (interface) at the seam. The deep module owns the logic; the transport is injected as an **adapter**. Tests use an in-memory adapter. Production uses an HTTP/gRPC/queue adapter.

Recommendation shape: *"Define a port at the seam, implement an HTTP adapter for production and an in-memory adapter for testing, so the logic sits in one deep module even though it's deployed across a network."*

### 4. True external (Mock)

Third-party services (Stripe, Twilio, etc.) you don't control. The deepened module takes the external dependency as an injected port; tests provide a mock adapter.

## Seam discipline

- Justify a seam by the policy or boundary it isolates. A single adapter can support testing, platform separation, security, or ownership. Remove indirection only after checking those responsibilities and its callers; adapter count alone does not establish waste.
- **Internal seams vs external seams.** A deep module can have internal seams (private to its implementation, used by its own tests) as well as the external seam at its interface. Don't expose internal seams through the interface just because tests use them.

## Testing strategy: replace, don't layer

- Before retiring tests for a removed module, map their behavior and failure cases to the retained coverage. Delete obsolete structural assertions only after the replacement checks preserve the useful proof.
- Write new tests at the deepened module's interface. The **interface is the test surface**.
- Tests assert on observable outcomes through the interface, not internal state.
- Prefer tests that survive internal refactors by describing behavior. A changed test alone does not prove it was testing past the interface. Preserve useful contract and failure coverage before removing structural assertions.
