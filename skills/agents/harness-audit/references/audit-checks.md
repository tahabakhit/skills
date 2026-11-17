# Deeper audit checks

Pick only the sections that bear on the reported friction. None is mandatory, and not
every section needs a finding.

## Workflow fit

For each workflow in scope, check five things:

- **Material:** can the agent reach the files, services, data and rendered output it
  needs?
- **Judgment:** is there local guidance for decisions specific to this user or project?
- **Action:** is there a tool or CLI for each recurring operation?
- **Presentation:** can the user inspect results in a form that suits the work
  (rendered HTML, images, diagrams, a diff), not just chat text?
- **Continuity:** do accepted decisions, feedback and task state survive compaction,
  resume and handoff?

For each gap, name the smallest fix: an existing capability plus a skill, a tool, an
extension, or a project-level layer.

## Instruction files and nesting

- Trace every global and scoped instruction file, skill, extension prompt and template
  through its real load path. Look for shadowing and rules loaded twice.
- When the agent moves into a subdirectory with its own `AGENTS.md` or `CLAUDE.md`,
  check whether that file loads, loads once, and arrives before the decisions it
  governs. Check whether loading it mid-session rewrites earlier context (cache cost).
- Check that user-facing docs and agent instructions are separate.

## Commands and visible controls

- For slash commands, menus and settings, note owner, how often used, side effects,
  name collisions and obsolete entries. Commands are user controls, not agent tools.
- Check that common actions and current state are easy to see, rare actions are still
  findable, and related settings live in one place.
- Flag agent-facing choices that the host should own: model, provider, backend,
  internal modes.

## Subagents and delegation

Credit whatever delegation mechanism the user already has before proposing another.

- The agent-facing surface should be a few natural actions (start, message, wait,
  read result), with models, permissions, isolation and timeouts set by config.
- Results should say which worker, its state, its evidence and how to continue; not
  require polling or reading terminal panes.
- The user should be able to inspect, steer and stop workers.
- Parallel writers need separate checkouts or separate outputs.

## Review loop

Check that changes get reviewed the same way each time: the right diff boundary, an
independent reviewer, findings returned to the working agent to verify and fix, the
user able to see the diff and the disposition of each finding, and a rerun until
serious findings are resolved or accepted.

## Diagnostics and feedback

- Can a live failing session be preserved before someone restarts it?
- Do closed sessions keep enough (transcript, tool calls, versions) to diagnose later?
- Do durable memory or instruction changes go through user review, rather than the
  agent rewriting its own rules?

## Cross-layer coherence

Trace two or three representative workflows end to end and check:

- every capability an instruction mentions exists in the running setup
- base, project and profile layers combine without hidden overrides
- the same concept has the same name and owner across layers
- nothing is orphaned, duplicated or depends on a missing piece
- the path from request to action, evidence, review and recovery needs no improvised
  workaround

Group symptoms under the single cross-layer cause that explains them.
