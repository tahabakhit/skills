# Research and design basis

## Evidence inspected

Research used the published npm artifacts and GitHub file contents, not only
search snippets. The linked 1aboveio/ai repository returned 404 through gh, so
its source history was not available. Published package contents were available.

| Source | Revision inspected | What it established |
| --- | --- | --- |
| [1aboveio skills bundle](https://www.npmjs.com/package/@1aboveio/skills) | 1.0.21 | First-party package list and explicit optional Matt Pocock integration |
| [Engineering skills](https://www.npmjs.com/package/@1aboveio/engineering-skills) | 0.1.21; contained skills advertise release-version 0.50.1 | Delivery input, acceptance contract, preflight and host requirements |
| [Pi Better Harness](https://www.npmjs.com/package/pi-better-harness) | 0.38.0 README | Creator's Pi runtime bundle, separate from skills |
| [Matt Pocock skills](https://github.com/mattpocock/skills/tree/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d) | 4ae2317ddb22b046e26455e4f9c9b3aaaf62212d | Current grilling, to-spec, domain-modeling, research and to-tickets |
| [Matt revision selected by 1aboveio](https://github.com/mattpocock/skills/tree/ed37663cc5fbef691ddfecd080dff42f7e7e350d) | ed37663cc5fbef691ddfecd080dff42f7e7e350d | Pinned in the bundle manifest; grilling and to-spec inspected at this revision |
| Pi skills and package documentation | Installed Pi 1.4.0 | Skill discovery, frontmatter, local package registration and invocation |

The package version and the contained skill release-version are different
identities. Neither should be reported as the other's version.

## Findings from 1aboveio first

The bundle manifest selects optional third-party sources separately from
first-party packages. Matt's listed skills include grilling, domain-modeling,
research, to-spec and to-tickets. The bundle does not supply a first-party
general product-discovery interview or specification-authoring skill.

Relevant shipped files:

- `engineering/references/feature-delivery.md`: focus on the requested outcome,
  reuse sufficient proof, avoid unrelated hardening and new gates.
- `resolve-issues/SKILL.md`: acceptance requirements remain the contract.
  A spec without issues is one unit. Reports, tests added or code merged are not
  by themselves proof of acceptance.
- `resolve-issues/references/preflight.md`: local or pasted specs are supported.
  Product/scope questions can hold work. Issue publication is not a prerequisite
  for starting from a local spec.
- `resolve-issues/references/shared-modules.md`: use actual host catalog evidence.
  Required model/launch resolution can block the workflow.
- `engineering/references/tracker-conventions.md`: explicit destinations and
  existing policy matter. Its GitHub/Linear routing is a creator convention,
  not a universal default to impose on an unconfigured repository.

Discovery therefore ends with agreed behavior and proof expectations. It does
not imitate their model catalog, scheduler, review verdicts or task-plan format.
Resolve-issues performs its own preflight. A well-written spec is not runtime
certification and is not a promise that delivery starts without further decisions.

## What was adapted from Matt

[Grilling](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/productivity/grilling/SKILL.md)
separates discoverable facts from user decisions and follows dependent decisions.
The creator-selected older revision asks one question at a time; current main
batches the decision frontier. We default to one and permit a small independent
batch. We stop at material clarity rather than exhausting every branch.

[To-spec](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/to-spec/SKILL.md)
synthesizes existing discussion instead of repeating the interview. We keep that,
but replace extensive user stories and automatic publishing with observable
criteria, verification mapping and an approved local draft.

[Domain modeling](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/domain-modeling/SKILL.md)
uses precise terms, concrete scenarios and existing code to challenge ambiguity.
We use those during discovery without automatically editing glossaries or ADRs.

[Research](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/research/SKILL.md)
favors primary sources and cited findings. We make research conditional and do
not require a background agent or a separate research document.

[To-tickets](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills/engineering/to-tickets/SKILL.md)
uses end-to-end slices and real blocking edges. We permit slice proposals for
large work but leave ticket creation and scheduling to delivery.

## Expanded-system research

A later read-only assessment informed [the architecture plan](ARCHITECTURE.md).
These sources are design evidence, not dependencies, imported skills, or passing
workflow evaluations. The earlier adaptation record above describes the original
discovery pair rather than a mandate for the expanded collection.

| Source | Revision inspected | Design finding |
| --- | --- | --- |
| Published 1aboveio umbrella and six domain packages | Umbrella 1.0.21; domain packages 0.1.21 | Domain catalogs and explicit workflow ownership are useful. The umbrella selector writes Pi settings and includes a duplicate-hiding extension; some skills request advisory release checks. These are not required merely to distribute skills. |
| [Vercel Skills CLI](https://github.com/vercel-labs/skills/tree/92a9a34ac3bf88e695e468b90c7bf32f163d32c8) | 92a9a34ac3bf88e695e468b90c7bf32f163d32c8; registry version 1.7.4 | Supports explicit skill/agent selection and global/project scope. Discovery supports categorized catalogs. Profiles proposed here are our selection data, not a claimed CLI profile feature or dependency resolver. |
| [Matt Pocock](https://github.com/mattpocock/skills/tree/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d) | 4ae2317ddb22b046e26455e4f9c9b3aaaf62212d | Focused testing, diagnosis, and design practices can inform owned workflows. Its implement-spec orchestration is not a drop-in host-independent runtime. |
| [Impeccable](https://github.com/pbakaus/impeccable/tree/e89e3ada3e875a89ac2c5d33d11e65ebef6fe285) | e89e3ada3e875a89ac2c5d33d11e65ebef6fe285; skill metadata 4.8.0 | Current instructions invoke an engine that may download a binary. Optional hooks and persistent design artifacts need explicit integration assessment; copying SKILL.md alone is not equivalent to the complete workflow. |
| [Bolens agent skills](https://github.com/bolens/agent-skills/tree/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d) | e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d | Per-skill provenance, reviewed upstream changes, and migration safeguards are useful models. Twelve local entrypoint blobs match this revision; supporting-file equivalence was not established. |

Additional README/catalog inspection covered Vercel's agent skills, Anthropic's
skills, Trail of Bits, Superpowers, and OpenAI's skills/plugins repositories.
These are discovery leads, not approved imports. Anthropic distinguishes its
source-available document skills from its open-source examples. Trail of Bits
identifies CC-BY-SA-4.0 terms. OpenAI's skills README redirects new work to its
plugins repository. Check exact revisions and per-file licenses before importing
any material from these additional sources.

Fetched instructions asking agents to run update checks, engine launchers, hooks,
or setup writers were inspected as data. They were not executed. No skills were
installed or migrated during this assessment.

## Installed collection audit

The [installed-skill audit](audits/installed-skills.md) extends the earlier
entrypoint-only comparison. Its [file inventory](audits/shared-inventory.json)
records all 67 regular files across the 14 shared skill directories. All 50 files
in the 12 Bolens-derived folders match the complete pinned tree at
`e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d`, with no missing or extra regular files
in those folders. The recursive tree is not truncated; a fresh GitHub root lookup
confirmed its revision. This establishes file equality, not authorship, current
installation ownership, redistribution readiness, or model behavior.

Four adversarial audits covered dependencies/portability, workflows/overlap,
provenance/licenses, and installation ownership. Cross-review narrowed approval
and cleanup claims: the present spec-only skill does not execute implementation,
and the branch-cleanup reference already carries existing deletion authority.
The future owned workflow must not add redundant approval gates.

The provenance audit also recovered exact matching public snapshots for the two
shared skills outside Bolens:

| Material | Matching source revision | Finding |
| --- | --- | --- |
| [Fedora/RHEL skill](https://github.com/iuliandita/skills/tree/496420bfb995892598e0eae18aff2a5be3d800b2/skills/rhel-fedora) | `496420bfb995892598e0eae18aff2a5be3d800b2` | All 16 files match; retain Iulian Dita's 2025 MIT notice on import. |
| [Herdr integration stub](https://github.com/herdrdev/herdr-core/tree/5a9de29b2f9b6690388a1c297a7ca8d73df7d3e2/skills/herdr-core) | `5a9de29b2f9b6690388a1c297a7ca8d73df7d3e2` | Entire file matches; Apache-2.0 notice requirements apply. Installed CLI documentation is a normal tool dependency, not another skills bundle. |
| [Moshi best practices](https://github.com/rjyo/moshi-skill/tree/d09435760329125c30920210ccb1eb1e482f0700) | `d09435760329125c30920210ccb1eb1e482f0700` | Both Pi-path files match; no applicable license grant found in the reviewed source. Hold content import. |

The integration agent independently compared the Fedora/Herdr file sets and
blob IDs against fresh complete pinned source trees and inspected their root
licenses. All 14 shared origins are recoverable; copied folders still need
notice work before redistribution. Moshi's separate unresolved grants do not
block other candidates. No installed skill, lock, agent setting, or chezmoi
source was changed by this audit.

## Companion source imports

The first repo-only companion tranche imports `codebase-design`,
`systematic-debugging`, and `verify-and-stop` from the complete Bolens snapshot
`e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d`. All 29 input files, including three
vendored CI references, were checked against the pinned recursive tree before
adaptation. Each imported folder has a self-contained `PROVENANCE.json` with
original paths and hashes, resulting file identities, notices, and local changes.
No live skill tree, lock, agent setting, or chezmoi source was changed.

A second independent provenance review found copied material beneath two
incomplete `local-original` labels. Those labels are not treated as authorship:

| Import | Immediate source and ancestor evidence | Notices carried in the selectable folder |
| --- | --- | --- |
| `codebase-design` | Bolens snapshot above; Matt Pocock comparison `c0d69015e0cc8b66715beb3f93f9e53256e20f30`, directory `skills/engineering/codebase-design`. DESIGN-IT-TWICE matched exactly; DEEPENING derives from the same material with later edits. Historical import revision unknown. | Full Bolens MIT and Matt Pocock MIT |
| `systematic-debugging` | Bolens snapshot above; Superpowers comparison `f2cbfbefebbfef77321e4c9abc9e949826bea9d7`, directory `skills/systematic-debugging`. Eight original files match exactly and tracing is derived. Historical import revision unknown. | Full Bolens MIT and Jesse Vincent MIT |
| `verify-and-stop` | Bolens snapshot above; source-recorded Caveman audit `3b74643f4d910f496babd4e634b1ba7168816f14`, directory `skills/verify-and-stop`. | Original Julius Brussee MIT, with its unchanged split-license scope note, plus Bolens MIT. No Engine-linked runtime included. |

The integration agent checked the comparison trees and complete license texts.
Comparison revisions prove content matches and applicable published grants, not
an invented historical import event. Resulting file hashes record this fork's
adaptations, not an assertion that edited files still equal upstream.

Design now works serially by default and does not require a CONTEXT.md or a broad
audit specialist. Debugging vendors `development-environments.md`,
`setup-contracts.md`, and `command-evidence.md` from the same pinned CI skill;
per-file provenance preserves their original paths. This avoids importing CI,
Git, and their recursive handoffs merely to read required guidance. Optional
PR, release, fleet, browser, OS, TDD, and security specialists remain unavailable
unless separately installed. Existing task permissions and capability checks
still apply; no missing specialist is silently installed.

The unsafe path-prefix guard was removed from the debugging example rather than
presented as protection. Diagnostic producer status and privacy guidance were
clarified. Polluter runner bytes remain unchanged; its shell entrypoint is now
executable as documented. Historical pressure prompts and outcome claims remain
source artifacts, not live instructions or results reproduced by this fork.

These three companions close design/diagnosis/proof gaps. They do not establish
dependency closure for unchanged CI or Git workflows, full delivery, or host
behavior. Those consumers and the other audited skills remain future work.

## Consolidated expansion

[The expansion research](research/README.md) and [pinned source register](research/collections.json)
cover 20 public repositories plus two cached npm artifacts. Inventoried entrypoints
are not all deep-read or behaviorally tested. The [21-owner map](CATALOG.md)
distinguishes selected workflows, merged modes and substantive coverage gaps.

Sixteen new procedures record original expression and conceptual comparisons,
not copied upstream runtime, scripts or assets. Their local source records and
`PROVENANCE.json` files travel with each selected folder. The existing three
attributed forks retain their layered notices and original-input identities.
The discovery pair now also carries its project and Matt Pocock notices locally.

Owned optional handoffs are `deliver-work` and `testing-work`, not external
`resolve-issues`, `babysit` or `tdd` setup requirements. Two imported entrypoints
received routing-only updates after the pilot snapshots were frozen. Their source
records identify the edits. The pilot's immutable snapshots are not silently
relabeled as the current bytes.

Do not copy Anthropic's restricted document implementations, unlicensed UX
expression, proprietary finance workflows, MPL files or CC-BY-SA expression under
this package's MIT label. Impeccable is Apache-2.0 with additional notice/ancestry
considerations, not a blanket MIT source. Complete grants and per-file ancestry
remain independent of behavioral scores. Conceptual comparisons are not a legal
clearance opinion.

For source updates, inspect the pinned delta, rights, side effects and dependency
closure. Preserve historical import uncertainty and full notices. Give changed
payloads new recorded identities. Run offline checks, inspect the actual tarball,
and use fresh tasks after development exposure. Source maintenance belongs to this
repository's maintainer, not an upstream auto-updater or a hidden private skill.

## Distribution adapter

The requested 0.2.0 selector is original Node code around the pinned Vercel Skills
CLI 1.7.4 interface. Local inspection established its agent paths, copy exclusions,
JSON receipts and project/global lock formats. Disposable integration checks cover
all 21 skills across both scopes and all three supported agent targets. The adapter
does not vendor Vercel's implementation. npm downloads the separately distributed
installer when it is not cached. These mechanics do not establish skill effectiveness.

The 1aboveio domain/umbrella catalog informed packaging comparisons. Our generator
copies only this repository's canonical skills and retained notices. It does not
copy that bundle's selector, host-settings writes, hooks or runtime extensions.

## Limits

The discovery pair is authored from the design sources above. The three companions
are attributed forks. The 16 new procedures are provisional original workflows.
None is an endorsed integration. [The recorded pilot](evaluations/entrypoint-pilot/RESULTS.md)
is entrypoint-only development evidence, not proof of whole-system effectiveness,
routing, tools, stopping behavior or host compatibility. Package changes can alter
handoffs. There is no automatic source download or update hook.
