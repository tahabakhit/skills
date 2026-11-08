# Contributing

## Development setup

Use Linux for the full development suite. The installer wrapper is currently
verified on Linux; bundled macOS guidance is not proof of macOS or Windows wrapper
support.

Prerequisites:

- Node.js **22.20.0 or newer** and its bundled npm. CI checks the minimum Node
  version and Node 24 LTS. Do not use an older globally installed ESLint.
- Git, jq, Bash, Python **3.9+**, tar and standard POSIX utilities.
- Gitleaks with `git`, `dir` and `--max-archive-depth` support for release scans
  and the optional real-scanner regression test. Without it, that single test
  reports a skip; ordinary checks still run. Publication requires it.

From a fresh checkout:

```sh
npm ci --ignore-scripts
npm run check
```

The committed lockfile owns JavaScript dependencies. Installation suppresses
lifecycle scripts; this project has no install hooks. Do not regenerate the
lockfile or upgrade dependencies just to bootstrap. Install missing system tools
through your workstation's normal package manager.

`npm run check` stops on the first failure and runs:

1. `npm run lint` — ESLint's existing complexity policy for maintained CLI,
   library and build/release code.
2. `npm test` — offline package/provenance checks and disposable executable
   fixtures, followed by Node's test runner.
3. `npm run pack:packages` — generate nine domain packages and the umbrella,
   then pack all ten locally with lifecycle scripts disabled.

No npm login, agent credentials, live skill installation or publication is needed.
The initial dependency install requires registry access; the checks use local
inputs. A fresh npm cache can still need network access for npm's own metadata.

## Focused checks

```sh
npm run lint
sh test/package.sh
node --test test/distribution.test.mjs test/setup.test.mjs
npm run pack:packages
```

`test/install-smoke.mjs`, `test/native-install-smoke.mjs` and
`test/pi-discovery.mjs` are separate integration probes, not part of the offline
gate. Inspect their prerequisites and isolation before running them. Do not
install skills into this source checkout or your real home as a test.

## Source ownership

- Edit canonical skills in `skills/<group>/<name>/`, not generated copies.
  Read the applicable skill before changing its workflow.
- Keep `distribution.json`, `catalog.json`, the Claude marketplace and current
  documentation consistent. Bundle scope comes from `recommendedScope`.
- Preserve supporting files, complete license notices and provenance identities.
  Skill payload changes require corresponding provenance updates and closure checks.
- Keep historical release records, audits and frozen evaluations historical.
  Current source is not the immutable published npm `0.3.0`.
- `dist/`, `node_modules/` and private task notes in `notes/` are ignored.
  Only marked builder-owned output directories may be regenerated. Never put
  fetched repositories or research archives in this checkout.

## CI and review

[CI](https://github.com/tahabakhit/skills/blob/main/.github/workflows/ci.yml) runs on pull requests, pushes to `main` and merge
queue candidates, without path filters. Each Linux matrix job checks out the
event's candidate, installs locked dependencies and runs `npm run check`.
Actions are pinned to exact commits, repository access is read-only, checkout
credentials are not persisted, and no publishing secrets are supplied. System
prerequisites are checked explicitly. Gitleaks is optional in this development
lane; local release scans remain mandatory.

A local pass is not proof of hosted event behavior, host discovery or workflow
effectiveness. See [VERIFICATION.md](VERIFICATION.md) for recorded evidence and
limits. Branch protection and required-check configuration are managed separately;
adding this workflow does not change remote policy.

Before submitting, review `git diff --check`, the complete diff and actual
package contents. Scan changes for secrets before committing. Do not commit
generated tarballs, local task notes or credentials.

## Release boundary

`npm run publish:dry-run` is a maintainer release operation, not a development
check. It packs and scans release artifacts, invokes npm's publication dry run,
and writes artifact approval metadata. Actual publication also needs explicit
authority, an unused version, a clean verified commit and registry authentication.
Follow [INSTALL.md](INSTALL.md#maintainer-release-process); a green CI run grants
no publication, merge or deployment permission.
