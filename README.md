# @tahabakhit/skills

43 standalone workflow skills in nine disjoint bundles. Install **core once globally**,
then add **whole local bundles** to the projects that need them. Canonical source
is `skills/<group>/<name>/` at https://github.com/tahabakhit/skills.

## Install for Pi

One-time global core:

```fish
npx skills@latest add https://github.com/tahabakhit/skills/tree/main/skills/core --skill "*" -a pi --global
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

These URLs follow the grouped source on `main`; use a commit in place of `main`
when a fixed source revision is needed. Older npm releases keep their original
layout and contents. [VERIFICATION.md](VERIFICATION.md) records tested installer
and host-loader versions, checks and remaining limits.

| Bundle | Normal scope | Skills |
| --- | --- | --- |
| [core](skills/core) | Global | `discover-work`, `research-work`, `create-content`, `verify-and-stop` (4) |
| [engineering](skills/engineering) | Local | Specification, design, debugging, delivery, tests, review, safe changes, Git, CI, dependencies, packaging, security (12) |
| [content](skills/content) | Local | `document-review` (1) |
| [interface-review](skills/interface-review) | Local | `interface-review` (1) |
| [data](skills/data) | Local | `analyze-data`, `data-pipelines` (2) |
| [workstation](skills/workstation) | Global | `chezmoi`, `managed-config-drift`, `shell-scripting`, `backup-restore` (4) |
| [linux](skills/linux) | Global, Linux | `linux`, `linux-desktop`, `arch-linux`, `fedora`, `cachyos` (5) |
| [macos](skills/macos) | Global, macOS | `macos` (1) |
| [agents](skills/agents) | Global | Agent instructions, skills, harnesses, sessions, Chrome CDP, TypeSafe, code/review/delivery judgment, communication (13) |

Use the same tree-URL pattern for any local bundle; [INSTALL.md](INSTALL.md) has
all commands. `npx skills@latest add tahabakhit/skills -a pi` remains the repository-wide
all-skill picker, not a group install. A custom installer is not required.

## Install for Claude Code

Each bundle is also a Claude Code plugin, listed in
[.claude-plugin/marketplace.json](.claude-plugin/marketplace.json). Add the
marketplace once, then install core for your user and other bundles per project:

```text
/plugin marketplace add tahabakhit/skills
/plugin install core@tahabakhit-skills
```

From a project, install a bundle into that project's `.claude/settings.json`:

```sh
claude plugin marketplace add tahabakhit/skills --scope project
claude plugin install engineering@tahabakhit-skills --scope project
```

Plugin skills are namespaced, for example `/core:verify-and-stop`. Update them
through `/plugin`. Do not also install the same bundle with `npx skills -a claude-code`.

## Use the workflows

Ask the agent to use the relevant skill, or invoke it explicitly in Pi:

```text
/skill:discover-work Clarify the outcome and choices for a new export feature.
/skill:define-work Turn our agreed requirements into a testable specification.
/skill:deliver-work Implement the agreed specification and return a tested local candidate. Do not publish.
/skill:testing-work Audit assertion quality without changing production code.
/skill:code-review Review only the staged candidate without editing it.
```

Skip discovery for clear requests. Discovery/specification does not start delivery,
workers or tracker publication. Delivery continues within existing authority without
a default plan-approval pause. Diagnosis, review and verification remain separately
usable. Passing tests grants no merge/deploy/publication authority; self-checks do
not replace required independent review.

`create-content` owns writing and prose cleanup in core. The redundant `unslop`
entrypoint is removed, with no alias. `define-work` belongs to engineering.
See [the catalog](CATALOG.md) for exact responsibilities and gaps.

## Optional checkout wrapper and npm status

If you want the additional selector and plan checks, run the wrapper from the
**current checkout**, targeting the receiving project:

```fish
node /path/to/skills-checkout/bin/skills.mjs --global core --local engineering --agents pi --project /path/to/project --dry-run
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

The `workstation`, `linux`, `macos` and `agents` bundles moved here unchanged
from the owner's dotfiles (commit `8eb84ae`); each `PROVENANCE.json` says so. They
are exempt from the entrypoint word limit and still overlap some engineering/core
owners (`codebase-hygiene`, `review-judgment`, `repository-delivery`,
`communication`) until reviewed.
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
