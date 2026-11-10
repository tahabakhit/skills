# Archived skills

These skills overlapped [pstack](https://github.com/cursor/plugins/tree/main/pstack),
which is now the default engineering workflow (installed through
[pstack-claude](https://github.com/michael-denyer/pstack-claude)). Two skills claiming
the same trigger make selection unpredictable, so the overlapping ones were moved
here on 2026-11-10. They are frozen: not cataloged, packaged, distributed or
loaded by any harness, and their tests were removed. Their licenses and
provenance records stay with them; [third-party notices](../THIRD-PARTY-NOTICES.md)
point here.

| Skill | Former bundle | pstack replacement |
| --- | --- | --- |
| `discover-work` | core | `interrogate`, `in-your-own-words`, `sharpen`, `architect` |
| `verify-and-stop` | core | `principle-prove-it-works` |
| `change-safely` | engineering | poteto-mode refactoring playbook, `principle-migrate-callers-then-delete-legacy-apis` |
| `code-quality` | engineering | `thermo-nuclear-code-quality-review`, `deslop`, code principles |
| `code-review` | engineering | `thermos`, `thermo-nuclear-review`, `interrogate` |
| `codebase-design` | engineering | `architect`, `principle-exhaust-the-design-space` |
| `define-work` | engineering | `architect`, poteto-mode feature playbook |
| `deliver-work` | engineering | poteto-mode feature, shipping and babysit playbooks |
| `git-hygiene` | engineering | `make-pr-easy-to-review`, `fix-merge-conflicts`, opening-a-PR playbook |
| `repository-onboarding` | engineering | `how`, poteto-mode investigation playbook |
| `security-review` | engineering | `thermo-nuclear-review` |
| `systematic-debugging` | engineering | poteto-mode bug-fix and forensics playbooks, `principle-fix-root-causes` |
| `testing-work` | engineering | `tdd`, `principle-test-behavior-not-implementation`, `create-verification-skill` |
| `hc-delegation` | agents | pstack subagent tools, Orca orchestration |

To restore one, move its folder back under `skills/<bundle>/`, add it to
`catalog.json` and `distribution.json`, and restore its tests from Git history
(commit `67f7199` has the last live version).
