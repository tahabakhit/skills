# Trust and check coverage

Read before changing triggers, permissions, checkout refs, artifact hand-offs between jobs, or the set of required checks.

## Trace untrusted input to privilege

For each event, list who controls its inputs (PR author, issue commenter, fork branch name) and what later interprets them: shell steps, local actions in the checked-out tree, dependency lifecycle scripts, build scripts, reusable workflows, and prompts given to AI agents. Then list what the job can reach: token scopes, secrets, deploy credentials, caches shared with trusted jobs, and long-lived self-hosted runners.

Patterns that cross the boundary (GitHub Actions terms; the shape applies elsewhere):

- `pull_request_target` or `workflow_run` checking out and running the PR head. Those events run with base-repo token and secrets.
- A privileged job using a local action (`uses: ./...`) from a checkout of untrusted code.
- `${{ github.event.pull_request.title }}`, `head_ref`, comment bodies and similar interpolated directly into `run:`. Pass them through `env:` and quote the variable instead.
- An action input that the action itself evaluates as a command.
- A privileged job that downloads an artifact from an untrusted job and executes it or trusts paths inside it. Treat such artifacts as data, validate their shape, and extract them somewhere they can't overwrite scripts.
- A self-hosted runner shared between fork PRs and trusted jobs; state persists between jobs unless the runner is ephemeral.

The event name alone is not a verdict; follow what the job actually runs.

Set `permissions:` per job, default to read-only, and grant write scopes only to the job that needs them.

## Know which revision a result describes

Feature head, base, synthetic merge commit and merge-queue candidate are different trees. Record which one each job builds and which SHA the check is attached to. A required gate should test what will actually land, which in a merge queue is the queue candidate (for GitHub merge queues, the workflow must also trigger on `merge_group`).

Cache and artifact keys must include the inputs that matter (lockfile hash, toolchain, OS/arch). A key that is too broad can restore another revision's build outputs.

## Model the final gate

Before editing conditions, write the expected outcome for each required producer:

| Producer state | Gate treatment |
| --- | --- |
| success | eligible to pass |
| failure | fail |
| cancelled or timed out | fail |
| skipped although its work was required | fail |
| no job or check created | fail, and explain why |
| skipped under an agreed "not applicable" rule | pass, only for that declared case |

The gate must run when producers fail (`if: always()` on GitHub) so it can report failure, and must not treat an empty `needs` set or missing result as success. Don't give a required check name to a job or workflow that path filters can prevent from being created.

## Exercise it

Test changed and unchanged paths, a deliberate failure, a skip, a fork PR and a merge-queue run as relevant. Pin reusable workflow refs and test at that exact ref. Use synthetic secrets and disposable environments for trust tests. If you can't trigger an event (for example, no fork available), leave that case marked unverified.
