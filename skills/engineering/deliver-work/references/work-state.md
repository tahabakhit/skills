# Work state and resumption

Use this procedure for multiple units, delegated work or a run that may outlive its context. A one-unit serial task can keep the same facts in brief session notes. Use the repository's existing record format when it is sufficient.

## Define the unit

Record an ID, observable result, inputs, owned outputs, prerequisites and verification. A prerequisite must supply something the unit actually consumes. Similar filenames or preferred ordering are not dependencies.

A schema producer and a consumer that needs its new field are dependent. Two independent leaf parsers may be parallel. Two writers of the same generated registry are not independent even when their source folders differ.

Give each execution attempt a distinct identity. Bind the attempt to its input revision or snapshot, contract version and owned resources. A retry is a new attempt, not a rename of the old one. Include processes, ports, database schemas, temporary directories and generated outputs in resource ownership where relevant.

## Admit work and results

Before starting a unit, check that its prerequisites are accepted and that their actual outputs match the inputs it will use. Assign one writer per shared resource. A worker can propose a change, but the delivery owner decides whether its evidence satisfies the unit contract.

An arriving result must identify:

- unit and attempt
- input and output candidate
- changed paths or produced artifacts
- checks actually run and their outcomes
- open defects and resources still active

Compare those identities with the current record before accepting the result. A complete-looking answer from a replaced attempt is historical evidence only. It cannot release a dependent unit or overwrite the accepted candidate.

Inspect delivered files and proof. Do not accept an answer solely because a worker says done. If integration changes the output tree, identify which checks and reviews no longer cover it and refresh them before acceptance.

## Settle timeout and cancellation

A launcher timeout means the caller stopped observing. It does not prove the worker or its children stopped writing. Mark the attempt unresolved, inspect the owned execution, request cancellation where supported, and confirm settlement before transferring its resources.

Keep failed, blocked, cancelled and unavailable distinct. A blocked unit may leave useful artifacts without satisfying its dependents. A cancelled writer cannot be treated as absent while a child process remains active.

If the host cannot launch or inspect workers, run independent units serially. If independent review is a binding requirement, serial self-review does not satisfy it. Record that condition and complete the other permitted stages.

## Resume from observed state

Re-read the request, existing permission, current candidate and record. Inspect repository/remote state rather than reconstructing it from a stale narrative. Reconcile in-flight workers and side effects first.

Classify each remaining action as already completed, safely repeatable, pending, blocked or ambiguous. Do not replay an ambiguous mutation. An expired or changed release plan needs a current authorization assessment. A record is evidence of a decision, not a mechanism for granting new permission.

Return the accepted graph, current candidate, unresolved attempts/resources and next permitted action. Keep enough detail for another context to continue without guessing which output was accepted.
