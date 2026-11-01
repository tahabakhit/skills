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

## Limits

These are authored instructions informed by source inspection, not upstream
skills, an endorsed integration or measured proof of better delivery. Model
behavior needs evaluation. Package changes can alter the handoff requirements.
There is no automatic source download or update hook in this package.
