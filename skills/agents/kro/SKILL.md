---
name: kro
description: "Run the shared plan, review, handoff or consolidate workflow; manage task names and owned Herdr helpers; read curated AI news. Not a replacement for domain skills or repository rules."
---

# kro

Interpret the first argument as `plan`, `review`, `handoff`, `consolidate`, or
`news`; the rest is that workflow's task, base ref, slug or time range. Read the
matching reference before acting:

- `plan`: [plan](references/plan.md)
- `review`: [review](references/review.md)
- `handoff`: [handoff](references/handoff.md)
- `consolidate`: [consolidate](references/consolidate.md)
- Herdr commands, naming and cleanup: [Herdr](references/herdr.md)
- Recent AI posts and releases: [news](references/news.md)

Pi's `/plan`, `/review`, `/handoff` and `/consolidate` are argument adapters to
these same procedures. Claude uses `/kro plan <task>`; Codex uses `$kro plan
<task>` (and the other workflow names). Do not invoke a harness's built-in plan
mode or review agent as a substitute. Repository rules and issue trackers apply.

Use `kro --help` for the CLI. During the Go rollout, if `kro` is absent, use the
installed `agent-consult <role> "<task>"` for read-only consultation only. Do not
install/build/apply configuration to unblock a helper without authorization.
This compatibility path ends after the per-machine alias migration.
