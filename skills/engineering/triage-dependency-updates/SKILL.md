---
name: triage-dependency-updates
description: Assess or apply dependency updates using actual candidate versions, compatibility evidence, lockfile review, and supply-chain checks. Use for outdated packages, advisories, updater changes, or suspicious install drift. Not for a fleet-wide upgrade from a local request or claiming freshness without registry evidence.
license: MIT
---

# Triage dependency changes

Distinguish what the project declares, resolves, installs and ships before choosing an update.

## Establish state

Identify relevant manifests, lockfiles, runtime/toolchain declarations, generated dependency files and the repository's existing updater. Compare committed state with installed state. An old local installation does not prove the lockfile needs changing. A manifest range does not establish the version inside the release artifact.

Determine whether the request is an inventory, a security assessment or an authorized update. An audit does not install packages. Check registry/advisory access and the available package manager version. Use declared project tooling. Offline results must identify their observation date and cannot claim current upstream freshness.

## Assess a real candidate

Read [candidate procedure](references/candidates.md).

1. Resolve an exact available version and its source. Separate stable, prerelease and unsupported channels.
2. Check the advisory's affected range and exploit preconditions when security motivates the update. Identify whether the vulnerable package and path are actually shipped or executed. Do not equate dev-only with harmless build-time execution.
3. Inspect relevant release notes, API/runtime changes, transitive replacements, native/ABI requirements and changed install scripts. Verify source and artifact identity using the ecosystem's available integrity or provenance mechanisms.
4. Choose the smallest compatible batch. Keep coupled packages together when their contracts require it. Separate unrelated risk so failures remain attributable.

## Apply only the requested change

Before any update, install, build or project check, treat dependency lifecycle scripts and other candidate code as executable input. Use an approved execution environment with only the credentials, network and writable services the check needs. A worktree or temporary directory is not a security sandbox. Do not expose deployment credentials or production services merely because an update was requested. If a suitable execution boundary is unavailable, finish static assessment and report the unexecuted checks.

Update with the project's package manager and review the resulting dependency graph and lockfile diff. Explain unexpected churn rather than accepting a complete relock silently. Do not hand-edit integrity fields or bypass an immutable install rule to force success.

Run focused behavior tests and the required build/install lanes. For native or bundled runtime dependencies, inspect the resulting artifact in its supported environment. A package-manager success only proves that operation completed.

If changing updater configuration, confirm schedule, scope, grouping and an observable candidate path. A configuration pin is not evidence that the updater can open and validate a real update.

## Return a disposition

For each candidate report current/resolved/proposed versions, reason, evidence source and date, compatibility findings, changes made and checks run. Distinguish adopted, deferred, blocked and not applicable. Explain residual advisory exposure where an update cannot be applied. Do not replace the repository's update policy or start publication as a side effect of triage.
