---
name: agents-md
description: "Create, audit or trim AGENTS.md (or CLAUDE.md) instruction files for a repository, subdirectory or personal global setup. Not for writing or revising skills; use skill-authoring for those."
---

Agents load AGENTS.md into every session that touches its directory. A line that
doesn't change what the agent does still costs tokens on every task and dilutes the
lines that matter.

## The test for each line

Ask: would a capable agent that has just read the code get this wrong without the
line? Keep it only if the answer is yes.

Usually yes:

- A trap: the obvious command, file or approach is wrong here.
- A boundary: code that is generated, vendored, frozen or owned by another team.
- Intent the code can't show: why something odd is deliberate, what must not change.
- A pointer: which doc, skill or script to load for a given kind of task.
- A recurring mistake agents have actually made in this repository.

Usually no:

- The language, framework or test runner (visible in manifests).
- A tour of the directory tree.
- Standard commands such as `npm test` when they just work.
- General advice ("write clean code", "add tests").
- History of past tasks or summaries of recent changes.

```text
Bad:  - We use Python 3.12 with pytest. Tests live in tests/.
Good: - Run tests with `uv run pytest -p no:randomly`; the suite has order-dependent fixtures.
Good: - `api/schema.graphql` is generated from the server; edit `server/schema/` and run `make schema`.
```

If a linter, formatter, CI job or config file can enforce a rule, put the rule there
instead and drop it from AGENTS.md. Prose meant for human readers goes in README or
docs.

## Root and nested files

Read the root file and every AGENTS.md between it and the target before writing.
A nested file is loaded on top of its ancestors, so it should only add what differs
in that subtree, for example a separate build tool, an import rule for a package's
public API, or a folder agents keep putting files in by mistake. If the subtree
behaves like the rest of the repository, it doesn't need a file.

## Format and voice

- Open with the first rule. Skip the `# AGENTS.md` title, the "This file
  describes..." preamble and frontmatter unless a tool requires them.
- In repository files, use short imperative bullets. Group under headings only
  once the file is long enough that an agent would need them to find a rule.
- Personal or global files (one person's instructions across all their projects)
  can be written in the first person and carry personality. That's useful when it
  conveys taste, how much autonomy to take, what needs asking first, or how to
  collaborate. A young project's file may likewise keep the founder's own phrasing
  for product direction the code doesn't show yet. Delete flourishes that steer
  nothing.

## Auditing an existing file

1. Check every path, command, tool name and convention against the repository.
   Fix or delete what is wrong.
2. Apply the line test above and remove what fails.
3. Move enforceable rules into tooling and human-facing prose into docs.
4. Keep the author's terminology, and any headings or imports other tools depend on.
5. If removing a line from a root, global or personal file might lose an intent you
   can't confirm, leave it and ask rather than guessing.

Don't add rules based on guesses, a single observation or the task in front of you.
The file is finished when every line passes the test and every fact checks out.
