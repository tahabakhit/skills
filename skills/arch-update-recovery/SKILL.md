---
name: arch-update-recovery
description: Prepare, diagnose, verify, and recover Arch-family Linux upgrades involving pacman or AUR packages, pacnew files, kernels, initramfs, Btrfs snapshots, and bootloaders. Use for system-update readiness or failed-upgrade recovery, not routine desktop customization or PKGBUILD authoring.
---

# Arch update and recovery

This skill is intentionally Arch-family specific. Establish installed state, boot chain, snapshot tooling, package helpers, repositories, kernels, graphics drivers, and managed configuration before recommending a transaction. Default to reporting. Do not upgrade, downgrade, remove packages, regenerate boot artifacts, roll back snapshots, or edit live system configuration without explicit authorization.

## Before an upgrade

Identify the actual distribution. Use the optional `cachyos` specialist when its
repository priority, hardware profiles, kernel variants, or settings affect the
transaction. Keep the upgrade workflow here instead of restarting it on handoff.

Read the distribution's current official notices and the local repository's update functions, package list, pacman configuration, snapshot hooks, bootloader configuration, and repository guidance. Confirm:

- no interrupted package transaction or stale lock with an active owner;
- adequate space in root, package cache, snapshot, EFI/boot, and temporary paths;
- current mirrors, keyring, time synchronization, and package database health;
- foreign/AUR packages and known rebuild-sensitive dependencies;
- kernel, initramfs, NVIDIA or other out-of-tree module compatibility;
- a usable pre-transaction snapshot and a boot or chroot recovery path.

Arch does not support partial upgrades. Do not refresh package databases and then selectively upgrade an unrelated subset as a repair. Treat unofficial helpers as clients of pacman, not separate package authorities.

When safety depends on a backup, verify its coverage and a restore on a disposable target. A snapshot alone may omit boot volumes or external state. Review `.pacnew`, `.pacsave`, generated configuration and packaged-default changes against their authoritative sources, optionally with `managed-config-drift`. Never overwrite local changes merely to remove drift.

Keep raw logs and configurations out of agent output. Select non-sensitive fields or have necessary excerpts redacted locally before sharing. Publication requires authority for the exact artifact.

Use the optional `arch-package-maintenance` specialist when a repair requires maintaining a PKGBUILD, rebasing a local patch, or validating the replacement for a pinned rebuild. If the required packaging expertise is absent, report the gap.

## Diagnose a failed upgrade

Capture the exact command, transaction log, pacman log window, current booted kernel, installed kernel/modules, initramfs and boot entries, failed units, filesystem and snapshot state, and package ownership of conflicting files. Classify the failure before acting:

- mirror, keyring, signature, or time;
- database lock or interrupted transaction;
- file conflict or package replacement;
- dependency/AUR rebuild;
- disk or filesystem pressure;
- kernel, initramfs, graphics module, or bootloader;
- configuration merge or service behavior.

Do not delete a lock while its owner is running, force package overwrites broadly, initialize a new keyring over an unexplained trust failure, or erase package caches needed for rollback. Prefer official package metadata and installed logs over forum recipes.

Use the optional `workstation-health-triage` specialist for broad post-upgrade instability. For a specific coredump, narrow evidence to the failing executable, build identity, crash time and relevant backtrace without exposing memory secrets. Use Omarchy's guidance only when it owns the remaining desktop problem. Otherwise use the installed desktop's documentation and, optionally, `arch-linux` for system configuration.

## Recovery and verification

Before an authorized repair, state the mutation, affected packages or boot artifacts, recovery route, and rollback. Apply one failure-boundary-sized change. For snapshot rollback, distinguish booting a snapshot from making it the persistent writable system and confirm how later snapshots and boot entries are regenerated.

Afterward verify package database consistency, the intended kernel and modules, initramfs, boot entries, failed services, mounts, networking, graphics session, and the original failing behavior. Report what was proven in the current boot and what still requires a reboot; never claim boot recovery was verified without actually booting the repaired generation.
