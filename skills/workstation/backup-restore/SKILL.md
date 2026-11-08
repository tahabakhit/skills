---
name: backup-restore
description: Assess backup coverage and plan or verify scoped restores on Linux and macOS, including restic and Time Machine boundaries. Use for recoverability, integrity checks, and disposable restore drills; not automatic backup setup, retention/pruning, snapshot rollback, or boot repair.
license: MIT
compatibility: Uses the machine's existing backup backend and authorized recovery access. Does not install a backend, retrieve credentials, or establish support for unreviewed storage systems.
---

# Backup and restore verification

Establish the requested endpoint: coverage assessment, repository integrity,
disposable restore test, or recovery into a named live destination. A review
does not authorize a restore, repository mutation or credential retrieval.

## Map coverage before trusting success

Identify the protected source, backend, repository/media, schedule, latest
successful run and the precise host/path/tag or snapshot selection. Keep private
repository URLs, filenames and credentials out of agent output.

Check exclusions, separate boot volumes, application databases, external drives,
symlinks, permissions/ACLs/xattrs and data that exists only on remote services.
Git history, a local filesystem snapshot and a backup repository have different
failure domains. A snapshot on the same disk is not independent protection.

Determine whether encryption/recovery credentials remain accessible if the
original machine and password-manager session are lost. Ask for evidence of that
recovery route, never for a password, key or vault export in the conversation.
Do not unlock or fetch secrets merely to complete an assessment.

## Select the backend procedure

Read [restore drills and backend boundaries](references/restore-drills.md) before
checks or restores. Use installed-version help and primary backend documentation.
restic and Time Machine are different recovery contracts; neither is a universal
procedure for image-based systems, databases or boot recovery.

A source-owned backup configuration does not make it appropriate for every host.
Preserve hostname, mount identity and device UUID guards. Do not copy another
machine's paths, credentials, timer or retention policy into this one.

## Test recovery safely

1. State the selected snapshot, sample, destination, resource/network budget,
   credential boundary and expected validation. Authorization must cover the
   writes and backend access; an isolated target still changes state.
2. Use a fresh private destination outside live data, synchronization roots,
   watched import folders and the backup source. Check capacity and symlink/mount
   identity. Do not execute restored programs or startup files.
3. Restore only the agreed sample. Verify bytes against a trusted baseline where
   available, metadata required by the workload, and an application-level check
   in a disposable environment when appropriate.
4. Keep the report bounded and redacted. Record failed reads, unavailable
   credentials and partial checks as gaps rather than successful recoverability.
5. Remove only task-owned temporary plaintext when cleanup is authorized; never
   publish, commit or upload recovered files.

## Report the strength of the evidence

Distinguish freshness, coverage, structural consistency, stored-data integrity,
sample restore and full recovery. A green timer or repository check does not
prove all user data is included or that the machine can be rebuilt.

Do not run forget/prune, repair, unlock, format, snapshot rollback, restore over
live files, or change scheduling/retention unless that exact action is authorized.
Boot-chain and database recovery require their own supported procedures.

Return checked snapshot/coverage, recovery access evidence, restore results,
side effects/costs, limitations and the next unproven recovery step.
