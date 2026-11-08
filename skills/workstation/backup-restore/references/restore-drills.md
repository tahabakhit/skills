# Restore drills and backend boundaries

## restic: separate the evidence layers

Read the installed restic version/help and the intended repository's ownership
policy before access. Even apparently observational commands may contact remote
storage, create locks/caches or incur charges. Do not bypass locks to claim a
read-only check. Reconcile concurrent jobs through the existing owner.

- Snapshot listings establish recorded history, not completeness of a source.
- A normal check validates repository structure/consistency; it does not read
  every stored data pack. --read-data reads data; --read-data-subset covers only
  the selected portion. Record which level actually completed.
- A restore proves only the selected snapshot/sample and tested properties.
  Use a fixed snapshot ID for reproducibility and verify host/path/tag selection
  rather than assuming an unqualified latest belongs to this machine.
- The --path snapshot filter chooses a snapshot, not a subset of restored files.
  Use the installed supported include/exclude or subfolder selection for the
  actual restore scope, and verify resulting paths before access.

Plan a fresh private target. The restore command can overwrite existing files
by default; a dry run is not the same as a disposable restore or application
verification. Check installed overwrite/verification options rather than copying
flags from a newer manual.

Do not run repair, unlock, forget or prune to make an integrity report clean.
An existing lock can have an active owner, and retention changes are destructive.
A backend failure or interrupted check is not evidence that all data is corrupt.

## Time Machine: distinguish file recovery from machine migration

Confirm the Mac, backup destination, date and affected files with supported
Time Machine interfaces. Do not infer that a connected disk contains a usable
backup or that a local APFS snapshot survives loss of that disk.

Apple distinguishes recovering specific files from using Migration Assistant
to transfer accounts/apps/files. These are not equivalent acceptance tests.
A machine migration can affect accounts, active applications and existing data;
do not launch it as a quick diagnostic experiment.

Use the installed macOS documentation and an explicitly agreed target for a
file-level drill. If a supported isolated restore path cannot be established,
report the gap rather than improvising a destructive command. Do not enable
Time Machine, adopt a disk, erase media, or change exclusions incidentally.

## Application and metadata checks

A copied database file may not be transaction-consistent. Use the application's
supported backup/export and recovery procedure. Restore into disposable storage,
isolate network/side effects, and use a matching application version for checks.
Never start an unknown restored daemon against live services.

Byte equality does not establish ownership, ACLs, extended attributes, symlink
behavior or executable permissions. Select checks relevant to the workload and
report unsupported metadata separately. A small sample does not prove a full
restore or bootability; record the residual risk.

## Primary references

- [restic repository checks](https://restic.readthedocs.io/en/stable/045_working_with_repos.html)
- [restic restoring](https://restic.readthedocs.io/en/stable/050_restore.html)
- [Apple restoring a Mac](https://support.apple.com/en-us/102551)
