# Install workflow bundles

Current source has 19 skills in five disjoint bundles under `skills/<group>/<name>/`.
All five have global scope by default on Linux and Apple silicon macOS, including
both OS bundles. The existing 17 [archived skills](archive/README.md) stay outside
discovery. No archive or alias replaces the six owner-excluded skills.

## Choose scope before installing

Use one native loader per harness. Pi uses one Git package. Claude Code and Codex
use five user plugins. Install scope is not task authority, and bodies/references
load only when relevant. This does not change global `AGENTS.md`.

Project-owned installations may explicitly choose local scope instead. Do not
install the same skill both globally and locally and assume host precedence.
The optional checkout wrapper below still accepts explicit local selections.
Source changes never migrate existing installations.

## Pi native package

Declare exactly one source in global Pi settings, or use Pi's native install
command when settings are not managed elsewhere:

```sh
pi install git:github.com/tahabakhit/skills
```

The existing package manifest exposes `./skills`, including all five bundles.
Dotfiles manages the single package declaration, not skill bodies or links.
Do not also install this collection with Skills CLI or add a second checkout.

## Claude Code and Codex plugins

Add the marketplace if missing, then install all five user bundles:

```sh
claude plugin marketplace add tahabakhit/skills
codex plugin marketplace add tahabakhit/skills
for bundle in engineering workstation agents linux macos; do
    claude plugin install --scope user "$bundle@tahabakhit-skills"
    codex plugin add "$bundle@tahabakhit-skills"
done
```

Each plugin uses its canonical `skills/<group>` source. Names carry the bundle
prefix, such as `workstation:chezmoi`. Dotfiles bootstrap keeps existing plugins
and marketplaces. It does not upgrade or uninstall them.

Before a fresh install from an old marketplace, inspect the manager's current
help and refresh only `tahabakhit-skills`. For an existing plugin, use its native
scoped update control if available, or back up and explicitly reinstall that
plugin. Verify installed names, entrypoint and reference bytes afterwards.
Source fixture checks do not prove native update/reinstall semantics. Never
refresh unrelated marketplaces or remove unrelated plugins as part of this change.

## Alternative Skills CLI bundles

The standard Skills CLI can install whole bundles when native package/plugin
loading is not in use. These are alternatives, not additional loaders:

```sh
npx skills@latest add https://github.com/tahabakhit/skills/tree/main/skills/engineering --skill "*" -a pi --global
npx skills@latest add https://github.com/tahabakhit/skills/tree/main/skills/workstation --skill "*" -a pi --global
npx skills@latest add https://github.com/tahabakhit/skills/tree/main/skills/linux --skill "*" -a pi --global
npx skills@latest add https://github.com/tahabakhit/skills/tree/main/skills/macos --skill "*" -a pi --global
npx skills@latest add https://github.com/tahabakhit/skills/tree/main/skills/agents --skill "*" -a pi --global
```

The tree URL selects a bundle and `--skill "*"` selects every skill in it.
There is no native `--group` flag. Omit `--global` only for an explicit project
override. Add `--copy` only when plain copies are wanted. Pi and Codex may share
installed files under this CLI, so inspect the existing owner before replacement.
The repository root remains an all-skill picker.

Remote URLs read the selected GitHub revision, not uncommitted changes. Replace
`main` with a published commit for reproducibility. For unpublished source, pass
an absolute local bundle path or use the checkout wrapper. Do not assume remote
main already has the local candidate. Use the selected CLI's runtime requirements.
See [VERIFICATION.md](VERIFICATION.md) for tested versions and limits. Restart the
agent after replacing instructions and use a fresh conversation.

## Optional fallback: wrapper from the current checkout

For an explicit plan with the checkout's additional checks, run:

```fish
node /path/to/skills-checkout/bin/skills.mjs --global all --agents pi --project /path/to/project --dry-run
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
| `@tahabakhit/skills` | 19 | Published 0.3.0 still contains 30 |
| `@tahabakhit/skills-engineering` | 3 | Published 0.3.0 has the former 11 |
| `@tahabakhit/skills-workstation` | 4 | Locally generated identity; not published by this source change |
| `@tahabakhit/skills-linux` | 5 | Locally generated identity; not published by this source change |
| `@tahabakhit/skills-macos` | 1 | Locally generated identity; not published by this source change |
| `@tahabakhit/skills-agents` | 6 | Locally generated identity; not published by this source change |

Existing `@tahabakhit/skills-core@0.3.0` (5), `@tahabakhit/skills-content@0.3.0` (2),
`@tahabakhit/skills-design@0.3.0` (1), `@tahabakhit/skills-operations@0.3.0` (9),
and `@tahabakhit/skills-data@0.3.0` (2) remain unchanged; source no longer generates
core, content, data or interface-review packages. The seven-package
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
`safe-refactor`/`migration`, `technical-writing` and prose cleanup are covered by
pstack. No legacy-name aliases are needed. Installed copies of archived skills are
not removed by this source change; uninstall them separately if present.

The workstation, linux, macos and agents bundles came from the owner's dotfiles.
All five current bundles install globally by default. See the
[catalog name map](CATALOG.md#setup-cleanup-and-name-map). Resolve resources from
the host's actual installed skill/plugin path, not a fixed home directory. `herdr-core` and `ketch` are excluded CLI-managed integrations. Changing this
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
npm run check
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the development setup. Packing is local;
`publish:dry-run` is a separate release operation, not an onboarding requirement.

Inspect all six actual tarballs in `dist/tarballs/` and generated sources in
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
