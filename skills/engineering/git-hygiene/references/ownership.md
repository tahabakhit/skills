# Ownership and integration

## Assign writes and shared resources

Identify one writer for each checkout/index and each mutable shared output. Separate worktrees can still share a database, service port, generated directory, package cache or lock file. Allocate those resources independently when the task can run concurrently.

A work unit should identify its input candidate, owned paths, resources and attempt. A delayed result from a replaced attempt cannot become the current candidate. A timeout does not prove the original process has stopped. Inspect or settle it before handing its writable resources to another worker.

If no isolation capability exists, serialize writes. Never pretend an in-process role change created an independent reviewer or isolated worker.

## Capture the candidate being tested

Keep these states distinct:

- HEAD is the committed tree.
- The index is the prospective next commit.
- The working tree can contain additional unstaged bytes.
- Untracked files may influence tests without belonging to either committed tree.

A staged-only review examines index bytes relative to its baseline. A full working-tree run can accidentally pick up an unstaged repair. Before committing, inspect whether the tested behavior exists in the actual index and whether excluded or untracked files supplied missing runtime input.

Where selective staging makes the tested tree differ, materialize the intended tree in an owned disposable environment or otherwise establish its result. Do not mutate the user's index to simulate a review snapshot.

## Refresh the right refs

Identify remote, base branch and feature branch explicitly. Observe the intended remote ref and verify where a fetch wrote it. A fetch into a custom destination does not necessarily update a similarly named tracking ref.

Compare the observed base/feature histories with the candidate being delivered. Reconcile concurrent updates under the repository's integration policy. Do not infer freshness from commit timestamps or a clean status.

For force-with-lease operations permitted by policy, verify the exact expected remote identity. A generic lease must not be used to overwrite changes that have not been inspected. Never force-move immutable release tags.

## Integrate without hiding changes

Review the intended index diff, required checks and applicable secret scan before commit. Stage only owned content. Do not stash or reset unrelated changes to make the workspace convenient.

If rebasing, merging or applying another worker's patch changes the candidate, determine which proof needs rerunning. The same message, branch name or patch intent does not establish tree equality. Review coverage needs an explicit mapping to the integrated content.

After push or merge, query the destination and record the resulting identity. A successful local command does not prove every later provider step completed. Queue admission, merge, local synchronization and worktree removal need separate observations.

Before cleanup, verify the resource is owned, all retained work is preserved and no writer remains active. Keep failed or unresolved work available for diagnosis instead of deleting it as routine housekeeping.
