# Entrypoint development pilot

## Question and fixed design

Does a frozen skill entrypoint improve the answer to a supplied text-only task compared with the same registered model ID without that entrypoint? This is a development screen, not a confirmatory retention study.

Eight frozen tasks, two conditions and two registered IDs produced 32 answer sessions. There is one sample per task/condition/ID and no generic-instruction control. The six engineering/data/evidence tasks and their rubrics were frozen in the original 24-task bank before results. Two independently authored design/content tasks were frozen separately. New draft authors were instructed not to read the central gold. All cases are called development cases, not held-out data.

The conditions are `baseline` and `skill`. Both receive the same task and minimal system text. The treatment appends only the exact frozen entrypoint, with the host's fixed `<addendum>` wrapper. References, tools and the rest of the skill collection are unavailable. The prompt supplied through the CLI has the host's `<file>` wrapper in both conditions. Opaque working-directory names differ. Condition order is counterbalanced across tasks and reversed across the two IDs. It is not a claim of randomized sampling.

## Model and host isolation

The provider is `openai`. The registered IDs are `gpt-6.1-sol` and `gpt-6.1-terra`. These labels do not establish distinct underlying models, families or independent training. No unavailable-provider or cross-family comparison is claimed.

Every answer uses a fresh interactive Pi 1.4.0 session under herdr-core, with its own working/session directories. The launch uses an explicit common system prompt, `--thinking medium`, `--offline`, `--no-extensions`, `--no-skills`, `--no-context-files`, `--no-mcp`, `--no-prompt-templates`, `--no-tools` and `--no-approve`. The last flag removes permission UI, not an OS sandbox. With no tools, the task sessions cannot inspect adjacent gold or exercise tool restraint.

Before launch, the runner checked that global SYSTEM/APPEND_SYSTEM files and relevant ancestor instruction files were absent. After execution, persisted sessions were checked against exact task/common/candidate bytes, expected system-section keys, one user message, one completed assistant message, matching provider/model IDs and recorded medium thinking. No tool calls/results, extra context sections or retry/error entries occurred. No operator retries, fallbacks or condition-specific rescues were performed. This does not audit hidden server-side retries or a provider's backing-model identity.

The native invocation pattern was:

```text
hc run --bg --cwd OWNED_RUN_DIR pi --provider openai --model REGISTERED_ID --thinking medium --offline --no-extensions --no-skills --no-context-files --no-mcp --no-prompt-templates --no-tools --no-approve --session-dir OWNED_SESSION_DIR --system-prompt COMMON_FILE [--append-system-prompt FROZEN_ENTRYPOINT] @TASK_ONLY_FILE
```

The bracketed argument is treatment-only. Paths are placeholders, not an installation recipe. A reusable multi-host runner is not supplied. Raw native sessions stay in private scratch. Public records contain final answer text and selected metadata, never reasoning blocks, credentials or auth/config files.

## Scoring fixed before grading

Each frozen expected observation is met or not met. Accept semantically equivalent SQL/design alternatives and concise entailment. Contradictory content cannot earn credit merely by also containing a correct sentence. Every listed failure check is assessed separately. The strict primary endpoint passes only when all expected observations are met and no listed failure is present. Report partial observations as a secondary diagnostic with each task weighted equally.

Two fresh tool-free grading sessions receive only opaque answer IDs, task text, frozen observations/failure checks and answers. Condition, candidate, model label, launch order, token counts and durations are withheld. The graders use the two registered IDs, not independent model-family judges. Their public JSON records have criterion booleans and quote evidence. Label withholding cannot guarantee that writing style never hints at a condition.

Quote inclusion and vector shapes are checked offline. Disagreements are adjudicated against the frozen task contract before opening the outcome mapping. A nonconsecutive quote can be corrected without changing its score, with the original retained. Genuine rubric concerns remain visible with the original strict scores. Any sensitivity analysis is labeled exploratory rather than silently repairing the gold.

After unblinding, an additional label-free audit reviewed the eight nonpassing answers for rubric literalism. It is exploratory interpretation, not another endpoint, score change or confirmatory comparison. Its selected input and findings are retained separately.

Task outcomes do not award points for citing a skill, following its preferred ceremony or producing an extra ledger. Skill compliance is not measured. Format observations are separate unless the frozen observation explicitly includes the user's output constraint. No inference about actual file creation, routing, reference reads, authorization restraint or stopping is possible here.

## Reporting and interpretation

`records.json` contains all assignments, final answers and selected observed metadata. `tasks.json`, `candidates/`, notices, common prompt, hashes, graders and adjudication preserve the evaluated version. `paired.json` reports both-pass, baseline-only, skill-only and neither-pass outcomes for each task and ID. Missing/invalid sessions would remain coverage failures, not treatment wins. Completed wrong answers remain failures.

Usage fields are provider-reported tokens, not whitespace word counts or independently verified billing. `responseDurationMs` is the host-reported response duration, not whole-session wall time. Monetary costs are not claimed from unverified gateway pricing. Repeated tasks within one ID are not independent model families or broad population samples.

Two current imported entrypoints received optional-routing updates after freezing. Compare hashes before applying their snapshot outcomes to current files. Other source-only safety corrections are not claimed tested because a neighboring workflow passed.

A tie is not equivalence, permanent uselessness or a reason to activate everything. A one-case difference is not a stable benefit. Promotion needs representative fresh tasks, a generic control and real workflow/tool/host checks as appropriate. This pilot cannot establish whole-system effectiveness, production safety, cross-host support, actual SQL execution, independent review behavior or universal specialty coverage.
