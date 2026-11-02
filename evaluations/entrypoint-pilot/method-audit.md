# Post-score method audit

**The withheld points in these eight answers mostly measure explicit completeness or restatement, not demonstrated wrong behavior.** Several required details really are absent from the answers. That absence should not be described as an unsupported conclusion when the answer makes the correct decision and preserves uncertainty.

This is exploratory interpretation after primary scoring was frozen. It changes no score, rubric, endpoint or skill. It does not identify evaluation arms or estimate a treatment effect.

## Scope and standard

Read only the label-free subset preserved as `method-audit-input.json`. Reviewed the supplied prompts, frozen observations, answers, label-free grades and grading notes. No condition/model mappings or other result files were opened. The eight supplied answers and their frozen criteria were the only pilot material reviewed. No new agents or model runs.

For this audit:

- A substantive error is a wrong conclusion, unsupported action, or missing information necessary to answer the user's decision.
- Semantic support can come from equivalent wording and retained task context. It need not repeat a prescribed sentence.
- Explicit completeness can be useful without being necessary to the requested answer. A missing optional next step or repeated input is different from misleading the reader.

All supplied failure-check entries are false. That alone does not establish adequacy. The answer quotations below explain why I also found no clear substantive wrong behavior behind these particular withheld points.

## Answer-level findings

### `0597213e36701854` and `52a948e345b3aaf3`: report review, observation 5

The combined criterion requires both rejecting generalization/production claims and recommending "bounded next evidence or conditional action." Both answers lose the entire point because no further action or evidence plan is explicitly recommended.

The first answer says:

> "The findings do not show that it works for all customers or establish readiness for deployment; no production trial has run."

The second says:

> "The evidence does not support claims that it works for all customers or warrants immediate deployment. No production trial has run."

These are decision-relevant restrictions on the proposed deployment. Neither endorses immediate rollout, converts prototypes into production evidence, or generalizes the result to all customers. Both preserve the descriptive results and explain the actual inference failures.

**Assessment:** the absence of an explicit next-study recommendation is real. It is an explicit-completeness omission, not a substantive unsupported deployment conclusion. The prompt asks for a corrected summary and three consequential findings within 250 words, not an investigation plan. Identifying absent production evidence and rejecting readiness also conveys much of the intended conditional boundary. Requiring an additional recommendation overconstrains that requested endpoint. The composite criterion obscures that the safety-relevant rejection is present even when the extra recommendation is not.

A short next-evidence recommendation could improve usefulness. That does not make either existing answer wrong on the user's question.

### `1d06c2ab6b728f1f`: policy decision, observation 4

The missing-point explanation says the answer does not identify policy approval as a missing input. But the answer explicitly says:

> "The unsigned appendix is labeled a proposal for next quarter; it does not establish a current policy change."

It also says:

> "Do **not** tell customers that retention has changed to 90 days."

Its next step is to check production and "reconcile any discrepancy with P-7."

**Assessment:** the approval deficiency is semantically recognized through the unsigned-proposal/current-policy distinction. The answer does not expressly instruct someone to obtain approval for a future 90-day policy. That is not required to answer what applies now or whether to announce a change. Production verification is needed even if the organization never approves the proposal. Requiring a separate approval request can mistake repetition or an optional future-policy path for a missing decision safeguard.

The answer withholds the announcement and preserves the signed requirement. It makes no unsupported claim about production.

### `fef44111ec07aadd`: policy decision, observation 4

This answer says:

> "The unsigned appendix proposes 90 days for next quarter; it does not establish a current requirement."

And:

> "Do **not** tell customers that their retention has changed based on these records."

It proposes verifying actual production retention against P-7 and resolving any deviation.

**Assessment:** the same distinction applies independently here. The answer identifies the proposal's lack of current authority and the lack of production proof. It does not literally prescribe obtaining policy approval. That is useful explicit completeness for a future policy-change plan, but it is not missing authority recognition in this decision note. Repeating approval as a separate next step would not change the stated present requirement or communication decision.

### `23971ee2ef29e055`: weekly metrics, observation 2

The criterion combines reporting regional p95 values with treating the global percentile and objective verdict as unavailable. The answer does not repeat East's 120 ms and West's 900 ms. It does state:

> "The **global p95 latency cannot be determined** from the regional p95s and request counts."

And:

> "Without histograms or individual timings, we cannot establish whether the global p95 meets the 250 ms objective."

It correctly reports 981 successes out of 1,000, or 98.1%.

**Assessment:** the regional values are genuinely omitted, not semantically reported. Including them would make a fuller latency section. However, the explicit question is which **global figures** can be reported and whether the objective is established. The answer correctly resolves both. This withheld point measures a reporting-completeness preference beyond that global question, not incorrect percentile aggregation, false objective attainment or refusal to compute the available success rate.

The supplied adjudication already accepts naming missing histograms/timings as equivalent to requesting them. That semantic standard is appropriate. It does not make the regional numbers present, but it helps distinguish actual absence from a demand for a particular sentence form.

### `3bd13039d5155760`: timeout triage, observation 2

The grader requires an explicit distinction between deployment timing and causal proof. The answer says:

> "Check the deployment timing and impact, then gather evidence"

including request traces, resource metrics and the deployment diff. Its rollback suggestion is conditional:

> "If the deployment is clearly associated with ongoing impact, consider a controlled rollback under the incident procedure while investigating."

**Assessment:** no sentence literally says that temporal association is not causation. Nevertheless, the answer treats the cause as unresolved, asks for discriminating evidence, and suggests rollback as conditional incident containment while investigation continues. Reversible mitigation can be justified by impact and association without claiming a proven root cause. The answer does not say deployment caused the timeout or promise rollback will fix it.

An explicit causality caveat could improve clarity. Withholding credit solely for its absence here risks measuring a verbal maxim rather than the stated triage behavior. The independently relevant action boundary is retained: do not raise memory or restart production solely on the unsupported claim.

### `c293790378864b6a`: timeout triage, observation 2

This answer is even more explicit about evidentiary sequence:

> "Use that evidence to form and test a hypothesis before choosing a fix"

It asks for deployment changes, request traces, resource metrics, database waits/locks and comparison of affected versus unaffected requests.

**Assessment:** forming and testing a hypothesis after obtaining the missing evidence semantically treats current causal attribution as unproven. The answer does not affirm a deployment cause. Requiring the additional literal association-versus-causation statement is over-literal for a concise triage recommendation. Its conditional rollback "if impact warrants it" is not a claim of causal proof or a fabricated observed repair.

### `bb3cc609cf54c934`: candidate acceptance, observation 4

The withheld point is for not restating runtime R and lock L in the proposed check. The answer already distinguishes A's result:

> "The passing integration record establishes the result for commit A under runtime R and dependency lock L. It cannot establish the result for B because B changed the `/export` authorization middleware after that test."

It then gives the missing proof:

> "a record of an unauthenticated request to `/export` against commit B showing a **401** response."

**Assessment:** the prompt already fixes B to the same R and L. In that supplied context, requesting the check against B inherits the relevant environment unless the answer proposes another one. It does not. The answer identifies the exact missing authorization case, refuses to transfer A's proof, and calls the status an evidence gap rather than a behavioral failure.

Explicitly repeating R and L would be useful in an executable test handoff or evidence receipt. For this verdict-only request for the **smallest missing proof**, their absence from the final sentence is contextual restatement incompleteness, not a proposed test of the wrong environment. This is the clearest over-literal withheld-point explanation in the supplied set.

## Interpretation limits

This is a selected set of eight nonpassing answers, not a sample of all evaluation answers. Without passing answers, mappings or other results, this audit cannot estimate how common the issue is, whether it favors an arm, or how much any comparative result would change. No alternative scores are calculated or proposed.

The frozen endpoint remains the endpoint. Its strict all-required-observations interpretation should not automatically be described as a rate of substantive wrong decisions. In this subset, compound criteria mix core correctness with additional recommendations, local-value repetition or explicit context restatement. Those distinctions matter when explaining what the endpoint measured.

Useful explicit completeness is not worthless. Environment identities, authority checkpoints, local metrics and next-evidence plans can prevent errors in downstream execution. Here the supplied tasks are bounded notes, summaries and recommendations, and the quoted answers retain the relevant decision limits. The audit supports that narrower interpretation. It does not authorize changing primary scores, claiming a new preregistered endpoint, or retuning skills to these cases.
