# skills

Workflow, engineering and agent-tooling skills for [Pi](https://pi.dev), Claude Code and Codex.

| Bundle | Skills |
| --- | --- |
| [workflow](skills/workflow) | `handoff`, `pickup`, `recall`, `reflect`, `triage`, `docs` |
| [engineering](skills/engineering) | `ci-maintenance`, `dependency-updates`, `release-packaging` |
| [agents](skills/agents) | `agents-md`, `skill-authoring`, `agent-tooling-design`, `agent-session-diagnostics`, `harness-audit`, `prompt-caching` |

Skills load on demand when a task matches their description; they add nothing to
ordinary conversations.

## Install

Pi (all skills, as a Pi package):

```sh
pi install git:github.com/tahabakhit/skills
```

Claude Code and Codex (per bundle, as plugins):

```sh
claude plugin marketplace add tahabakhit/skills
claude plugin install --scope user engineering@tahabakhit-skills
claude plugin install --scope user agents@tahabakhit-skills
claude plugin install --scope user workflow@tahabakhit-skills

codex plugin marketplace add tahabakhit/skills
codex plugin add engineering@tahabakhit-skills
codex plugin add agents@tahabakhit-skills
codex plugin add workflow@tahabakhit-skills
```

Install each skill through one route per harness; loading the same skill twice
gives the agent duplicate definitions.

## Licence

MIT. See [LICENSE](LICENSE).
