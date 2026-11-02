---
name: arch-linux
description: Configure and troubleshoot installed Arch Linux systems, including package selection, configuration ownership, systemd services, and desktop integration. Use for Arch system administration outside package authoring or upgrade recovery; use CachyOS or Omarchy guidance only for their installed components.
---

# Arch Linux system work

Identify the target before choosing commands: read `/etc/os-release`, distinguish
the host from a container/chroot, and inspect the named service or configuration.
Arch ancestry does not establish CachyOS repositories, Omarchy tooling, a particular
desktop, bootloader, initramfs generator, or snapshot setup.

## Resolve the owner

Read the configuration repository's instructions when one owns the live paths.
Inspect symlinks and package ownership before editing. Use the smallest relevant
package queries, such as `pacman -Qo /path/to/file`, `pacman -Qi PACKAGE`, and
`pacman -Ql PACKAGE`. An unowned file can still be generated or managed elsewhere.
When ownership is unclear, map the live path to its managed source, deployment mechanism and packaged default before proposing reconciliation. The optional `managed-config-drift` skill provides a detailed audit.

For a systemd service, inspect its unit, drop-ins, effective settings, and bounded
journal window. Distinguish system and user units, enabled-at-boot state and current
activity. Put persistent overrides in the owning source or supported drop-in path
instead of editing vendor units under `/usr/lib`. Check the installed manual and
unit's reload behavior before applying a change.

## Select packages without changing distribution policy

Check configured repository priority, installed versions, and provider conflicts.
Prefer an existing packaged tool when it meets the task. An AUR entry is a build
recipe requiring review, not an official binary package. Use
the optional `arch-package-maintenance` specialist for PKGBUILD, patch, checksum,
clean-build, and `.SRCINFO` work. If that expertise is unavailable, report the gap
rather than executing an unreviewed build recipe.

For repository development tools, prefer its declared portable environment over
system-wide installs when it provides the required binaries. Verify pinned tools
and the documented setup in a clean environment rather than relying on warm-host state. Kernel drivers and system services still need their native
package/configuration owner.

Use query operations for inspection. For authorized installation, inspect the
transaction before accepting unexpected replacements or removals. Do not refresh
databases with `pacman -Sy` and selectively install against a partially upgraded
system. Stale mirror 404s require checking database/mirror consistency, not ignoring
signatures or forcing file overwrites. If a full upgrade is needed, use
the optional `arch-update-recovery` specialist within the user's authority.
If recovery expertise is missing, stop at the transaction assessment.
Do not silently turn a tool install into a system upgrade.

Read current [Arch maintenance guidance](https://wiki.archlinux.org/title/System_maintenance)
for upgrade decisions and the [pacman manual](https://man.archlinux.org/man/pacman.8.en)
for operation semantics. Prefer `checkupdates` from pacman-contrib when available
for update discovery without changing the live sync database.

## Apply and verify the requested change

Preserve the user's desktop and configuration manager. For CachyOS repositories,
drivers, kernels, or tuning, use the optional `cachyos` specialist when available.
Consult Omarchy's own guidance only for an identified Omarchy installation or its
explicitly targeted configuration. Ordinary Hyprland or terminal configuration
does not establish Omarchy ownership.

Continue scoped edits and installation already authorized. Diagnosis alone stays
read-only. Describe an impactful restart, boot change, or replacement before doing
it, and ask only for missing authority or an unresolved consequential choice.
Use native privilege elevation; never request a password in the conversation.

Validate configuration before activation, then verify the actual service, command,
or desktop behavior. A successful package install or `daemon-reload` alone does not
prove the requested behavior. Report changed source, applied state, focused checks,
and any reboot or graphical verification still pending. Broad unexplained failures
can use the optional `workstation-health-triage` specialist. Do not collect broad
logs for a narrow symptom. Keep credentials, service environments and private
configuration out of agent output. Review necessary diagnostic excerpts locally
before sharing them.
