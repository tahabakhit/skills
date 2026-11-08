# Fedora updates and recovery

Identify mutable versus image-based Fedora before any transaction. For image hosts
read [image-based systems](image-based-systems.md); do not apply this DNF workflow.

## Readiness and supported path

Check installed release/architecture, lifecycle, current official upgrade notes,
DNF generation, repositories, local RPM overrides, free space/inodes, package
database health and pending/offline transactions. Identify target-release support
for third-party sources, akmods/DKMS, Secure Boot and the selected kernel.

Use the current Fedora guide for the supported release jump; do not hardcode a
future target or assume Rawhide/EOL hosts follow the stable path. Bring a mutable
system to its required baseline only within upgrade authority. DNF5 embeds system
upgrade support, while older DNF uses a plugin; verify installed help and release
documentation before choosing the download/offline/reboot sequence.

Verify backups and their exclusions, recovery credentials and console/rescue
access. Preserve a known-working kernel and confirm separate boot/EFI coverage.
Package download, transaction activation and reboot are separate consequential
stages. Do not reboot merely because a download completed.

## Failed/offline transactions

Capture the exact stage, transaction result and bounded diagnostic excerpt before
retrying or cleaning. Distinguish solver/repository/key failures, capacity,
interrupted/offline execution and later kernel/service failures.

For DNF5 use installed offline/history interfaces to inspect the relevant attempt.
offline clean deletes stored transaction/cache data; it is not diagnostic.
Do not discard that evidence, remove locks with active owners, rebuild the RPM
database on speculation or apply broad distro-sync/--allowerasing as a generic fix.
Review every proposed removal and preserve package/configuration provenance.

A history undo is not a guaranteed OS rollback: repositories, package availability,
scriptlet effects and application data may have changed. Use a supported recovery
plan for the actual failure. For kernel/initramfs/EFI work read
[boot recovery](boot-kernel-and-recovery.md), establish mount layout and avoid
blindly rewriting a vendor-specific EFI stub.

## Configuration and acceptance

Inspect .rpmnew/.rpmsave against the authoritative source; do not overwrite local
preferences to silence differences. Verify release identity, package consistency,
repos, kernel/modules/initramfs/boot entry, failed services and the original
application path. Test networking/graphics when affected, and distinguish the
current boot from the repaired next boot. Do not claim boot recovery until booted.

Primary sources:
- [Fedora system upgrades](https://docs.fedoraproject.org/en-US/quick-docs/upgrading-fedora-offline/)
- [DNF5 offline interface](https://dnf5.readthedocs.io/en/latest/commands/offline.8.html)
