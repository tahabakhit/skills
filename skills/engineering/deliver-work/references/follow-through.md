# PR and release follow-through

Use the project's existing provider and release policy. This procedure coordinates the endpoint. It does not replace packaging validation or grant permission to publish.

## PR or merge

1. Read the actual target branch, current feature head, remote base, review state, required checks and queue state. A previously green SHA or clean local status cannot substitute for this observation.
2. Relate each result to its tested revision. Providers may test a feature head, synthetic merge or queue candidate. Verify the policy's expected identity instead of comparing every check to the same kind of SHA.
3. Address concrete feedback within scope. Test and review coverage must include the final change. A CI repair can affect behavior even if labeled infrastructure. Do not carry a whole-candidate pass across unreviewed content without qualifying its coverage.
4. Use only the authorized integration path. Respect required checks and merge policy. Do not disable a check or bypass a queue to make progress.
5. Read the provider's resulting state. Queued is not merged. After merge, identify the resulting commit and any policy-required post-merge checks. Synchronizing a local branch or removing a worktree is a separate, ownership-sensitive step.

When access is missing, hand back an exact candidate and merge-ready evidence only if those facts are established. Do not claim remote completion from local readiness.

## Prepare a release attempt

Record the approved source, artifact set, target registries/environments, version/tag identities, applicable gates and intended outward actions. Keep packaging evidence bound to the exact artifact digests. If a metadata cut or provider merge creates another source identity, prove the intended product tree and required evidence still correspond.

Determine how production effects happen. Pushing a branch or tag can trigger deployment. A request for a preview does not permit pushing a production-triggering ref. Stage only owned content and keep unrelated changes out of the release source.

Do not assume a provider, branch naming convention or package ecosystem. If the project lacks a usable release contract, identify the decisions needed before outward mutation. Continue local artifact work that is already authorized.

## Publish, promote and verify

Before mutation, inspect the destination for an existing version, tag, artifact or candidate. Use the provider's idempotency and immutable identities where available. After mutation, read back the result and compare source, digest and destination.

For a staged deployment, identify incumbent and candidate versions, environment, traffic and rollback mechanism before exposure. Verify the intended candidate with the required checks. Keep observation time separate from report-generation time. Reformatting old results cannot prove a new build or fresh observation.

A production health check must stay within its allowed read/write scope. Local success does not prove the deployed target, and a returned URL is not an application check.

## Reconcile failure before retry

A network timeout can occur after publication succeeded. Query remote state before repeating the call. Classify every artifact or environment separately.

Example: version 1.2.3 from source X has platform A published and B missing. Continue only B from X if permitted and verifiable. Do not upload A again, move the existing tag, or silently rebuild from newer source Y. If the source or artifact set changes, assess the revised plan against the original permission before proceeding.

For a known post-exposure failure, follow the authorized recovery procedure and verify its effect. If live state or recovery authority is ambiguous, stop further mutation and report the observed state for operator recovery.

Return remote identities, artifact digests, gates, traffic or registry observations, failures and the exact remaining action. A partial release remains partial.
