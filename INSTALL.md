# Install workflow bundles

Current source has 20 skills in five disjoint bundles under `skills/<group>/<name>/`.
Use the standard Skills CLI: install core once globally, then whole domain bundles
locally in the receiving project. No custom installer is required.

## One-time global core

```fish
npx skills@latest add https://github.com/tahabakhit/skills/tree/main/skills/core --skill "*" -a pi --global
```

Core contains `discover-work`, `research-work`, `create-content` and
`verify-and-stop` (4). Writing and prose cleanup live in `create-content`; there is
no `unslop` skill or alias. Specification authoring (`define-work`) is engineering.

## Local project bundles

Run the relevant commands from the receiving project. Each selects the entire
bundle; choose bundles, not a hand-maintained list of individual skills.

```fish
npx skills@latest add https://github.com/tahabakhit/skills/tree/main/skills/engineering --skill "*" -a pi
npx skills@latest add https://github.com/tahabakhit/skills/tree/main/skills/content --skill "*" -a pi
npx skills@latest add https://github.com/tahabakhit/skills/tree/main/skills/interface-review --skill "*" -a pi
npx skills@latest add https://github.com/tahabakhit/skills/tree/main/skills/data --skill "*" -a pi
```

| Bundle | Count | Contents |
| --- | --- | --- |
| engineering | 12 | `define-work` plus design, debugging, delivery, testing, review, safe changes, Git, CI, dependencies, packaging and security |
| content | 1 | `document-review` |
| interface-review | 1 | `interface-review` |
| data | 2 | `analyze-data`, `data-pipelines` |

The tree URL selects a group directory and `--skill "*"` selects all its skills.
There is no native `--group` flag in this recipe. Only core normally uses
`--global`. Add `--copy` to a command only when plain copies are explicitly wanted;
otherwise leave upstream installation mode unchanged. Inspect the upstream plan,
destinations and existing owners before accepting any replacement.

The repository-root command remains an **all-skill picker**, not a bundle selector:

```fish
npx skills@latest add tahabakhit/skills -a pi
```

These routes read GitHub source rather than the npm wrapper's bundled catalog.
The example `main` URLs track the current source; substitute a commit for `main`
when reproducibility is required. They require Node.js/npm and GitHub/registry
access; use the selected upstream CLI's runtime requirements. See
[VERIFICATION.md](VERIFICATION.md) for tested native installation and discovery
versions and limits. Restart the agent after installation, and use a fresh
conversation after replacing workflow instructions.

## Optional fallback: wrapper from the current checkout

For an explicit plan with the checkout's additional checks, run:

```fish
node /path/to/skills-checkout/bin/skills.mjs --global core --local engineering --agents pi --project /path/to/project --dry-run
```

Inspect the plan, then replace `--dry-run` with `--yes` to execute. For an interactive
selector, run `node /path/to/skills-checkout/bin/skills.mjs` from the recipient
project. In the source checkout, `node bin/skills.mjs --list` inspects choices
without installing. Do not use that source tree as the install destination.

The wrapper requires Node.js 22.20+ and npm and delegates to pinned Vercel Skills
CLI 1.7.4. It has no runtime library dependencies or install hooks. Its installation
checks target Linux; npm packaging does not establish Windows or host compatibility.
`--list`, `--help` and `--dry-run` do not invoke the downstream installer.

Existing selected folders or same-name lock entries require deliberate replacement:
non-interactive use needs `--replace`; the wizard asks for replacement consent.
Replacement is not a merge or an ownership migration. Inspect the manager first,
especially for chezmoi-owned files. Unsafe links, source/destination overlaps and
unsupported locks are refused even with replacement consent. The wrapper binds
confirmation to the observed destinations and locks and verifies copied artifacts,
receipts and lock records. A failure may leave a completed scope or a partial
install; there is no atomic rollback. Inspect reported paths before retrying.

Pi and Codex share `.agents/skills` under this installer; Claude Code has a separate
`.claude/skills` target. Global `CLAUDE_CONFIG_DIR` and `XDG_STATE_HOME` overrides
must be absolute; the latter relocates the global lock, not skill folders.
`CODEX_HOME` does not relocate installer targets. Review the exact plan for the
current environment. Removing a shared Pi/Codex skill is not a per-agent operation.

Serialize installers: current source has no custom `*.taha-install` guards and no
replacement inter-process lock. Snapshot checks are not concurrency protection.
Do not introduce guard/profile frameworks or assume automatic migration. The
wrapper has no automatic removal command. For wrapper-created copies, re-run the
checkout selector at the desired revision and intentionally replace after review;
its local-source lock is not a promise that `skills update` can update those copies.

## Source versus published npm artifacts

The current package version remains **0.3.0**, with source-only changes. Generated
packages follow the five-group partition; generating them locally does not publish
them or alter a registry release.

| Current source package identity | Source count | Registry distinction |
| --- | --- | --- |
| `@tahabakhit/skills` | 20 | Published 0.3.0 still contains 30 |
| `@tahabakhit/skills-core` | 4 | Published 0.3.0 has the former 5 |
| `@tahabakhit/skills-engineering` | 12 | Published 0.3.0 has the former 11 |
| `@tahabakhit/skills-content` | 1 | Published 0.3.0 has the former 2 |
| `@tahabakhit/skills-interface-review` | 1 | New locally generated identity; not published |
| `@tahabakhit/skills-data` | 2 | Existing 0.3.0 release is unchanged |

Existing `@tahabakhit/skills-design@0.3.0` (1) and
`@tahabakhit/skills-operations@0.3.0` (9) remain unchanged. The seven-package
historical `0.3.0` release retains the old group names, `unslop`, removed OS skills
and custom guards. Neither `@latest` nor `@0.3.0` on those packages means this grouped source.
The [release record](releases/0.3.0.json) describes those immutable artifacts, not
a new release. Public installs need no npm login; a GitHub push is not publication.

With npm 11, invoking the same-name npm package inside its own checkout may resolve
to the local package and fail with `taha-skills: command not found`. Use
`node bin/skills.mjs` for current source, not a global `npm link` workaround.

## Existing installations and external skills

Do not delete the whole `~/.agents/skills` tree. Back up selected folders and
inspect current managers, links and local edits before an authorized replacement.
The [historical import guide](audits/installed-skill-import.md) preserves earlier
migration evidence and rollback guidance, not current installation ownership.
`safe-refactor`/`migration` are covered by `change-safely`; `technical-writing` and
prose cleanup belong to core's `create-content`. No legacy-name aliases are needed.

The seven OS/platform/health workflows remain external in the owner's chezmoi
source. `herdr-core` and `ketch` are excluded CLI-managed integrations. Changing this
catalog does not uninstall old names, retire chezmoi sources, alter host settings
or apply changes to live installations. Those actions need their own authorization
and verification. Do not activate duplicate copies via native package loading and
Skills CLI installation.

## Maintainer release process

Published `0.3.0` came from `9886e55`; older `0.2.0` came from `331fbaf`. Both are
immutable. Choose an unused version before preparing a new release, updating
package metadata, lockfile and version checks together. Do not publish the new
identities as if they were already released or overwrite historical records.

```fish
npm ci --ignore-scripts
npm run lint
npm test
npm run pack:packages
npm run publish:dry-run
```

Inspect all seven actual tarballs in `dist/tarballs/` and generated sources in
`dist/npm/`, including complete support files, provenance and licenses. These are
marked disposable output, not edited or committed canonical copies. Only directories
with the builder's marker may be regenerated. Runtime packages have no install
hooks; ESLint and the patched minimatch override are development-only.

Publish only with explicit release authority, a clean verified commit, access to
the npm scope, and required 2FA or appropriately scoped publishing credentials.
GitHub login is separate. Never put tokens in chat or repository files. Complete
interactive authentication yourself.

```fish
npm login --registry=https://registry.npmjs.org
npm run publish:dry-run
npm run publish:packages
```

Run the dry run again after the final commit: `dist/approved-release.json` approves
exact tarballs for that clean commit. `dist/release.json` records local artifact
identities. The release command checks npm identity and scans history and tarballs
with Gitleaks. It freezes approved bytes in private temporary copies, scans those
copies as recognized `.tar.gz` archives, and publishes those same bytes without
rebuilding. Changed artifacts or a dirty/different commit are rejected. Domains
publish before the umbrella; publication is not atomic.

npm may accept publication before metadata becomes visible. A transient 404 is
not proof of failure: wait for processing and compare registry integrity before
retrying. Approval may expire while waiting. Every accepted artifact needs registry
verification. Reruns skip existing versions only when integrity matches the exact
local tarball; conflicts stop the release. Do not blindly bump or unpublish to
hide a partial failure.

Relevant npm contracts: [scoped public packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)
and [npm publish](https://docs.npmjs.com/cli/v11/commands/npm-publish).
