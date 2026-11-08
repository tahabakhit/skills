# Fedora image-based systems

This reference establishes routing and recovery boundaries, not a universal
activation recipe. Identify the actual distribution, deployment owner, image
origin, running deployment and pending deployment before selecting a command.
Do not infer rpm-ostree or bootc ownership merely from a binary on PATH.

## rpm-ostree Atomic Desktops

Inspect installed rpm-ostree status/help and the intended OS ref, layered packages,
overrides and pinned deployments. A host base image, layered RPM, Flatpak app and
toolbox/distrobox environment have different owners. DNF inside a development
container does not update the host.

Use matching current Fedora Atomic documentation for the actual edition. Updates,
rebases, rollback and switching deployments have different consequences; do not
apply mutable DNF release-upgrade instructions. Preserve a known-working
deployment and account for third-party layers before an authorized transition.

A deployment rollback is not a rollback of all user/application data. Verify
persistent /var, home, /etc merge behavior and external state separately. Do not
delete pinned deployments or reset overrides to make status look clean.
Reboot and original application/device behavior are separate acceptance checks.

## bootc

Identify the booted/staged image, origin, registry trust/digest policy and declared
Containerfile/build owner. Use supported installed bootc status and vendor
documentation; do not treat bootc and rpm-ostree CLI procedures as interchangeable.

Host image updates belong to the existing build/sign/distribution pipeline.
Do not install mutable host packages or rewrite the image source incidentally;
DNF during a reviewed image build is a different context from a live host.
Image switch/update, transient changes and rollback require an explicit recovery
and activation plan. Persisted data may outlive the image generation.

If image credentials, provenance, support policy or rescue access cannot be
established, report the exact missing capability before activation. Do not
invent a migration between deployment models.

Primary sources:
- [Fedora Silverblue updates/upgrades/rollbacks](https://docs.fedoraproject.org/en-US/fedora-silverblue/updates-upgrades-rollbacks/)
- [Fedora/CentOS bootc](https://docs.fedoraproject.org/en-US/bootc/)
