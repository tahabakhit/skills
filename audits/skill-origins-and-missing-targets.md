# Installed skill origins and missing targets

Observed 2026-11-02 against repository HEAD `936541febd3001eaf8f455af169fcd6d68737e09`.
This supplements [the historical audit](installed-skills.md), [its inventory](shared-inventory.json), and [the research register](../research/collections.json). It does not revise their snapshots.

Integration note: while this investigation ran, commit `85c47f08ee584490ae052150e217bd7c89c7cae8`
added eight specialist adaptations and retained CI/Git/writing references to the
source catalog. This report's replacement assessments describe the inspected
`936541f` snapshot, not that newer source tree. See [the import guide](installed-skill-import.md)
for the subsequent source adaptations and current old-to-new mapping. Neither
source update repaired or replaced the pre-existing live installations.

## Findings and verification

All 67 installed regular files still match the inventory's SHA-256 values. Fresh GitHub recursive trees, fetched with `gh api`, confirm all recorded blob identities: 50 files in `bolens/agent-skills`, 16 in `iuliandita/skills`, and one in `herdrdev/herdr-core`. All three trees report `truncated: false`. File equality establishes immediate source snapshots, not original authorship or the active installer.

The installed Markdown scan reproduces **77 relative file-link occurrences, 34 broken occurrences, and 14 distinct missing file targets**:

- 16 broken entrypoint links into 11 distinct sibling targets.
- Six broken links in three reference files. These introduce two additional targets, `verify-and-stop` and `cli-web-evidence`.
- 12 `UPSTREAM.md` pointers to one absent `~/.agents/PROVENANCE.json`.

All 13 missing sibling targets exist under `skills/` at **`bolens/agent-skills@e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d`**. Each target body was fetched through GitHub's contents API, decoded in memory, and its Git blob hash recomputed against both the response and the complete pinned tree. None failed. These are incomplete selective installations, not missing files in that upstream snapshot.

All 29 installed `references/*.md` files were searched for inline links, reference-style link definitions, HTML links, and backtick file references. No additional broken local Markdown target emerged. Five local heading references resolve. The sixth points to the absent dependency-updates entrypoint, whose pinned source does contain the named heading. External URL availability was not tested. This is a static dependency inspection, not a behavioral test or an exhaustive parser for arbitrary Markdown.

Environment: Fedora Linux 45 KDE userland, Linux `7.2.13-300.fc45.x86_64`, RPM `6.1.0`, login shell `/usr/bin/fish`, `gh 2.97.0`, `jq 1.8.2`, Node `v24.22.2`. This origin investigation ran no upstream helper, installer, collector or hook and changed no installed files. The separate chezmoi import and its verification are recorded in the repository's source and verification documents.

## The 16 broken entrypoint links

Call-site paths below are relative to `~/.agents/skills`. Source links identify the exact pinned files, not moving branches. Repository replacements are recommendations based on inspected procedures, not assertions of identical scope or installed availability.

**Conditional reference** means the selected workflow consumes the guidance when that branch is used. **Handoff** means another specialist owns the requested work. Neither creates authority to install a bundle, spawn an agent, or expand the task. A handoff can still be essential for the actual request. If no adequate procedure or capability is available, name the gap rather than claim completion.

| Missing pinned target | Installed call sites | Classification and recommended repair |
| --- | --- | --- |
| [omarchy/SKILL.md][omarchy] | `arch-linux/SKILL.md:58`, `cachyos/SKILL.md:66` | Two conditional specialist handoffs, only after establishing Omarchy ownership. `skills/operate-systems/SKILL.md` and its `references/platform-boundaries.md` provide general host/owner triage, not Omarchy commands or desktop reset procedures. Retain that limit. No full replacement exists here. |
| [release-packaging/SKILL.md][packaging] | `arch-package-maintenance/SKILL.md:10`, `ci-maintenance/SKILL.md:59` | Two conditional procedure dependencies for variant/lean-install and target-matrix work. Use repository `skills/release-packaging/SKILL.md` plus `references/artifact-validation.md`. It covers source/artifact identity, ABI, runtime dependencies, and lifecycle proof, but does not reproduce upstream's exhaustive native-target/variant recipes. Keep PKGBUILD work with the Arch specialist. |
| [babysit/SKILL.md][babysit] | `arch-package-maintenance/SKILL.md:26`, `ci-maintenance/SKILL.md:87`, `git-hygiene/SKILL.md:81` | Three endpoint-dependent delivery handoffs, not required for an audit or recipe-only task. Replace with `skills/deliver-work/SKILL.md` and `references/follow-through.md`. Preserve one existing coordinator, exact remote/candidate state, review/check requirements, and publication authority. |
| [codebase-design/references/experience-and-interfaces.md][experience] | `ci-maintenance/SKILL.md:40` | Required conditional read when changing command discovery, structured results, or recovery. Repository `skills/codebase-design/references/experience-and-interfaces.md` supplies the matching subject at the same relative path. Declare/select it explicitly or vendor the needed reference with attribution. Presence in this repository does not repair the live link. |
| [setup-pre-commit/SKILL.md][hooks] | `ci-maintenance/SKILL.md:55` | Conditional hook-design procedure, not a dependency of unrelated CI work. Repository CI guidance covers checks and environment evidence, and Git guidance covers staging, but neither supplies the staged-file hook installation and hook-specific validation procedure. Preserve bounded checks and affected-consumer selection in owned guidance, or report hook setup as uncovered. Do not relabel general CI as a complete hook specialist. |
| [triage-dependency-updates/SKILL.md][updates] | `ci-maintenance/SKILL.md:71` | Required conditional guidance for pin monitoring/updater coverage and version candidates. Repository `skills/triage-dependency-updates/SKILL.md` and `references/candidates.md` cover candidate and updater assessment. **Remove or retarget `#prefer-immutable-pins-with-update-monitoring` when adapting the link**: the upstream heading exists, but the repository replacement does not have it. Preserve the caller's explicit monitoring-coverage checks. |
| [audit-repo-fleet/references/shared-fixes.md][fleet] | `ci-maintenance/SKILL.md:73` | Required conditional reference only when fleet implementation is offered. It defines inventory boundaries, applicability checks, per-repository evidence, and partial delivery. No full repository replacement exists. `deliver-work/references/work-state.md` and Git ownership guidance can track units but do not establish fleet inventory or closure. Vendor a reviewed scoped reference or remove the fleet claim and report remaining consumers. |
| [systematic-debugging/SKILL.md][debugging] | `ci-maintenance/SKILL.md:87` | Failure-triggered diagnosis handoff. Repository `skills/systematic-debugging/SKILL.md` supplies an attributed, adapted workflow and its supporting references. Select that workflow rather than importing the original collection recursively. |
| [sensitive-info-audit/SKILL.md][privacy] | `ci-maintenance/SKILL.md:87` | Conditional publication/privacy audit handoff. Repository `skills/security-review/SKILL.md` covers read-only security paths, synthetic secrets, and history access, but is **not a complete publication-content/history scanner procedure**. Preserve exact publication range/artifact selection, redacted findings, scanner coverage/counts, and explicit history-rewrite authority in owned guidance before calling this gap closed. |
| [resolving-merge-conflicts/SKILL.md][conflicts] | `git-hygiene/SKILL.md:81` | Handoff only for an owned interrupted integration. Repository `skills/git-hygiene/SKILL.md` and `references/ownership.md` cover ownership, current refs, and proof invalidation, not the complete merge/rebase/cherry-pick/revert continuation procedure. Keep those safeguards and obtain operation-specific guidance. No exact specialist replacement exists. |
| [nixos/SKILL.md][nixos] | `managed-config-drift/SKILL.md:22`, `workstation-health-triage/SKILL.md:55` | Two declarative-owner specialist handoffs. General `operate-systems` guidance is not a NixOS modules/generations/activation/recovery contract. Do not replace generated store links as a fallback. Use scoped NixOS guidance if that branch is required, otherwise keep generic collection read-only and report the unsupported action. |

The grouped occurrence counts are `2 + 2 + 3 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 2 = 16`.

## Broken reference-file links and hidden dependency edges

| Installed reference and line | Pinned missing target | Meaning and repair |
| --- | --- | --- |
| `ci-maintenance/references/development-environments.md:64` | [nixos/SKILL.md][nixos] | Required conditional guidance for NixOS VM/module/generation/activation work, not ordinary mise, devenv, or devcontainer use. No full NixOS replacement exists. Keep guest isolation and the ban on host `nixos-rebuild switch` as a substitute for a guest test. |
| `git-hygiene/references/freshness.md:60` | [babysit/SKILL.md][babysit] | Delivery-coordinator handoff in the push/merge branch. Adapt to `deliver-work/references/follow-through.md`. Local-only freshness inspection does not require PR monitoring. |
| `git-hygiene/references/work-units.md:36` | [verify-and-stop/SKILL.md][verify] | Optional focused proof handoff when acceptance or evidence reuse needs it. Repository `skills/verify-and-stop/SKILL.md` is the attributed replacement. Running native checks remains the baseline. |
| `git-hygiene/references/work-units.md:37` | [systematic-debugging/SKILL.md][debugging] | Failure-triggered diagnosis handoff. Use the repository's attributed debugging workflow and return evidence to the current owner. |
| `git-hygiene/references/work-units.md:39` | [cli-web-evidence/SKILL.md][browser] | Browser-proof handoff, conditional on needing real browser evidence. `skills/testing-work/SKILL.md` and `references/behavior-tests.md` preserve real-boundary testing but do not supply the capture matrix, browser tooling, or host-capacity protocol. Use an existing permitted browser harness or report missing evidence. Do not treat DOM-emulator results as rendered proof. |
| `git-hygiene/references/work-units.md:41` | [babysit/SKILL.md][babysit] | PR/release endpoint handoff only. Adapt to owned delivery follow-through, without creating a second loop. |

The installed `work-units.md:43-47` explicitly permits available repository commands and task instructions when a specialist is unavailable. It requires reporting material capability gaps and forbids invented tools or automatic agent installation. This is stronger evidence against importing all missing siblings than the link count alone.

Two **working**, conditional cross-skill edges also matter during selective adaptation:

- `arch-linux/SKILL.md:35-38` consumes installed CI development-environment guidance for repository tools.
- `git-hygiene/SKILL.md:51` consumes CI concurrent-service guidance. CI consumes Git semantic conventions at `SKILL.md:61` and the work-unit coordinator at `references/setup-contracts.md:159`. Those files and headings exist. This conditional cycle is not a requirement to install both full bundles for every invocation. Repository `systematic-debugging/references/{development-environments,setup-contracts,command-evidence}.md` already vendor the CI reference subjects with provenance. Repository Git/CI procedures have different, reduced supporting trees, so retaining old links unchanged would break them again.

Bare-name routes fall outside the 77-link count. Relevant examples are `managed-config-drift/SKILL.md:22` and `workstation-health-triage/SKILL.md:31,54,60`, which also call Omarchy/privacy specialists. `arch-update-recovery/SKILL.md:27,45` names `backup-restore-verification`, `sensitive-info-audit`, `diagnose-crash`, and `omarchy`. Fedora's exclusions also name unavailable specialists. These are capability boundaries, not proof that the calling skill supplies backup restoration, crash-symbol analysis, privacy scanning, or another distribution's activation procedure. This report does not expand into recovering every bare-name specialist.

## Provenance and ancestry

The 12 broken provenance links point from copied folders to a collection-root file that was not copied. The recovered exact file is [Bolens PROVENANCE.json][provenance], blob `7f92436db19a4915a21c63f72afa975478baaff7`. Do not fabricate the missing live file or install the source's global targets. For a later owned adaptation, use self-contained per-folder provenance and notices, or replace the pointer with this pinned evidence URL. Keep both immediate source and independently established ancestors.

| Scope | Observed evidence | Recommended provenance treatment |
| --- | --- | --- |
| Installed `arch-linux`, `arch-package-maintenance`, `arch-update-recovery`, `cachyos`, `ci-maintenance`, `git-hygiene`, `managed-config-drift`, `technical-writing`, `unslop`, `workstation-health-triage` | Pinned root provenance labels each `local-original`, with `local://codex/skills/<name>` and an import from `${CODEX_HOME:-$HOME/.codex}/skills/<name>`. The inspected immediate-source files match. | Record Bolens as immediate source, not this repository owner's authorship. The local label gives no independently verified earlier author or historical import commit. Carry the [Bolens MIT notice][bolens-license] for copied material. No deeper ancestry was established here for these ten installed folders. |
| Installed `migration`, `safe-refactor` | Root provenance and their pinned `UPSTREAM.md` files name [Caveman migration][caveman-migration] and [safe-refactor][caveman-refactor] at `3b74643f4d910f496babd4e634b1ba7168816f14`. Fresh complete ancestor tree checks find both `SKILL.md` and both `agents/openai.yaml` blobs identical to Bolens. Installed licenses match the ancestor root license blob `97ba9dac421b56b8403488acbd39383ce710f259`. | Preserve Julius Brussee's MIT text and scope note, plus relevant Bolens notices/provenance. The [Caveman license][caveman-license] excludes Engine-linked BSL paths. No Engine runtime is needed for these skill files. |
| Installed `rhel-fedora` | [iuliandita source][fedora] has the same 16 path/blob identities as the installed inventory. The complete pinned tree and root MIT license were checked again. | Immediate source is `iuliandita/skills@496420bfb995892598e0eae18aff2a5be3d800b2`, not Bolens. Carry Iulian Dita's 2025 MIT notice. No deeper ancestor or active update manager was proven. Existing privacy/authority holds in the historical audit still apply. |
| Installed `herdr-core` | [herdrdev source][herdr] has the matching single skill blob `864a6e4681d629d1c46fa2f2c5a24fb4028e76d3`. Complete tree and root Apache-2.0 license were checked again. | Preserve Apache-2.0 obligations and applicable attribution when adapting. Dynamic `hc --skill` is a tool dependency, not a missing sibling bundle. Retain existing chezmoi ownership until an authorized transfer. |
| Missing `omarchy` | Bolens provenance and its pinned `omarchy/UPSTREAM.md` agree on [basecamp source][omarchy-ancestor] at `d3d23fdddef846ebb98b52122a6ece66211c0daf`, original path `default/agents/skills/omarchy`. Fresh ancestor tree confirms that directory and its seven files. The [root MIT license][omarchy-license] names David Heinemeier Hansson. Bolens records retained desktop-session routing and ownership/reset-authority adaptations. | This is a maintained hard fork, not a claim of byte-identical upstream content. Retain ancestor and fork notices if selected later. Do not substitute an unrelated Omarchy snapshot. |
| Missing `verify-and-stop` | Bolens provenance names [Caveman verify-and-stop][caveman-verify] at the same audited Caveman revision. Fresh trees show matching agent metadata but a changed Bolens entrypoint. Root provenance records candidate-bound proof, authorized delivery handoffs, and vacuous-pass checks as local changes. | The repository already carries this attributed fork. Preserve Julius and Bolens notices and the distinction between audited ancestor revision and adapted payload. |
| Missing `codebase-design` | Bolens labels the folder `local-original`, but repository provenance already records [Matt Pocock comparison][matt] at `c0d69015e0cc8b66715beb3f93f9e53256e20f30`. Fresh tree comparison confirms `DESIGN-IT-TWICE.md` is exactly shared, blob `8419ad6fa966be2e9e435c932b3584df56cb1af6`. The prior audit records derived `DEEPENING.md` content. | Keep Matt Pocock and Bolens MIT notices. The comparison revision is not a proven historical import revision. This confirms ancestry of supporting material, not Matt authorship of every file, including the experience reference. |
| Missing `systematic-debugging` | Bolens also labels this folder `local-original`. Fresh comparison with [Superpowers][superpowers] at `f2cbfbefebbfef77321e4c9abc9e949826bea9d7` confirms eight identical files: `CREATION-LOG.md`, `condition-based-waiting-example.ts`, `condition-based-waiting.md`, `defense-in-depth.md`, and the four `test-*.md` files. Entrypoint, polluter helper, and root-cause tracing differ. Prior repository provenance identifies tracing as derived. | Retain Jesse Vincent's 2025 MIT notice and Bolens MIT notice. Do not repeat the incomplete whole-folder original-author label. Historical import revision remains unknown. |

For the other missing targets, pinned root provenance labels `release-packaging`, `babysit`, `setup-pre-commit`, `triage-dependency-updates`, `audit-repo-fleet`, `sensitive-info-audit`, `resolving-merge-conflicts`, `nixos`, and `cli-web-evidence` as `local-original`. That is a source declaration, not independently verified original authorship. No further ancestor was established in this inspection.

## Recommended repair order

1. Close required conditional reads in owned consumers first: experience/interfaces, packaging targets, updater evidence, and any explicitly offered fleet or NixOS branch. Select a validated dependency, vendor the narrow reference with its notices, or stop claiming that capability. Do not import entire bundles to resolve a file checker.
2. Retarget optional delivery, diagnosis, and proof handoffs to the inspected repository workflows. Adapt procedure and heading contracts, not just names. Keep hook, fleet, conflict-resolution, browser-capture, publication-privacy, NixOS, and Omarchy gaps explicit where coverage is partial.
3. Replace collection-root provenance assumptions with self-contained records during the separately owned adaptation/import work. Preserve source uncertainty and inherited notices. Do not rewrite these historical audits or change live installation ownership as an incidental link repair.

This origin investigation produced only this report. Verification consists of local digest checks, complete pinned tree/blob comparisons, target-body blob recomputation, local reference/heading inspection, and source review. It does not establish host discovery, installer behavior, or workflow effectiveness.

[omarchy]: https://github.com/bolens/agent-skills/blob/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d/skills/omarchy/SKILL.md
[packaging]: https://github.com/bolens/agent-skills/blob/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d/skills/release-packaging/SKILL.md
[babysit]: https://github.com/bolens/agent-skills/blob/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d/skills/babysit/SKILL.md
[experience]: https://github.com/bolens/agent-skills/blob/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d/skills/codebase-design/references/experience-and-interfaces.md
[hooks]: https://github.com/bolens/agent-skills/blob/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d/skills/setup-pre-commit/SKILL.md
[updates]: https://github.com/bolens/agent-skills/blob/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d/skills/triage-dependency-updates/SKILL.md#prefer-immutable-pins-with-update-monitoring
[fleet]: https://github.com/bolens/agent-skills/blob/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d/skills/audit-repo-fleet/references/shared-fixes.md
[debugging]: https://github.com/bolens/agent-skills/blob/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d/skills/systematic-debugging/SKILL.md
[privacy]: https://github.com/bolens/agent-skills/blob/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d/skills/sensitive-info-audit/SKILL.md
[conflicts]: https://github.com/bolens/agent-skills/blob/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d/skills/resolving-merge-conflicts/SKILL.md
[nixos]: https://github.com/bolens/agent-skills/blob/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d/skills/nixos/SKILL.md
[verify]: https://github.com/bolens/agent-skills/blob/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d/skills/verify-and-stop/SKILL.md
[browser]: https://github.com/bolens/agent-skills/blob/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d/skills/cli-web-evidence/SKILL.md
[provenance]: https://github.com/bolens/agent-skills/blob/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d/PROVENANCE.json
[bolens-license]: https://github.com/bolens/agent-skills/blob/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d/LICENSE
[caveman-migration]: https://github.com/JuliusBrussee/caveman/tree/3b74643f4d910f496babd4e634b1ba7168816f14/skills/migration
[caveman-refactor]: https://github.com/JuliusBrussee/caveman/tree/3b74643f4d910f496babd4e634b1ba7168816f14/skills/safe-refactor
[caveman-verify]: https://github.com/JuliusBrussee/caveman/tree/3b74643f4d910f496babd4e634b1ba7168816f14/skills/verify-and-stop
[caveman-license]: https://github.com/JuliusBrussee/caveman/blob/3b74643f4d910f496babd4e634b1ba7168816f14/LICENSE
[fedora]: https://github.com/iuliandita/skills/tree/496420bfb995892598e0eae18aff2a5be3d800b2/skills/rhel-fedora
[herdr]: https://github.com/herdrdev/herdr-core/tree/5a9de29b2f9b6690388a1c297a7ca8d73df7d3e2/skills/herdr-core
[omarchy-ancestor]: https://github.com/basecamp/omarchy/tree/d3d23fdddef846ebb98b52122a6ece66211c0daf/default/agents/skills/omarchy
[omarchy-license]: https://github.com/basecamp/omarchy/blob/d3d23fdddef846ebb98b52122a6ece66211c0daf/LICENSE
[matt]: https://github.com/mattpocock/skills/tree/c0d69015e0cc8b66715beb3f93f9e53256e20f30/skills/engineering/codebase-design
[superpowers]: https://github.com/obra/superpowers/tree/f2cbfbefebbfef77321e4c9abc9e949826bea9d7/skills/systematic-debugging
