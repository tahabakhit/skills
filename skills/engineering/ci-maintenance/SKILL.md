---
name: ci-maintenance
description: Fix, harden or speed up CI workflows and developer setup. Use for a failing or flaky CI job, a required check that is stuck, skipped or always green, workflow permissions and fork trust, slow pipelines, caching, or devcontainer/mise/env-file setup drift. Not for waiting on a PR's checks.
---

# CI maintenance

A green check is only worth something if it ran the right commands, on the right revision, and fails when they fail. Most CI bugs are one of those three going wrong silently.

## Map before changing

Read the workflows, any reusable workflows or composite actions they call, the scripts they run, and the branch protection or ruleset that names required checks. For the check you care about, trace:

- which events trigger it, and any path, branch or merge-queue filters;
- which revision each job checks out (PR head, synthetic merge, base, queue candidate);
- the exact check name the provider reports, and whether it matches the required name;
- token permissions, secrets and anything it publishes or deploys.

A YAML linter (for example `actionlint` on GitHub Actions) proves syntax, not event behaviour. If you can't see run logs or the required-check settings, say which part is unverified.

## Common failures and what to check

**Required check never arrives.** On GitHub, a workflow filtered out by `paths`/`branches` creates no check, so a required check waits forever. Run the workflow unconditionally and skip work inside it, or use a final gate job.

**Required check passes without doing anything.** On GitHub a job skipped by `if:` reports as skipped, and skipped satisfies a required check. Gate jobs need `if: always()` and must explicitly fail unless every required `needs.<job>.result` is `success` (or a deliberately allowed skip). Check that an empty or missing result can't count as success.

**Failure swallowed by a pipe.** `cmd | tee log` or `cmd | formatter` returns the last stage's status. On GitHub Actions, steps with no `shell:` run `bash -e {0}` (no pipefail); `shell: bash` adds `-o pipefail`. In Make, each recipe line is a separate shell. Read [command evidence](references/command-evidence.md) when changing wrappers, reporters or test runners.

**Wrong revision tested.** A job that checks out a branch name instead of the event's SHA, or a cache/artifact keyed too broadly, can report on bytes it never built. A cache hit is not evidence that a build ran.

**Untrusted code reaches secrets.** `pull_request_target` and `workflow_run` run with base-repo privileges; checking out and building the PR head there runs fork code with those privileges. `${{ github.event.* }}` fields (titles, branch names, bodies) interpolated into `run:` are shell injection. Read [trust and coverage](references/trust-and-coverage.md) before touching triggers, permissions, checkout refs or artifact hand-offs.

**Slow pipeline.** Look at measured job and step times and the critical path first. Change one bottleneck at a time and compare comparable runs. More shards add setup cost and can overload shared services; a faster lane that drops required tests is a coverage cut, not a speed-up.

**Works locally, fails in CI (or the reverse).** Compare runtime, package manager and lockfile mode, service versions and globally installed tools. Reproduce from a clean checkout without warm caches. Read [development environments](references/development-environments.md) for mise, devenv/Nix, devcontainers, env files, bootstrap scripts and concurrent local services.

## Rules

- Don't delete a check, narrow its scope, mark it `continue-on-error`, or widen permissions to get green unless the user agreed to that policy change. Flag such changes separately from the fix.
- Set `permissions:` per job to the minimum. Pin third-party actions the way the repository already does (often a full commit SHA) and make sure an updater still covers them.
- Treat cancelled, timed-out and skipped-when-required as non-passing.
- Keep the project's existing tools. Don't introduce mise, Nix, a devcontainer or a new task runner because an example uses one.
- Don't test a workflow by running privileged production jobs, and never probe trust boundaries with real secrets.

## Validate

Exercise the cases the change affects: a change that should trigger the job, one that shouldn't, a deliberately failing step, and a fork PR or merge-queue run where relevant. Use a throwaway branch where you can.

When handing back, give the event-to-revision-to-check mapping, which cases you actually exercised, before/after results, and what remains unverified (for example fork behaviour you couldn't trigger). A running workflow is not a passing check, and a passing check is not proof the application works.
