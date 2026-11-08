# Fedora packages and repositories

Read [diagnostic privacy](diagnostic-privacy.md) before using native tools. Commands
are selected examples, not a batch to run. Preserve every producer's exit status;
a missing optional capability is not a healthy result.

## Identify package and repository state

Establish Fedora release/deployment model and DNF5 versus legacy DNF. Use bounded
queries for the affected package: installed version/architecture, owning RPM,
candidate repository, signature/key trust and transaction history. For installed
packages rpm -q and rpm -V answer different questions: verification differences
may include expected local configuration, not just damage. Do not inventory the
whole RPM database for one package failure.

Inspect only safe repository summaries; URLs and configuration can contain
credentials. Distinguish disabled/absent sources, stale metadata, mirror errors,
release mismatches, conflicting providers and third-party lag before solving.
A metadata refresh uses network/cache and requires the request's scope; do not
refresh merely to produce a read-only snapshot.

For dnf check-update, status 0 means no updates and 100 means updates available.
Other nonzero statuses are failures. Do not hide resolver, signature, permission
or network errors with || true.

## Trust and transaction boundaries

Prefer official supported sources when suitable. COPR, RPM Fusion and vendor
repositories each introduce a trust/support decision; none is a universally safe
fallback. Inspect source ownership and signing-key fingerprints before importing
keys or installing repository-release RPMs. A signature check proves neither
that the signer is intended nor that the package is suitable for this release.

Do not enable updates-testing permanently for an unrelated repair. Never mix
enterprise/clone repositories into Fedora. Modules/AppStream may not be supported
by the current DNF/release; check capability before listing/resetting streams.
Do not install a legacy manager to satisfy a copied example.

Review proposed dependencies, replacements, removals and package provenance before
an authorized transaction. Do not use --allowerasing, --nogpgcheck, broad excludes,
or forced RPM installation as routine solver fixes. Direct rpm installation
bypasses DNF dependency planning and needs a specific supported justification.

## Local RPMs and packaging

Inspect a local RPM's origin, signature, metadata, dependencies, file list and
scriptlets before trusting it. Where authorized, use the native DNF resolver for
installation rather than forcing files/dependencies. Source/spec evaluation and
clean builds are covered by [package maintenance](package-maintenance.md).
Building does not authorize workstation installation, key use or publication.

## Upgrade and recovery

Follow [update and recovery](update-recovery.md) for supported release upgrades,
offline attempts, transaction failures and .rpmnew/.rpmsave review. Do not paste
mutable Fedora upgrade stages onto image-based hosts; use
[image-based systems](image-based-systems.md). Enterprise derivatives require their
own current vendor procedures, not Fedora release targets or generic leapp commands.

Primary reference: [Fedora system upgrades](https://docs.fedoraproject.org/en-US/quick-docs/upgrading-fedora-offline/).
Use installed dnf/rpm help for concrete query and transaction flags.
