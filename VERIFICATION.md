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

## Not established

No model-driven acceptance scenarios have been run. There is no evidence yet for
question quality, consistent authority handling or engineering delivery success.
`test/scenarios.md` defines the evaluation cases, not passing results.

Discovery with Pi's loader and installation into Claude/Codex directories do not
establish model behavior in those clients. No interactive TUI or full engineering
workflow was tested. npm publication and authority over the `@tahabakhit` scope
have not been verified. No package was published or registered in real projects.
