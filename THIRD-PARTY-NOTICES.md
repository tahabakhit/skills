# Third-party notices

The discovery and specification instructions adapt patterns from Matt Pocock's
skills. Their sources and the changes made here are described in SOURCES.md.
This package is not affiliated with or endorsed by Matt Pocock or 1aboveio.
No 1aboveio package implementation or bundled scripts are redistributed.

## Original procedures and selectable notices

The original consolidated procedures record their expression and conceptual
source comparisons in local source records. Later reference adaptations are
attributed below and in folder-local provenance. No upstream engine, document
implementation or runtime is bundled. Their
project MIT notice travels in each selected folder. This is not a legal opinion
that conceptual-source review clears every possible derivative.

The discovery and specification folders each retain a complete project MIT and
Matt Pocock MIT notice. Frozen attributed entrypoint snapshots used for evaluation
retain applicable complete notices under the evaluation's `notices` directory.
They are benchmark data, not additional discoverable skills.

## Imported companion skills

The three companion folders are maintained forks of Bolens' agent skills at
`e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d`. Their complete applicable grants ship
inside each folder so selective copying retains them:

| Material | Copyright and complete notices |
| --- | --- |
| Codebase design | Copyright (c) 2026 bolens: [MIT](skills/engineering/codebase-design/LICENSE). Copyright (c) 2026 Matt Pocock: [MIT](skills/engineering/codebase-design/LICENSE-MATT). |
| Systematic debugging and its vendored CI references | Copyright (c) 2026 bolens: [MIT](skills/engineering/systematic-debugging/LICENSE). Copied and derived Superpowers material, copyright (c) 2025 Jesse Vincent: [MIT](skills/engineering/systematic-debugging/LICENSE-SUPERPOWERS). The retained Lace example does not include the Lace runtime. |
| Acceptance verification | Copyright (c) 2026 Julius Brussee: [MIT](skills/core/verify-and-stop/LICENSE), including the skill-only split-license scope note. Copyright (c) 2026 bolens: [MIT](skills/core/verify-and-stop/LICENSE-BOLENS). No Caveman Engine-linked runtime is bundled. |

Their local `PROVENANCE.json` and `UPSTREAM.md` files record reviewed source
revisions, ancestry limitations, input/result hashes, and adaptations. The
incomplete local-original labels in the immediate source are not claims of
exclusive authorship here. These projects do not endorse this package.

## DROO specialist references

Source: [DROOdotFOO/agent-skills](https://github.com/DROOdotFOO/agent-skills/tree/252cabcc930274ae32e131d67c354091c6ec651c),
commit `252cabcc930274ae32e131d67c354091c6ec651c`, MIT, copyright (c) 2026 DROO.

- `performance-profiler` guidance is adapted into
  [performance profiling](skills/engineering/systematic-debugging/references/performance-profiling.md).
  The full grant is [LICENSE-DROO](skills/engineering/systematic-debugging/LICENSE-DROO);
  local additions carry the [project notice](skills/engineering/systematic-debugging/LICENSE.local).
- `database-designer/migration-safety.md` is adapted into
  [database migrations](skills/engineering/change-safely/references/database-migrations.md).
  The full grant is [LICENSE-DROO](skills/engineering/change-safely/LICENSE-DROO);
  the existing project notice covers local additions.

Per-folder provenance records input hashes and revisions. No upstream scripts,
agent runtimes or new skill entrypoints are included. This project is not
endorsed by DROO.

## Installed-specialist adaptations and retained references

The `managed-config-drift` adaptation of Bolens material at
`e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d` previously moved to the owner's dotfiles
repository and has returned as `skills/workstation/managed-config-drift`. Its
complete MIT grant with copyright 2026 bolens (`LICENSE-BOLENS`), the project MIT
notice and provenance travel with it.

`skills/core/create-content` includes three Bolens technical-writing references;
`skills/engineering/git-hygiene` four Git references;
`skills/engineering/ci-maintenance` two setup/environment references. Each affected
folder also carries the complete `LICENSE-BOLENS`.
Their earlier original/conceptual records do not claim these later imports as
newly authored expression. Per-folder provenance records the exact inputs.

### Historical imports removed from current source

Current source contains 43 skills under `skills/<group>/<name>/` in nine bundles;
the former configuration bundle name is removed. The redundant `unslop` folder
is removed with no alias; prose cleanup belongs to core's `create-content`.
Its historical adaptation used the pinned Bolens grant above, retained in the
immutable releases that include it. `operate-systems`, `arch-package-maintenance`,
`arch-update-recovery`, `rhel-fedora` and `workstation-health-triage` are no longer
included under those names. Current `arch-linux` and `cachyos` folders returned
from dotfiles in the linux bundle; their local notices and provenance describe
the current payloads. Historical audit/import records remain evidence of earlier
work, not current source contents or live ownership.

Immutable npm `0.3.0` still contains the former 30 skills and their folder-local
notices. The removed Arch/CachyOS/health adaptations carried the Bolens grant
above. The former `rhel-fedora` adaptation used `iuliandita/skills` at
`496420bfb995892598e0eae18aff2a5be3d800b2`, with its complete MIT grant, copyright
2025 Iulian Dita, in that artifact's `LICENSE-UPSTREAM` and project notices for
local changes. Those files are not linked as current source paths here. Source
and documentation edits do not replace registry bytes or remove their notices.
The package version remains `0.3.0`; new interface-review package
identity is generated locally, not published. Existing design/operations
releases retain their original names and contents. Neither upstream endorses
this package.

`herdr-core` was never an included skill. No `herdr-core` or `ketch` content/runtime
is redistributed by these imports; historical audit references do not establish
current installation ownership.

## Chezmoi skills

Source: [mkobit/chezmoi-skills](https://github.com/mkobit/chezmoi-skills/tree/093b6c4ee156d53f6d74257f39b76d22cf9180fc),
MIT License, copyright (c) 2026 Mike Kobit. Nine skill entrypoints and 38 reference
files were consolidated and adapted into the `chezmoi` skill, previously moved to
`private_dot_agents/private_skills/chezmoi` in the owner's dotfiles repository,
and now returned as `skills/workstation/chezmoi`. The complete source grant and
local contribution notice travel with the skill.
Its `PROVENANCE.json` records original input paths/hashes, resulting identities and
changes. No upstream runtime, plugin or evaluation harness is bundled. Neither
Mike Kobit nor the chezmoi project endorses this adaptation.

## Matt Pocock skills

Source: https://github.com/mattpocock/skills

MIT License

Copyright (c) 2026 Matt Pocock

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
