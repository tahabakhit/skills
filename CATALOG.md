# Workflow catalog

Current source has 42 purpose-scoped skills under `skills/<group>/<name>/`. Install core once globally and whole domain bundles locally as needed. This is a broad workflow foundation, not every platform, scientific method or professional specialty. Availability does not mean loading every entrypoint and reference into every task.

| Bundle | Normal scope | Count |
| --- | --- | --- |
| [core](skills/core) | Global | 4 |
| [engineering](skills/engineering) | Local | 14 |
| [content](skills/content) | Local | 1 |
| [interface-review](skills/interface-review) | Local | 1 |
| [data](skills/data) | Local | 2 |
| [workstation](skills/workstation) | Global | 4 |
| [linux](skills/linux) | Global, Linux | 5 |
| [macos](skills/macos) | Global, macOS | 1 |
| [agents](skills/agents) | Global | 10 |

The nine bundles are disjoint. [INSTALL.md](INSTALL.md) documents native GitHub tree-source commands, not a custom group flag. Immutable published npm `0.3.0` retains the former 30 skills and old names/guards; source edits do not alter it. The new interface-review package identity is locally generated, not published.

The machine-readable [catalog](catalog.json) records capability boundaries and source records.
`bundle` is the installation/package owner and matches `distribution.json` plus the
source directory. `domain` is the semantic subject area, independent of installation:
research and writing can be globally useful; discovery and verification are cross-domain.
`optionalSkills` records advertised handoffs/judgment owners, not required installs,
a scheduler or a mandatory chain. Missing optional owners never trigger installation.
Recommended scopes are defaults, not permission boundaries; see
[scope choices](INSTALL.md#choose-scope-before-installing). `experimental` means the new workflow is provisional. The older `authored` and `source-import` labels describe origin, not measured reliability. The development pilot covers frozen entrypoints only. It does not promote the whole catalog to proven effectiveness.

## Core — global (4)

| Owner | Responsibility | Does not own |
| --- | --- | --- |
| `discover-work` | Resolve an unclear goal into a bounded brief | Interviewing settled requests or starting delivery |
| `research-work` | Source collection, conflicting evidence and real participant-material synthesis | Exhaustive literature coverage or invented fieldwork |
| `create-content` | Writing, editing, prose cleanup, reports, communications and supported file-production work | A document engine or permission to send/publish |
| `verify-and-stop` | Map existing candidate-bound proof to acceptance | Repairing gaps or publishing because checks pass |

## Engineering — local (14)

| Owner | Responsibility | Does not own |
| --- | --- | --- |
| `repository-onboarding` | Map instructions, behavior owners, setup and safe baseline checks in an unfamiliar repository | Automatic installs, implementation or broad redesign |
| `code-quality` | Ownership, contracts, execution topology, resource lifecycle and language-specific judgments | A second delivery or review workflow |
| `define-work` | Observable requirements and proposed proof | Implementation, scheduling or tracker publication |
| `codebase-design` | Compare concrete module/interface alternatives | Broad architecture audits or new-screen visual design |
| `systematic-debugging` | Evidence-supported diagnosis, performance profiling and authorized correction | Automatic repair during diagnosis or a second delivery loop |
| `deliver-work` | Plan, implement and follow through to the requested endpoint | Replacing domain expertise or granting outward-action permission |
| `testing-work` | Test authoring, TDD, adequacy, properties and mutations | Product changes during test-only work or a mandatory mutation campaign |
| `code-review` | Review the exact requested candidate and reconcile findings | Unrequested fixes, remote review posts or speculative requirements |
| `change-safely` | Behavior-preserving refactors and staged migrations, including relational database guidance | Treating intentional behavior changes as cleanup |
| `git-hygiene` | Writer ownership, candidate capture, commit messages, issue/PR drafts and authorized submission freshness | Implementation, a second delivery loop or unasked publication |
| `ci-maintenance` | Event, trust, revision, setup and required-check contracts | PR waiting or application acceptance from YAML syntax |
| `dependency-updates` | Declared/resolved/installed/shipped versions and compatible candidates | Unscoped upgrades or unrestricted execution of candidate code |
| `release-packaging` | Exact artifact contents, targets and lifecycle evidence | Registry publication or live installation |
| `security-review` | Reachable attack/secret/authorization paths and repair evidence | Universal assurance, unscoped exploitation or scanner installation |

`deliver-work` is the only end-to-end engineering coordinator. Its plan and implementation modes are separately usable. Git constrains writes, tests produce proof, review identifies defects, and verification maps proof to criteria. Reuse the existing record and valid evidence rather than starting another tracker or rerunning every stage.

## Other local bundles

Content contains only `document-review`; interface-review contains only
`interface-review`; and data contains `analyze-data` and `data-pipelines`.

| Owner | Responsibility | Does not supply |
| --- | --- | --- |
| `document-review` | Factual, numerical and inferential review of supplied prose | Specialist statistical/legal review or binary-file editing |
| `interface-review` | Evidence-bounded usability/accessibility review | A new-UI design procedure, certification or a browser adapter |
| `analyze-data` | SQL, measurement, grain, time, cohorts and reconciliation | Database administration or a complete causal/statistical method |
| `data-pipelines` | Transformations, late data, incremental state and replay | Complete dbt/Dagster syntax or production-run authority |

Calculation defaults to `analyze-data`, evidence retrieval to `research-work`, expression to `create-content`, and review findings to `document-review`. These are responsibility defaults, not mandatory sibling dependencies. A reviewer can correct arithmetic from supplied facts without invoking three more workflows. `create-content` owns technical-writing structure, sentence style and repository verification, including the three imported local references. Prose cleanup belongs to `create-content`; the redundant `unslop` entrypoint is removed with no alias.

## Consolidation map

| Components considered | Canonical owner |
| --- | --- |
| Planning, implementation, issue delivery, merge and release follow-through | `deliver-work` modes |
| Commit preparation, issue drafts, PR descriptions and authorized submission mechanics | `git-hygiene` |
| Test-first development, test quality, coverage adequacy, properties and mutations | `testing-work` branches |
| Refactoring and compatibility migrations | `change-safely` branches |
| Technical writing, prose cleanup, editing, marketing, reports, communications and file-production contracts | Core's `create-content` modes/references |
| Evidence investigation and participant-study planning/synthesis | `research-work` |
| SQL, metrics, cohorts and numerical analysis | `analyze-data` |

This is an ownership proposal implemented in source, not experimental proof that merging outperforms separate skills. There are no legacy-name alias folders that secretly load another coordinator. Missing optional owners do not trigger installation.

## Setup cleanup and name map

All entrypoints have the same word bound, including imported material. Source pins,
notices and useful language/platform guidance remain with their owners. Large
TypeSafe and harness audit procedures are loaded only through explicit references.

| Former entrypoint | Current purpose / location |
| --- | --- |
| `codebase-hygiene` | `code-quality`, moved from agents to project engineering |
| `harness-checklist` | `harness-audit`, a read-only environment audit |
| `linux` | `linux-administration`, Linux host operations |
| `macos` | `macos-administration`, macOS host operations |
| `review-judgment` | Optional evidence guidance inside `code-review` |
| `repository-delivery` | Adapted submission judgment inside `git-hygiene`; `deliver-work` retains end-to-end coordination |
| `agent-delegation` | `hc-delegation`, hc-specific child lifecycle, not native subagents |
| `analyze-sessions` | `analyze-pi-sessions`, bounded Pi-history extraction on any supported host |
| `agent-engineering` | `agent-tooling-design`, agent tools and harness extensions |
| `triage-dependency-updates` | `dependency-updates`, assessment and authorized application |
| `communication` | Optional explanation and prose guidance inside `create-content` |

Loaded references are adapted domain judgment, not frozen former skills. Original
source records/licenses remain; root provenance records current adapted bytes. Review
scope/proof/reporting lives in `code-review`, preservation sequencing in `change-safely`,
test authoring in `testing-work`, and writing in `create-content`. `code-quality`
contributes ownership/lifecycle/language judgment rather than parallel workflows.
CI maintenance owns shared environment-contract judgment; standalone debugging copies
are kept identical by regression checks rather than linked across installed folders.
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
| `ci-maintenance`, `git-hygiene` | Existing engineering owners retain detailed setup/environment and Git freshness/cleanup references. No duplicate entrypoints |
| `safe-refactor`, `migration` | Already covered by the separate branches and references in engineering's `change-safely` |
| `technical-writing` | Consolidated into core's `create-content`, including all three useful reference files |
| `unslop` | Removed as redundant; requested prose cleanup belongs to `create-content`, with no alias |
| `herdr-core`, `ketch` | External CLI-managed integrations, not required by this collection. `herdr-core` was never an included skill; audit references are historical, not current ownership evidence |

[The migration guide](audits/installed-skill-import.md) records retained and omitted material, installation choices, ownership checks and rollback. This source import does not remove live folders. Moshi and host-bundled skills retain their separately recorded ownership/license boundaries.

## Explicit coverage gaps

The imported workstation and OS bundles supply administration and recovery guidance,
but their presence does not establish platform recovery effectiveness. New-interface
design, advanced statistics/causal methods, infrastructure and database adapters,
and incident/restore integrations still need substantive procedures and verification. Binary document creation, preservation, recalculation, redaction and accessibility need suitable engines and operation-specific fixtures. Legal, clinical, investment, credit, fraud and privacy-governance expertise are not supplied by a generic research or security label.

Taha Bakhit maintains the repository's source pins, notices, closure checks and evaluation record. The update process lives in [SOURCES.md](SOURCES.md) and [VERIFICATION.md](VERIFICATION.md), not another always-loaded skill. New recurring task classes can justify additional specialist material. An entrypoint count cannot justify retiring knowledge the collection does not contain.
