---
name: release-packaging
description: Build or assess an exact installable release artifact and prove its supported target behavior. Use for missing packaged files, runtime or ABI compatibility, build/runtime dependency separation, and install/upgrade/remove validation. Not for registry publication, live installation, production promotion, or claiming portability from cross-compilation alone.
license: MIT
---

# Verify the packaged candidate

Judge the bytes users will install, not just the source tree that produced them.

## Define the target contract

Identify package format, version identity, supported operating systems, architectures, runtimes and ABI constraints. Read the repository's packaging rules and intended installation/upgrade path. Do not add platforms or distribution formats merely because a tool supports them.

Check available builders and isolated target runners. Use disposable environments or extraction directories for inspection. Building a package does not authorize installing it on the workstation. If a supported target cannot be exercised, distinguish built, inspected and runtime-tested status.

Read [artifact validation](references/artifact-validation.md) before changing packaging or claiming target support.

## Build and inspect

1. Record the source identity, relevant toolchain and dependency resolution. Build the intended artifact rather than a convenience development target.
2. Record its filename, version, size and cryptographic digest. Keep this identity through every subsequent check.
3. Inspect the actual file list, entrypoints, runtime templates, shared libraries, permissions, symlinks, licenses and configuration defaults. Check that packaging allowlists did not omit files present in source tests.
4. Separate build-only dependencies from runtime requirements. Check dynamic linkage, interpreter paths, architecture and minimum runtime/ABI where applicable. A successful cross-build cannot establish target execution.

Avoid reducing installed cost by deleting a dependency without proving the runtime no longer needs it. Prefer measured size and runtime dependency results over guessed portability.

## Exercise the lifecycle

Install or unpack the exact artifact in an authorized clean target environment. Launch it from outside the source checkout so local files cannot fill packaging gaps. Exercise a representative promised function, error behavior and data/configuration location.

When upgrade or removal is in scope, seed representative prior-version state, upgrade, verify preservation, then remove and inspect the specified remainder. Keep user data unless the contract explicitly permits deletion. An irreversible format transition needs a recovery statement, not a nominal uninstall command.

## Hand back the artifact

Return source and artifact identities, the target matrix, lifecycle results, runtime dependencies and known gaps. Keep results for different variants separate. Repacking or rebuilding changes the candidate and invalidates claims about the earlier bytes unless equivalence is demonstrated.

Provide a release-ready artifact only to the extent the evidence supports. Registry uploads, tags and live promotion remain separate authorized delivery actions.
