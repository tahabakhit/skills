# Specification template

Replace the placeholders, do not leave them in a finished spec. Keep the document
short enough that its requirements can be checked. Optional sections are not gates.

```markdown
# <Outcome-focused title>

Readiness: draft
Sources: <brief, requirements or conversation reference>

## Problem and outcome

Who is affected, what happens today, and what should change for them?
State an agreed success measure if one exists. Otherwise describe observable success.

## Scope

In scope: <smallest useful behavior>
Out of scope: <nearby work deliberately excluded>
Constraints: <binding compatibility, policy, access or timing requirements>

## Acceptance criteria

- AC-1: Given <relevant state/input>, when <action>, then <observable result>.
- AC-2: <Relevant failure or boundary behavior, if required>.

## Verification

| Criterion | Proposed proof | Execution status / remaining owner |
| --- | --- | --- |
| AC-1 | <existing check or behavior-focused test to add> | Not run |
| AC-2 | <relevant automated or manual check> | Pending; owner if known |

Verification here is planned, not completed. Preserve any required CI or manual
acceptance obligations. Name an existing command only after checking it exists.

## Decisions and context (optional)

Confirmed: <decisions the user made, with reasons where useful>
Observed: <current behavior and supporting paths/links>
Implementation suggestions: <nonbinding, only when useful>
Terms: <only disputed or important domain vocabulary>

## Open questions and assumptions

Material questions: <decision, consequence and owner if known, or None>
Proposed defaults: <unconfirmed low-risk choices, or None>

## Delivery handoff

The approved behavior and criteria are the delivery input. Task decomposition,
agent/model selection, target branch, review, CI and delivery permissions are
resolved by the delivery workflow. Spec approval alone authorizes none of them.
```

For a small change, merge context into the problem and omit empty sections. For
large work, add only necessary interactions, data preservation requirements and
proposed slices. Every slice must leave its delivered behavior safe and verifiable.
