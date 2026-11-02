# Installed skills: source import and replacement guide

This change prepares the repository as the source for the previously scattered
skills. It does not delete, replace or relink live installations, retire chezmoi
entries, modify host settings, or publish a new npm release.

Environment inspected: Fedora Linux 45 KDE, Linux x86_64, login shell fish,
Node 24.22.2, npm 11.19.1, DNF, Bash and Python 3 installed. GitHub ownership is
`tahabakhit/skills`, public, default branch `main`. The starting checkout was clean.
No helpers or background jobs were started for this import.

## Placement and duplicate decisions

| Previous installed name | Repository owner | Group | Decision |
| --- | --- | --- | --- |
| `arch-linux` | `arch-linux` | operations | Keep installed-system expertise separate from builds/recovery |
| `arch-package-maintenance` | `arch-package-maintenance` | operations | Keep PKGBUILD, patch, clean-build and pin-retirement procedure/reference |
| `arch-update-recovery` | `arch-update-recovery` | operations | Keep Arch transaction and boot-chain recovery |
| `cachyos` | `cachyos` | operations | Keep component-specific repos, chwd, kernels, sched-ext and tuning |
| `rhel-fedora` | `rhel-fedora` | operations | Keep RPM/vendor/SELinux/desktop references with privacy and authority repairs |
| `managed-config-drift` | `managed-config-drift` | operations | Keep ownership audit and unchanged optional comparator |
| `workstation-health-triage` | `workstation-health-triage` | operations | Keep broad evidence correlation and unchanged optional collectors |
| `unslop` | `unslop` | core | Shared editing pass, bounded to requested prose |
| `ci-maintenance` | `ci-maintenance` | engineering | Existing owner; add useful development-environment and setup-contract references |
| `git-hygiene` | `git-hygiene` | engineering | Existing owner; add freshness, branch/evidence cleanup and semantic-convention references |
| `safe-refactor` | `change-safely` refactor branch | engineering | Existing procedure/reference already covers every entrypoint rule and adds missing-baseline handling |
| `migration` | `change-safely` migration branch | engineering | Existing procedure/reference covers compatibility, expand/migrate/verify/contract, retry and recovery rules |
| `technical-writing` | `create-content` | content | Add all three useful references and explicit developer-documentation routing. No alias entrypoint |
| `herdr-core`, `ketch` | CLI-managed, outside this repository | excluded | Leave their installation/update lifecycle with their tools as requested |

The source now has 29 entrypoints, not 34 aliases. Each has exactly one installation
group. OS expertise is optional operations content, not core policy. `operate-systems`
remains the generic procedure and is not represented as a substitute for platform
recovery expertise. No imported skill requires another installed skill or bundle.

## Retained and omitted material

Input identities are checked against `audits/shared-inventory.json`, whose complete
pinned-tree comparison is recorded in `audits/installed-skills.md`. The inspected
live files still matched those recorded hashes at import time. Bolens material is
pinned to `e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d`; Fedora material is pinned to
`iuliandita/skills@496420bfb995892598e0eae18aff2a5be3d800b2`. Each selectable folder
carries complete relevant MIT notices and input/output provenance. Installed
`UPSTREAM.md` references to missing private provenance are replaced, not copied as
broken links or claimed as this repository's original authorship.

Retained scripts are copied unchanged, not rewritten. Their optional Bash/Python
runtimes remain explicit. The drift comparator hashes to EOF and has no internal
time/file/byte budget. Its documentation now requires scoped trusted local trees,
external limits where needed and incomplete-result reporting. It is not an atomic
snapshot, ACL audit or safe traversal of hostile mutable trees.

The health collector's Arch package probes remain visible limitations. An absent
pacman lock is normal, and unavailable pacman/Hyprland probes on another platform
are inapplicable, not health defects. Cached pending updates are not upgrade-readiness
proof. The entrypoint forbids raw collector stdout into an agent: use private-file
output and trusted local review/redaction first, or skip the helper. No real host
snapshot was collected for this change.

Fedora's broad default inventory, stale release/CVE table, unfiltered environment,
unit/config dumps, redundant per-transaction confirmation and automatic audit-file
policy are removed. A local privacy reference governs every diagnostic example.
Existing authority carries across stages without authorizing unrequested upgrades,
firewall exposure or destructive recovery. The generic agent-hygiene and automatic
output-contract references are omitted because they duplicate host/project policy
and create unnecessary durable artifacts.

Git's separate work-unit coordinator is not imported. The current delivery owner
and Git ownership reference already cover assignment identity, acceptance,
correction, settled cancellation and integration. CI's imported command-status and
GitHub-event guidance already exists in the current command-evidence and
trust-and-coverage references, so no second copy is added. Detailed environment,
service isolation, secret-contract and browser-capacity guidance is retained.
Conventional Commits, mise/Nix and `.env.spec` are project-selected techniques,
not new universal requirements.

The installed technical-writing entrypoint's explicit-only host flag, mandatory
`unslop` call and cross-folder commit-conventions link are not reproduced. Useful
document modes, sentence style, repository verification and naming-policy handling
live with `create-content`. Personal always-on style stays in private instructions.
`unslop` can be selected separately without becoming a required sibling dependency.

## Install from this source, not the old npm artifact

Published npm `0.2.0` still contains 21 skills. A GitHub push does not update it.
Use this checkout's selector, or GitHub source, until a new release is published.
Do not activate both a whole Pi package and selector-installed copies of the same
skills. Choose one ownership route to avoid duplicate discovery.

The selector can preview a complete replacement selection from a recipient project:

```fish
node /home/taha/dev/projects/tahabakhit/skills/bin/skills.mjs --global core,engineering,content,operations --agents pi,claude-code,codex --dry-run
```

Choose only the agents and groups wanted on that machine. Previewing does not alter
live skills. Existing folders stop execution unless replacement is deliberately
selected. This command is a planning example, not evidence of a completed migration.

Before an actual switch:

1. Back up the complete selected skill folders with modes, symlinks and provenance,
   plus relevant locks and host registration settings. Store them privately outside
   the installation tree. Preserve all unrelated skills.
2. Inspect present owners. The earlier audit found chezmoi-managed `rhel-fedora`
   and `herdr-core`, plus Claude links. Verify current state rather than assuming
   those findings still describe every host. Retire only the intended Fedora
   source/link definitions separately so chezmoi cannot recreate a competing copy.
   Leave CLI integrations and private instructions alone.
3. Review the selector's exact destinations and lock plan. Re-run from the same
   source with intentional replacement consent only after backups and ownership
   are settled. Do not bypass refused symlinks by deleting them blindly.
4. Verify installed entrypoints, supporting references, notices and helper modes
   for each selected host. The selector checks payload bytes and receipts but does
   not prove live model discovery. Start a fresh agent session and confirm one
   owner per name and that private instructions still load.
5. Only after replacement verification, retire the selected old-name
   `safe-refactor`, `migration` and `technical-writing` folders and any old package
   registrations that would load duplicates. The selector does not remove aliases
   or reconcile managers automatically. Keep `herdr-core`, `ketch`, unrelated skills
   and their manager records.

Do not remove the whole `~/.agents/skills` directory: it can contain CLI-owned,
host-bundled or unrelated skills, and Pi/Codex may share canonical paths. The
replacement owners still install into a skills directory; the change is that their
source and updates are tracked by this repository.

For rollback, stop the affected agent sessions, inspect only this migration's
installed paths and locks, restore the saved selected folders/registration/manager
state, and verify discovery again. Do not overwrite unrelated lock entries that
changed after the backup. Keep the backup until the new route works on the actual
hosts.

## Verification scope

The pre-change baseline passed all package checks and 44 Node tests. Post-change
results are recorded in `VERIFICATION.md`. Tests exercise selection, generated
packages, standalone notices/links/digests and synthetic helper fixtures. They do
not perform a live OS repair, scan private logs, establish model effectiveness,
or authorize retiring any live manager.
