---
name: ci-maintenance
description: Design, repair, audit, or harden CI workflows and developer setup contracts. Use for required-check coverage, event trust, tested-revision mismatches, hidden command failures, or environment drift. Not for PR monitoring, changing merge policy without permission, or judging application acceptance from workflow syntax alone.
license: MIT
---

# Maintain CI evidence

Make each required result identify what ran, on which candidate, under which trust and environment.

## Map the current contract

Read the repository's workflows, required-check policy, reusable workflows and relevant setup scripts. Identify triggering events, path filters, branch/queue conditions, tested revisions, check names, token permissions, secrets and outward effects. Trace a required check from event to final status.

Check access to run logs, remote configuration, runner tools and isolated validation. A local parser can establish syntax, not provider event behavior. Without policy or run access, report the unverified part instead of claiming full coverage.

Read [trust and coverage](references/trust-and-coverage.md) before workflow changes. Read [command and environment evidence](references/command-evidence.md) when changing wrappers, setup, caching or execution topology.

## Choose the work

- **Coverage or correctness:** exercise changed/unchanged paths, absent optional jobs, skipped jobs, failures and merge-queue events as applicable. The final gate must reject failure and missing required proof without waiting forever for a check that cannot be emitted.
- **Security:** trace attacker-controlled input through checkout, local actions, dependency install, scripts and agent instructions into credentials or persistent runner access. Narrow permissions and trusted execution boundaries. An event name alone is not a security verdict.
- **Reliability or speed:** inspect measured run/job/step costs and the critical path. Change one bottleneck, then compare equivalent workloads. A cache hit or more workers does not itself prove faster or correct execution.
- **Setup:** verify the same declared dependencies and commands in a clean supported environment. Account for services, ports, writable caches, process ownership and cleanup. Do not use undocumented warm-machine state as proof.

Preserve original command failure through formatters, log collectors and reports. Treat skipped, cancelled, unavailable and timed-out required evidence explicitly. Do not remove a check, reduce its scope or broaden privileges to get green without the relevant policy change being authorized.

For portable tools, devcontainers or environment schemas, read
[development environments](references/development-environments.md). For repeatable
bootstrap, precedence, concurrent services, secret contracts or browser capacity,
read [setup contracts](references/setup-contracts.md). Preserve working project
choices rather than introducing mise, Nix, a new schema filename or a supervisor
just because an example uses it.

## Validate and hand back

Use syntax/policy tooling plus controlled branch or runner tests suited to the change. Do not dispatch privileged production jobs merely to test a workflow. For unavailable event behavior, state the remaining validation step.

Return the event-to-revision/check mapping, trust changes, exercised cases, before/after results and limits. Separate a running workflow from a passing check and a passing check from application acceptance. Delivery and PR waiting remain with their existing owner.
