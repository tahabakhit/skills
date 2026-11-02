# Standalone skill system

This document records the agreed direction and a proposed structure. It does not
mean the full proposed system is implemented or grant permission to install,
publish, migrate, or deploy.
The source catalog now contains 21 canonical workflow owners: the original five
and 16 new original procedures. [The owner map](CATALOG.md) records consolidation,
capability limits and deferred specialist dispositions. `deliver-work` owns the
engineering endpoint and replaces the external delivery recommendation. This is
not complete specialist coverage or proven model uplift. Installation, migration
and expanded host behavior remain separately unverified.

## Agreed decisions

| Area | Decision |
| --- | --- |
| Ownership | This repository owns its included skills and workflows. Using them must not require another person's skill repository or bundle. |
| Sources | Learn from multiple collections. Adapt useful material with its required licenses, attribution, reviewed revisions, and local changes recorded. |
| Audience | Primarily Taha's use, but shareable with others. Private preferences and personal permissions stay in global `AGENTS.md`, managed separately by dotfiles/chezmoi. |
| Hosts | Support Pi, Claude Code, and Codex from the first expanded version. Verify each host rather than claiming compatibility from file placement alone. |
| Distribution | Use Vercel's Skills CLI for selective global or project installation. Do not build a competing installer without a demonstrated need. |
| Coverage | Include coding and non-coding work. Research, analytical reports, document review, and content creation are in scope for optional bundles. |
| Engineering | Provide a complete path through implementation, testing, independent review, and release preparation. Keep stages separately usable. |
| Agents | Ordinary tasks work with one agent. Advanced workflows may require multiple agents where independent review matters. |
| Progress | No default pause for plan approval. Continue within the authorized task. Pause only when scope changes, a consequential decision is unresolved, or an action needs permission not already granted. |
| Interaction | Ask simple questions, one at a time, when user decisions are needed. Investigate discoverable facts rather than asking the user to supply them. |
| Simplification | Do not remove a step merely because it looks long, repetitive, or costly. Assess its benefit to correctness, coordination, and human interaction before changing it. |

No default plan-approval pause does not mean automatic implementation after a
request only for discovery or a specification. The requested task still defines
the endpoint. It also does not grant merge, publication, deployment, or other
external-action authority. Apply the active user's and project's permissions.

Standalone does not mean tool-free. Skills can use normal installed tools such
as Git, a browser, or a supported worker launcher. Document required capabilities
and verify availability. Do not require another skills collection to supply the
instructions. If a workflow requires independent agents and none are available,
report that limitation instead of pretending a self-review is independent.

## Proposed domain boundaries

These categories are a working proposal, not an agreed list of npm packages or
a commitment to import every upstream capability.

| Domain | Owns | Initial candidates |
| --- | --- | --- |
| Core | Shared writing, research, and skill maintenance practices | `unslop`, `technical-writing`, reviewed research and skill-maintenance procedures |
| Engineering | Requirements, implementation, debugging, testing, review, refactoring, migrations, Git coordination, delivery coordination | `discover-work`, `define-work`, `git-hygiene`, `safe-refactor`, `migration` |
| DevOps | CI, containers, deployment infrastructure, service operations, backups, networking, release packaging | `ci-maintenance`, selected operational workflows |
| Systems | OS administration, workstation health, packages, update recovery, configuration drift | Existing Arch, CachyOS, Fedora/RHEL, health, and drift skills |
| App development | Framework, language, database, authentication, and mobile-platform knowledge | Add only for supported, recurring project needs |
| Design | UX, visual design, accessibility, design systems, rendered interface verification | Evaluate a self-contained maintained approach before adopting runtime-dependent material |
| Data | SQL/data modeling, pipelines, catalogs, data quality, analytical verification | Select against actual analytical and engineering work |
| Content | Reports, articles, diagrams, document review, conversion, and production | Keep shared writing rules in core rather than copying them |
| Security and risk | Specialized technical security, compliance, contract, payment, and fraud analysis | Separate technical security from business-risk procedures as the collection grows |

A domain describes ownership. An installation profile selects skills for a
machine or repository. Global availability is not a reason to make every OS or
framework part of core. Examples include a small base, Linux-common, Arch or
Fedora workstations, coding, web projects, data projects, and homelab operations.
Direct CLI selection may suffice. Introduce reusable profile definitions only
when repeated selections justify them. They select capabilities, not Taha's
private behavioral rules.

## One owner for each workflow

A domain skill supplies expertise without starting a second delivery process.
The delivery coordinator owns progress through the requested engineering
endpoint. CI skills own pipeline changes, not an independent PR/merge loop.
Design and security skills contribute relevant findings without silently
expanding scope. Writing skills improve a spec's expression without taking over
its acceptance requirements.

Give each skill a clear trigger, exclusions, output, required capabilities,
action boundaries, handoffs, and stopping point. Required dependencies must be
distinct from optional specialist handoffs. Share actual rules from one owner
rather than keeping competing copies. Do not assume that frontmatter creates
a permission boundary or that every host interprets it identically.

Review a candidate step by identifying the failure or human need it addresses.
Record the reason to retain, adapt, or remove it. Use focused evaluation where
its value is uncertain. Word count, fewer questions, and fewer tools are not
proof of a better workflow. Adversarial reviewers should challenge both missing
safeguards and unnecessary complexity.

## Proposed source and distribution layout

Keep one canonical source directory at `skills/<name>/`, including its supporting
files and licenses. Retain the existing skill paths while establishing the
catalog. Record category and installation selections separately rather than
maintaining edited copies of the same skill in several packages.

A future catalog should record source revision, license and notices, local
modifications, domain, maturity, host/tool requirements, required dependencies,
optional handoffs, network or external effects, and verification evidence.
If bundles or reusable profiles become useful, their definitions should reference
canonical skill names rather than duplicate instructions.

Start with direct local or Git distribution through the Skills CLI. Its named
skill selection is not a general dependency resolver. Required files must ship
with the selected skill, or required sibling skills must be included explicitly
and validated. Audit cross-skill paths before promising selective installation.

Generate npm domain packages and an umbrella package only when their contents
and boundaries are useful and verified. Do not introduce a separate selector,
plugin surface, hook, or settings writer merely to resemble another bundle.
Choose such integrations only after a concrete workflow establishes the need.
Installation must not be treated as permission to enable those integrations.

## Existing installation and ownership

The read-only inventory found 14 skill directories in `~/.agents/skills` on this
machine. The subsequent [installed-skill audit](audits/installed-skills.md)
verified all 50 regular files across 12 folders against the pinned Bolens revision
recorded in `SOURCES.md`. That establishes file-content equality, not original
authorship or an active installation manager. Preserve the provenance chain
instead of labeling those imports as authored here.

Chezmoi currently tracks `herdr-core`, `rhel-fedora`, their supporting managed
files, and Claude links. Their live skill contents match the inspected chezmoi
sources. Other installed skills are not thereby proven to have no owner.
Moshi skills and Claude's separate `synced` directory need an ownership check
before claiming a complete migration. Host-bundled skills need not be imported.

Import recoverable copies before changing live installation. Compare complete
directories, preserve local modifications and notices, and classify existing
links and dependencies. Test in isolated homes and repositories first. Switch
one machine only after the intended migration is authorized. Retire old chezmoi
source entries and obsolete links separately after verification, so chezmoi does
not recreate competing installations. Preserve a documented rollback path.
Private global instructions remain managed by chezmoi. Verify that each host's
supported instruction-discovery mechanism still loads the intended private
rules after the transition. An isolated host check can use harmless synthetic
instructions to test precedence without copying private content into this public
repository. File preservation alone does not establish that the host loads it.

## Current implementation and remaining verification

1. The 21 source owners have one delivery coordinator, local required references
   and per-folder notices/provenance. Deferred installed specialists are not
   retired or assumed equivalent to these procedures.
2. Verify selective global/project installs and supporting-file access in all
   three hosts before any authorized live ownership transfer.
3. Compare fresh representative work against no skill and a short generic control.
   The entrypoint development pilot does not establish full-skill effectiveness.
4. Expand substantive gaps against recurring tasks, including platform recovery,
   statistical methods and format-specific engines. Do not fill them with labels.
5. Verify direct distribution. Generate packages or profiles only when needed.
   Publication remains separately authorized, not a consequence of source setup.

Use structural checks for metadata, links, licenses, package contents, and
required dependencies. Test install collisions, duplicate discovery, updates,
removal, and rollback in disposable locations. Run model-driven cases for correct
triggers, staying out of unrelated work, useful questions, authority handling,
missing tools, private instruction discovery, and the no-default-plan-pause rule.
Keep observed results separate from proposed checks. The existing structural
checks and historical installation smoke tests do not prove these expanded
capabilities.

## Remaining product decisions

Use the requested endpoint and active user/project policy rather than requiring
a universal stopping-point decision before useful work can continue. Ask only
when the actual next action needs an unresolved consequential decision, expanded
scope, or missing permission. Audits and source preparation do not depend on
choosing every future delivery setting.

Consequential additions to the initial skill selection still need concrete task
examples. Domain grouping is provisional internal organization, not a user
approval gate. Do not ask the user to design package internals. OS and framework
selections depend on the intended machine or project. Runtime and hook decisions
stay deferred until a workflow demonstrates why they are needed.
