# Artifact validation

## Build a target matrix

For each promised variant, record package format, OS, architecture, runtime/ABI floor, required features, builder and available target runner. Keep compile, package inspection, install and execution results separate.

A Linux architecture label alone does not establish compatibility with a particular libc or distribution baseline. A script package still has interpreter and external command dependencies. An application embedding a runtime has a different dependency contract from one expecting a system runtime.

Do not infer support from the builder's capabilities. If the target cannot be exercised, state the exact claim left unverified.

## Inspect immutable bytes

Record source identity, artifact digest and build inputs. Inspect the generated archive or package manifest, not only the source packaging configuration.

Check executable entrypoints, templates/data, runtime libraries, permission bits, symlink targets and required notices. Review installation hooks and path traversal/unsafe extraction risks before unpacking or executing unfamiliar artifacts. A disposable directory is not a sandbox for arbitrary install scripts.

Look for accidental source-only assumptions: a process resolving templates relative to the checkout, development dependencies providing runtime binaries, or a launcher referring to the build machine's absolute path.

Inspect metadata version order under the target ecosystem. A version that sorts unexpectedly can break upgrade even when its text looks newer. Keep package identity and application-reported identity consistent with the intended contract.

## Exercise outside the source tree

Use a clean authorized environment matching the promised target. Install or extract the exact recorded artifact. Run its public entrypoint from a directory that cannot supply missing source files.

Check one representative promised behavior and relevant error handling. Inspect runtime linkage or interpreter requirements where applicable. Capture the installed file and dependency footprint if cost reduction or portability is part of the request.

If credentials or external services are needed, use authorized synthetic fixtures or report the missing proof. Do not claim a disconnected startup proves a real integration.

## Upgrade and remove

When in scope, seed state from the supported prior version, install the candidate, and verify data, configuration and service behavior. Cover changes to schema, file ownership and service identity that packaging hooks perform.

Run the permitted removal operation and compare its remainder with the contract. User data and manually managed configuration may intentionally remain. Distinguish expected preservation from leaked generated files or active processes.

Test recovery where claimed. Downgrading package files does not necessarily reverse a data format migration. State whether the old version can read post-upgrade data and what restore or forward repair would be needed.

## Keep evidence attached

For every result, identify artifact digest, target, commands and actual observed status. If a package is rebuilt or repacked after a finding, test the new digest. Do not attach earlier artifact results to later bytes because their version label is unchanged.

Return the matrix and remaining gaps. Publication and production rollout are separate endpoint decisions. A locally installable artifact is not proof that the remote registry or deployed service contains it.
