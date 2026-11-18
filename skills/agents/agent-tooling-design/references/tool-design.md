# Tool design: deeper cases

Read this when a tool has several actions, state-dependent arguments, or a contract
that has grown long.

## Multi-action and state-dependent tools

- If a tool has many actions or its valid arguments change with state, prefer a small
  upfront schema plus a `help` action (or deferred discovery, where the harness
  supports it) that returns the current arguments and examples on demand.
- Keep simple, familiar tools as plain schemas. Do not wrap `read` or `bash` in a
  help-backed shape for uniformity.
- Normalise at the input boundary, then keep execution types strict:
  - Silently drop known presentation hints the chosen action ignores.
  - Accept safe legacy aliases in argument preparation; do not advertise them in the
    schema.
  - Reject any argument whose omission or misreading could change the target, scope,
    action or safety. Do not blanket-ignore unknown fields.
- Do not add an argument whose only job is to splice text into an internal prompt.
  Give the existing prompt field a short hint instead.

## Writing descriptions

- Write terse fragments, not sentences: `Timeout seconds`, `Repo-relative path`,
  `Max results`.
- Skip Markdown, backticks, examples and trailing full stops unless they carry literal
  syntax.
- Tell the agent what to supply or do. Prefer a concrete supported action over a list
  of things the tool cannot do.
- The tool description should not restate the tool name. "Search issues by keyword"
  for `search_issues` adds nothing; "Open issues only; closed via state=all" does.

## Trimming a bloated contract

Judge the whole assembled tool block, not single fields.

- Each fact appears once per active mode, in the narrowest place: schema, field
  description, tool description, help output, or runtime error.
- Cut feature inventories, nested optional APIs, troubleshooting guides and generic
  workflow advice from standing prompts. Rare invalid-state recovery belongs in the
  runtime error that triggers it.
- Every standing instruction must name the wrong decision it prevents and why the
  name, schema, help or error cannot prevent it. Valid reasons: unfamiliar capability,
  local deviation from a known tool, collision with a neighbour, exact syntax, safety
  boundary, recurring observed mistake. "Completeness" or "it could be useful" are not.
- Stay inside the requested scope. Report unrelated clutter separately rather than
  turning a small fix into a rewrite.
- Fewer tokens is not automatically better. Optimise task success first, then cost.

## Fixing behaviour at the model boundary

- Before changing a contract to alter external behaviour, run the real route. An
  accepted field or a documented option does not prove the backend honours it.
- To test a wording change, compare paired natural requests on both sides of the
  decision boundary (should call / should not call) with model, task and context held
  fixed. Routine implementation checks do not need model runs.
