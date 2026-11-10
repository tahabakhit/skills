---
name: typesafe-ai
license: MIT
description: "Design, review or debug TypeSafe System One/Jev typed judgments, questions and state, or assess where semantic classification helps an application. Not authority for live API calls or safety/approval decisions."
---

# Integrate TypeSafe judgments

Use typed semantic judgments as inputs to visible application logic, not as an
approval or security boundary. Arithmetic, exact lookups and policy belong in code.
If code already solves the task reliably, do not add a model call.

Read [integration guidance](references/integration-guide.md) for the applicable job:

- New integration: decision truth table, state design, atomic questions and criteria.
- Request composition: shared state, speculative questions and dependency boundaries.
- Answer handling: null cases, probability distributions and application thresholds.
- Wrong answers: exact payload, missing state, candidate coverage, scope, then wording.
- Validation: representative, hard, negative and held-out cases; no exact-probability oracle.

Consult current [TypeSafe docs](https://docs.typesafe.ai/llms.txt) and installed SDK
types for schemas, models and limits. Historical examples are not current API proof.
If documentation is unavailable, identify the local evidence and omit unknown syntax.

Live tests require explicit budget, data and credential-use permission. Do not send
private state or log credentials. Keep API keys server-side; surface API failures as
errors, never negative judgments. Retain sanitized exact payloads for authorized
reproduction. Classification cannot authorize commands, infer approval or waive review.

Return the integration or diagnosis with checks actually run, uncertain behavior and
unrun live tests. Empirical results apply to tested cases, not all future inputs.
