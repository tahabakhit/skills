---
name: git-hygiene
description: Prepare commits, commit messages, issue drafts and PR descriptions, protect concurrent Git work, and integrate the exact candidate against current refs. Use for standalone repository submission or mixed index/worktree and branch handoffs. Not implementation, a code-review workflow, a task scheduler or unasked publication.
license: MIT
---

# Keep Git writes attributable

Separate the change being delivered from unrelated user and agent work.

## Inspect before writing

Identify the repository, worktree, branch or detached HEAD, index, unstaged changes and untracked paths. Establish which edits belong to this task. Read applicable project policy and existing integration requirements. Do not infer ownership from a filename or from being the most recent process in the checkout.

Check the available Git and remote access. Local inspection can continue offline. Remote freshness cannot be claimed without observing the intended remote refs. A clean worktree proves neither a current base nor a reviewed candidate.

For concurrent writers, read [ownership and integration](references/ownership.md). Isolate branches/worktrees where available, but also allocate shared ports, databases, generated paths and temporary artifacts. A worktree isolates Git state, not every process resource.

## Capture and commit the intended content

- State whether evidence concerns HEAD, the index or the working tree. If tests ran on unstaged bytes, do not claim they tested a different staged candidate.
- Review the intended diff and stage owned paths or hunks deliberately. Broad staging can include unrelated secrets, generated artifacts or unfinished edits.
- Inspect the resulting index before committing. Include required checks and secret scanning when project policy calls for them. A failed required check remains a failure.
- Avoid stash, reset, checkout-overwrite, rebase or cleanup operations that could absorb or discard someone else's work. Preserve unexpected changes and resolve ownership before continuing.

Use [semantic conventions](references/semantic-conventions.md) only when they
match repository policy. They do not impose a new commit/version scheme.

## Prepare submission text or an authorized submission

For commit wording, issue drafts and PR descriptions, read [submission judgment](references/submission/guide.md) and its applicable branch. Establish the intended diff or supplied bug evidence; an issue draft need not have a code change. Follow repository templates and preserve unresolved facts. Drafting stops at text unless publication is authorized. For a text-only request, skip staging and integration. Evaluate code-review feedback with an available code-review owner; do not implement repairs during submission-only work.

## Integrate the verified candidate

Before an authorized push, PR update or merge, confirm the destination and fetch the intended ref into a known local destination. Record the observed base and feature identities. Compare histories and reconcile concurrent updates. Fetching one ref does not prove another tracking name changed.

Refresh checks and review coverage affected by a rebase, merge or repair. Confirm that required remote checks belong to the exact candidate or expected integration/queue revision. If the remote moved, re-evaluate rather than forcing over it.

Read back the remote result after mutation. Distinguish pushed, PR opened, queued, merged, locally synchronized and cleaned up. Each is a separate outcome. Delete only owned disposable branches/worktrees whose retained changes and integration have been verified.

Use [freshness checkpoints](references/freshness.md) for exact-ref and retained-checkout
verification. For already-authorized cleanup, use [branch cleanup](references/branch-cleanup.md)
and [temporary evidence cleanup](references/evidence-cleanup.md). These references
supply deletion safeguards, not cleanup authority.

Return identities, owned paths, evidence-to-candidate mapping, integration result and remaining cleanup. Do not start another delivery loop merely because this stage completed.
