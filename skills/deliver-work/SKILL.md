---
name: deliver-work
description: Carry an agreed engineering outcome to its authorized endpoint, or run only its planning, implementation, PR-follow-through, or release-follow-through stage. Use for feature or issue delivery and resuming interrupted delivery. Not for discovery-only, review-only, packaging-only, or unapproved publication.
license: MIT
---

# Deliver work

Own completion of the requested outcome. Planning, testing and review inform this workflow. They do not start competing delivery loops.

## Choose the endpoint

Read the request and applicable project policy. Identify the agreed behavior, completion endpoint and existing permission for outward actions. A request to plan returns a plan. A request to implement does not itself authorize a production deployment. Do not introduce a plan-approval pause when the requested low-risk work is already authorized.

Check the available repository, runtime, test commands and delivery access. Ordinary work can run serially in one context. A tracker, worker launcher, network service or sibling skill is not required. If a missing capability blocks only the final stage, finish the permitted work and identify the blocked endpoint.

## Select a mode

- **Plan:** inspect the relevant code and constraints. Produce units with observable results, interface boundaries, verification and actual prerequisite edges. Keep a small change as one unit. Stop here when planning is the request.
- **Implement:** choose a ready unit, inspect its consumers, change the smallest coherent surface and exercise its behavior. Keep unrelated work intact. Return the candidate and proof when only implementation was requested.
- **Deliver:** carry units through implementation, required checks, review and authorized integration. After a fix, refresh the proof affected by that fix. A self-check must not be represented as independent review. If independent review is required but unavailable, retain it as an unmet condition.
- **Follow through:** reconcile an existing PR, merge or release with current remote state before acting. Read [follow-through](references/follow-through.md) before remote integration, publication, promotion or a retry.

For multiple units, delegated work or resumption, read [work state](references/work-state.md). Use its candidate and attempt identities to prevent old results from completing new work. Parallelize only independent units with separate writers and resources. Lack of worker support means serial execution, not simulated delegation.

## Finish against the original criteria

Inspect what the tests actually assert. Record failed, unavailable and unexecuted checks separately from passing checks. Do not loosen binding checks, dismiss a confirmed in-scope defect, or substitute another artifact just to reach green. Report unrelated discovered defects separately with their impact and disposition. They do not automatically change acceptance or authorize repair. Separate newly discovered requirements from the agreed acceptance conditions.

Return the delivered candidate, criterion-level evidence, review status, authorized actions completed, open defects and remaining endpoint. Include exact PR/release identities when applicable. If blocked, explain the missing evidence or permission and preserve a resumable state. Do not call a local implementation merged, a merged change published, or a publication verified without observing each result.
