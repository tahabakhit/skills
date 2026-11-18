---
name: docs
description: "Write, edit, scaffold or reorganise a repository's documentation using Diataxis (tutorials, how-to guides, reference, explanation), including turning durable findings from a task into docs. Not for AGENTS.md files; use agents-md."
---

Lasting knowledge in a repository is documentation, and documentation follows
[Diataxis](https://diataxis.fr/). Ephemeral task state (progress, next steps,
who is doing what) is not documentation: it lives in the task tracker and never
enters the repository.

## Classify before writing

Every page serves one need. Ask two questions about the content:

1. Does it help the reader **do** something, or **know** something?
2. Is the reader **learning** (studying) or **working** (applying)?

| | Learning | Working |
| --- | --- | --- |
| **Do** | Tutorial: a lesson with a guaranteed result | How-to guide: steps to reach a real goal |
| **Know** | Explanation: why, context, trade-offs | Reference: neutral, complete facts |

If one request needs two answers, write two pages and link them. Most mistakes
are mixtures: a how-to that stops to explain design, a reference table wrapped in
advice, a tutorial that offers choices.

```text
Bad:  "Deploying" page: why we chose Flux, then the deploy steps, then every flag.
Good: how-to/deploy.md (steps only) links explanation/why-flux.md and reference/deploy-flags.md.
```

## Writing each type

- **Tutorial:** one path, no choices, every step produces something visible; the
  author guarantees it works on a clean setup. Teach by doing, explain minimally.
- **How-to guide:** titled by the goal ("Rotate the API key"). Assumes competence,
  starts from the reader's situation, handles real-world branches, no teaching.
- **Reference:** structured like the thing it describes (commands, config keys,
  tables, schemas). State facts; no instructions or opinions. Keep it complete
  enough that readers trust it.
- **Explanation:** prose about why: design decisions, constraints, history,
  alternatives rejected. Can take a position. Titled as a topic ("About caching").

## Where pages go

- Follow the repository's AGENTS.md and existing docs layout first. Place new
  pages by type within it; propose a restructure separately instead of moving
  files unasked.
- With no layout yet, use `docs/` with `tutorials/`, `how-to/`, `reference/` and
  `explanation/`, plus `docs/README.md` as the landing page linking each section.
  Create a folder only when its first page exists; don't scaffold empty sections
  or placeholder pages.
- README stays the front door: what the project is, how to start, links into
  `docs/`. Move long content out of it into the right type.

## Durable findings from a task

Before finishing work that taught something lasting, route it:

- A decision and its reasons: explanation (one page per decision or topic,
  dated inside the page when the date matters).
- A procedure that worked and will be repeated: how-to guide.
- Facts discovered (limits, settings, schedules, ownership): reference.
- Progress, open questions, next steps: the task tracker, not the repository.

Update an existing page before adding a new one, and fix a page that the finding
proves wrong. Never keep a diary or a session log in the repository.

## Check before finishing

- Each touched page is one type, and its title matches that type.
- Content that belongs to another type is moved and linked, not repeated.
- The landing page and section indexes link every new page; relative links
  resolve.
- Improve in small steps: a better page today beats a planned rewrite.
