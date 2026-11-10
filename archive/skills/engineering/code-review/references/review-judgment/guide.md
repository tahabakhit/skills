# Evidence judgment

Use within the candidate boundary and reporting workflow in the owning code-review
entrypoint. This reference supplies judgment, not another scope, review or delegation
procedure. The retained origin record describes the imported input, not current bytes.

## Independent expectations

Assess intent/correctness and implementation quality separately. Correct output does
not excuse unowned lifecycle or hidden state; attractive structure does not excuse a
missing requirement. Use available code-quality judgment for affected ownership,
contracts and lifecycle without launching a second review workflow.

Prefer explicit acceptance decisions, public/persisted compatibility contracts and
observed supported behavior over names or comments that merely repeat the patch.
Implementation, tests, types and docs produced from one premise can share the same
mistake. Agreement among them is not an independent oracle. State where a requirement
comes from and which compatibility assumptions are still unproved.

## Choose a decisive counterexample

- Regression: follow the exact old failure path; a catch, retry or fallback may hide it.
- Boundaries: probe relevant empty/singleton/limit/missing/duplicate/ordering transitions.
- Refactor or optimization: compare observable supported behavior under the preserved
  contract, rather than treating the new implementation as its own expectation.
- Lifecycle: consider partial startup, repetition, cancellation, retry exhaustion,
  shutdown and ownership transfer—not just a successful call.
- Compatibility: include old readers/writers and real supported stored or serialized
  data when the claim crosses versions.
- External integration: an invented provider-shaped fake proves project handling of
  that fixture, not compatibility with the real service. Use controlled boundary
  evidence when compatibility itself matters.

## Match proof to the claim

Registration, rendering, symbol existence and type validity **can be sufficient
for their exact contracts**: a missing public export, unregistered route, visual
rendering defect or rejected type is a meaningful failure. They do not, by themselves,
prove unrelated runtime behavior, authorization, interaction or external compatibility.
A structural assertion must reject a credible contract violation, not mirror a chosen
implementation. Mock choreography is meaningful only when that interaction is itself
the owned contract.

Check that assertions can fail, reach the relevant boundary and use supported data.
Filters, catches, broad ignores, unsafe casts, weakened assertions or deleted useful
tests must not turn a real failure into green. A type/schema pass does not establish
an untested runtime property. A green suite proves only its exercised claims.

Use the cheapest adequate falsifier before adding fuzzing, mutation frameworks or
large generated corpora. The owning entrypoint supplies finding format, reconciliation
and stopping rules; do not repeat them here.
