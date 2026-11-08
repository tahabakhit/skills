---
name: fedora
description: Administer Fedora Linux packages, services, desktops, SELinux, RPM builds, release upgrades and recovery. Identify mutable DNF, rpm-ostree or bootc deployments before choosing a task reference. Enterprise RPM derivatives require their own vendor support and upgrade procedures.
license: MIT
compatibility: Fedora Linux and installed native tools; image-based variants use their deployment owner, not mutable-host DNF commands.
---

# Fedora administration

Identify the affected host/container, Fedora release/edition, deployment model,
installed tooling and exact failure. Diagnosis stays read-only. Continue authorized
repairs within their established scope; ask only for missing consequential
decisions or authority.

## Select the deployment and task

Distinguish mutable Fedora from rpm-ostree Atomic Desktops, bootc deployments and
containers. A dnf executable inside a toolbox does not identify the host's package
owner. Stable, Branched and Rawhide differ; check current release notes/lifecycle
rather than embedding a fixed release table.

| Task | Reference |
| --- | --- |
| Package/repository state, signatures, third-party sources | [Packages and repos](references/packages-and-repos.md) |
| RPM spec, patches, SRPM and clean builds | [Package maintenance](references/package-maintenance.md) |
| Release upgrade, failed/offline transaction, recovery checks | [Update and recovery](references/update-recovery.md) |
| rpm-ostree or bootc host/deployment boundaries | [Image-based systems](references/image-based-systems.md) |
| Units, timers and drop-ins | [systemd and journal](references/systemd-and-journal.md) |
| Kernel, EFI, dracut, GRUB and Secure Boot | [Boot recovery](references/boot-kernel-and-recovery.md) |
| SELinux labels/policy and firewalld | [Security](references/security-and-updates.md) |
| Audio/Bluetooth | [Desktop](references/desktop-audio-and-bluetooth.md) |
| Display manager, power, suspend | [Session](references/session-display-and-mobile.md) |
| Drivers, multilib, games | [Graphics](references/graphics-and-gaming.md) |
| Portals, OBS, screen sharing | [Capture](references/capture-and-sharing.md) |
| Storage and restore boundaries | [Storage](references/storage-and-rollback.md) |
| Remote gaming/input | [Remote input](references/remote-gaming-input-and-tooling.md) |
| Other RPM-family host identified | [Vendor boundaries](references/derivatives-and-vendor-quirks.md) |

Read only the relevant reference. Generic Linux diagnostics and broad health
triage are optional in linux; packaging and recovery stay task references here,
just as they do in arch-linux.

## Evidence, ownership and security

Read [diagnostic privacy](references/diagnostic-privacy.md) before collecting
logs/configuration. Examples are menus, not scripts to run wholesale. Select safe
properties or locally redacted excerpts before they enter a hosted agent. Never
dump environments, repository URLs/credentials, subscription identity or raw logs.

Identify DNF5 versus legacy DNF, enabled source provenance and relevant versions.
Do not enable COPR, RPM Fusion, EPEL, import signing keys or reset module streams
incidentally. For check-update, 100 means updates available; other nonzero failures
must not be hidden. Modules may be absent on current Fedora; check capability.

Use SELinux denials to distinguish labels, booleans, ports and policy. Do not
disable SELinux/firewalld to hide a failure. Prefer supported persistent labels;
inspect firewalld runtime and permanent state separately before changing exposure.
Application, package and configuration-manager ownership still takes precedence.

## Change and verify

Connect a repair to evidence. Preserve the authoritative source, transaction
plan, recoverable baseline and remote-access route. Do not erase known-working
kernels, rebuild boot artifacts or perform an upgrade merely for diagnosis.
Backups/snapshots may omit boot volumes and external/application state.

Validate before activation; check the original function, dependencies and safe
logs afterward. For boot changes confirm kernel/module/initramfs/entry agreement.
Record reboot, GUI, hardware and image-deployment acceptance as unverified until
actually exercised. No automatic log publication or durable audit artifact.

Report cause/confidence, changed targets, recovery evidence and remaining gaps.
