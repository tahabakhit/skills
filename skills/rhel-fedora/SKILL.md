---
name: rhel-fedora
description: Diagnose and administer mutable Fedora, RHEL, Rocky, AlmaLinux, Oracle Linux, CentOS Stream and Amazon Linux hosts using native RPM tooling, SELinux evidence and supported recovery paths. Not for treating rpm-ostree, bootc or image-based systems as mutable DNF hosts.
license: MIT
compatibility: Requires the identified RPM-family host and its installed native tools. Optional tools are not installed merely to satisfy diagnostics.
---

# Fedora and RHEL-family administration

Identify the affected host and failing subsystem before choosing commands. A diagnosis request stays read-only. Continue an authorized repair when its target, consequences and recovery path are understood. Ask only for missing authority or a consequential unresolved choice, not repeated approval of an already authorized operation.

## Identify the deployment and support lane

Read `/etc/os-release`, the running kernel and relevant installed package versions. Distinguish the host from a container or chroot. Detect rpm-ostree, bootc, CoreOS and vendor image variants before selecting any package or boot procedure. These need their supported deployment/rebuild path, not this skill's mutable-host DNF sequence. If image expertise is unavailable, report the gap.

For mutable hosts, distinguish Fedora stable/Branched/Rawhide, CentOS Stream, RHEL and each downstream vendor. Verify current lifecycle, advisories and tool help from primary sources instead of repeating a fixed release table. Fedora's package timing and COPR guidance do not establish support on enterprise hosts. CentOS Stream is not identical to released RHEL. Oracle UEK and RHCK differ. Amazon Linux has its own release and cloud-image contracts.

Identify DNF 5 versus legacy DNF/YUM, enabled repositories, package provenance, module streams where supported, entitlement requirements and kernel/driver stack. Do not mix clone repositories, reset streams, enable COPR/EPEL or import signing keys as incidental diagnostics.

## Collect narrow, private evidence

Read [diagnostic privacy](references/diagnostic-privacy.md) before collecting logs or configuration. It applies to every reference's command examples, which are menus rather than scripts to execute wholesale. Never send raw service environments, unit contents, repository URLs/configuration, subscription identity or unrestricted logs into an agent transcript. A hosted tool call already discloses its output. Use safe selected properties, approved local redaction or a user-provided redacted excerpt. If unavailable, report the evidence gap.

Start with the exact failing operation, error, time and recent change. Query the affected package or service, not the entire workstation. Missing tools, denied access and unsupported subcommands are not health failures. Preserve producer exit codes. For `dnf check-update`, 0 means no updates, 100 means updates available, and other nonzero values mean failure. Do not hide transaction failures with `|| true`.

## Load the relevant procedure

- Packages, repositories, signatures and supported upgrades: [packages and repos](references/packages-and-repos.md).
- Units, timers and drop-ins: [systemd and journal](references/systemd-and-journal.md).
- Kernel, GRUB, EFI, dracut and recovery: [boot and recovery](references/boot-kernel-and-recovery.md).
- Vendor differences: [derivatives](references/derivatives-and-vendor-quirks.md).
- SELinux and firewalld: [security and updates](references/security-and-updates.md).
- Desktop/audio/Bluetooth: [desktop](references/desktop-audio-and-bluetooth.md).
- Display manager, power and suspend: [session](references/session-display-and-mobile.md).
- Drivers, multilib and gaming: [graphics](references/graphics-and-gaming.md).
- Portals, OBS and screen sharing: [capture](references/capture-and-sharing.md).
- Storage and restore boundaries: [storage](references/storage-and-rollback.md).
- Remote gaming/input: [remote input](references/remote-gaming-input-and-tooling.md).
- Native inspection and recurring failure patterns: [base tools](references/base-linux-and-cli.md) and [gotchas](references/gotchas-and-special-situations.md).

Do not load every reference by default. General workflow guidance is optional in `operate-systems`; broad unexplained instability can use `workstation-health-triage`. Narrow package or service work stays here. Shell programming, network architecture, fleet orchestration and non-RPM systems need their own expertise, not an invented sibling dependency.

## Change one supported layer

Connect the proposed repair to observed evidence. Preserve the authoritative configuration source, package ownership, recoverable prior state and access route. Validate the exact transaction, removal list, device, unit, port/zone or policy target before mutation.

Use SELinux AVCs to distinguish labels, booleans, ports and policy. Do not disable SELinux or firewalld to hide a failure. Prefer persistent supported labels over one-off `chcon`. Inspect firewalld runtime and permanent state separately before changing exposure.

For boot/storage/remote-network changes, establish console or rescue access and retain a known-working kernel/entry. Verify snapshot coverage, including separate boot volumes and external state. Do not invent in-place major upgrades. Use the vendor's current supported path and resolve upgrade inhibitors before proceeding. A DNF5 executable's presence alone does not establish that this release supports a particular upgrade command.

## Verify and return

Validate configuration before activation where supported. Check the actual original function, dependent path and relevant safe log excerpt after the change. Confirm package/kernel/module/initramfs/boot-entry agreement where affected. Report reboot or hardware behavior as unverified until exercised.

Return cause and confidence, changed targets, transaction/recovery evidence, checks and remaining gaps. Do not automatically create durable audit files, upload diagnostics, publish packages or start another delivery workflow. Follow the requested report format and location.
