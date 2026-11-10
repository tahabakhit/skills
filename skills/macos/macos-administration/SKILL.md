---
name: macos-administration
description: Diagnose and make scoped changes on Apple silicon macOS using native ownership, Homebrew, launchd, and privacy-aware evidence. Use for macOS packages, services, permissions, and shell integration; not Linux administration, Nix activation, OS upgrades, or arbitrary defaults-tweak bundles.
license: MIT
compatibility: Apple silicon macOS and its installed native tools. Requires target access for runtime verification; reading this skill on Linux does not establish macOS acceptance.
---

# macOS administration

Identify the affected Mac, OS version, execution context and exact symptom.
Diagnosis stays read-only. Continue an already authorized repair within its named
scope; ask only for a missing consequential decision or authority.

## Identify architecture and ownership

Distinguish hardware architecture from the current process architecture and
Rosetta translation. Inspect the selected binary and Homebrew prefix rather than
assuming the first brew on PATH is the native installation. Do not migrate an
Intel prefix or install a second toolchain incidentally.

Determine whether a file or service belongs to Apple, Homebrew, an application,
chezmoi, Nix or another manager. Change its authoritative source. A managed Mac
may have MDM restrictions; do not bypass those or replace declarative ownership.

## Choose a focused procedure

Read [packages, services and permissions](references/native-operations.md) for
Homebrew transactions, launchd domains, privacy controls and verification.

For shell scripts and startup behavior, use portable shell guidance when
available. For chezmoi source/target/state work, use its tool-specific procedure.
These are optional specialists, not a requirement to load an entire collection.

## Preserve system and privacy boundaries

Use narrow, time-bounded evidence from the affected operation. Unified logs,
launchd job details and process environments can contain credentials, paths and
personal identifiers. Select safe fields or request a locally redacted excerpt;
do not dump raw diagnostics into an agent transcript.

Do not disable SIP, Gatekeeper, FileVault or privacy enforcement to make a task
work. Do not reset TCC databases or grant Full Disk Access automatically.
Distinguish Unix permissions, ACLs, file flags, sandboxing and privacy consent.
GUI approval may have to be performed by the user.

Do not run sweeping defaults scripts, change the account shell, upgrade macOS,
install Homebrew/CLT, activate a Nix generation, or unload unrelated services as
incidental troubleshooting. A request to configure one app is not permission to
rewrite an entire preferences domain.

## Change and verify

Preserve the named file/preference and recovery path before mutation. Validate
the candidate with the native tool where available, then activate only the
intended job/app. Explain session interruption or remote-access consequences
before taking action within the existing authority.

Check the original function in the correct user/session context. A valid plist,
installed cask or loaded job does not prove the application works. Report any
untested GUI approval, hardware, login or reboot behavior explicitly.

Return cause/confidence, ownership, exact changes, rollback evidence and checks.
