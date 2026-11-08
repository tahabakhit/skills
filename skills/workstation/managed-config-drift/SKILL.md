---
name: managed-config-drift
description: Audit drift between live Linux or macOS configuration, version-controlled configuration repositories, symlink farms, and packaged defaults. Use when configuration ownership is unclear, a desktop behaves differently from its repo, symlinks may be broken, generated files may be stale, or an update may have overwritten local state. Default to reporting and do not synchronize or replace files automatically.
---

# Managed configuration drift

Build an ownership map before comparing content. Identify the live path, intended source repository, generated-file contract, packaged default, and deployment mechanism such as symlinks, copy scripts, GNU Stow, or hooks.

The optional `scripts/compare-trees.py LIVE=MANAGED [...]` helper requires Python 3.9+ and reports missing paths, type changes, symlink-target changes, and content differences without modifying either tree. It has no time, byte or file-count budget: select small, trusted, quiescent local trees, not home directories, network mounts or attacker-writable trees. It hashes regular files to EOF. Use an external timeout when needed and report interruption as incomplete, not clean.

Use `--exclude NAME` for caches, secrets, runtime state, or generated artifacts that the repository explicitly excludes. Exclusions match basenames at every depth, not path patterns. Paths and symlink targets can be private even when file contents are not printed. Keep output local and obtain redacted excerpts before it reaches an agent.

Exit 0 means no reported differences, 1 means differences, and 2 means unavailable/incomplete comparison. This is not an atomic snapshot or a permission/ACL/xattr audit. Validate root identity and symlink ownership separately.

## Platform ownership

On Linux, identify package ownership and the actual distribution/configuration
manager. On macOS, distinguish Apple-managed paths, Homebrew packages/services,
application preferences and chezmoi sources. Do not compare binary plists or
application databases as if they were stable text, and do not rewrite them merely
to make a tree comparison clean. Inspect supported preference interfaces without
bulk exports. Use the macos skill for native ownership/activation where needed.

The comparator uses Python filesystem APIs rather than Linux-only tools; it is
optional on both platforms. macOS case-insensitive/Unicode-normalizing filesystems
can collapse names that were distinct on Linux. Validate root identity and name
mapping on the target. Linux fixtures do not establish macOS runtime acceptance.
The helper does not compare modes, ownership, ACLs, xattrs or resource forks.

## Classification

- **Broken ownership:** dangling link, missing source, wrong owner, or unexpected writable target.
- **Uncommitted live drift:** live content differs from its declared managed source.
- **Expected local state:** secrets, caches, device state, or host-specific overrides documented as untracked.
- **Generated drift:** output differs because its declared generator has not run.
- **Packaged-default drift:** an upstream update changed a default that the local overlay depends on.

Read repository guidance and generator commands before judging a difference. Never copy, replace, delete, relink, refresh Omarchy configuration, or run a generator merely to make the audit clean. Establish an owner and direction for each reconciliation. Keep audit-only requests read-only. When the user already authorized reconciliation of the named paths, continue the scoped repair, preserve recoverable prior state, and verify the resulting ownership and behavior. Ask only for missing authority or an unresolved consequential direction; do not request the same authorization again.

For an identified Omarchy or NixOS installation, follow its supported configuration/declarative source rather than arbitrary Hyprland edits or replacement of store symlinks. If that expertise is absent, report the gap. Inspect previously untracked live configuration for secrets before adding it to Git.

OS transaction and boot-chain recovery are outside this skill's scope. A clean comparison does not prove recoverability: verify backup coverage and restoration separately when the task requires it.
