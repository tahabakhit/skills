# @tahabakhit/skills

25 purpose-scoped skills in seven disjoint bundles. They complement
[pstack](https://github.com/cursor/plugins/tree/main/pstack), which is the assumed
engineering workflow (discovery, design, delivery, debugging, testing, review, writing
and Git submission); skills that overlapped it, or that were really standing rules for
a global `AGENTS.md`, are [archived](archive/README.md). Install the **workstation,
OS and agents bundles globally**, then add **whole local bundles** to the projects
that need them. These are scope defaults: cross-repository users can install
engineering globally instead, and data can be a global opt-in; avoid duplicate
definitions at both scopes. Canonical source
is `skills/<group>/<name>/` at https://github.com/tahabakhit/skills.

## Install for Pi

Global bundles, once per machine (use `macos` instead of `linux` on a Mac):

```fish
npx skills@latest add https://github.com/tahabakhit/skills/tree/main/skills/workstation --skill "*" -a pi --global
npx skills@latest add https://github.com/tahabakhit/skills/tree/main/skills/linux --skill "*" -a pi --global
npx skills@latest add https://github.com/tahabakhit/skills/tree/main/skills/agents --skill "*" -a pi --global
```

From an engineering project, install the engineering bundle locally:

```fish
npx skills@latest add https://github.com/tahabakhit/skills/tree/main/skills/engineering --skill "*" -a pi
```

The GitHub tree URL selects the group source; `--skill "*"` selects every skill
in that source. This is the standard Skills CLI, not a custom native group flag.
Omit `--global` for project bundles. Add `--copy` only if you explicitly want plain
copies instead of the upstream default installation mode. Review destinations and
existing ownership before accepting replacements.

These URLs read remote `main`, not uncommitted checkout changes; use the checkout
wrapper below to install an unpublished local candidate. Use a commit in place of `main`
when a fixed source revision is needed. Older npm releases keep their original
layout and contents. [VERIFICATION.md](VERIFICATION.md) records tested installer
and host-loader versions, checks and remaining limits.

| Bundle | Normal scope | Skills |
| --- | --- | --- |
| [engineering](skills/engineering) | Local | `ci-maintenance`, `dependency-updates`, `release-packaging` (3) |
| [interface-review](skills/interface-review) | Local | `interface-review` (1) |
| [data](skills/data) | Local | `analyze-data`, `data-pipelines` (2) |
| [workstation](skills/workstation) | Global | `chezmoi`, `managed-config-drift`, `shell-scripting`, `backup-restore` (4) |
| [linux](skills/linux) | Global, Linux | `linux-administration`, `linux-desktop`, `arch-linux`, `fedora`, `cachyos` (5) |
| [macos](skills/macos) | Global, macOS | `macos-administration` (1) |
| [agents](skills/agents) | Global | Agent instructions, skill authoring, tooling design, harness audits, session diagnosis, Pi session analysis, prompt caching, Chrome CDP and TypeSafe (9) |

Use the same tree-URL pattern for any local bundle; [INSTALL.md](INSTALL.md) has
all commands. `npx skills@latest add tahabakhit/skills -a pi` remains the repository-wide
all-skill picker, not a group install. A custom installer is not required.

## Install for Claude Code

Each bundle is also a Claude Code plugin, listed in
[.claude-plugin/marketplace.json](.claude-plugin/marketplace.json). Add the
marketplace once, then install the global bundles for your user and other bundles
per project:

```text
/plugin marketplace add tahabakhit/skills
/plugin install workstation@tahabakhit-skills
/plugin install linux@tahabakhit-skills
/plugin install agents@tahabakhit-skills
```

From a project, install a bundle into that project's `.claude/settings.json`:

```sh
claude plugin marketplace add tahabakhit/skills --scope project
claude plugin install engineering@tahabakhit-skills --scope project
```

Plugin skills are namespaced, for example `/workstation:chezmoi`. Update them
through `/plugin`. Do not also install the same bundle with `npx skills -a claude-code`.

## Use the workflows

Ask the agent to use the relevant skill, or invoke it explicitly in Pi:

```text
/skill:chezmoi Show which source file manages ~/.zshrc and what apply would change.
/skill:dependency-updates Assess the outdated packages in this lockfile. Do not apply updates.
/skill:ci-maintenance Find why the required check passes on a different revision than the one tested.
/skill:cachyos Explain which kernel and scheduler this machine is running and why.
```

Engineering work itself (specs, design, implementation, debugging, tests, review,
commits, PRs and technical writing) goes through pstack's `poteto-mode` and its
skills; this repository does not carry competing owners. Evidence and research
standards live in the global `AGENTS.md`, not in a skill.
The agents bundle's scope-focused names are `analyze-pi-sessions` and
`agent-tooling-design`; engineering's update owner is `dependency-updates`.
See [the catalog](CATALOG.md) for exact responsibilities and gaps, and
[scope choices](INSTALL.md#choose-scope-before-installing) before changing installs.

## Optional checkout wrapper and npm status

If you want the additional selector and plan checks, run the wrapper from the
**current checkout**, targeting the receiving project:

```fish
node /path/to/skills-checkout/bin/skills.mjs --global workstation --local engineering --agents pi --project /path/to/project --dry-run
```

Inspect the plan before replacing `--dry-run` with `--yes`. For the wizard, omit
those options. Do not install into the source checkout. See [INSTALL.md](INSTALL.md)
for replacement, shared-agent paths and failure limits.

This is a source-only change; the package version remains `0.3.0`. Published npm
`0.3.0` is immutable: it still has 30 skills, old group names, `unslop`, and the old
custom install guards. It is **not** the grouped source shown above.
`@tahabakhit/skills-interface-review` is a new locally generated identity,
**not a published package**. Existing `skills-design`
and `skills-operations` releases are unchanged. [Release details](INSTALL.md#maintainer-release-process)
cover preparing a future version, not overwriting `0.3.0`.

## Coverage, provenance and safety

The workstation, OS and agent material originated in the owner's dotfiles
(commit `8eb84ae`); provenance retains that history. Current entrypoints all share
the same size bound. Repository/code guidance now belongs to engineering; duplicate
review, delivery and communication entrypoints became optional references of their
canonical owners. See [the cleanup map](CATALOG.md#setup-cleanup-and-name-map) for
renames and installation migration boundaries.
`herdr-core` and `ketch` are
excluded external CLI integrations. Source changes do not migrate or uninstall
live skills. Check current managers before replacing any installed folder; the
[historical migration guide](audits/installed-skill-import.md) is evidence of past
work, not current ownership authority.

Required supporting files, full applicable notices and provenance travel with each
skill. See [SOURCES.md](SOURCES.md), [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)
and [research/README.md](research/README.md). Historical audits, origin pins and
frozen evaluations retain their original paths and inventories.

The [entrypoint pilot](evaluations/entrypoint-pilot/RESULTS.md) is development
evidence, not proof of full-skill effectiveness, automatic routing, tool safety or
better delivery. [VERIFICATION.md](VERIFICATION.md) separates recorded checks from
untested claims. Format-specific document engines, advanced statistics, platform
recovery and professional specialist advice are not supplied by generic workflows.

The optional debugging polluter helper executes inspected repository tests; it is
not a sandbox. It requires Bash, Python 3.9+, POSIX process groups and the project's
npm test contract. Its TypeScript waiting example needs project-specific types.

## Development

```fish
npm ci --ignore-scripts
npm run check
```

`npm run check` runs lint, offline tests and local package packing; it does not
install skills or publish. See [CONTRIBUTING.md](CONTRIBUTING.md) for prerequisites,
focused checks and CI coverage. Release dry runs are separate maintainer actions.

The checkout wrapper requires Node.js 22.20+ and npm; it uses Node built-ins and
invokes pinned Vercel `skills@1.7.4` only after confirmation. The primary native
route uses `skills@latest` and that version's runtime requirements. Development
checks also use Git, jq, Bash and Python 3.9+ for existing helper fixtures. ESLint
is dev-only and enforces complexity below 15. There are no install hooks.

`distribution.json` defines the package partition. `dist/npm/` and `dist/tarballs/`
are disposable generated output, not edited source. Publication requires a new
unused version, exact-artifact approval, secret scans, scope authentication and
2FA where required; GitHub authentication is separate. See [INSTALL.md](INSTALL.md)
and [ARCHITECTURE.md](ARCHITECTURE.md).

## License

MIT, with retained ancestor notices where applicable. See
[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md) and folder-local licenses.
