# Verification

## Initial package checks

| Check | Result |
| --- | --- |
| `npm test` in the source checkout | `7 structural checks passed; model behavior not evaluated.` |
| `npm pack --dry-run --ignore-scripts --json` | Package identified as `@tahabakhit/skills@0.1.0`; 12 expected files, no runtime dependencies |
| Pi 1.4.0 `loadSkillsFromDir` against `skills/` | Both `define-work` and `discover-work` discovered; `diagnostics: []` |
| Pack and install the tarball into a temporary npm project | `added 1 package`; package files installed under `node_modules/@tahabakhit/skills` |
| Skills CLI 1.7.4 add from that installed package, targeting Claude Code, Codex and Pi | `Found 2 skills`; `Installation complete`; both names installed under project `.agents/skills` and `.claude/skills` |
| `npm test` from the installed package | `7 structural checks passed; model behavior not evaluated.` |

The installation smoke test used `--copy -y` and an isolated temporary HOME with
telemetry disabled. It changed no real project, global skill directory or personal
agent settings. Skills CLI was downloaded only into the temporary test environment.
Discovery checks load instructions but make no model calls and execute no delivery.
The tarball was tested before the initial verification record was finalized; no
skill or manifest contents changed between that test and the initial record.

## Architecture setup checks

After adding `ARCHITECTURE.md`, updating the README and source evidence, and
including the architecture document in the npm allowlist, the following checks
were rerun:

| Check | Result |
| --- | --- |
| `npm test` | `7 structural checks passed; model behavior not evaluated.` |
| `npm pack --dry-run --ignore-scripts --json` | `@tahabakhit/skills@0.1.0`; 13 entries, including `ARCHITECTURE.md` |
| `git diff --check` | Exit 0, no output |

Two adversarial agents reviewed the architecture: one for missing safeguards,
one for unnecessary complexity. Their findings led to explicit private-instruction
discovery checks and deferred profile/package machinery. Both confirmed their
findings were addressed. This was document review, not skill-behavior evaluation.

These checks establish documentation/package consistency only. The skill files
and evaluation cases were not changed. The expanded catalog, standalone delivery,
global installation, migration, and cross-host behavior are still unimplemented
or unverified. No live installation or chezmoi ownership changed.

## Installed collection audit checks

The four audits and cross-reviews are summarized in
[the import map](audits/installed-skills.md), with file evidence in
[the snapshot](audits/shared-inventory.json). They examined source instructions
and installation ownership, not model-driven use of the skills.

| Check | Result |
| --- | --- |
| Shared inventory and pinned source comparison | 14 folders, 67 regular files; all 50 files in the 12 Bolens-derived folders match, with no missing or extra regular files in those subtrees |
| Additional pinned vendor comparisons | All 16 Fedora/RHEL files and the one Herdr stub match their respective source snapshots; all 14 shared origins are recoverable |
| Relative Markdown target scan | 77 occurrences checked; 34 broken occurrences across 14 distinct missing targets, including 12 provenance pointers |
| Recheck recorded SHA-256 against live shared files | All 67 match; no drift from the recorded snapshot |
| `bash -n` on the health shell entrypoint | Exit 0; the collector was not executed |
| Redacted `gitleaks dir` scan of the shared skill directory | `no leaks found` |
| `npm test` after adding audit records and snapshot checks | `8 structural checks passed; model behavior not evaluated.` |
| `npm pack --dry-run --ignore-scripts --json` | 15 entries, including the two audit artifacts |
| Isolated copies with intentionally damaged audit data | `PASS: isolated baseline; corrupt digest rejected; missing audit target rejected.` |
| `git diff --check` | Exit 0, no output |

The inventory comparison covers recorded regular files, not ACLs, xattrs, full
installation history, an active updater, or ultimate authorship. Link scanning is
not a complete dependency resolver. Source/license findings do not establish
behavioral suitability. No imports, live installation changes, chezmoi retirement,
host-discovery runs, or bundled diagnostic helpers were executed. Existing skill
contents and model-driven evaluation cases remain unchanged.

## Companion import checks

The first companion tranche adds codebase design, systematic debugging, and
acceptance verification. It does not import the remaining audited collection or
close unchanged CI/Git workflows. Two read-only reviewers independently checked
scope/safety and layered provenance/licenses, then reviewed the adaptations.

| Check | Observed result |
| --- | --- |
| Pinned Bolens input comparison | All 29 original/vendored files match the complete tree at `e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d` before adaptation |
| Ancestor notices and file identities | Six full license texts match reviewed source evidence; the original Caveman license/scope note is unchanged. Reviewers separately rehashed all 34 resulting payload files and all 29 source inputs |
| `npm test` | `11 package checks passed; model behavior not evaluated.` |
| Self-contained selection | `3 imported skills passed isolated folder, notice, identity and link checks.` No sibling skills or repository-root notices are present in those copies |
| Optional polluter helper | `7 helper fixture cases passed; real project tests and network were not used.` Cases cover sorted selection/exclusions, target creation, failed tests, discovery limit, no matches, direct-child timeout cleanup, and an existing target |
| Documented status example | `5 command-status fixture cases passed; the documented outer status is preserved.` Cases cover success, producer failure, renderer failure, both failing, and grep's no-match status |
| Intentionally invalid import copies | Missing notice, missing support reference, changed content, and a hidden sibling dependency were all rejected; the unmodified copy passed |
| Actual npm tarball | `@tahabakhit/skills@0.1.0`; 56 entries. Extracted with no install hooks and all 11 package checks passed from its package directory |
| Packaged helper modes | Both shell and Python entrypoints retain mode `755`; the shell wrapper is exercised through a symlink |
| `git diff --check` | Exit 0, no output |

The automated import checks verify current Git blob identities, declared file
sets, license markers, and local reference closure. They do not independently
retrieve upstream sources, verify every SHA-256 field, or prove legal clearance.
Pinned-source/license comparisons and SHA-256 rechecks were separate audit work.
The Python and Bash helper contents match the reviewed source; only the shell
entrypoint's mode changed to match its documented executable invocation.

The timeout fixture checks the direct child. Descendant-group cleanup, INT/TERM
cancellation, escaped sessions, backpressure, macOS behavior, and the Python 3.9
minimum were not exercised. The TypeScript example was not compiled or run.
Tests used Linux with Python 3.15.1. There were no real diagnostic runs, target
project test executions, live installations, global selections, host-model
sessions, remote writes, or ownership transfers. New model-driven cases in
[test/scenarios.md](test/scenarios.md) remain proposed checks, not passing results.

## Consolidated source catalog and entrypoint pilot

The expanded source has 21 canonical owners, local notices/provenance and no
required sibling instructions. The original attributed imports retain their 29
source-input records and complete ancestor grants. Two independent final source
reviews found no remaining material integration blockers in their assigned scope.
Their findings led to test-only authority, in-scope defect, CSV/formula, OCR,
candidate-code execution and pre-hosted-output privacy corrections. These are
source-review results, not passing behavioral tests.

[The pilot record](evaluations/entrypoint-pilot/RESULTS.md) contains 32 completed
answer sessions across eight frozen tasks, two conditions and the two registered
OpenAI IDs. There were also two fresh tool-free grading sessions and independent
adjudication. The 32 figure counts task answers, not all research/grading work.
Saved contexts matched task/common/candidate bytes and expected sections. Every
answer completed with recorded medium thinking and no tool calls/results or
observed retry/error entries. This establishes the tested construction, not
hidden provider identity or internal server behavior.

Frozen strict scores were 7/8 versus 8/8 for `gpt-6.1-sol` and 3/8 versus 6/8 for
`gpt-6.1-terra`, baseline versus skill. No listed failure flags occurred. A separate
post-score audit found the eight nonpasses mostly reflect explicit completeness
or restatement rather than substantive wrong behavior. The strict scores remain
unchanged. Do not report the four discordant pairs as four corrected factual
errors or whole-system uplift. Additional input was 4,957 reported tokens per ID
across eight treatment calls. Gateway billing was not independently verified.

Frozen candidate snapshots remain separate from current source. Debugging and
verification received optional-routing updates after freezing. The original
pair and 12 other owners were not tested. The pilot did not load references,
run SQL, inspect a service, edit a document, render a UI or exercise real delivery.

## Expanded package checks

The checkout and an independently extracted 188-entry npm tarball both returned:

```text
14 package checks passed; no model calls made by this command.
```

Those checks include all 21 independently copied folders, 111 recorded payload
identities, six selectable-folder fixtures, seven helper fixtures, five command
status fixtures and offline consistency checks for the 32-answer record. The
record checks cover manifest/snapshot/task-bank hashes, scoring-freeze identity,
assignments, quoted evidence and paired calculations. They do not certify semantic
judgments or repeat model calls. The archive has no required runtime dependencies
or install hooks.

All 67 historical live shared-skill files still matched the audit snapshot after
source integration. No installed folder, live lock, chezmoi source or host setting
was migrated by this task. The source tarball is not an installation test.

## Public distribution and selector checks (0.2.0)

Environment: Fedora 45 Linux, Node 24.22.2, npm 11.19.1; login shell fish.
The public repository and npm package changes were explicitly requested. This
phase changes distribution code, not the 21 skill payloads or frozen pilot scores.

| Check | Observed result |
| --- | --- |
| Source package checks | All 14 existing offline checks pass |
| Node selector/release tests | 44 tests pass, including literal selection, scope/agent validation, collision/lock preservation, malformed receipts, partial scope failure, source/target aliases, stale consent, hard-linked locks, file modes/directories, builder sentinels and immutable approved artifacts |
| Release secret-scan regression | A synthetic token inside a `.tgz` payload is detected after freezing exact bytes under Gitleaks-recognized `.tar.gz` names. Original artifact changes cannot alter those publication copies |
| Static checks | ESLint passes with a maximum function complexity of 14 |
| Real Skills CLI 1.7.4 integration | All 21 skills split between temporary global (4) and project (17) scopes; Pi, Claude Code and Codex receipts verified, with 42 physical copies because Pi/Codex share canonical storage; destination hashes and both locks checked |
| Collision retry | Reinstall without replacement consent refused; existing bytes preserved |
| Native terminal wizard | Selected global core, project data, a repository path and Pi by number. Dry run printed the expected plan and left temporary HOME/project empty |
| Packed distribution | Seven 0.2.0 tarballs, including the 202-entry umbrella. Actual archive entry, payload identity, notice and CLI checks pass. The extracted umbrella passes all 14 package checks and 44 Node tests without runtime-library installation |
| Public-release source review | Independent reviews found and drove corrections to ancestor-alias output deletion, source/destination overlap, stale replacement consent, copy verification and hard-linked lock handling |

`node test/install-smoke.mjs` repeats the real installer check with disposable
HOME/project/config paths and a cached pinned installer. It executes the installer,
not skill helpers or model sessions. Warm its cache with
`npx --yes skills@1.7.4 --help` if necessary. The ordinary `npm test` suite does not
make registry/model calls or install skills in live directories.

The repository is public. At initial packaging, missing registry authentication
blocked npm publication with `ENEEDAUTH`. That blocker was later resolved and the
publication checks below completed. Packing and dry runs alone were not counted
as publication. No live skill directory, lock, chezmoi source or host setting was
migrated or installed into by this phase.

## npm publication (0.2.0)

All seven packages were published publicly on 2026-11-02 from source commit
`331fbafa71047fa0a1bb0d97e92a8bb948dc9324`. Unauthenticated registry reads confirmed
every `0.2.0` version, its `latest` tag and its exact approved SHA-512 integrity.
The public identities and verification time are recorded in
[the release record](https://github.com/tahabakhit/skills/blob/main/releases/0.2.0.json).

Fourteen consumer checks passed against the real registry: `npx --version` and
`npx --list` for each of the seven packages, run outside the source checkout.
These downloaded and executed the published selectors without installing skills
into live agent or project directories. Publication used the already reviewed,
frozen tarball bytes without a version bump or repack.

npm accepted publications before making their metadata visible. Core and
engineering became visible after a processing delay and were checksum-verified
before continuation. Publishing approval then expired. After fresh browser
approval, the remaining five independent artifacts were submitted together and
verified after processing. No accepted version was blindly republished. Later
Git documentation updates do not alter the immutable published artifacts.

## Preservation checkpoint

After publication, the preservation agent reported a verified private copy of
Git commit `6fbe1ae51bf77bd6a42366f5e448366985568d93`, the complete repository,
ignored distribution output and both approved/published release manifests. The
tracked `releases/0.2.0.json` record was included.

Reported checks passed for source/copy scans, Git history scans, two checksum
comparisons, copied-repository `git fsck` and stable Git state. The seven tarballs
and approved-release manifest were byte-identical to the earlier preserved
`331fbaf` release artifacts. Capture performed no builds, packing, publication,
installation or source writes. The capture freeze was released after verification.
This checkpoint covers `6fbe1ae`, not later documentation commits.

## Installed-specialist source import

At this import checkpoint, the source catalog contained 29 skills. Eight new folders retain pinned
Bolens/Fedora ancestry, complete selectable-folder notices and input/output
identities. Three existing owners incorporate attributed references rather than
adding duplicate technical-writing, Git or CI entrypoints. The disposition and
live-switch precautions are in [the import guide](audits/installed-skill-import.md).

Executed for this change:

- Pre-edit baseline: package checks and all 44 Node tests passed.
- `npm run lint`: passed.
- `npm test`: package checks, all 29 isolated-folder closure/notice/digest checks,
  validator mutation fixtures and all 50 Node tests passed.
- New synthetic fixtures cover owner selection/exclusions, unchanged helper
  identities, drift content/link/exclusion results and exit states, collector
  exclusive private output, existing-file/symlink refusal, output limit, total
  timeout and reaping of the owned synthetic child. No live health probes ran.
- `node test/install-smoke.mjs`: real pinned Vercel 1.7.4 installation passed in
  disposable HOME/project directories: 5 global core and 24 project-local skills,
  Pi/Claude Code/Codex receipts, 58 physical copies, payload hashes/locks and
  refusal of an unapproved reinstall. This is installer evidence, not live host
  discovery or duplicate-precedence evidence.
- `npm run pack:packages`: seven source-build tarballs generated. Extraction checks
  verified exact assigned skill folders, recorded payload hashes and executable
  helper modes in every tarball. These source builds retain development version
  `0.2.0` but are not the immutable published artifacts and were not published.
- Gitleaks scanned all seven frozen source-build archives at archive depth 2 and
  reported no leaks. `git diff --check` passed.

The optional Python helper implementations are preserved byte-for-byte. Tests
exercise synthetic local files and mocked commands, not broad host logs, system
repair, hostile filesystem traversal, every cancellation case or Fedora package
probe coverage. The collector still has Arch-specific package probes; the drift
comparator still has no internal traversal/hash budget. Those limits are explicit
in their entrypoints, not represented as fixed code.

No live skills, locks, host settings, dotfile/chezmoi sources or private instructions
were replaced. npm `0.2.0` continues to contain the earlier 21-skill catalog. The
GitHub source/checkout is required for these additions until a new release.

## Chezmoi import and origin recovery

Environment: Fedora 45 Linux, Node 24.22.2, chezmoi 2.73.0, `gh` 2.97.0,
`uv` 0.13.5, login shell fish. Baseline `npm ci --ignore-scripts`, ESLint,
14 package checks and all 44 existing Node tests passed before integration.

The [origin report](audits/skill-origins-and-missing-targets.md) verifies all 67
existing installed file digests against the historical inventory and complete
pinned source trees. All 13 missing sibling targets exist at the pinned Bolens
revision. It distinguishes 22 broken sibling-link occurrences from 12 absent
collection-root provenance pointers and records conditional dependencies, optional
handoffs, existing owned replacements and remaining capability gaps. Existing
installed payloads and historical audit snapshots were preserved.

The new `chezmoi` owner consolidates nine reviewed upstream entrypoints and all
38 references. Independent review compared all 48 original input identities,
including the original MIT license, to the complete pinned GitHub tree and
recomputed all 51 resulting payload identities. One provenance file records those
results and is excluded from its own hash list. All supporting Markdown links
resolve within a standalone copy.

Review drove corrections to a negative `chattr` modifier, overbroad `exact_`
directory scope, invalid `--mode dir`, active-config naming, init-data/lifecycle
claims, dry-run wording, stale persistent-state paths and unsafe bootstrap/token
URL examples. These are documentation corrections, not evidence that every
upstream example works on every chezmoi release.

Ten dedicated tests pass: seven structural/content/identity checks and three
actual chezmoi CLI fixtures. The latter use inert hand-written data, isolated
HOME/XDG roots, source, destination, config, cache, working directory, persistent
state and temporary paths, with a minimal environment. They exercise rendering,
path mapping, scoped dry-run and exact-directory cleanup boundaries. No imported
script, real hook, credential provider, network fetch or live dotfile apply is
part of those fixtures. Text assertions verify documented safeguards, not that an
agent obeys them.

Before merging the concurrent specialist import, chezmoi worktree checks passed:
ESLint, all 14 package checks, all 54 Node tests, 22 standalone copies, and the real pinned Skills CLI installer across disposable
global/project scopes for Pi, Claude Code and Codex. The latter verified 44 physical
copies, payload hashes, receipts and lock preservation. Seven local tarballs were
built, and the operations archive includes the new entrypoint, notices, provenance
and safety reference. These local build artifacts are not a published release.

The upstream `skills-ref` validator at `69ef37e9424c0a7ea9dd2293b559e43ec8176379`
accepted all 22 source skills at that checkpoint. Gitleaks found no leaks in the imported skill.
Published npm `0.2.0` artifacts remain unchanged and do not contain this addition.
No new npm release was published.

Only the new `chezmoi` skill was then globally installed through the pinned
selector for Pi, Claude Code and Codex. The two physical copies at
`~/.agents/skills/chezmoi` and `~/.claude/skills/chezmoi` each match all 52 source
files, including provenance. Receipts and the global lock passed the selector's
checks; no installation guard remained. All 67 pre-existing installed file
SHA-256 values still match the historical inventory, and the chezmoi source
repository remains clean. No existing specialist was replaced, no live dotfile
apply ran and no managed source entry or host setting was changed. File placement
and receipts do not prove native host activation; start a fresh host session to
discover the addition.

The concurrent installed-specialist commit `85c47f0` was then integrated without
changing any of its skill payloads. The combined catalog contains 30 skills,
with five in core and nine in operations. All 14 package checks, all 60 Node tests,
ESLint and all 30 upstream format validations passed again. The real pinned
installer verified five global and 25 project-local skills in disposable state,
60 physical copies, receipts, payload hashes, locks and reinstall refusal.
All seven combined source-build archives passed an archive-depth-2 Gitleaks scan.
No combined specialist installation was performed on the live machine.

## npm 0.3.0 release preparation

Environment: Fedora 45 Linux, Node 24.22.2, npm 11.19.1, Git 2.56.0 and fish
login shell. The `main` and `skills-spec` worktrees started clean at `65dd9f9`,
also observed on remote `main`. There was no outstanding merge. The owner
explicitly requested integration, remote push and npm publication.

The release changes package metadata, root lock versions and current-version
assertions to `0.3.0`. Canonical skill payloads, catalog membership and the six
groups are unchanged. All seven `0.3.0` versions returned registry 404 before
publication. The authenticated npm identity was `tahabakhit`.

Preparation checks passed:

- `npm ci --ignore-scripts`: no reported vulnerabilities.
- ESLint, 14 package checks and 60 Node tests: passed without skips.
- Real pinned installer: five global and 25 project skills across Pi, Claude Code
  and Codex in disposable state, 60 physical copies, receipts, hashes, locks and
  refusal of an unapproved reinstall. No live skill installation ran.
- Seven packed archives: skill sets matched the six groups and umbrella, and
  every selected skill file and directory matched source bytes and modes.
  Extracted selectors passed version/list checks for all seven packages.
- Independent read-only review of the six metadata/test/documentation paths:
  no material findings. This was not independent execution of the checks.

Those preparation checks preceded the publication verification below.

## npm publication (0.3.0)

All seven packages were published publicly on 2026-11-02 from source commit
`9886e55e80b35c660b930d79856a7817f832d4da`. The `main` and `skills-spec` worktrees
were synchronized and the source pushed before publication. No grouping proposal
was implemented, no live workflow skill was installed and no managed installation
was replaced.

The clean-commit dry run approved exact tarballs. Gitleaks scanned source history
and the frozen tarballs under recognized archive names. After browser approval,
npm accepted core but the release command stopped on delayed registry visibility.
A resume attempt received 409 for the already-staged core version. It did not
overwrite that version. The six remaining packages were submitted from the same
approved, integrity-checked frozen artifacts without resubmitting core. Registry
processing finished before the checks below were declared passed.

For every package, public registry metadata confirmed `0.3.0`, its `latest` tag,
SHA-512 integrity and SHA-1 shasum. Independently downloaded tarball bytes matched
the approved SHA-512 values. Fourteen public consumer checks then passed: version
and list for each selector, using its package-specific executable in a disposable
home/cache with no inherited credentials. These checks used Node 22.23.4 and npm
11.19.1; the parent shell observed Node 24.22.2. No host skills were installed by
the consumer checks. Scratch state was removed afterward.

Exact source and registry identities are recorded in
[releases/0.3.0.json](releases/0.3.0.json). Subsequent documentation commits do not
change the published bytes.

## Source cleanup after 0.3.0

The current source removes the custom `.taha-install` guard mechanism without
adding another process lock. Regression fixtures confirm installs do not create
guards and that a legacy guard neither blocks installation nor gets modified.
Upstream Skills lockfiles and copy/receipt verification remain separate features.

Seven OS/platform/health owners were removed: `operate-systems`, `arch-linux`,
`arch-package-maintenance`, `arch-update-recovery`, `cachyos`, `rhel-fedora` and
`workstation-health-triage`. The source catalog now contains 23 skills; operations
contains only `managed-config-drift` and `chezmoi`. `herdr-core` was never an
included skill. Historical installed-skill audits are not current ownership checks.

Checks passed on Fedora 45, login shell Fish, Node 24.22.2 and npm 11.19.1:

- `npm run lint`.
- `npm test`: 14 shell package checks and all 57 Node tests, with no skips.
- `node test/install-smoke.mjs`: real pinned installer in disposable home/project
  paths; 23 skills across global/project scopes, Pi/Claude Code/Codex receipts,
  46 physical copies, file hashes and lock verification; unapproved reinstall
  refused. Temporary install state was removed.
- `npm run pack:packages`: seven local tarballs generated. These are test artifacts,
  not published replacements for immutable npm `0.3.0`.
- `git diff --check`.

No live skill installations or chezmoi sources were modified. No npm publication
was performed. The registry's existing `0.3.0` still contains 30 skills and the
old guard implementation; source cleanup does not alter those artifacts.

## Native bundle regrouping

The authorized regrouping was implemented by six independent group workers in
six long-lived worktrees, then merged on the main integration branch. Separate
worktrees supplied shared tooling/tests and documentation. Current canonical
source is `skills/<group>/<name>/`, partitioned into 22 standalone owners:

| Bundle | Recommended scope | Count |
| --- | --- | --- |
| core | Global | 4 |
| engineering | Project | 12 |
| content | Project | 1 |
| interface-review | Project | 1 |
| data | Project | 2 |
| configuration | Project | 2 |

Core contains discovery, research, content creation and bounded verification.
Engineering gains `define-work`. The redundant `unslop` skill is removed without
an alias; useful scoped cleanup guidance and applicable attribution remain in
`create-content`. Discovery and verification now make software-specific checks
conditional and include non-code examples. These edits have structural checks,
not new model-effectiveness measurements. Frozen pilot/audit records retain their
original bytes and are not evidence for changed entrypoints.

Observed on Fedora 45, login Fish, Node 24.22.2 and npm 11.19.1:

- `npm run lint` and `npm test`: all 14 shell package checks and 62 Node tests
  passed, including catalog paths, independent-folder closure/digests, immutable
  release records, selection and safety fixtures.
- `node test/install-smoke.mjs`: the optional checkout wrapper passed its pinned
  Skills 1.7.4 installation in disposable home/project paths with all 22 skills.
- `node test/native-install-smoke.mjs <skills-1.7.5-cli>`: upstream Skills 1.7.5
  directly installed six local subtree sources and the umbrella, without our
  wrapper. Exact names, scopes, full bytes/modes, Pi/Claude Code/Codex receipts,
  unrelated-file preservation and normal-journey absence of local core copies
  passed. No live HOME or project received skills.
- Repeated that native smoke with published GitHub commit
  `d1fe9aa5fc905dde0d705af236dc9e4220997647`: all six real GitHub subtree URLs and
  the umbrella URL passed the same installation/copy/scope/receipt assertions.
  These checks used explicit copy mode and fresh disposable targets, not the
  upstream default-link update/removal lifecycle or old-installation migration.
- `node test/pi-discovery.mjs <installed-pi-loader>`: Pi 1.5.0's installed loader
  discovered the umbrella and every group with no diagnostics. This does not
  establish runtime routing or agent task performance.
- `npm run pack:packages`: all seven local packages generated successfully with
  grouped payloads. New interface-review/configuration package names are local
  output only. No registry publication was performed.

Two independent read-only final reviews compared candidate
`d1fe9aa5fc905dde0d705af236dc9e4220997647` with base
`6ec82322433acbe2272ca310e8a3d514e1d8c272`. Neither found material defects or merge
blockers. The code reviewer independently reran all 62 Node tests and 14 shell
package checks. The contract reviewer read all 22 entrypoints and checked all 176
recorded payload SHA-256/Git identities and 32 declared license files. Neither
review establishes behavioral efficacy, remote-update correctness or legal
clearance. The later evidence update changes documentation only.

The source package version remains 0.3.0; its immutable registry release is still
the old 30-skill bundle, not these source bytes. Do not republish that version.
The separate machine bootstrap still consumes the older npm wrapper and asserts
its former core membership/API; its compatibility needs a separately scoped update
before a regrouped npm release. No bootstrap was run or modified by this task.
Live skills, host settings, chezmoi sources and removed OS skills were not changed.

## Chezmoi skill ownership transfer

Moved the complete 52-file `chezmoi` payload from
`skills/configuration/chezmoi/` to the owner's dotfiles repository at
`private_dot_agents/private_skills/chezmoi/`. References, notices and provenance
are byte-preserved. Its tests moved to `tests/chezmoi-skill.test.mjs` there.
Current source now has 21 skills; configuration contains only `managed-config-drift`.
Historical evidence above retains its original counts and paths.

Environment: Fedora 45 Linux, Node 24.22.2, npm 11.19.1, Git 2.56.0;
login shell `/usr/bin/fish`. Checks passed:

- Skills repository: 14 package checks, 52 Node tests, ESLint and diff whitespace.
- Dotfiles repository: 11 skill tests, including all payload identities and a
  byte-identical inert chezmoi archive at `.agents/skills/chezmoi/`.
- Dotfiles configuration selection on simulated Linux and macOS, plus documentation
  links. The skill is selected on all platforms, without a new Claude-specific copy.

No live apply, live copy/link replacement, installer-lock cleanup, bootstrap
execution or npm publication was performed. Existing live copies remain unchanged;
this proves source deployment mapping, not running-agent discovery or live migration.

## Managed-config-drift ownership transfer

Moved the complete 7-file `managed-config-drift` payload from
`skills/configuration/managed-config-drift/` to the owner's dotfiles repository at
`private_dot_agents/private_skills/managed-config-drift/`, byte-identical; the
comparator uses chezmoi's `executable_` source attribute. It joins the Linux-only
OS skills there. Its helper tests moved to `tests/config-drift-skill.sh`. The
`configuration` bundle, its Claude Code plugin entry and its locally generated
package identity are removed. Current source now has 20 skills in five bundles.
Historical evidence above retains its original counts and paths.

Environment: macOS 27.2, Node 26.12.0, npm 11.20.0, Git 2.56.0; login shell
`/bin/zsh`. Node tests ran with `TMPDIR` under the home directory because macOS
`/var` is a symlink the installer safety checks refuse. Checks passed:

- Skills repository: package checks, 50 Node tests and diff whitespace. ESLint was
  not run: it is not installed in this checkout.
- Dotfiles repository: payload digests, provenance and inert archive for all eight
  Linux skills (`os-skills.sh` with Homebrew's `chezmoi` on its restricted PATH),
  drift helper behavior, simulated Linux/macOS selection and documentation links.

No live apply, installer-lock cleanup or npm publication was performed. Existing
live copies remain unchanged.

## Not established

The tool-enabled cases in `test/scenarios.md` remain proposals, not passing
results. Question quality for the original pair, real authority/stopping behavior,
automatic routing, full engineering success and source-specialist equivalence
are not established. A forced text-only comparison cannot establish those facts.

The expanded installation check verifies temporary destination files, not that
Claude Code, Codex or Pi actually consume every skill correctly. Native interactive
Pi evaluation sessions were a runner, not client-TUI acceptance tests. Existing
specialist ownership transfer remains unverified and was not performed. Public npm
publication is verified for `0.2.0` and `0.3.0`, but no skills were installed into
real projects by these publication checks.
