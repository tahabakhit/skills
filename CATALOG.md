# Workflow catalog

The collection has 21 canonical workflow owners. It is a broad workflow foundation, not a claim to contain every platform, scientific method or professional specialty. Install only the owners useful for the project. Availability does not mean loading every entrypoint and reference into every task.

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
| `operate-systems` | Platform-aware Linux diagnosis and scoped change | The audited distribution-specific recovery procedures |

Calculation defaults to `analyze-data`, evidence retrieval to `research-work`, expression to `create-content`, and review findings to `document-review`. These are responsibility defaults, not mandatory sibling dependencies. A reviewer can correct arithmetic from supplied facts without invoking three more workflows. `create-content` also owns reusable editorial guidance. No public skill depends on a private `unslop` installation.

## Consolidation map

| Components considered | Canonical owner |
| --- | --- |
| Planning, implementation, issue delivery, PR and release follow-through | `deliver-work` modes |
| Test-first development, test quality, coverage adequacy, properties and mutations | `testing-work` branches |
| Refactoring and compatibility migrations | `change-safely` branches |
| Technical writing, editing, marketing, reports, communications and file-production contracts | `create-content` modes/references |
| Evidence investigation and participant-study planning/synthesis | `research-work` |
| SQL, metrics, cohorts and numerical analysis | `analyze-data` |

This is an ownership proposal implemented in source, not experimental proof that merging outperforms separate skills. There are no legacy-name alias folders that secretly load another coordinator. Missing optional owners do not trigger installation.

## Audited installations remain separate

No live skill, link, lockfile, host setting or chezmoi source is changed by this catalog. The [installed-skill audit](audits/installed-skills.md) remains the preservation baseline.

| Existing audited capability | Source-repository disposition |
| --- | --- |
| `arch-linux` | Deferred specialist import. Existing installed procedure is not retired |
| `arch-package-maintenance` | Deferred package-authoring specialist, not absorbed by dependency triage |
| `arch-update-recovery` | Deferred transaction/boot-recovery specialist, not absorbed by generic operations |
| `cachyos` | Deferred component-specific knowledge, not assumed on other Linux hosts |
| `rhel-fedora` | Deferred attributed adaptation. Privacy, authority and ownership repairs remain required |
| `managed-config-drift` | Deferred specialist. Fix claimed comparison bounds before importing its helper |
| `workstation-health-triage` | Deferred collector. Preserve distro-specific probe applicability and output privacy |
| `ci-maintenance`, `git-hygiene` | New original owners cover selected workflow methods. They are not byte-preserving replacements for every old reference |
| `safe-refactor`, `migration` | Combined source-repository owner `change-safely`, with separate branches. No live replacement |
| `technical-writing` | General expression work belongs to `create-content`. Do not assume every installed technical-writing procedure was imported |
| `unslop` | Private active style remains external. No hidden required public dependency |
| `herdr-core` | Optional host integration, not a required coordinator or migrated installation |

Moshi and host-bundled skills retain their separately recorded ownership/license boundaries. This work does not reconcile or remove them.

## Explicit coverage gaps

New-interface design, advanced statistics/causal methods, infrastructure and database adapters, and incident/restore playbooks need substantive procedures and their own verification. Binary document creation, preservation, recalculation, redaction and accessibility need suitable engines and operation-specific fixtures. Legal, clinical, investment, credit, fraud and privacy-governance expertise are not supplied by a generic research or security label.

Taha Bakhit maintains the repository's source pins, notices, closure checks and evaluation record. The update process lives in [SOURCES.md](SOURCES.md) and [VERIFICATION.md](VERIFICATION.md), not another always-loaded skill. New recurring task classes can justify additional specialist material. An entrypoint count cannot justify retiring knowledge the collection does not contain.
