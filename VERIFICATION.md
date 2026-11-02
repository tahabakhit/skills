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

The repository is public. npm publication remains blocked by missing registry
authentication (`npm whoami` reports `ENEEDAUTH`). A public npm manifest, successful
packing or a publication dry run does not establish ownership of the npm scope or
prove publication. No live skill directory, lock, chezmoi source or host setting
was migrated or installed into by this phase.

## Not established

The tool-enabled cases in `test/scenarios.md` remain proposals, not passing
results. Question quality for the original pair, real authority/stopping behavior,
automatic routing, full engineering success and source-specialist equivalence
are not established. A forced text-only comparison cannot establish those facts.

The expanded installation check verifies temporary destination files, not that
Claude Code, Codex or Pi actually consume every skill correctly. Native interactive
Pi evaluation sessions were a runner, not client-TUI acceptance tests. Live global
installation, ownership transfer, npm publication and authority over the
`@tahabakhit` npm scope remain unverified. No package was published or registered
in real projects.
