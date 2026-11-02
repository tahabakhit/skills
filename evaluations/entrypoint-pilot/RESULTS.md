# Entrypoint pilot results

**The pilot does not establish that these skills are needed for the tested reasoning.** Frozen strict scores favor skill injection in four of 16 pairs, but an independent post-score audit found that the withheld points mostly concern explicit completeness or restatement, not demonstrated wrong decisions. Keep the workflows selective and provisional, not a mandatory prompt layer.

All 32 planned answer sessions completed and passed the saved-context audit. The comparison used eight text-only development tasks, no skill versus one forced entrypoint, and one sample for each of two registered IDs. Two fresh graders received no condition/model labels. Three criterion disagreements were adjudicated and final scores frozen before the paired mapping was opened. One grader's non-verbatim quote was corrected without changing its score. See [the protocol](PROTOCOL.md), [assignments and answers](records.json), [judgments](grades.json), [adjudication](adjudication.json) and [pair calculations](paired.json).

The IDs are `gpt-6.1-sol` and `gpt-6.1-terra` under the `openai` provider. They do not establish distinct underlying models, families or independent training. These are Pi sessions with forced text injection, not tests of Claude Code, Codex, automatic loading or production workflows.

## Frozen primary results

A strict pass requires every frozen observation and no listed failure. Cells show observations met/expected, not a severity-weighted correctness percentage. Every answer had zero listed failure flags.

| Task | Treatment | sol baseline | sol skill | terra baseline | terra skill |
| --- | --- | --- | --- | --- | --- |
| Concrete cache design, DES-01 | codebase-design | 4/4 | 4/4 | 4/4 | 4/4 |
| Timeout diagnosis, DBG-02 | systematic-debugging | 5/5 | 5/5 | 4/5 | 4/5 |
| Candidate-bound proof, VER-01 | verify-and-stop | 4/4 | 4/4 | 3/4 | 4/4 |
| As-of SQL state, SQL-02 | analyze-data | 4/4 | 4/4 | 4/4 | 4/4 |
| Percentile/ratio report, MET-02 | document-review | 4/4 | 4/4 | 3/4 | 4/4 |
| Conflicting policy evidence, DOC-02 | research-work | 4/4 | 4/4 | 3/4 | 3/4 |
| Deletion/accessibility proposal | interface-review | 6/6 | 6/6 | 6/6 | 6/6 |
| Prototype report review | document-review | 5/6 | 6/6 | 5/6 | 6/6 |

| Recorded ID | Strict passes, baseline | Strict passes, skill | Mean per-task observation fraction, baseline | Skill |
| --- | --- | --- | --- | --- |
| gpt-6.1-sol | 7/8 | 8/8 | 97.9% | 100.0% |
| gpt-6.1-terra | 3/8 | 6/8 | 86.0% | 94.4% |

Across these exact 16 pairs: 10 both passed, four were skill-only strict passes, none baseline-only, and two neither passed. The descriptive totals are 10/16 baseline and 14/16 skill. Do not present the difference as a stable 25-point correctness uplift. The tasks are few, selected and not a representative independent sample. The IDs may share an underlying model. No uncertainty estimate or general retention decision is justified.

## What the differences actually measure

The four strict gains were reporting a relevant runtime/lock in a proposed check, repeating regional p95 values, and adding a bounded next-evidence/action recommendation to two report reviews. Neither baseline in those pairs endorsed stale authorization proof, percentile averaging, false causality or immediate deployment.

After unblinding, a separate reviewer received only the eight originally nonpassing answers, prompts, rubrics and label-free grades. That exploratory [method audit](method-audit.md) found no clear substantive wrong behavior behind these particular withheld points. It identified both genuine omissions and over-literal requirements:

- The report answers rejected deployment/universal claims but omitted an extra recommendation not requested by the bounded review task.
- The metrics answer correctly answered the global-figure question but did not repeat the two regional values.
- The verification answer requested the missing check against B in the supplied B/R/L context without repeating R and L in its final sentence.
- The policy and debugging answers retained authority/uncertainty distinctions without repeating prescribed approval or association-versus-causation wording.

The audit reviewed a selected subset, not all answers, and computed no alternative scores or treatment effect. The original scores and endpoint remain unchanged. Its finding prevents interpreting strict completeness as a rate of wrong decisions or claiming the skills corrected four factual errors.

Both conditions already exhibited substantial target behavior: respecting cache contracts, rejecting a confident unsupported diagnosis, refusing stale acceptance proof, deriving the as-of count, rejecting averaged percentiles, separating proposals from signed policy, and bounding accessibility claims. This supports a ceiling/completeness interpretation on these cases. It does not prove equivalence, universal competence or permanent uselessness of the skills.

## Observed prompt and response cost

Usage is provider-reported, not an independent tokenizer or billing measurement. Cache-read/write fields were zero. The [raw summary](summary.json) preserves output tokens and reported response durations too.

| Per registered ID, eight calls per arm | Baseline | Skill |
| --- | --- | --- |
| Total reported input tokens | 1,922 | 6,879 |
| Median reported input tokens | 221.5 | 781 |

Each ID consumed 4,957 additional input tokens across the eight treatment calls, about 620 extra per call. No monetary cost is claimed from unverified gateway prices. Reported median response durations were 12.65 versus 12.11 seconds for sol and 6.64 versus 5.05 seconds for terra. These are response durations, not whole-session wall times. One sample per cell, queue effects and stochastic variation prevent a latency-improvement claim.

## Version and evidence limits

Seven entrypoints were tested. `document-review` supplied two tasks. The original discovery pair and the other 12 owners were not tested. Required references were unavailable and unnecessary for these supplied questions. No actual SQL, diagnostic check, document edit, rendered UI, production action, reference loading or host-mediated route was exercised. No tool calls were possible, so their absence is not evidence of restraint.

Frozen snapshots and their complete notices ship as benchmark data, not extra discoverable `SKILL.md` folders. Current debugging and verification received optional-routing updates after freezing. Their historical outcomes are not silently applied to current full-skill bytes. Source-only safety corrections elsewhere are not behavioral passes.

Keep 21 as a source catalog of scoped, opt-in workflow hypotheses. Do not preload all of it, remove existing specialist knowledge, or claim system-wide uplift. The next useful comparison is realistic tool-enabled work with independently checkable outcomes, fresh task instances, repeated samples and a short generic control. Routing and selective installation need separate checks. Further prompt tuning on these cases would remain development, not validation.
