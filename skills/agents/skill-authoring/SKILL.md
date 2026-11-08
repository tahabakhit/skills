---
name: skill-authoring
description: "Use when creating or revising a reusable agent skill, or empirically tuning a reusable agent prompt. Not for routine task prompts."
---

Inspect the existing skill and directly loaded files before revising it. Compare
available skills and governing instructions before adding another behavioral owner.

1. Ground the change in a real request, observed failure or explicit correction.
   Name the decision it should change and the nearby case where it should stay unused.
2. Choose scope. A global skill may be specialist but must work across the owner's
   projects. Keep one repository's packages, paths and lifecycle in scoped guidance.
   Same-name skills at different scopes can collide; precedence varies by harness.
   Use a distinct name for a delta rather than assume which definition wins.
3. Write a short, specific description that triggers at selection time. Put contents,
   rationale and reference routes in the body. Do not use an always-on trigger for
   occasional work, or pad it with search synonyms.
4. Keep the normal decision path in SKILL.md. Put optional detail behind exact local
   reference paths. When another skill owns a capability, discover and load the
   applicable skill rather than copy it or assume an upstream package name.
5. Keep domain judgment, known failure handling and completion boundaries. Remove
   duplicated workflow, host guarantees and cheaply discoverable facts. Do not add
   a script when prose is clearer; use code for deterministic work it can verify.
6. Match register to purpose. Operational guidance needs concrete conditions and
   actions; creative guidance can carry voice when that changes the output.
7. Verify metadata, local references, script dependencies, deployment links and
   platform gates under the repository's conventions. For the owner's personal
   dotfiles skills, preserve the canonical source and harness links; this does not
   prohibit another project's own scoped skills.

For an explicitly requested behavioral comparison or recurring routing failure,
read `references/instruction-calibration.md`. It also covers empirical tuning of
reusable prompts that are not skills. Ordinary wording edits do not require an
agent study. Follow the existing approval and helper policy for any such study.

Finish when each retained rule changes a decision, preserves intent or routes
necessary knowledge. Report checks and limitations; static metadata tests do not
establish model compliance.
