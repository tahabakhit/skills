# @tahabakhit/skills

23 selectively installable source skills for engineering, research, content, data,
configuration drift and dotfiles. The source is public at https://github.com/tahabakhit/skills.
The CLI helps you choose what belongs globally and what belongs in a repository.
It uses Vercel's Skills CLI for the actual copying.

## Install

For a clean Pi install, run the standard Skills CLI from the receiving project:

```fish
npx skills@latest add tahabakhit/skills -a pi
```

This installs from GitHub using upstream selection and scope prompts. Review the
selected names and destinations before accepting; do not overwrite existing
managed skills without checking ownership. Current source contains 23 skills,
with only `managed-config-drift` and `chezmoi` in operations.

### Optional selector wrapper

For group selection, explicit global/project planning and additional checks:

```fish
npx @tahabakhit/skills@0.3.0
```

The published wizard lists groups and individual skills, asks which belong globally and
locally, asks for target agents, then previews exact paths before confirmation.
Nothing is globally installed by default. Existing selections require explicit
replacement consent. Managed symlinks and unsafe lockfiles are refused.

All seven packages are published at immutable `0.3.0`, with the former 30-skill
catalog, including the now-removed OS skills. These registry artifacts do not
reflect the 23-skill source cleanup or removal of the custom install guard. The earlier `0.2.0`
contains 21 skills. Public installation does not require npm login. Use
`npx @tahabakhit/skills@0.3.0` to pin this release, or add `--list` to inspect its
choices without installing skills. All seven public selectors passed version/list
checks. Exact package identities are in
[the release record](https://github.com/tahabakhit/skills/blob/main/releases/0.3.0.json).

To use the latest GitHub source instead:

```fish
npx github:tahabakhit/skills
```

Or run the selector directly from a checkout:

```fish
node /path/to/skills-checkout/bin/skills.mjs
```

Inside this package's own checkout, use `node bin/skills.mjs --list` or
`node bin/skills.mjs` for the wizard. npm 11 can resolve `npx @tahabakhit/skills`
to the local package instead of the registry, then fail with
`taha-skills: command not found` because a source checkout has no self-bin link.
Run the published `npx` command from another project or directory. Do not create
a global link to work around this.

Requires Node.js 22.20+, npm and access to the pinned downstream installer.
[INSTALL.md](INSTALL.md) covers the wizard, explicit options, replacements,
updates, package names, environment overrides and maintainer publication.

### Choose global and project selections explicitly

Preview core globally and data locally for Pi and Codex:

```fish
npx @tahabakhit/skills@latest --global core --local data --agents pi,codex --dry-run
```

After reviewing the plan, replace `--dry-run` with `--yes` to execute it. Groups
can be replaced with individual names, such as `testing-work,code-review`.
Use `--project /path/to/project` for another repository and `--list` to inspect
available choices. Do not add `--replace` until you have checked existing owners.

Pi and Codex share `.agents/skills` under this installer. Claude Code receives its
own copy. The CLI verifies copied files, agent receipts and lock records. A failure
can leave a completed scope or partial install; it does not claim atomic rollback.
Restart the agent after installing. Start a fresh session when replacing workflows.

### Current source groups and published packages

| Group | npm package | Source count | Published 0.3.0 count |
| --- | --- | --- | --- |
| All groups | `@tahabakhit/skills` | 23 | 30 |
| Core | `@tahabakhit/skills-core` | 5 | 5 |
| Engineering | `@tahabakhit/skills-engineering` | 11 | 11 |
| Content | `@tahabakhit/skills-content` | 2 | 2 |
| Design review | `@tahabakhit/skills-design` | 1 | 1 |
| Data | `@tahabakhit/skills-data` | 2 | 2 |
| Configuration drift and dotfiles | `@tahabakhit/skills-operations` | 2 | 9 |

Source counts describe this checkout; published counts describe immutable npm
`0.3.0`, not the older `0.2.0` contents. Source edits do not update the registry.
Core contains `discover-work`, `define-work`, `research-work`, `verify-and-stop`
and `unslop`. Current operations contains only `managed-config-drift` and `chezmoi`.
`safe-refactor` and `migration` use `change-safely`; `technical-writing` uses
`create-content`. `herdr-core` was never included in this collection; it and `ketch` remain
external CLI-managed integrations. Historical audits are not current ownership evidence.
See [the installed-skill migration guide](audits/installed-skill-import.md)
before replacing local copies.
Each domain package offers the same selector restricted to its own group, for
example `npx @tahabakhit/skills-data@latest`. There is one canonical source per
skill. Generated packages preserve complete supporting files, licenses and
provenance. No package requires another skills bundle for instructions.

Do not install the same skill through both the umbrella and a domain package.
These are installation groups, not new owners for the responsibilities documented
in [CATALOG.md](CATALOG.md).

### Select individual skills with the standard CLI

The wrapper is optional. For named selections on the primary source route:

```fish
npx skills@latest add tahabakhit/skills -a pi --skill discover-work --skill define-work
```

That command uses Vercel's own scope/agent questions, not the wrapper's additional
collision and lock-preservation checks. Review replacements before accepting.
Native Pi package loading remains available through the `pi.skills` manifest,
but loads the package's whole skill directory. Use the selector for named choices.
Do not activate both routes for the same skills.

## Use the workflows

Ask the agent to use the relevant skill, or use its supported explicit invocation.
For Pi, examples are:

```text
/skill:discover-work Clarify the outcome and choices for a new export feature.
/skill:define-work Turn our agreed requirements into a testable specification.
/skill:deliver-work Implement the agreed specification and return a tested local candidate. Do not publish.
/skill:testing-work Audit assertion quality without changing production code.
/skill:code-review Review only the staged candidate without editing it.
```

Skip discovery for clear requests. Discovery/specification work does not start
implementation, workers or tracker publication. Delivery continues within existing
authority without a default plan-approval pause. Diagnosis, review and verification
remain separately usable. Passing tests does not grant merge/deploy/publication
authority. Required independent review cannot be replaced with a self-check.

## Chezmoi

`chezmoi` consolidates all nine topics from
[mkobit/chezmoi-skills](https://github.com/mkobit/chezmoi-skills) into one standalone
skill: commands, configuration, file attributes, initialization, machine-specific
configuration, templates, scripts, externals and secrets. Detailed references load
only when relevant. The adaptation adds source/target/state checks, scoped change
boundaries and privacy guidance for previews, hooks and secret providers.

```text
/skill:chezmoi Diagnose why this managed file differs. Do not apply changes.
/skill:chezmoi Add a machine-specific template for this authorized dotfile.
```

Original MIT notices, the pinned source revision, input hashes and local changes
ship inside the selected folder. Structural and disposable CLI checks do not
establish model effectiveness. Existing installed specialist skills remain intact.
The [origin and missing-target report](audits/skill-origins-and-missing-targets.md)
traces the older installed collection separately.

## Coverage and evidence

[The catalog](CATALOG.md) records responsibilities and gaps. The collection does not
provide every framework, OS recovery procedure, advanced statistical method or
binary document engine. OS administration, distribution recovery and workstation health are no longer
included source capabilities. Removing their source does not migrate or retire
any live installation.

Sixteen procedures began as provisional original workflows informed by research
across 20 public repositories. Three now include attributed installed-reference
imports. The retained `managed-config-drift` and `unslop` adaptations have separate pinned
records; the earlier eight-specialist import remains historical evidence, not a
current inventory. Three older companions are attributed forks. The original
discovery pair retains its own ancestry records. Sources, notices and rejected
procedures are in [SOURCES.md](SOURCES.md), [research/README.md](research/README.md)
and each independently selectable folder.

The [32-answer development pilot](evaluations/entrypoint-pilot/RESULTS.md) compares
seven frozen entrypoints against no skill on eight tasks. It does not establish
full-skill effectiveness, automatic routing, tool safety or better real delivery.
Choose skills for a task rather than loading everything by default.
[VERIFICATION.md](VERIFICATION.md) separates recorded checks from untested claims.

The optional debugging polluter helper executes inspected repository tests and is
not a sandbox. It requires Bash, Python 3.9+, POSIX process groups and the project's
npm test contract. Its TypeScript waiting example needs project-specific types.

## Development and release

```fish
npm ci --ignore-scripts
npm run lint
npm test
npm run pack:packages
npm run publish:dry-run
```

The package checks also use Git, jq, Bash and Python 3.9+ for existing helper
fixtures. Running the selector itself needs Node/npm, not Python.

ESLint is dev-only and enforces complexity below 15. Runtime selector code uses
Node built-ins. There are no install hooks. The selector invokes pinned Vercel
`skills@1.7.4` only after confirmation; npx may fetch that package.

Canonical skills stay under `skills/<name>/`. `distribution.json` defines the
non-overlapping package groups. `dist/npm/` and `dist/tarballs/` are disposable,
marked generated output, not edited source copies. Maintainer publication requires
npm authentication for the scope and 2FA where required. GitHub login is separate.
See [the release process](INSTALL.md) before running `npm run publish:packages`.
Published `0.3.0` artifacts come from `9886e55` and are immutable, as are the
older `0.2.0` artifacts from `331fbaf`. Later source or documentation updates do not replace
those bytes. Choose an unused version before preparing another npm release.

[ARCHITECTURE.md](ARCHITECTURE.md) records the architecture and ownership boundaries.
The [historical installed-skill audit](audits/installed-skills.md) remains the
preservation baseline, not permission to replace managed installations.

## License

MIT, with retained ancestor notices where applicable.
See [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md) and folder-local license files.
