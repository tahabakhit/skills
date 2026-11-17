---
name: harness-audit
description: "Audit a coding-agent setup (instruction files, skills, tools, MCP servers, extensions, commands) for conflicts, duplication, gaps and startup bloat. Read-only; returns ranked recommendations. Not for one failed session (agent-session-diagnostics) or building a tool (agent-tooling-design)."
---

# Harness audit

Read-only. Do not install, edit, enable, disable or reconfigure anything, and do not
launch test sessions unless the user separately allows it. Stop after recommendations.

## Scope it

Anchor the audit to the user's actual workflows and the friction they reported. A
focused complaint ("the agent keeps ignoring my test rules") gets a focused audit, not
a survey of everything. Ask only for what you cannot find: where the config lives,
which projects matter, what "good" looks like for them.

## Build the inventory in three columns

Keep these separate, because confusing them causes most false findings:

1. **Native:** what the harness does out of the box at its installed version (check
   `--help`, docs, built-in tools and commands).
2. **Exposed now:** what this session actually sees: active tools and schemas, loaded
   instruction files, listed skills, MCP servers, commands, startup messages.
3. **Configured:** what sits on disk: global and project config, instruction files,
   skill folders, extensions, plugins, hooks, scripts.

An installed folder does not prove the agent sees it. One session not seeing something
does not prove it is missing: check project-level overlays and profiles first. Do not
flag native features as additions or recommend rebuilding them.

Typical places to look (confirm for the installed version):

- Claude Code: `~/.claude/` and `.claude/` (settings, skills, agents, commands,
  hooks), `CLAUDE.md` files, plugins, `.mcp.json`.
- Codex: `~/.codex/config.toml`, `AGENTS.md` files, skills directories.
- Pi: `~/.pi/agent/` and `.pi/` (settings, extensions, skills, prompts), `AGENTS.md`.

## What to look for

- **Instruction conflicts:** two files or skills giving opposite rules; stale claims
  about tools or paths that no longer exist; rules loaded globally that apply to one
  repo; the same rule in several places drifting apart.
- **Skill routing:** descriptions too broad (fire on unrelated work) or too vague (never
  fire); skills whose paths or commands only work in one repo but are global; name
  collisions between global and project skills.
- **Duplicated capability:** two tools, MCP servers or skills doing one job, forcing the
  agent to choose. Name one owner and retire or merge the rest.
- **Startup bloat:** permanent tools, schemas and instructions the agent rarely uses.
  Measure from the model-visible surface or provider-reported usage, not file sizes.
  Rare operations can move behind a CLI, deferred discovery, a skill or a command.
- **Mutable facts in permanent text:** versions, flags or endpoints copied into
  instructions instead of read from `--help` or status at run time.
- **Broken references:** instructions or skills pointing to tools, commands, files or
  follow-up actions that do not exist in the running setup.
- **Autonomy mismatch:** where the setup makes the agent ask for things the user wants
  done silently, or acts silently on things the user wants to approve.

For deeper workflow-fit, visibility, delegation, review-loop and coherence checks, read
[audit checks](references/audit-checks.md) and pick the sections that bear on the
reported friction.

If a finding needs a closer look at one session, a tool contract, prompt caching or
instruction files, use the matching skill (agent-session-diagnostics,
agent-tooling-design, prompt-caching, agents-md, skill-authoring) for analysis only.

## Recommend

Prefer keeping, trimming, merging or moving what exists over adding something new. A
new skill or extension needs a recurring, consequential decision that nothing current
covers. Do not score quality from package names, file counts or token totals alone.

Return findings ranked by impact on the user's work. For each:

- evidence (file, line, what the session showed)
- the mismatch and its effect on the user
- proposed disposition: keep, trim, merge, move to project scope, move behind
  discovery, remove, or add
- expected benefit and cost
- how to check the change worked

Also list what works well, and separate confirmed gaps from things you could not
inspect. Write a file only if asked.
