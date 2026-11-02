# @tahabakhit/skills

Taha's agent skills bundle. The agreed direction is a standalone collection for
engineering, systems, operations, and non-coding work, selectively installed
globally or per project using Vercel's Skills CLI. See
[the architecture and setup plan](ARCHITECTURE.md) for decisions, proposed
categories, and migration boundaries. The
[installed-skill audit and import map](audits/installed-skills.md) records the
current candidates, dependencies, and ownership findings.

The package contains 21 canonical workflow owners: the existing five plus 16
new original procedures informed by comparative research. Related workflows are
branches or modes rather than overlapping entrypoints. See [the owner and coverage
map](CATALOG.md) and [the research findings](research/README.md).

| Area | Available work |
| --- | --- |
| Engineering, 14 owners | Discovery, specifications, design, diagnosis, proof, delivery, testing, review, refactoring/migrations, Git, CI, dependency updates, packaging and security |
| Research and content, 3 owners | Evidence investigation, writing/file-production contracts and document review |
| Interface review, 1 owner | Evidence-bounded usability and accessibility findings |
| Data, 2 owners | SQL/measurement analysis and stateful pipelines |
| Operations, 1 owner | Platform-aware Linux diagnosis and scoped change |

This is a broad workflow foundation, not complete specialist coverage. New UI
design, advanced statistics, infrastructure/database adapters and incident/restore
playbooks remain gaps. Binary formats need suitable existing engines. The generic
operations workflow does not replace audited OS specialists. No live installation
or ownership was changed.

The [development pilot](evaluations/entrypoint-pilot/RESULTS.md) tests frozen
entrypoints against no-skill answers. It does not establish full-skill effectiveness,
routing, tool safety or cross-host behavior. Keep selection task-specific rather
than loading all 21 skills. Global installation remains unverified.

[The catalog](catalog.json) records domains, optional handoffs, and capability
requirements. It is metadata, not an installer or dependency resolver. Every
selectable folder includes its required references, applicable complete notices,
and provenance. No sibling skill or repository-root notice is required.
The skills use the portable `SKILL.md` format. Ordinary local use requires no
particular agent runtime, worker launcher, external skills bundle, or network
service. Use tools the host already provides. There is no installation hook,
automatic update process, or bundled delivery runtime. The optional `pi.skills`
manifest lets Pi load the same files directly.

The debugging skill's optional polluter helper runs inspected repository tests;
it is not read-only or a sandbox. It requires Bash, Python 3.9+, POSIX process
groups, and the repository's npm test contract. Its TypeScript waiting example
requires application-specific types and is not a standalone library.

## Current installation: selected repositories

This package is prepared for npm but has not been published. Use the local
checkout or a packed tarball until publication. Run installation commands from
the project that should receive the skills, not from your home directory.

### Claude Code, Codex, Pi and other supported agents

Install the npm package as a project dependency after publication, then select
skills and target agents with the Skills CLI:

```fish
npm install --save-dev --save-exact --ignore-scripts @tahabakhit/skills
npx skills@1.7.4 add ./node_modules/@tahabakhit/skills --skill discover-work --skill define-work
```

The CLI asks which agents to target and installs to the current project by
default. These recipes use project scope. Selective global installation is part
of the expanded setup plan but has not been verified here. Review the installer's
plan before accepting, especially if a skill with the same name already exists.
The dependency alone does not activate skills in every host. Target directories and invocation syntax depend on the agent.

For a non-npm project, or before publication, use the checkout. Replace the
placeholder path with its actual location:

```fish
npx skills@1.7.4 add /path/to/skills-checkout --skill discover-work --skill define-work
```

To select only the self-contained debugging companion instead:

```fish
npx skills@1.7.4 add /path/to/skills-checkout --skill systematic-debugging
```

Use the corresponding names for design or verification. The companion checks
copy each folder alone and verify its supporting-file closure. They do not yet
establish installation or model-driven behavior in every host.

The CLI may download its own code and changes the chosen project's skill files
and lockfile. It is optional, not a runtime dependency of this bundle. These
commands have not been run against your real repositories. After an npm package
update, repeat the selection command to refresh the installed skills.

### Pi's native package installation

Pi can load the npm package directly without the Skills CLI. After publication:

```fish
pi install -l npm:@tahabakhit/skills
```

Before publication:

```fish
pi install -l /path/to/skills-checkout
```

`-l` registers the package only in the current project's `.pi/settings.json`.
The local source is loaded in place, so keep the checkout. Use either this path
or the Skills CLI for Pi, not both, to avoid duplicate skills.

Restart the agent after installation. In Pi, `/reload` discovers the new skills,
but start a fresh session when replacing an existing workflow so its instructions
do not remain in conversation history.

## Use

Ask your agent to use `discover-work` when the idea is unclear, then `define-work`
when you want a specification. Use its explicit skill invocation if available.
For example, in Pi:

```text
/skill:discover-work I want to reduce the work involved in reviewing new orders.
/skill:define-work Turn the agreed brief into a spec. Save it using this repo's convention.
```

Skip discovery for clear work. The discovery and specification pair never files
issues, creates tickets, starts workers, or invokes delivery. They save documents
only when requested. The new companions preserve the requested endpoint: design
analysis does not authorize implementation, diagnosis does not authorize a fix,
and successful verification does not authorize publication. Continue work that
is already authorized without a default plan-approval pause.

An optional specialist mentioned by a companion may be absent. Use the project's
existing authorized procedure when it supplies sufficient proof; otherwise report
the specific missing capability. Do not install specialists or claim equivalent
coverage automatically.

## Owned delivery and separately usable stages

`deliver-work` replaces the transitional external delivery recommendation. It
accepts a saved specification or agreed requirements in the conversation. For Pi,
using an actual saved path:

```text
/skill:deliver-work Implement docs/specs/order-review.md and return a tested local candidate. Do not publish.
/skill:testing-work Review assertion quality in the changed tests. Audit only.
/skill:code-review Review the staged candidate without editing it.
```

Planning, implementation and follow-through are modes of the same coordinator.
Review, testing, migration and packaging remain separately callable. Ordinary work
runs serially without a tracker or worker runtime. Required independent review
cannot be simulated by a self-check. Missing providers, engines or specialist
knowledge remain explicit capability gaps.

The specification skill returns its artifact without automatically invoking
delivery. When delivery is requested, continue within existing authority without
a default plan-approval pause. Passing tests does not grant merge, publication or
deployment permission. No external skills bundle supplies required instructions.

Source influences, licensing boundaries and rejected procedures are recorded in
[SOURCES.md](SOURCES.md). Domain npm packages and reusable profiles remain deferred.
Direct named selection is sufficient for the current source catalog.

## Development and distribution

```sh
npm test
npm pack --dry-run --ignore-scripts
```

Package checks need a POSIX shell, core utilities including `sha256sum`, jq,
Git, Bash, and Python 3.9+, with no npm
dependencies. They check metadata, links, notices, source identities, independently
copied folders, and the optional helper against disposable fixtures with fake npm.
They do not run a real project's tests or make model calls. Offline checks validate
recorded pilot data, not the truth of every grader judgment.
[test/scenarios.md](test/scenarios.md) contains additional proposed model-driven
cases. Recorded results and limits are in [VERIFICATION.md](VERIFICATION.md).

Keep source changes in this Git repository. The npm `files` allowlist includes
skill folders, the catalog, tests, documentation, and licenses. Add future skills under
`skills/<name>/SKILL.md`. Keep stable names and explicit ancestry for maintained
forks; inspect name collisions before activation. Do not bundle unrelated runtime
extensions. Recheck tests and the tarball before each
release. Publishing requires an npm identity authorized for `@tahabakhit` and
explicit approval. No registry access or GitHub repository has been configured.

## License

MIT. See [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md) for attribution.
