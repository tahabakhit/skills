# Workflow catalog

Workstation, Linux and macOS skills moved to [tahabakhit/dotfiles](https://github.com/tahabakhit/dotfiles)
on 2026-11-15. Chezmoi deploys those nine skills globally; this repository
now ships only engineering (3) and agents (6). Existing installations and
immutable registry releases need separate, explicit migration.

Current source has 9 purpose-scoped skills under `skills/<group>/<name>/`.
The parent harness and chosen workflow own ordinary engineering; this package
does not require [pstack](https://github.com/cursor/plugins/tree/main/pstack).
The existing 17 [archived skills](archive/README.md) remain
outside discovery. Install both bundles globally on every supported platform,
 Availability does not preload entrypoints or references.

| Bundle | Normal scope | Count |
| --- | --- | --- |
| [engineering](skills/engineering) | Global | 3 |
| [agents](skills/agents) | Global | 6 |

The two bundles are disjoint. [INSTALL.md](INSTALL.md) documents one Pi Git package,
two native Claude Code/Codex plugins, and alternative Skills CLI commands.
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

These supply CI design and hardening, dependency assessment and release-artifact
verification. They complement the selected engineering workflow without taking
over planning, ordinary implementation, general review or submission authority.

## Agent specialists

Workstation, Linux and macOS skills now live in [dotfiles](https://github.com/tahabakhit/dotfiles)
and deploy globally through chezmoi. They are absent from this repository’s active
catalog, packages and marketplace.

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
| Planning, implementation, debugging, tests, review, refactoring, migrations, commits and PRs | Parent/project workflow; dotfiles drafts three selected personal workflow skills. Existing pstack remains until separately verified retirement; former owners stay [archived](archive/README.md). |
| Writing, editing, prose cleanup, research and document review | Shared personal preferences and the chosen native or installed capability; former owners remain archived. |

The personal workflow draft is not complete pstack coverage or proof of better
behavior. There are no legacy-name aliases that load another coordinator.
Missing optional owners do not trigger installation.

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
| `agent-delegation` | `hc-delegation`, since archived; current transport stays with native or explicitly configured tools |
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
| `operate-systems`, `arch-package-maintenance`, `arch-update-recovery`, `rhel-fedora`, `workstation-health-triage` | Replaced by the dotfiles-era `linux`, `arch-linux`, `cachyos` and `fedora` skills, now deployed by `tahabakhit/dotfiles`. Immutable npm `0.3.0` retains the old copies |
| `chezmoi`, `managed-config-drift` | Returned from the owner's dotfiles into the `workstation` bundle. On 2026-11-15 `chezmoi` was rewritten as an original drift-resolution procedure and `managed-config-drift` was retired into it. The resulting nine OS/workstation skills now live in dotfiles |
| `ci-maintenance`, `git-hygiene` | `ci-maintenance` retains setup/environment references; `git-hygiene` is archived in favour of pstack |
| `safe-refactor`, `migration` | Chosen engineering workflow (`change-safely` remains archived) |
| `technical-writing` | Optional selected writing capability; the three former reference files remain archived with `create-content` |
| `unslop` | Not carried here; an installed pstack can supply it when selected |
| `herdr-core`, `ketch` | External CLI-managed integrations, not required by this collection. `herdr-core` was never an included skill; audit references are historical, not current ownership evidence |

[The migration guide](audits/installed-skill-import.md) records retained and omitted material, installation choices, ownership checks and rollback. This source import does not remove live folders. Moshi and host-bundled skills retain their separately recorded ownership/license boundaries.

## Explicit coverage gaps

The workstation and OS skills in dotfiles supply administration and recovery guidance,
but their presence does not establish platform recovery effectiveness. New-interface
design, advanced statistics/causal methods, infrastructure and database adapters,
and incident/restore integrations still need substantive procedures and verification. Binary document creation, preservation, recalculation, redaction and accessibility need suitable engines and operation-specific fixtures. Legal, clinical, investment, credit, fraud and privacy-governance expertise are not supplied by a generic research or security label.

Taha Bakhit maintains the repository's source pins, notices, closure checks and evaluation record. The update process lives in [SOURCES.md](SOURCES.md) and [VERIFICATION.md](VERIFICATION.md), not another always-loaded skill. New recurring task classes can justify additional specialist material. An entrypoint count cannot justify retiring knowledge the collection does not contain.
