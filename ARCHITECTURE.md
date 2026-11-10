# Standalone skill system

The approved source layout has **19 purpose-scoped skills** in five disjoint
bundles at `skills/<group>/<name>/`. They complement pstack, the assumed engineering
workflow; skills that overlapped it, or were really standing rules now kept in the
global `AGENTS.md`, live frozen in [archive/](archive/README.md). This document defines ownership and distribution,
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
| Distribution | One native Pi Git package and five Claude Code/Codex user plugins, globally on every supported platform. Skills CLI and the checkout wrapper remain alternatives, not extra loaders. |
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
| engineering | Global | `ci-maintenance`, `dependency-updates`, `release-packaging` (3) |
| workstation | Global | `chezmoi`, `managed-config-drift`, `shell-scripting`, `backup-restore` (4) |
| linux | Global | `linux-administration`, `linux-desktop`, `arch-linux`, `fedora`, `cachyos` (5) |
| macos | Global | `macos-administration` (1) |
| agents | Global | Instructions, skill authoring, tooling design, harness audits, sessions and prompt caching (6) |

Writing is pstack's (`technical-writing`, `unslop`); evidence and research rules are
standards in the global `AGENTS.md`, because they apply to every task rather than
being a procedure to load. Bundle names describe installation sources, not competing workflow
owners or a new profile framework. The workstation, OS and agent bundles originated in the owner's dotfiles (commit
`8eb84ae`), with retained provenance. Current entrypoints share one size bound.
Code-quality guidance belongs to engineering. Review, delivery and communication
judgment is optional local reference material of the existing canonical owners,
not competing entrypoints. [The catalog](CATALOG.md#setup-cleanup-and-name-map)
records renames and migration boundaries. `herdr-core` and `ketch` remain excluded CLI integrations.

## Capability, subject and installation identity

A skill may be a workflow, judgment library or bounded tool adapter. One procedural
owner does not require every capability to coordinate work. `catalog.json.bundle`
is the unique package owner and matches the source path/distribution. `domain` is a
subject label and can differ from the bundle. Optional sibling metadata describes
handoffs, not runtime dependencies, required installations or stage scheduling.

Scopes are recommendations, not capability or permission boundaries. All five
bundles default to global scope, including both OS bundles everywhere. Explicit
project-local overrides remain supported, but do not load duplicate definitions at
both scopes. Skill bodies and references remain task-loaded. See
[scope choices](INSTALL.md#choose-scope-before-installing).

## Native distribution and optional adapter

Pi uses `git:github.com/tahabakhit/skills` once in its package settings. The
`pi.skills` manifest remains `["./skills"]`. Claude Code and Codex use five user
plugins from the marketplace. Dotfiles owns only the declaration and fixed
five-bundle install policy, not bodies, symlinks or native caches.

The standard Skills CLI still accepts a GitHub bundle tree URL and `--skill "*"`.
All bundles default to global scope. An explicit local selection is an alternative,
not a second loader. The optional wrapper accepts unpublished checkout sources.
No custom profile framework, dependency resolver or auto-migration is added.
[INSTALL.md](INSTALL.md) describes scoped maintenance. Native update/reinstall
semantics require their own evidence; fresh-install fixtures do not establish them.

`distribution.json` partitions the same canonical folders into five generated domain
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
releases are unchanged. Current source no longer generates data or interface-review
packages.
A future npm release needs an unused version, approved exact artifacts, secret
scans, explicit release authority and registry verification. Source/documentation
commits cannot replace published bytes.

## One owner for each workflow

pstack is the end-to-end engineering workflow: specs, design, implementation,
debugging, tests, review, security review, commits and PRs. Skills here contribute
domain expertise (CI contracts, dependencies, release artifacts, workstation and OS
administration, agent tooling) without starting a second delivery process or
competing for pstack's triggers. A new skill that would overlap pstack belongs in
pstack's own customization (`automate-me`, a `-mode` skill), not here.

Imported editorial guides are adapted references with original source identities
retained, not whole old workflows hidden below the entrypoint. Current payload hashes
belong to the root provenance; origin hashes identify inputs. Required cross-skill
filesystem links are not used.

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
