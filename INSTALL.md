# Install selected skills

The public source is https://github.com/tahabakhit/skills. The npm selector lets you
choose groups or individual skills, assign them to global or project scope, and
choose Pi, Claude Code or Codex. It delegates copying to pinned Vercel Skills CLI
1.7.4 rather than maintaining a second file installer.

Requires Node.js 22.20 or newer, npm, and access to the npm registry for the pinned
installer. The wrapper has no runtime library dependencies. Its own installation
checks currently target Linux. Do not infer Windows support from npm packaging.

## Interactive installation

From the repository that should receive project-local skills:

```fish
npx @tahabakhit/skills@latest
```

The wizard shows the groups and skill names, then asks:

1. Which selections should be global?
2. Which different selections belong in this project?
3. Which project directory and target agents should be used?
4. Whether to execute the displayed plan. Replacements require separate consent.

Enter group names, displayed group numbers, individual skill names, or `all`.
Comma-separate multiple selections. Enter nothing for a scope to skip it. Empty
selections in both scopes cancel. No skill is installed globally by default.

Registry commands require that the package version has been published. If npm
returns E404, use the public source or checkout methods below. A GitHub push alone
is not npm publication.

## Explicit and non-interactive use

Preview core globally and data in this repository for Pi and Codex:

```fish
npx @tahabakhit/skills@latest --global core --local data --agents pi,codex --dry-run
```

Execute that plan:

```fish
npx @tahabakhit/skills@latest --global core --local data --agents pi,codex --yes
```

Install only two engineering skills for Claude Code in a particular repository:

```fish
npx @tahabakhit/skills@latest --local testing-work,code-review --agents claude-code --project /path/to/project --yes
```

Use `--list` for the available selections and `--help` for options. Non-interactive
input requires explicit selections and agents. `--dry-run`, `--list` and `--help`
do not invoke the downstream installer. npx itself may still download this package.

## npm packages

All packages use the same release version. The umbrella includes every group.
Domain packages contain only their assigned skills, the selector, and their local
notices/provenance/references. They have no runtime dependency on the umbrella or
other domain packages. Ownership is a partition, not duplicate source trees.

| Package | Skills |
| --- | --- |
| `@tahabakhit/skills` | All 21, selected rather than automatically installed |
| `@tahabakhit/skills-core` | Discovery, specification, evidence research, acceptance proof (4) |
| `@tahabakhit/skills-engineering` | Design, debugging, delivery, tests, review, refactors/migrations, Git, CI, dependencies, packaging, security (11) |
| `@tahabakhit/skills-content` | Writing/file production and document review (2) |
| `@tahabakhit/skills-design` | Interface review (1) |
| `@tahabakhit/skills-data` | Analysis and pipelines (2) |
| `@tahabakhit/skills-operations` | Linux operations (1) |

For example, `npx @tahabakhit/skills-data@latest` offers only the data group. Do not
install the same skill twice through both the umbrella and a domain package.
These installation groups do not change the canonical responsibilities in
[CATALOG.md](CATALOG.md), and package availability is not proof of better model work.

## Existing skills, managed files and updates

The plan lists exact skill destinations and the upstream lockfile. Existing
selected folders or same-name lock entries stop non-interactive installation
unless `--replace` is supplied. In the wizard, inspect their owner and type
`replace` only when replacement is intended. Replacement removes the old selected
folder contents. This is not a merge or an automatic ownership migration.

Symlinks, dangling links, hard-linked locks, source/destination overlaps,
malformed/future locks and project lock extension fields are refused even with
`--replace`. Reconcile the
existing manager first, especially for dotfiles/chezmoi-managed installations.
Unselected entries must remain unchanged. Confirmation is tied to a snapshot of
selected destinations and locks. Changed or newly appearing entries require a
fresh plan even with `--replace`. The package's source tree cannot be an install
destination. Source snapshots reject entries that the downstream copier excludes.
The wrapper verifies file bytes, file permission bits, directory presence,
complete skill/agent receipts and lock records after each scope. Failures can
leave partial installs. The wrapper does not roll back files or discard somebody else's
work. Inspect the reported paths before retrying.

Pi and Codex share `.agents/skills` in Vercel's installer. Claude Code gets a
separate `.claude/skills` copy. Global Claude configuration can use the absolute
`CLAUDE_CONFIG_DIR` override. Absolute `XDG_STATE_HOME` relocates the global Skills
lock, not the skill folders. `CODEX_HOME` does not relocate this installer's targets.
The final plan is authoritative for the current environment.

Copies do not depend on the npx cache staying present. The upstream lock records a
local package source, so `skills update` does not update these copies. Re-run the
selector from the desired npm version, inspect its plan, then use `--replace` for
an intentional update. Pin `@0.2.0` rather than `@latest` for a repeatable release.

Serialize other installers while this runs. The wrapper uses exclusive temporary
`*.taha-install` guards beside upstream locks. A stale guard after a crash is not
automatically removed. Inspect its owner/process before removing it. Direct
upstream commands do not honor this guard.

There is no automatic removal command in the wrapper. Upstream removal can delete
the shared Pi/Codex canonical directory, so it is not a safe per-agent ownership
operation. Review that shared use before removing installed skills.

Restart the agent after changing skills. Start a fresh conversation when replacing
workflow instructions so old instructions do not remain in the session.

## Public source and unpublished-checkout alternatives

Use Vercel directly without our selector:

```fish
npx skills@1.7.4 add tahabakhit/skills --skill discover-work --skill define-work
```

This uses Vercel's own scope and agent questions. Unlike the wrapper, it does not
apply our collision, symlink, lock-preservation or receipt guards.

To use the selector from a checkout before registry publication:

```fish
node /path/to/skills-checkout/bin/skills.mjs
```

The selector does not require `npm install` for runtime libraries. Development lint
checks do require the repository's dev dependencies. You can also run the published
source through npx once the CLI commit is on GitHub:

```fish
npx github:tahabakhit/skills
```

## Maintainer release process

Use a publishing account with access to the `@tahabakhit` scope. npm login is
separate from GitHub authentication. Do not paste tokens into chat or repository
files. Direct public publishing requires account 2FA or an appropriately scoped
publishing credential. Complete interactive authentication yourself.

```fish
npm ci --ignore-scripts
npm run lint
npm test
npm run pack:packages
npm run publish:dry-run
```

Inspect all seven actual tarballs under `dist/tarballs/`. Generated domain sources
are under `dist/npm/`. They are not edited or committed copies of canonical skills.
Only directories with this builder's marker can be regenerated. Runtime packages
have no install hooks. ESLint is dev-only. The patched minimatch override is checked
by lint/tests and is not a runtime dependency.

After verifying and committing the exact source, authenticate and publish:

```fish
npm login --registry=https://registry.npmjs.org
npm run publish:dry-run
npm run publish:packages
```

The release command requires a clean checkout, checks npm identity, scans history
and tarballs with Gitleaks, and publishes the six domains before the umbrella.
`dist/release.json` records local artifact identities. Run `publish:dry-run` again
after the final commit: it approves exact tarballs for that clean commit in
`dist/approved-release.json`. Publishing verifies and freezes those bytes in
private temporary copies, scans those copies under recognized `.tar.gz` names,
and publishes the same copies without rebuilding. It rejects changed artifacts
or a different/dirty commit. Publication is not
atomic: reruns skip versions only when registry integrity matches the exact local
tarball. Conflicting immutable versions stop the release. Do not blindly bump or
unpublish to hide a partial failure. Verify registry identities after publishing.

Relevant npm contracts: [scoped public packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)
and [npm publish](https://docs.npmjs.com/cli/v11/commands/npm-publish).
