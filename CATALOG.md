# Workflow catalog

Current source has 19 purpose-scoped skills under `skills/<group>/<name>/`.
[pstack](https://github.com/cursor/plugins/tree/main/pstack) is the assumed
engineering workflow. The existing 17 [archived skills](archive/README.md) remain
outside discovery. Install all five bundles globally on every supported platform,
including both OS bundles. Availability does not preload entrypoints or references.

| Bundle | Normal scope | Count |
| --- | --- | --- |
| [engineering](skills/engineering) | Global | 3 |
| [workstation](skills/workstation) | Global | 4 |
| [linux](skills/linux) | Global | 5 |
| [macos](skills/macos) | Global | 1 |
| [agents](skills/agents) | Global | 6 |

The five bundles are disjoint. [INSTALL.md](INSTALL.md) documents one Pi Git package,
five native Claude Code/Codex plugins, and alternative Skills CLI commands.
Immutable published npm `0.3.0` retains its former 30 skills and old names/guards.

The machine-readable [catalog](catalog.json) records capability boundaries and source records.
`bundle` is the installation/package owner and matches `distribution.json` plus the
source directory. `domain` is the semantic subject area, independent of installation.
`optionalSkills` records advertised handoffs/judgment owners, not required installs,
a scheduler or a mandatory chain. Missing optional owners never trigger installation.
Recommended scopes are defaults, not permission boundaries; see
[scope choices](INSTALL.md#choose-scope-before-installing). `experimental` means the new workflow is provisional. The older `authored` and `source-import` labels describe origin, not measured reliability. The development pilot covers frozen entrypoints only. It does not promote the whole catalog to proven effectiveness.

## Engineering (3)

| Owner | Responsibility | Does not own |
| --- | --- | --- |
| `ci-maintenance` | Event, trust, revision, setup and required-check contracts | PR waiting or application acceptance from YAML syntax |
| `dependency-updates` | Declared/resolved/installed/shipped versions and compatible candidates | Unscoped upgrades or unrestricted execution of candidate code |
| `release-packaging` | Exact artifact contents, targets and lifecycle evidence | Registry publication or live installation |

These cover what pstack lacks: CI design and hardening (pstack's `fix-ci` only repairs failing checks), dependency assessment and release artifacts. Specs, design, implementation, debugging, tests, review, security review and Git submission belong to pstack's `poteto-mode` and its skills.

## Workstation, OS and agent specialists

Workstation owns chezmoi, managed configuration drift, shell scripting, and backup
and restore. Linux owns host and desktop administration plus Arch, Fedora and
CachyOS overlays. macOS owns Apple silicon administration.

Agents owns instructions, skill authoring, tooling design, session diagnosis,
harness audits, and prompt caching. Session diagnostics discovers available
bounded native history controls or reports a capability gap. It does not supply
a history reader.

`analyze-pi-sessions`, `chrome-cdp`, `typesafe-ai`, `analyze-data`,
`data-pipelines`, and `interface-review` are excluded. Their active source trees
are deleted, with no new archive or aliases. Data analysis, pipelines, browser
control and interface review require separately available capabilities.

## Consolidation map

| Components considered | Canonical owner |
| --- | --- |
| Planning, implementation, debugging, tests, review, refactoring, migrations, commits and PRs | pstack (`poteto-mode` playbooks and skills); the former owners are [archived](archive/README.md) |
| Writing, editing, prose cleanup, research and document review | pstack's `technical-writing`/`unslop` and the global `AGENTS.md` evidence standards; the former owners are archived |

This is an ownership proposal implemented in source, not experimental proof that merging outperforms separate skills. There are no legacy-name alias folders that secretly load another coordinator. Missing optional owners do not trigger installation.

## Setup cleanup and name map

All entrypoints have the same word bound, including imported material. Source pins,
notices and useful language/platform guidance remain with their owners. The large
harness audit procedure loads only through an explicit reference.

| Former entrypoint | Current purpose / location |
| --- | --- |
| `codebase-hygiene` | `code-quality`, since archived in favour of pstack |
| `harness-checklist` | `harness-audit`, a read-only environment audit |
| `linux` | `linux-administration`, Linux host operations |
| `macos` | `macos-administration`, macOS host operations |
| `review-judgment` | Guidance inside `code-review`, since archived in favour of pstack |
| `repository-delivery` | Submission judgment inside `git-hygiene`, since archived in favour of pstack |
| `agent-delegation` | `hc-delegation`, since archived; pstack subagents and Orca orchestration replace it |
| `analyze-sessions`, `analyze-pi-sessions` | Removed. Session diagnostics uses available bounded native controls or reports a gap |
| `agent-engineering` | `agent-tooling-design`, agent tools and harness extensions |
| `triage-dependency-updates` | `dependency-updates`, assessment and authorized application |
| `communication` | Guidance inside `create-content`, since archived |

Loaded references are adapted domain judgment, not frozen former skills. Original
source records/licenses remain; root provenance records current adapted bytes. CI maintenance owns environment-contract judgment.
Fedora supplies package/policy/deployment overlays; generic desktop/service diagnosis
starts with the corresponding Linux owner.

No legacy entrypoint aliases are installed. Updating source does not remove an old
installed skill: inspect manager ownership and lockfiles, replace the applicable
bundle, verify the new names, then remove obsolete copies through their owning
manager. Do not delete unmanaged or unrelated folders. Published 0.3.0 and historical
records retain their old identities. Original dotfiles import records (commit
`8eb84ae`) remain in provenance; they are origin evidence, not claims that current
content is unchanged.

## Historical installed-skill audit and current source disposition

The catalog itself does not change live skills, links, locks, host settings or chezmoi sources. The [installed-skill audit](audits/installed-skills.md) remains a historical preservation baseline, not current installation ownership evidence.

| Existing audited capability | Source-repository disposition |
| --- | --- |
| `operate-systems`, `arch-package-maintenance`, `arch-update-recovery`, `rhel-fedora`, `workstation-health-triage` | Replaced by the dotfiles-era `linux`, `arch-linux`, `cachyos` and `fedora` skills, now back here in the `linux` bundle. Immutable npm `0.3.0` retains the old copies |
| `chezmoi`, `managed-config-drift` | Returned from the owner's dotfiles into the `workstation` bundle |
| `ci-maintenance`, `git-hygiene` | `ci-maintenance` retains setup/environment references; `git-hygiene` is archived in favour of pstack |
| `safe-refactor`, `migration` | Covered by pstack (`change-safely` is archived) |
| `technical-writing` | pstack ships `technical-writing`; the three reference files are archived with `create-content` |
| `unslop` | Not carried here; pstack ships `unslop` |
| `herdr-core`, `ketch` | External CLI-managed integrations, not required by this collection. `herdr-core` was never an included skill; audit references are historical, not current ownership evidence |

[The migration guide](audits/installed-skill-import.md) records retained and omitted material, installation choices, ownership checks and rollback. This source import does not remove live folders. Moshi and host-bundled skills retain their separately recorded ownership/license boundaries.

## Explicit coverage gaps

The imported workstation and OS bundles supply administration and recovery guidance,
but their presence does not establish platform recovery effectiveness. New-interface
design, advanced statistics/causal methods, infrastructure and database adapters,
and incident/restore integrations still need substantive procedures and verification. Binary document creation, preservation, recalculation, redaction and accessibility need suitable engines and operation-specific fixtures. Legal, clinical, investment, credit, fraud and privacy-governance expertise are not supplied by a generic research or security label.

Taha Bakhit maintains the repository's source pins, notices, closure checks and evaluation record. The update process lives in [SOURCES.md](SOURCES.md) and [VERIFICATION.md](VERIFICATION.md), not another always-loaded skill. New recurring task classes can justify additional specialist material. An entrypoint count cannot justify retiring knowledge the collection does not contain.
