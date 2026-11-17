---
name: skill-authoring
description: "Create, revise or review an agent skill, or test whether a skill or reusable prompt changes agent behaviour. Not for AGENTS.md files or one-off prompts."
---

Agents choose skills by reading only their descriptions. Once a skill is chosen,
its whole SKILL.md enters context while the agent is in the middle of a task. So
the description is a matching problem, and the body should be something the agent
can act on straight away.

## Decide whether a skill is needed

- Name the case that prompted it: a request agents handle badly, a mistake that
  keeps recurring, or a correction a user had to repeat. If you can't name one, the
  skill will probably be generic.
- Write down one request that should trigger the skill and one similar request
  that shouldn't. Use the pair to test the description later.
- Look at the skills and instruction files already installed. If one covers the
  area, improve that one or refer to it by name instead of adding an overlapping
  skill.
- A skill shared across projects must not rely on one repository's paths, scripts
  or release process. Put those in that repository's AGENTS.md or a local skill. If
  a local skill adapts a shared one, give it a different name, because harnesses
  resolve duplicate names differently.

## Frontmatter

```yaml
---
name: release-notes          # same as the folder name
description: "..."
---
```

Write the description as what the skill does, then when to use it, in the words a
request would contain. Add "Not for ..." only to separate it from a specific
neighbouring skill or task that would otherwise match. Aim for 300 characters or
fewer.

```text
Bad:  description: "Best practices for documentation."
Good: description: "Write or update a CHANGELOG entry or GitHub release notes from merged PRs. Not for commit messages."
```

Don't fill the description with synonyms, or explain what's inside the skill and
why. The body is the place for that.

## Body

- Give instructions in the imperative: what to check, what to do, what done looks
  like.
- Spend lines on what the agent would otherwise get wrong: domain judgment,
  common failures and their fixes, non-obvious limits.
- Leave out general good practice, anything the harness already enforces, and facts
  a quick look at the code or `--help` would show.
- One bad/good pair teaches more than a paragraph of principle. Use them for the
  decisions that matter most.
- Headings help when the body has distinct phases. A short skill can be a list.
- Operational skills need conditions and actions. Writing or design skills can
  carry a voice when the voice is what shapes the output.
- Add a script for mechanical, checkable work such as validation, conversion or
  scaffolding. Keep judgment in prose.

Before finishing, read each line and ask what an agent would do differently without
it. If the answer is "nothing", delete the line.

## References

SKILL.md holds the common path. Material only some tasks need (an uncommon branch,
a long lookup table, a detailed sub-procedure) goes in its own file in the skill's
references folder. Link it by relative path and say when to open it:

```text
When comparing two prompt variants with real runs, read [references/instruction-calibration.md](references/instruction-calibration.md).
```

A reference that is almost never needed, or repeats the body, should be merged or
deleted. Every link must resolve inside the skill folder.

## Check before finishing

- `name` matches the folder, and the description matches your trigger request but
  not your near-miss request.
- Every linked file, script and dependency exists, and the repository's checks pass.
- Passing checks shows the files are well-formed. It doesn't show an agent will
  follow them. If you've been asked to compare variants, or a skill keeps being
  skipped or misapplied, read
  [references/instruction-calibration.md](references/instruction-calibration.md).
  Routine wording edits don't need that.
