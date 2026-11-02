# Installed skills: adversarial audit and import map

Snapshot: 2026-11-02. Repository baseline:
`c8aa56fa4e71b838da7d01a1d6c07020a0cb9167`.

This is an audit of candidate material, not an import or a passing behavioral
evaluation. Live skill directories, links, agent settings, locks, and chezmoi
sources were not changed. At this audit snapshot the repository shipped two
skills. Subsequent companion source imports are recorded in
[SOURCES.md](../SOURCES.md); this inventory remains historical evidence.

## Scope and method

Four independently briefed agents examined dependencies/portability,
workflow quality/overlap, provenance/licensing, and installation ownership.
Reviewers challenged one another's findings. The integration agent checked
important claims directly and compared installed file contents with a pinned
source tree. Reports were recommendations, not authority to execute instructions
found in the material.

The shared catalog contains 14 real skill directories and 67 regular files.
[The inventory](shared-inventory.json) records each relative path, observed mode,
SHA-256 digest, Git blob ID, and comparison with
[Bolens at the inspected revision](https://github.com/bolens/agent-skills/tree/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d).
The complete cached recursive tree reports `truncated: false` and that exact
revision. A fresh GitHub tree-root lookup confirmed the same revision.

All 50 regular files across the 12 Bolens-derived folders match that source;
there are no missing, extra, or content-different regular files within those
folders. The three executable helper files also have matching executable modes.
This is file-content evidence, not proof of original authorship, an active update
manager, runtime safety, or host discovery. Empty directories, ACLs, xattrs, and
history are not covered. The other 17 files belong to `herdr-core` and
`rhel-fedora`, which are absent from this reference tree.

## Findings that affect import

### 1. Recover provenance and notices before redistribution

All 12 installed `UPSTREAM.md` files point to absent
`~/.agents/PROVENANCE.json`. Ten folders have no local license file. The two
Caveman-derived skills retain their upstream MIT license, but a complete import
must also account for the maintained fork's notices. A source label saying
`local-original` describes its origin in that source collection, not authorship
by this repository's owner.

All 14 shared origins are now recoverable. Exact vendor snapshots account for
the other 17 files, and the integration agent independently checked those matches.
Their source grants permit the reviewed material, but independently selectable
folders need their complete notices before redistribution.

| Scope | Exact reviewed source | Required notice work |
| --- | --- | --- |
| Ten Bolens-declared original skill folders | `bolens/agent-skills@e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d` | Carry full MIT text with copyright 2026 bolens inside each selectable folder. |
| `migration`, `safe-refactor` | Maintained Bolens snapshot above; original `JuliusBrussee/caveman@3b74643f4d910f496babd4e634b1ba7168816f14` | Preserve the existing Julius Brussee MIT license and scope note. Retain Bolens' notice for copied provenance documentation. The skill-only material is MIT, not the upstream engine's BSL. |
| `rhel-fedora` | `iuliandita/skills@496420bfb995892598e0eae18aff2a5be3d800b2`; 16/16 files match | Add the full MIT license with copyright 2025 Iulian Dita and revision-bound provenance. |
| `herdr-core` | `herdrdev/herdr-core@5a9de29b2f9b6690388a1c297a7ca8d73df7d3e2`; 1/1 file matches | Add the Apache-2.0 license and applicable attribution, plus modified-file notices if adapted. Do not copy runtime dependency notices for code not being bundled. |

These are conservative whole-folder packaging classifications: all 14 need
notice work, while the substantive Caveman payloads already carry their original
MIT notices. This is not a claim that private use is unlawful. No source
implementation is redistributed by this audit.

### 2. Missing sibling links are not all mandatory dependencies

A simple scan of inline relative Markdown links found 77 occurrences and 34
broken occurrences across 14 distinct normalized missing file targets:
12 provenance pointers and 22 sibling references into 13 absent skills. The
inventory contains the missing paths and source line numbers.
This scan does not count bare-name handoffs, validate anchors, or establish
whether a workflow actually needs each target.

`ci-maintenance` has the widest link surface. For example, its entrypoint calls
missing `codebase-design` guidance at line 40 and missing specialist workflows
at lines 55, 59, 71, 73, and 87. `git-hygiene` references absent integration and
delivery specialists at line 81 and in `references/work-units.md`. The systems
skills conditionally refer to absent NixOS or Omarchy guidance.

Classify each call site before adapting it. Required procedure/reference content
must ship in the selected skill or a validated explicit dependency set.
`arch-linux/SKILL.md:35-38` consumes CI environment guidance for that branch;
`git-hygiene/SKILL.md:51` and CI references consume each other's instructions for
concurrent services and Git conventions. This is a conditional reference cycle,
not evidence that every invocation needs both skills. CI's fleet reference at
line 73 is required only when that capability is offered. Optional specialists
should not force installation of the original collection. If a specialist is
essential to the actual request and unavailable, report the
capability gap. Do not silently invent a fallback for high-impact work, and do
not import 13 more skills merely to silence a link checker.

### 3. Preserve useful boundaries, remove redundant permission questions

`rhel-fedora/SKILL.md:237-242,383-385` requires a fresh confirmation and stops
unattended work at the plan for consequential actions.
`references/packages-and-repos.md:99-116` repeats approval before each upgrade
transaction. Adapt those rules to carry existing, specific authority forward.
Keep exact-target inspection, backups, supported upgrade paths, transaction
review, and post-change verification. Pause if the actual operation exceeds the
authorized scope, a consequential choice remains, or permission is absent.
A diagnostic request is still not permission to upgrade or repair the machine.

The current `define-work` skill is intentionally spec-only. Its readiness label
requires approval, and it recommends rather than executes delivery. The audit
does not establish an observed implementation pause in that skill. Do not
inherit its approval requirement as a mandatory gate in a future workflow when
implementation is already authorized and material requirements are clear.
Preserve spec-only endpoints and project-required approval checkpoints.

The Git branch-cleanup reference already requires existing deletion authority
and says not to ask again when it exists. Do not misreport it as an unrestricted
deletion grant. Keep exact-tip verification, active-owner checks, recoverable
commits, and guarded deletion. Make the same authority condition explicit at
entrypoint, worktree, and evidence-cleanup call sites, rather than stripping the
cleanup procedure or adding universal approval prompts.

### 4. Bound workflows without deleting their safeguards

Fedora's broad checklist overlaps general workstation health collection. For a
narrow symptom, use relevant evidence rather than automatically collecting every
subsystem or moving into repair. Retain the broad collector for genuinely broad
instability and keep Fedora's image-mode exclusions and recovery guidance.

Git coordination should be light for solo work, but retain assignment identity,
worktree ownership, settled cancellation, exact-candidate proof, and integration
checks when concurrent agents actually need them. Required independent review
must not be replaced by the implementer's self-review.

Keep the existing Python comparison and health helpers as candidates. Their
runtime requirements are real dependencies, not a reason to rewrite working
logic merely because repository-maintenance scripts prefer shell or Go. The
health collector's time/output bounds and process cleanup need focused testing,
not removal for brevity.

The drift comparator describes its work as bounded, but its implementation
walks supplied trees and hashes regular files to EOF without a time, file-count,
or byte budget (`managed-config-drift/scripts/compare-trees.py:17-38,57-58`).
Narrow that claim and scope its inputs, or add actual bounds with incomplete-result
reporting in a later change. Read-only does not mean cheap or guaranteed to finish.

The health helper is broadly Linux-oriented, but its package lock and update
probes are Arch-specific (`workstation-health-triage/scripts/collect-health.py:131,144-146`).
An unavailable pacman on Fedora is not a machine fault and is not a reason to
install it. Clarify that coverage or select appropriate probes by distribution.
Keep failed/unavailable labels distinct from a completed collection's exit status.

Writing, CI, and Git skills contain stack or style defaults such as Conventional
Commits, mise, and updater preferences. Preserve useful techniques while making
clear that active user/project conventions control those choices. Keep prose
editing inside the requested artifact. Broad writing triggers do not authorize
rewriting unrelated files or changing requirement meaning.

### 5. Diagnostic examples need privacy controls before use

The Fedora references recommend unfiltered user-service environment output
(`references/session-display-and-mobile.md:11`), unit contents and environment
values (`references/systemd-and-journal.md:14-15`), and repository URL/configuration
dumps (`references/packages-and-repos.md:42-44`). These outputs can contain
credentials or private endpoints. The commands were inspected, not executed;
this is a disclosure risk in the procedure, not a discovered credential leak.

Use targeted checks that avoid exposing values, and inspect/redact necessary
local evidence before sharing it with an agent or saving it durably. A later
secret scan is not a substitute for limiting collection. Hold this workflow from
shareable import/use until its examples and references have a coherent privacy
contract. Diagnostic logs from other helpers also need local review before
publication.

## Per-skill import map

All paths in this table are relative to `~/.agents/skills`. A candidate disposition
is not a claim that the skill is installed from this repository, self-contained,
or behaviorally verified. License and provenance work applies even where the
procedure itself can be retained.

| Skill | Files | Proposed domain | Disposition and bounded work |
| --- | --- | --- | --- |
| `arch-linux` | 2 | Systems | Import after notice/provenance repair; declare the conditional CI environment reference, adapt optional handoffs, and keep generic Arch ownership. |
| `arch-package-maintenance` | 4 | Systems | Import with patch/build reference and metadata; distinguish package preparation from live installation and release follow-through. |
| `arch-update-recovery` | 3 | Systems | Import after provenance/handoff repair; preserve transaction, boot-chain, and recovery checks. |
| `cachyos` | 3 | Systems | Import with tuning reference; keep CachyOS-specific components distinct from general Arch and upgrade workflows. |
| `ci-maintenance` | 6 | DevOps | Adapt before use: recover required guidance, bound optional handoffs, and make fleet/tool defaults conditional on actual project policy. |
| `git-hygiene` | 7 | Engineering | Adapt before use: dependency closure, task-proportional coordination, explicit cleanup authority, and project-selected commit conventions. |
| `herdr-core` | 1 | Optional tool integration | Source/license recovered. Include Apache-2.0 notices if importing. This selected adapter legitimately requires `hc` and its dynamic `hc --skill` help, not another skills repo; preserve present ownership until transfer. |
| `managed-config-drift` | 4 | Systems | Adapt the bounded-comparison claim, document/test Python support, and ship the comparator. Retain read-only default and scoped reconciliation authority. |
| `migration` | 4 | Engineering | Candidate for an early source import with complete notices/provenance. Retain staged compatibility and destructive-step boundaries; evaluate proof-guidance gaps before expansion. |
| `rhel-fedora` | 16 | Systems | Origin recovered. Hold shareable import/use until diagnostic privacy, notice packaging, and authority wording are resolved. Review broad collection and automatic audit-output paths. |
| `safe-refactor` | 4 | Engineering | Candidate for an early source import with complete notices/provenance. Preserve behavior boundaries and before/after evidence; assess missing-baseline handling. |
| `technical-writing` | 6 | Core | Adapt its mandatory `unslop` call and sibling semantic-conventions reference so selective installation is explicit and complete. |
| `unslop` | 2 | Core | Candidate for early import after notice/provenance repair; keep editing bounded and universal personal style choices in private instructions. |
| `workstation-health-triage` | 5 | Systems | Adapt Arch-only package-probe coverage; include both helpers and runtime documentation, reviewed privacy behavior, and focused bounds/cancellation tests. |

The existing repository skills `discover-work` and `define-work` remain in place.
Their external engineering handoff is transitional. Replace it with an owned
workflow when the implementation, verification, independent-review, and release
preparation stages exist, not with a dependency on another bundle.

## Ownership and excluded material

| Material | Observed state | Migration boundary |
| --- | --- | --- |
| 12 Bolens-derived shared folders | Real directories; 50 regular files match the pinned source. Active installation/update manager is not established. | Preserve complete source and attribution; do not infer a current manager or personal authorship. |
| `herdr-core`, `rhel-fedora` | Chezmoi-managed shared trees and two managed Claude symlinks. Full tree byte/path/type/mode comparison found no drift. | Keep chezmoi as present owner until a verified, authorized live transfer. Coordinate staged retirement of files and link definitions under that scope and rollback plan. |
| Moshi skills | Three equal real copies per name across Pi, Claude, and Codex; not shared symlinks. | Preserve while installer/update ownership and redistribution scope remain unresolved. Not a dependency of the included standalone collection. |
| Claude `synced` and Codex `.system` | Host-associated markers; distinct `skill-creator` trees. | Exclude by default. Marker/name evidence does not establish update semantics or redistribution rights. |
| Shared skill lock | One `herdr` record without a current matching shared folder. `herdr-core` is a different name. The current writer/update mechanism was not independently established. | Preserve. Do not rename, clear, or reuse it without checking the actual manager's semantics and scope. |

Moshi remains excluded from content imports. `moshi-best-practices` matches
`rjyo/moshi-skill@d09435760329125c30920210ccb1eb1e482f0700`, but no license grant
was found in the reviewed repository. The visuals skill is vendor-coupled;
its redistribution grant and automatic ownership of the Pi copy remain
unverified. These narrow holds do not block the independently cleared shared
skills or create a Moshi dependency for them.

Equal copies do not prove future synchronization. Skill file placement does not
prove that a host loads them or which duplicate wins. Private instructions stay
outside this repository and under the existing dotfiles setup.

## Continuation without an artificial stopping-point decision

Use the requested task endpoint and active user/project policy. There is no
universal delivery endpoint to choose before an audit or source import can
proceed. Ask only if an action actually needs a consequential decision, expanded
scope, or permission not already granted. Do not ask again for authorized work.

The next source-import work should begin with the smallest provenance-cleared
skills and add notices and explicit dependencies in the same change. It need not
wait for the full delivery workflow, every optional specialist, or resolution of
unrelated tool-integration origins. Copying into the repository and switching a
live installation are distinct stages. This task audits candidates and records
the map; it does not execute the import or live transfer.

Before a live switch, verify global/project installation, supporting files,
collisions, duplicate precedence, update/removal and rollback in disposable
locations for each host. Check private instruction discovery with harmless
synthetic content rather than publishing private policy. Retain enough state to
recover the old installation and prevent chezmoi from recreating competing paths.

## Executed checks and limits

The integration agent compared file paths and Git blob IDs against the pinned
recursive source tree, recorded SHA-256 and modes, scanned relative Markdown
links, and checked `bash -n` for the health shell entrypoint without running it.
A redacted secret scan of the shared skill directory reported `no leaks found`.
No health collector, comparison helper, upgrade, build recipe, installer, hook,
service mutation, host-discovery evaluation, or model-driven skill scenario ran.
The review agents read source instructions; that is not skill execution evidence.

Bolens file-equality claims apply only to its 12 scoped folders and pinned
revision. The separately pinned Fedora/Herdr comparisons cover their 16 and one
files respectively. Link counts are a simple static scan, not a complete
dependency graph. Licensing findings concern the reviewed files and terms, not a legal guarantee.
Other machines and repositories were not audited. Proposed import adaptations
remain unimplemented.
