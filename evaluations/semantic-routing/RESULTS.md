# Purpose and boundary selection smoke

## Question and design

After the semantic audit fixes and scope-focused renames, can a model choose an
adequate primary owner for representative requests, their closest collisions, and
nearby non-use cases from the complete 42-description catalog?

This is a **description-selection smoke**, not host automatic discovery, execution
of full skills, a before/after comparison, or proof of superior task performance.
No conclusion about action safety or behavioral non-regression follows from a
correct selection or a model stating what it would not do.

Expectations in [cases.json](cases.json) were written before the runs. R18 permits
either implementation-quality judgment or candidate review. Models received only
names/descriptions and task text, not expected owners or boundary labels. No coaching,
retries to improve an answer, or follow-up corrections were credited.

## Recorded environment

Two fresh interactive Pi sessions, both `openai/gpt-6.1-sol`, medium reasoning,
cwd `/tmp`, identical prompt and catalog. Pi 1.5.0 controls:

```text
--provider openai --model gpt-6.1-sol --thinking medium
--no-extensions --no-mcp --no-skills --no-context-files --no-prompt-templates
--tools bash
```

The one permitted tool operation was the final report-only `hc send` to the literal
parent address. Inspection of both saved sessions found exactly that single tool
call per run, no repository reads/writes and no other calls. This is observed model
compliance with the controls, not an OS sandbox or tool-enforced access restriction.
The ordinary Pi coding-assistant system/tool contract remained; no competing skills
or repository context were deliberately loaded. Session metadata, rather than the
model's uncertain self-identification, establishes provider/model/reasoning identity.

[The supplied prompt file](prompt.md) includes the original report recipient for evidence.
Pi attached its contents inside a `<file name="/tmp/semantic-routing-prompt.md">`
user-message wrapper in both runs. This is the exact attached file, not a snapshot
of the full system/provider request.
For a future run, substitute the current parent address before launching, without
changing task/catalog content; do not send to the historical terminal. Launch
interactively, never through one-shot print mode. Full session logs stay outside the
repository; these repository records contain only synthetic task selections and safe
method metadata, not private transcripts.

## Outcomes

| Boundary | Cases | Run A | Run B |
| --- | --- | --- | --- |
| Issue/PR drafting without delivery/publication | R01–R02 | 2/2 | 2/2 |
| Candidate review vs design vs compatible migration vs onboarding | R03–R06 | 4/4 | 4/4 |
| Pi history vs causal session diagnosis vs tool design vs harness audit | R07–R10 | 4/4 | 4/4 |
| hc delegation vs native-subagent non-use | R11–R12 | 2/2 | 2/2 |
| Authorized dependency update | R13 | 1/1 | 1/1 |
| Fedora desktop symptom vs Fedora SELinux overlay | R14–R15 | 2/2 | 2/2 |
| Document findings vs author revision | R16–R17 | 2/2 | 2/2 |
| Code-quality judgment vs delivery | R18 | 1/1 | 1/1 |
| Flaky-wait diagnosis | R19 | 1/1 | 1/1 |
| Trivial settled task, no skill | R20 | 1/1 | 1/1 |
| **Total observed adequate primary selections** | **20** | **20/20** | **20/20** |

Both chose code-quality for the allowed R18 alternatives. Their stated next-action
and non-action summaries respected the supplied request boundaries on manual
inspection; that is a text-output observation, not evidence those actions would be
followed during real tool use. Records: [run A](run-a.json), [run B](run-b.json).

## Artifact identities

SHA-256 of supplied/recorded bytes:

```text
261e0077c6193f9398df9406869c35f5e52d8e15f2b6e49e08394ea11358d1fe  catalog-snapshot.json
2ca9f846ea2fb1f85dd222b81a8cd1ee8b1c2f7b8910f6d7121c8eedc6e4345a  prompt.md
735dba61699008eef70907ff4b1bf5378a116a4ecd484f4b8566d416823c4ae9  cases.json
a7619022e4535f716fc414ef4fe2aaa00eba41764196d656fb4cf101c9399da2  run-a.json
0388bc1fd0d902b2d4d44bce13af28d9502df28f1dd0711e4a422b7eb15d5160  run-b.json
```

## Source-loaded integration smoke

A third fresh interactive Pi session used the actual candidate `skills/` directory:
`--no-skills --skill /home/taha/dev/agents/skills/skills`, with ordinary context-file
discovery enabled and read/bash tools. Extensions, MCP and prompt templates stayed
disabled. Provider/model/reasoning were unchanged. This deliberately restores host
skill loading, bodies/references and local instructions; it is integration evidence,
not an isolated comparison with the two description-only runs.

[Integration cases](integration-cases.json) were declared before launch; the model
received [task text only](integration-prompt.md), not expected answers. It was asked
to select, read relevant actual source and explain boundaries, **never execute the
tasks**. Saved tool calls show 19 source reads under the allowed candidate directory
and one report-only send; no history/configuration/service access or file mutations.
The [recorded response and observed reads](integration-run.json) match those calls.
All 19 saved tool-result texts were compared with current source bytes exactly;
[read-source identities](integration-source-identities.json) retain their SHA-256
values so future edits do not silently inherit these observations.
Pi wrapped the supplied file in the same attachment format as the first runs.

All **11/11 primary choices** matched the allowed sets. Manual source/result checks
also found the requested boundaries reflected in explanations: issue draft without
staging/publication; module design without implementation; actual installed Pi reader
instead of a fixed home path; Bash semantics for .bashrc; generic Fedora desktop
before package/SELinux overlay; export tests as valid narrow evidence; completed
output waits instead of elapsed ticks; document findings without rewriting; and
screen/marker handback for the hypothetical non-messaging read-only child.

I08 selected null for native-subagent work, but listed hc-delegation as a read used
to explain its exclusion. That entry was also needed by I11 in the same batch. This
is not proof of zero unnecessary loading; it shows correct primary/non-action
selection in a shared-context batch. No native subagent or hc child was launched.
For I11, the prompt's hypothetical lack of higher-priority send requirements was
task data; the probe's own final report was separately authorized.

Additional SHA-256 identities:

```text
9168a077187b84ae128a7ea88b21c1b4d954082b0ea75380fecd380823910206  integration-prompt.md
21b8680f684a3ff7a64327bffbc6295df7c8ec7f3f6372b3e42ec936f5912b12  integration-cases.json
80ca427c84a5602c62b3c1a36d0b6182e932f647ffdae17d0f227db51b4a32fd  integration-run.json
6f1c9bb66799ba1936c5251a009e79532ebb30943f0630db69397d3b20164c2c  integration-source-identities.json
```

The source-loaded prompt also contains a historical literal report address. Replace
it with the current parent address for any future interactive reproduction. This
single run demonstrates reading/explaining selected bodies, not carrying out their
workflows, broad model compliance or complete normal-host portability.

## Limits and disposition

Two repeated batches on one model are weak stability evidence and not independent
per-task trials; earlier cases in the batch can influence later answers. Tasks are
synthetic representative requests, not a sampled production distribution. No old
catalog baseline was tested, so no routing-improvement claim is made. All 42
descriptions competed, but not all 42 owners received a positive task. The first two runs did not use full skill
bodies or host loader selection. The integration run read selected bodies through
Pi but did not execute their tasks, live OS/browser/service work or outward actions
other than its report. Another model or normal configured session may choose differently.

These model observations are retained as bounded development evidence, not added to
`npm test` as permanent compliance tests. Separate deterministic regressions execute
the documented completed-output wait and protect setup-copy, metadata, provenance
and discovery contracts. Fresh adversarial review checks semantic consistency; neither
static review nor packaging tests substitutes for the observations above, and those
observations do not substitute for end-to-end task evaluation.
