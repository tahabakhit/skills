# Standalone skill system

The approved source layout has **44 canonical workflow owners** in nine disjoint
bundles at `skills/<group>/<name>/`. This document defines ownership and distribution,
not authority to install, migrate, publish or deploy. Host behavior and native
bundle installation require integration evidence; documentation alone is not a
passing check. [CATALOG.md](CATALOG.md) records responsibilities and coverage gaps.

## Decisions

| Area | Decision |
| --- | --- |
| Ownership | One canonical source per workflow, including its required supporting files, licenses and provenance. Instructions must not require another person's skill bundle. |
| Audience | Primarily Taha's use, but shareable. Private preferences and personal permissions stay in global `AGENTS.md`, separately managed by chezmoi. |
| Sources | Adapt reviewed material with exact revisions, full applicable notices, input identities and local changes recorded. |
| Hosts | Target Pi, Claude Code and Codex; verify actual discovery and behavior rather than claiming compatibility from file placement. |
| Distribution | Standard Skills CLI with a GitHub group tree URL and `--skill "*" -a pi`; one-time global core plus whole local bundles. The checkout wrapper is optional. |
| Progress | No default plan-approval pause. Continue within the requested endpoint and existing authority; pause for unresolved consequential decisions, changed scope or missing permission. |
| Interaction | Ask simple questions one at a time when user decisions are needed; investigate discoverable facts first. |
| Review | Ordinary tasks may use one agent, but required independent review cannot be replaced with self-review. Report missing capabilities honestly. |
| Simplification | Remove steps based on their actual cost and benefit to correctness, coordination and interaction, not length alone. |

Discovery or specification requests do not silently start implementation, workers
or tracker publication. Passing tests does not grant merge, publication or deployment
authority. Skills may use normal installed tools, but must check required capabilities;
standalone does not mean tool-free.

## Bundle and scope boundaries

| Bundle | Normal scope | Canonical owners |
| --- | --- | --- |
| core | Global | `discover-work`, `research-work`, `create-content`, `verify-and-stop` (4) |
| engineering | Local | `define-work`, `codebase-design`, `systematic-debugging`, `deliver-work`, `testing-work`, `code-review`, `change-safely`, `git-hygiene`, `ci-maintenance`, `triage-dependency-updates`, `release-packaging`, `security-review` (12) |
| content | Local | `document-review` (1) |
| interface-review | Local | `interface-review` (1) |
| data | Local | `analyze-data`, `data-pipelines` (2) |

`create-content` owns shared writing and prose cleanup. The redundant `unslop`
entrypoint is removed with no alias. `define-work` is a project engineering skill,
not global core. Bundle names describe installation sources, not competing workflow
owners or a new profile framework. The `workstation`, `linux`, `macos` and `agents` bundles moved here unchanged
from the owner's dotfiles (commit `8eb84ae`); each `PROVENANCE.json` says so. They
are exempt from the entrypoint word limit and still overlap some engineering/core
owners (`codebase-hygiene`, `review-judgment`, `repository-delivery`,
`communication`) until reviewed. `herdr-core` and `ketch` remain excluded CLI integrations.

## Native distribution and optional adapter

The clean Pi journey uses standard commands:

```fish
npx skills@latest add https://github.com/tahabakhit/skills/tree/main/skills/core --skill "*" -a pi --global
npx skills@latest add https://github.com/tahabakhit/skills/tree/main/skills/engineering --skill "*" -a pi
```

The tree URL narrows the source to one bundle; the quoted wildcard selects all
skills in it. Other domain bundles follow the same pattern without `--global`.
Add `--copy` only for explicitly desired plain copies, not as a hidden default.
The root repository remains an all-skill picker. No native group flag, dependency
resolver, custom profile framework or auto-migration is implied. These future
committed `main` URLs depend on the grouped source landing there; install support
and scope behavior remain subject to integration checks.

The `pi.skills` manifest remains `["./skills"]`; recursive Pi package discovery
must be verified separately. Do not load the same skill through both package
registration and a Skills CLI installation.

`distribution.json` partitions the same canonical folders into nine generated domain
packages and an umbrella. `dist/npm/` and `dist/tarballs/` are disposable generated
output, not edited source copies. Required files must travel with their owner;
optional sibling handoffs do not become mandatory bundle dependencies. Audit local
links and supporting-file closure after moves and before packaging.

The optional current-checkout adapter (`node bin/skills.mjs`) resolves group/skill
selections into pinned Vercel Skills CLI 1.7.4 invocations, with explicit scope,
agent, collision/lock checks, plan consent and artifact verification. It does not
replace the native route or write host settings. It has no runtime libraries or
install hooks. Current source has no custom `.taha-install` guards or replacement
inter-process lock: serialize installers, and do not treat snapshots as concurrency
protection. Failures can leave partial installs; no atomic rollback is promised.
[INSTALL.md](INSTALL.md) describes exact replacement and release limits.

## Source and registry are different identities

This is a source-only change at package version `0.3.0`, not a new release.
Immutable npm `0.3.0` still contains the former 30 skills, old group names,
`unslop` and custom guards. Existing `skills-design` and `skills-operations`
releases are unchanged. The new `@tahabakhit/skills-interface-review` identity is generated locally, not
published.
A future npm release needs an unused version, approved exact artifacts, secret
scans, explicit release authority and registry verification. Source/documentation
commits cannot replace published bytes.

## One owner for each workflow

`deliver-work` is the only end-to-end engineering coordinator; plan and implementation
modes remain separately usable. Domain skills contribute expertise without starting
a second delivery process. CI owns pipeline contracts, Git owns writer/candidate
freshness, testing supplies proof, review supplies findings, and verification maps
candidate-bound evidence to acceptance. Reuse sufficient records and valid evidence
rather than creating competing trackers or rerunning every stage.

Each skill needs clear triggers, exclusions, output, capabilities, action boundaries,
handoffs and a stopping point. Distinguish required dependencies from optional
specialists. Frontmatter does not create a permission boundary or guarantee host
interpretation. Missing optional owners never trigger silent installation.

## Existing installations and historical evidence

The [installed-skill audit](audits/installed-skills.md) is a historical preservation
baseline, not current ownership evidence. It verified 50 regular files across 12
Bolens-derived folders against the pin in [SOURCES.md](SOURCES.md). File equality
does not establish authorship or an active manager. Historical observations about
chezmoi-managed `herdr-core`, Fedora files or Claude links do not grant permission
to replace them today. `herdr-core` was never included in this collection.

Preserve complete directories, notices, local modifications, origin pins and
frozen evaluation snapshots. Historical paths and inventories remain historical;
only current source references follow `skills/<group>/<name>/`. Moshi, host-bundled
skills and separate synced directories retain their own ownership/license boundaries.

Before any authorized live migration, inspect current managers and links, test in
isolated homes/projects and retain a rollback path. Retire old chezmoi entries
separately so they do not recreate competing copies. Source movement does not
apply live changes or remove old names. Verify host discovery of private global
instructions with harmless synthetic fixtures, without publishing private rules.

## Verification boundaries and gaps

Structural checks should cover metadata, links, licenses, complete support files,
package contents and required dependency closure. Disposable installation checks
should cover group discovery, global/local scope, all target hosts, collisions,
duplicate discovery, updates, removal and rollback. Native Pi recursive loading
needs its own observed result. Neither copied files nor npm availability proves
host behavior.

Fresh model cases should test triggers, unrelated-work exclusion, useful questions,
permissions, missing tools, private instruction discovery and stopping behavior.
Compare representative work with no skill and a short generic control. The
[entrypoint pilot](evaluations/entrypoint-pilot/RESULTS.md) is frozen development
evidence, not proof of full-skill uplift. [VERIFICATION.md](VERIFICATION.md) keeps
recorded checks separate from untested claims; this docs unit does not perform
native install tests.

Platform recovery, advanced statistical/causal methods, infrastructure/database
adapters, incident/restore playbooks and format-specific document engines remain
substantive gaps. Add material for recurring tasks with concrete evidence, not
labels. Source maintenance belongs to this repository's maintainer; there is no
hidden updater, profile system or automatic ownership migration.
