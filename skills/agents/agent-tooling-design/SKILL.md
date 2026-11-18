---
name: agent-tooling-design
description: "Design or review a tool, CLI, slash command or extension for an agent harness: choosing the surface, names, schemas, descriptions, results and errors. Not for auditing a whole setup (harness-audit) or explaining a past session (agent-session-diagnostics)."
---

# Agent tooling design

## Choose the surface first

Check what the harness and existing CLIs already do before building anything. Then
pick the smallest surface that closes the gap:

| Who acts | Need | Build |
| --- | --- | --- |
| Agent | A recurring choice it must make mid-task | A tool |
| Agent | An operation an existing CLI already does | Nothing, or a short skill naming the command |
| User | An occasional action or setting | A slash command or settings UI |
| Either | Hooks, persistent state, custom rendering or tool registration | An extension |

- Do not mirror one capability as both a tool and a command by default. Users drive
  commands; agents drive tools.
- Keep rare, user-initiated work out of the permanent tool list. Every active tool
  costs tokens on every turn and competes with its neighbours for selection.
- An extension that only wraps a command which already works is overhead. It must need
  a hook, state, UI or registration.
- Drop speculative modes, config switches and compatibility layers. Add them when a
  real case appears.

## Design the contract

The agent should predict the right call from the name and schema alone.

- Reuse names and argument shapes models already know: `bash`/`cmd`, `read`/`path`,
  `grep`/`query`, `cwd`, `message`. State only where this implementation deviates.
- One tool, one job. Extend an existing tool rather than add an overlapping one the
  agent must choose between.
- Expose only decisions the caller must make. Providers, models, internal prompts,
  formatting and policy stay inside the implementation.
- Require the minimum. Add an optional field only when omitting it has a useful,
  deterministic meaning. Use a small enum only for a genuinely closed choice.
- Do not repeat in prose what the schema already says (type, required, enum, default,
  limits). Omit a field description when the name is enough.
- Attach guidance to the narrowest field it qualifies. Phrase it as intent, not
  mechanics: for a `wait` flag, "Set false when you have other work to do meanwhile"
  steers the choice; "false: non-blocking" only describes it.
- If a field needs a paragraph to explain, rename it, remove it or rethink the tool
  boundary.

When the implementation can do the right thing but the model picks the wrong tool or
argument, fix the name, default or description before adding runtime heuristics.

For multi-action tools, help-backed or deferred contracts, description wording and
trimming a bloated tool block, read [tool design](references/tool-design.md).

## Return results the agent can act on

Every result, including errors, should tell the agent what it can do next.

- Success: return the state the agent needs next (ids, paths, counts), not a narrative.
  Mention a newly available action only when it is useful.
- Failure: say what happened, whether anything changed (none, partial, all), and a
  valid next step using tools the agent actually has. Leave auth, account and config
  decisions to the user.
- Mark failures with the harness's error flag, not just error-looking text. A string
  saying "Error" may be recorded as a success.
- Bound large output and say so: "[truncated: 200 of 4,812 lines; full output at
  /tmp/x.log]". Keep the start of search results and the end of logs.
- Keep renderer-only detail and stack traces out of model-visible text unless the
  agent needs them to act.

## Verify

- Inspect the exact schema and prompt text the model receives, not just the source.
  Many short descriptions can still add up to a manual.
- Exercise valid calls, invalid calls, empty output, failure, cancellation and
  continuation where they apply. Check the agent still picks the right neighbouring
  tool.
- Test runtime changes in an isolated session or profile before touching the user's
  live setup. Wording-only edits do not need a live experiment.
- Report which checks were static, which ran in isolation and which ran live.

Harness specifics:

- Pi extensions: read [Pi notes](references/pi.md) before implementing.
- Other harnesses: read the installed version's docs for tool registration, error
  signalling and truncation; do not rely on remembered APIs.

For changes that alter the system prompt or tool list mid-session, check cache impact
with a prompt-caching skill if one is available.
