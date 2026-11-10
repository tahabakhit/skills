# @tahabakhit/skills

19 purpose-scoped skills in five disjoint global bundles. They complement
[pstack](https://github.com/cursor/plugins/tree/main/pstack), the assumed
engineering workflow. The existing 17 overlapping skills remain
[archived](archive/README.md). Six owner-excluded skills are removed, not archived.

Canonical source is `skills/<group>/<name>/` at https://github.com/tahabakhit/skills.
All five bundles, including both OS bundles, are available globally on every
supported platform. Skill bodies and optional references load for relevant tasks,
not into every conversation. Global `AGENTS.md` stays separately managed.

## Install for Pi

Use one native Git package declaration:

```sh
pi install git:github.com/tahabakhit/skills
```

The package manifest exposes `./skills`. Dotfiles declares that same source once
in Pi's global settings instead of copying skills. Do not also load these skills
through Skills CLI copies or another checkout. See [INSTALL.md](INSTALL.md) for
scope overrides and [VERIFICATION.md](VERIFICATION.md) for discovery checks.

| Bundle | Normal scope | Skills |
| --- | --- | --- |
| [engineering](skills/engineering) | Global | `ci-maintenance`, `dependency-updates`, `release-packaging` (3) |
| [workstation](skills/workstation) | Global | `chezmoi`, `managed-config-drift`, `shell-scripting`, `backup-restore` (4) |
| [linux](skills/linux) | Global | `linux-administration`, `linux-desktop`, `arch-linux`, `fedora`, `cachyos` (5) |
| [macos](skills/macos) | Global | `macos-administration` (1) |
| [agents](skills/agents) | Global | `agents-md`, `skill-authoring`, `agent-tooling-design`, `agent-session-diagnostics`, `harness-audit`, `prompt-caching` (6) |

## Install for Claude Code and Codex

Each bundle is a native plugin in
[.claude-plugin/marketplace.json](.claude-plugin/marketplace.json). Register the
marketplace once, then install all five bundles for your user:

```sh
claude plugin marketplace add tahabakhit/skills
codex plugin marketplace add tahabakhit/skills
for bundle in engineering workstation agents linux macos; do
    claude plugin install --scope user "$bundle@tahabakhit-skills"
    codex plugin add "$bundle@tahabakhit-skills"
done
```

Plugin skills are namespaced, for example `/workstation:chezmoi`. Native managers
own their caches and registrations. Do not also install the same bundles with
`npx skills`. Refresh stale marketplaces before fresh installs.
[INSTALL.md](INSTALL.md) describes scoped maintenance and its verification limits.

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
Agent tooling design and bounded session diagnosis stay in the agents bundle;
engineering's update owner is `dependency-updates`.
See [the catalog](CATALOG.md) for exact responsibilities and gaps, and
[scope choices](INSTALL.md#choose-scope-before-installing) before changing installs.

## Optional checkout wrapper and npm status

If you want the additional selector and plan checks, run the wrapper from the
**current checkout**, targeting the receiving project:

```fish
node /path/to/skills-checkout/bin/skills.mjs --global all --agents pi --project /path/to/project --dry-run
```

Inspect the plan before replacing `--dry-run` with `--yes`. For the wizard, omit
those options. Do not install into the source checkout. See [INSTALL.md](INSTALL.md)
for replacement, shared-agent paths and failure limits.

This is a source-only change; the package version remains `0.3.0`. Published npm
`0.3.0` is immutable: it still has 30 skills, old group names, `unslop`, and the old
custom install guards. It is **not** the grouped source shown above.
Current source generates only the five group packages and the umbrella.
Existing data, design, and operations releases are unchanged. [Release details](INSTALL.md#maintainer-release-process)
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

Archived debugging helpers and examples remain historical material. They are not
part of the active collection or generated packages.

## Development

```fish
npm ci --ignore-scripts
npm run check
```

`npm run check` runs lint, offline tests and local package packing; it does not
install skills or publish. See [CONTRIBUTING.md](CONTRIBUTING.md) for prerequisites,
focused checks and CI coverage. Release dry runs are separate maintainer actions.

The checkout wrapper requires Node.js 22.20+ and npm; it uses Node built-ins and
invokes pinned Vercel `skills@1.7.4` only after confirmation. The alternative Skills
CLI route uses `skills@latest` and that version's runtime requirements. Development
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
