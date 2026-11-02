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

## Not established

No model-driven acceptance scenarios have been run. There is no evidence yet for
question quality, consistent authority handling or engineering delivery success.
`test/scenarios.md` defines the evaluation cases, not passing results.

Discovery with Pi's loader and installation into Claude/Codex directories do not
establish model behavior in those clients. No interactive TUI or full engineering
workflow was tested. npm publication and authority over the `@tahabakhit` scope
have not been verified. No package was published or registered in real projects.
