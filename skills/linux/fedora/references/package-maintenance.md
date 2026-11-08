# Fedora RPM package maintenance

This is the Fedora counterpart to Arch's package-maintenance reference, not a
second skill. Build preparation does not authorize live installation or publishing.

## Review before evaluation

Read repository instructions, the spec, patches, sources and trust policy. RPM
spec macros and build sections can execute code even during metadata/preparation
operations. Inspect them before using rpmbuild, rpmspec or helpers. An SRPM also
contains executable packaging instructions; it is not trusted merely by its suffix.

Establish Fedora target release/architecture, source origin and integrity,
Version/Release, BuildRequires/Requires, subpackages, provides/conflicts/obsoletes,
license and source metadata. Review scriptlets, triggers, systemd macros, config
file handling and SELinux-related changes. Do not replace checksums or weaken
signature policy simply to make a build pass.

## Clean build and artifacts

Use the existing repository tooling and an installed mock configuration matching
the intended supported Fedora release/architecture. Do not copy a release number
from an online example. Host rpmbuild success can conceal undeclared BuildRequires.

Mock supplies a controlled build dependency environment, not a security sandbox
for malicious sources. Its documented privilege boundary is consequential:
untrusted builds require an appropriate disposable VM/runner and no host secrets.
Do not grant mock-group membership or install tooling incidentally.

Preserve patch provenance and the original regression. A patch that applies
cleanly may still be wrong; rerun the affected test. Record build config, sources,
logs and artifacts. Inspect SRPM/RPM metadata, file lists, dependencies, permissions,
config handling and scriptlets. Use installed rpmlint plus targeted install,
upgrade/removal and regression tests in a disposable target when authorized.
Lint/build success is not proof of compatibility or functionality.

## Delivery boundaries

Keep the spec, source manifest and patch set coherent. Preserve the reason for a
local override/versionlock and verify the replacement fixes it before proposing
pin removal. Keep rollback artifacts without deleting unrelated locks.
Koji/COPR submission, key use, signing and repository publication need explicit
authority and the existing repository's delivery process. Never use a live
workstation install as the first artifact test.

Primary sources:
- [Fedora packaging tutorial](https://docs.fedoraproject.org/en-US/package-maintainers/Packaging_Tutorial/)
- [Mock upstream documentation](https://rpm-software-management.github.io/mock/)
