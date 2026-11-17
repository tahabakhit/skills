---
name: release-packaging
description: Build and verify the installable artifact for a release (wheel, npm tarball, binary, .deb/.rpm, container image). Use for files missing from a package, works-from-source-but-not-installed bugs, glibc/ABI or platform support, and install/upgrade/uninstall testing. Not for publishing or deploying.
---

# Release packaging

Test the file users will install, not the source tree. Most packaging bugs are invisible from a checkout because the checkout quietly supplies whatever the package forgot.

## Define what you promise

Write down the package format, version, and each supported OS, architecture and runtime floor (Python/Node version, glibc or musl, macOS minimum). Read the repository's existing packaging config and release docs. Don't add platforms or formats just because the build tool can produce them.

## Build and record identity

1. Build the release artifact the way the release process does (`python -m build`, `npm pack`, `cargo build --release`, `goreleaser`, `docker build`, `dpkg-buildpackage`), not a dev build.
2. Record the source commit, toolchain versions, filename, size and SHA-256. Every later result belongs to that digest. If you rebuild or repack, results for the old file don't carry over.

## Inspect the contents

List what's actually inside the artifact (commands per format in [artifact checks](references/artifact-checks.md)) and compare with what the code needs at runtime:

- entrypoints and console scripts point at modules that are present;
- templates, data files, migrations, `py.typed`, licences and notices are included (a `files`/`MANIFEST.in`/`package_data`/`.npmignore` allowlist is the usual culprit);
- no secrets, `.env` files, test fixtures or build-machine absolute paths;
- executable bits and symlinks survived;
- native code: architecture, linked libraries, and required glibc symbol versions match the stated floor.

Separate build-time from runtime dependencies. A runtime binary or library that happened to be present on the build machine through a dev dependency is a classic break. Don't drop a dependency to shrink the package unless you've shown the installed artifact runs without it.

## Run it like a user

Install or unpack the exact artifact into a clean environment that matches a supported target: a fresh virtualenv, an empty directory with `npm install ./pkg.tgz`, a container of the oldest supported distro. Run it from outside the source checkout (so `import` can't pick up the local tree), exercise one real feature and one error path, and check where it reads config and writes data.

Cross-compiling proves it builds, not that it runs. If you can't execute on a target, report that target as built-and-inspected only.

Installing someone's package runs its install hooks. Do it in a disposable container or VM, not the user's machine.

## Upgrade and uninstall

When in scope, install the previous release, create representative config and data, upgrade to the new artifact, and confirm data and config survive and services restart correctly. Then uninstall and check what remains: user data and edited config should usually stay; generated caches, services and running processes should not. If the upgrade migrates data irreversibly, say whether the old version can still read it and how to recover. Details in [artifact checks](references/artifact-checks.md#upgrade-and-uninstall).

## Hand back

Report source commit, artifact digest, the target matrix with each target marked built, inspected or run, lifecycle results, runtime dependencies and gaps. Keep variants separate. Uploading to a registry, tagging and deploying are separate steps that need explicit approval.
