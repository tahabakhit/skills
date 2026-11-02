# Workflow catalog

Current source has 23 canonical workflow owners. Immutable published npm `0.3.0` retains the former 30-skill catalog; source edits do not change registry artifacts. It is a broad workflow foundation, not a claim to contain every platform, scientific method or professional specialty. Install only the owners useful for the project. Availability does not mean loading every entrypoint and reference into every task.

The machine-readable [catalog](catalog.json) records capability boundaries and source records. `experimental` means the new workflow is provisional. The older `authored` and `source-import` labels describe origin, not measured reliability. The development pilot covers frozen entrypoints only. It does not promote the whole catalog to proven effectiveness.

## Engineering

| Owner | Responsibility | Does not own |
| --- | --- | --- |
| `discover-work` | Resolve an unclear goal into a bounded brief | Interviewing settled requests or starting delivery |
| `define-work` | Observable requirements and proposed proof | Implementation, scheduling or tracker publication |
| `codebase-design` | Compare concrete module/interface alternatives | Broad architecture audits or new-screen visual design |
| `systematic-debugging` | Evidence-supported cause and an authorized correction | Automatic repair during diagnosis or a second delivery loop |
| `verify-and-stop` | Map existing candidate-bound proof to acceptance | Repairing gaps or publishing because checks pass |
| `deliver-work` | Plan, implement and follow through to the requested endpoint | Replacing domain expertise or granting outward-action permission |
| `testing-work` | Test authoring, TDD, adequacy, properties and mutations | Product changes during test-only work or a mandatory mutation campaign |
| `code-review` | Review the exact requested candidate and reconcile findings | Unrequested fixes, remote review posts or speculative requirements |
| `change-safely` | Behavior-preserving refactors and staged compatible migrations | Treating intentional behavior changes as cleanup |
| `git-hygiene` | Writer ownership, candidate capture and integration freshness | A second work graph or unconditional cleanup |
| `ci-maintenance` | Event, trust, revision, setup and required-check contracts | PR waiting or application acceptance from YAML syntax |
| `triage-dependency-updates` | Declared/resolved/installed/shipped versions and compatible candidates | Unscoped upgrades or unrestricted execution of candidate code |
| `release-packaging` | Exact artifact contents, targets and lifecycle evidence | Registry publication or live installation |
| `security-review` | Reachable attack/secret/authorization paths and repair evidence | Universal assurance, unscoped exploitation or scanner installation |

`deliver-work` is the only end-to-end engineering coordinator. Its plan and implementation modes are separately usable. Git constrains writes, tests produce proof, review identifies defects, and verification maps proof to criteria. Reuse the existing record and valid evidence rather than starting another tracker or rerunning every stage.

## Research, content, design, data and operations

| Owner | Responsibility | Does not supply |
| --- | --- | --- |
| `research-work` | Source collection, conflicting evidence and real participant-material synthesis | Exhaustive literature coverage or invented fieldwork |
| `create-content` | Writing, editing, reports, communications and supported file-production work | A document engine or permission to send/publish |
| `document-review` | Factual, numerical and inferential review of supplied prose | Specialist statistical/legal review or binary-file editing |
| `interface-review` | Evidence-bounded usability/accessibility review | A new-UI design procedure, certification or a browser adapter |
| `analyze-data` | SQL, measurement, grain, time, cohorts and reconciliation | Database administration or a complete causal/statistical method |
| `data-pipelines` | Transformations, late data, incremental state and replay | Complete dbt/Dagster syntax or production-run authority |
| `managed-config-drift` | Live/source/default ownership and read-only comparison | Automatic reconciliation or a bounded/atomic tree snapshot |
| `unslop` | Requested final prose cleanup, distributed in core | Always-on personal style or unrelated rewrites |
| `chezmoi` | Dotfile source/target/state diagnosis, templates, attributes, scripts, externals, configuration and secrets | Automatic apply/update, credential access or migration of existing skill installations |

Calculation defaults to `analyze-data`, evidence retrieval to `research-work`, expression to `create-content`, and review findings to `document-review`. These are responsibility defaults, not mandatory sibling dependencies. A reviewer can correct arithmetic from supplied facts without invoking three more workflows. `create-content` owns technical-writing structure, sentence style and repository verification, including the three imported local references. `unslop` is a separately selectable core editing pass, not a hidden required dependency.

## Consolidation map

| Components considered | Canonical owner |
| --- | --- |
| Planning, implementation, issue delivery, PR and release follow-through | `deliver-work` modes |
| Test-first development, test quality, coverage adequacy, properties and mutations | `testing-work` branches |
| Refactoring and compatibility migrations | `change-safely` branches |
| Technical writing, editing, marketing, reports, communications and file-production contracts | `create-content` modes/references |
| Evidence investigation and participant-study planning/synthesis | `research-work` |
| SQL, metrics, cohorts and numerical analysis | `analyze-data` |
| Nine mkobit chezmoi topics, with detailed local references | `chezmoi` |

This is an ownership proposal implemented in source, not experimental proof that merging outperforms separate skills. There are no legacy-name alias folders that secretly load another coordinator. Missing optional owners do not trigger installation.

The operations installation group contains only `managed-config-drift` and
`chezmoi` (2). The seven OS/platform/health skills are no longer in source.

## Historical installed-skill audit and current source disposition

The catalog itself does not change live skills, links, locks, host settings or chezmoi sources. Adding the new `chezmoi` skill does not replace any audited specialist installation. The [installed-skill audit](audits/installed-skills.md) remains a historical preservation baseline, not current installation ownership evidence.

| Existing audited capability | Source-repository disposition |
| --- | --- |
| `operate-systems`, `arch-linux`, `arch-package-maintenance`, `arch-update-recovery`, `cachyos`, `rhel-fedora`, `workstation-health-triage` | Removed from current source; retained in immutable npm `0.3.0`. Historical imports and audits do not establish current live ownership |
| `managed-config-drift` | Operations specialist with unchanged optional comparator and honest unbounded-traversal contract |
| `ci-maintenance`, `git-hygiene` | Existing engineering owners retain detailed setup/environment and Git freshness/cleanup references. No duplicate entrypoints |
| `safe-refactor`, `migration` | Already covered by the separate branches and references in engineering's `change-safely` |
| `technical-writing` | Consolidated into content's `create-content`, including all three useful reference files |
| `unslop` | Added to core, bounded to requested prose rather than universal private policy |
| `herdr-core`, `ketch` | External CLI-managed integrations, not required by this collection. `herdr-core` was never an included skill; audit references are historical, not current ownership evidence |

[The migration guide](audits/installed-skill-import.md) records retained and omitted material, installation choices, ownership checks and rollback. This source import does not remove live folders. Moshi and host-bundled skills retain their separately recorded ownership/license boundaries.

## Explicit coverage gaps

OS administration, distribution-specific package/update recovery, workstation health triage, new-interface design, advanced statistics/causal methods, infrastructure and database adapters, and incident/restore playbooks need substantive procedures and their own verification. Binary document creation, preservation, recalculation, redaction and accessibility need suitable engines and operation-specific fixtures. Legal, clinical, investment, credit, fraud and privacy-governance expertise are not supplied by a generic research or security label.

Taha Bakhit maintains the repository's source pins, notices, closure checks and evaluation record. The update process lives in [SOURCES.md](SOURCES.md) and [VERIFICATION.md](VERIFICATION.md), not another always-loaded skill. New recurring task classes can justify additional specialist material. An entrypoint count cannot justify retiring knowledge the collection does not contain.
