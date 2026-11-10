---
name: arch-linux
description: Administer Arch-family systems, including packages and services, PKGBUILD maintenance, system upgrades, and transaction or boot recovery. Select the matching task reference; use cachyos only for installed CachyOS components and linux-administration for distribution-neutral diagnostics.
license: MIT
---

# Arch Linux administration

Identify the host/container, distribution, repositories, package/configuration
owner and affected subsystem. Arch ancestry does not establish CachyOS tooling,
Omarchy, a desktop, bootloader, initramfs generator or snapshot layout.

Keep diagnosis read-only. Continue repairs already authorized within their named
scope; ask only for missing authority or a consequential unresolved decision.
Never request a privilege-elevation password in the conversation.

## Select the task, not another Arch skill

| Task | Reference |
| --- | --- |
| PKGBUILD, source verification, patches, clean builds, .SRCINFO | [Package maintenance](references/package-maintenance.md) |
| Routine upgrade readiness, failed transaction, boot recovery | [Update and recovery](references/update-recovery.md) |
| Patch regression, pinned rebuild replacement, artifact evidence | [Patches and builds](references/patches-and-builds.md) |

Read only the reference needed. Builds do not authorize workstation installation,
and an installation request does not silently authorize a full OS upgrade.
CachyOS remains an optional overlay for its repositories, drivers, kernels and
tuning; keep the main package/recovery task here.

## Configuration and package ownership

Inspect symlinks, package ownership and the configuration repository's rules.
Use bounded queries such as pacman -Qo, -Qi and -Ql for the affected target.
An unowned file can still be generated or managed elsewhere. Compare intended
source, live output and package defaults before proposing synchronization.

For systemd, distinguish system/user units and active/enabled state; inspect safe
effective settings and scoped logs. Use source-owned overrides/drop-ins instead
of editing vendor units. Generic service/network triage belongs in `linux-administration`.

Check repository priority, installed/candidate versions and provider conflicts.
Prefer official packages when they meet the need. An AUR entry is executable
build code, not an official binary; review it before invoking evaluators.
Prefer a repository's declared portable development environment over unrelated
system-wide installs when it supplies the needed tool.

Arch does not support partial upgrades. Do not refresh with pacman -Sy and then
selectively install against inconsistent databases. Stale mirrors/signature errors
need cause-based investigation, not signature bypasses or broad force overwrites.
For update discovery prefer checkupdates when installed; it avoids refreshing the
live sync database. An absent tool is not permission to install it.

## Verify the actual endpoint

Preserve the requested desktop/configuration owner. Omarchy guidance applies only
where Omarchy is identified, not to arbitrary Hyprland or terminal changes.
Keep credentials, environments and raw logs out of agent output.

Validate candidate configuration before activation. Verify the requested service,
command, package regression or boot behavior, not merely installation success.
Report changed source versus applied state and untested GUI/reboot behavior.
Broad instability can use `linux-administration`'s health-triage reference; drift ownership can
use managed-config-drift, without loading an entire skill collection.

## Primary references

- [Arch maintenance](https://wiki.archlinux.org/title/System_maintenance)
- [pacman manual](https://man.archlinux.org/man/pacman.8.en)
