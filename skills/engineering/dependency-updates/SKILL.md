---
name: dependency-updates
description: Check, plan or apply dependency upgrades. Use for outdated packages, a security advisory or audit finding, a Dependabot/Renovate PR, lockfile churn, a major-version bump, or configuring an updater. Not for upgrading tools installed on the user's machine.
---

# Dependency updates

## Work out what is actually in use

Each dependency exists in up to four forms, and they often disagree:

1. **Declared**: the range in the manifest (`package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `Gemfile`).
2. **Resolved**: the exact version in the lockfile.
3. **Installed**: what is in `node_modules`, the virtualenv or the local cache.
4. **Shipped**: what ends up in the bundle, wheel, binary or container image.

A stale local install is fixed by reinstalling from the lockfile (`npm ci`, `pnpm install --frozen-lockfile`, `uv sync`, `bundle install`), not by changing the repo. A manifest range doesn't tell you what a release artifact contains. If the request covers it, include CI actions, container base images, toolchain versions and anything downloaded at build time.

Be clear whether you've been asked to report, assess an advisory, or change files. An audit doesn't install anything.

## Find a real candidate

Ask the registry, not memory, for what exists: for example `npm view <pkg> versions`, `npm outdated`, `pip index versions <pkg>`, `cargo search`/`cargo update --dry-run`, `go list -m -u all`. Note the date you checked. Without network access, say your information may be stale. Skip prereleases unless the project already tracks them.

For a security advisory, read the affected and fixed ranges and the conditions for exploitation, then check whether the vulnerable package is actually shipped or executed on that path (`npm ls <pkg>`, `cargo tree -i <pkg>`, `go mod why <module>`). Dev-only is not automatically harmless: build tools and lifecycle scripts run on developer machines and in CI with their credentials.

## Assess compatibility

Read the changelog or release notes for every version between current and target, not just the latest. Look for removed or renamed APIs, a higher minimum runtime (Node, Python, glibc, MSRV), changed config formats, data or schema migrations, peer dependency changes, and dropped prebuilt binaries for your platforms. A major version bump may be trivial for you; a minor one may not be.

If the candidate needs a newer runtime than the project supports, that runtime bump is a separate decision. Don't widen supported versions silently.

Supply-chain red flags worth checking: a new maintainer or changed repository URL, a newly added `postinstall`/`install` script, a package swapped for a differently named one in the tree, or a release that appeared very recently with no matching tag upstream. Use the ecosystem's integrity checks (lockfile hashes, `npm audit signatures`, checksum databases) where they exist; don't claim provenance that wasn't verified.

## Apply

- Installing runs dependency code. Do it where there's nothing to steal: no deploy credentials, no production access, minimal tokens. A temp directory is not a sandbox. If no safe environment is available, finish the assessment and list the checks you didn't run.
- Use the project's package manager and a targeted command (`npm install <pkg>@<ver>`, `pnpm update <pkg>`, `uv lock --upgrade-package <pkg>`, `cargo update -p <pkg>`, `go get <module>@<ver>`), not a full relock.
- Read the lockfile diff. Large unrelated churn means something else changed (different package manager version, registry, or a full re-resolve); explain or undo it. Never hand-edit integrity hashes or disable frozen-install checks to make CI pass.
- Batch packages that must move together (a framework and its plugins, peer-dependent sets like `react` and `react-dom`); keep unrelated upgrades in separate commits or PRs so failures point at one change.

## Verify

Run a clean install from the new lockfile, the relevant tests and the build. For bundler or plugin updates, inspect the built output. For native modules, run on each supported platform or say which you couldn't. If an advisory fix also needs a config flag or code change, check that too; a new version number alone doesn't prove the vulnerable path is closed.

## Updater configuration

When changing Dependabot, Renovate or similar, check which manifests it discovers, its schedule, grouping and version strategy, and that CI runs on its PRs. Confirm it actually opens a PR for a known-outdated package; a config that parses but never proposes anything is the common failure.

## Report

For each package: current, resolved and proposed versions; why; where the version information came from and when; compatibility findings; what changed; which checks ran. Mark each as adopted, deferred, blocked or not applicable, and state any advisory exposure that remains.
