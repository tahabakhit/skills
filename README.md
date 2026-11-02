# @tahabakhit/skills

Taha's agent skills bundle. The agreed direction is a standalone collection for
engineering, systems, operations, and non-coding work, selectively installed
globally or per project using Vercel's Skills CLI. See
[the architecture and setup plan](ARCHITECTURE.md) for decisions, proposed
categories, and migration boundaries. The
[installed-skill audit and import map](audits/installed-skills.md) records the
current candidates, dependencies, and ownership findings.

The package now contains five skills. Three companion imports cover concrete
design, diagnosis, and acceptance proof. They do not supply full delivery or close
all dependencies of the audited CI/Git collection. Global installation and expanded
cross-host behavior remain unverified. The original specification skill's external
engineering handoff is still transitional.

| Skill | Use it for | Output |
| --- | --- | --- |
| `discover-work` | An idea, unclear requirement, or choice between approaches | A short agreed brief |
| `define-work` | Turning that brief or existing requirements into actionable work | A specification with observable acceptance criteria and proposed proof |
| `codebase-design` | Comparing concrete interfaces or module boundaries | Design options, tradeoffs, and a recommendation |
| `systematic-debugging` | Diagnosing a failure and making an authorized correction | Evidence-supported cause, scoped fix, and verification gaps |
| `verify-and-stop` | Checking existing work against acceptance conditions | Candidate-bound proof and an explicit pass, fail, or gap |

[The catalog](catalog.json) records domains, optional handoffs, and capability
requirements. It is metadata, not an installer or dependency resolver. Each new
companion includes its required references, full license notices, and provenance
inside its own folder; no sibling skill is required.
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

For a non-npm project, or before this package is published, use the checkout:

```fish
npx skills@1.7.4 add /home/taha/dev/projects/tahabakhit/skills --skill discover-work --skill define-work
```

To select only the self-contained debugging companion instead:

```fish
npx skills@1.7.4 add /home/taha/dev/projects/tahabakhit/skills --skill systematic-debugging
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
pi install -l /home/taha/dev/projects/tahabakhit/skills
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

The current optional external handoff, pending replacement by this repository's
own delivery workflow, is described below. After approval, a spec can be handed to
[@1aboveio/engineering-skills](https://www.npmjs.com/package/@1aboveio/engineering-skills).
For a saved spec, the Pi invocation is:

```text
/skill:resolve-issues docs/specs/order-review.md
```

That path is an example. Use the actual saved path. Choose supervised,
merge-ready hand-back in delivery preflight initially. Spec approval does not
itself authorize implementation, publication, merging or releasing.

## Original discovery pair

The [1aboveio bundle](https://www.npmjs.com/package/@1aboveio/skills) explicitly
lists Matt Pocock as an optional third-party source, including grilling, domain
modeling and specs. These complement its first-party delivery workflows.

These custom skills retain fact-finding before questions, decision-dependent
interviews and synthesis into a spec. They use bounded discovery, concise
requirements, explicit uncertainty and local-first output. They do not require
Matt's automatic tracker publication or background research pattern. Sources,
revisions and design choices are in [SOURCES.md](SOURCES.md).

For this existing optional handoff, engineering installation remains separate.
That external delivery workflow needs compatible worker launching and role/model
resolution, including different implementer and
reviewer model IDs. The creator's [pi-better-harness](https://www.npmjs.com/package/pi-better-harness)
is its Pi extension bundle. Other hosts need their supported integration. These
skills do not make an unsupported runtime compatible and install no hooks or jobs.

## Development and distribution

```sh
npm test
npm pack --dry-run --ignore-scripts
```

Package checks need POSIX utilities, jq, Git, Bash, and Python 3.9+, with no npm
dependencies. They check metadata, links, notices, source identities, independently
copied folders, and the optional helper against disposable fixtures with fake npm.
They do not run a real project's tests or prove model behavior. [test/scenarios.md](test/scenarios.md) contains
model-driven evaluation cases. Results and limits are in [VERIFICATION.md](VERIFICATION.md).

Keep source changes in this Git repository. The npm `files` allowlist includes
skill folders, the catalog, tests, documentation, and licenses. Add future skills under
`skills/<name>/SKILL.md`. Keep stable names and explicit ancestry for maintained
forks; inspect name collisions before activation. Do not bundle unrelated runtime
extensions. Recheck tests and the tarball before each
release. Publishing requires an npm identity authorized for `@tahabakhit` and
explicit approval. No registry access or GitHub repository has been configured.

## License

MIT. See [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md) for attribution.
