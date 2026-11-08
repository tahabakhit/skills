Use the repository's branch topology and release process. Prefer one coherent
submission; split only when layers are independently useful to review or ship.
Do not invent a staging branch, stack, umbrella, draft/ready policy or new tool.
For an existing stack inspect both direct-parent diffs and cumulative integration.
Changing published history or stack topology needs authority for that operation.

Before an authorized submission:

1. Compare the complete diff/commit range with the intended target and request.
   Identify dependency, compatibility, deployment and migration effects.
2. Complete the established checks and review loop. Include coupled tests and docs.
3. Write a specific title from the final effect. Explain why it exists, net behavior,
   non-obvious decisions, review risks and exact validation outcomes. Remove stale
   scope, unsupported certainty and sections that could describe any patch.
4. Link the relevant issue. Use closing language only when the requested scope
   resolves the issue completely; otherwise reference it without claiming closure.
5. Publish only when authorized, using the repository's requested draft/ready state.
   Preserve multiline Markdown with a body file when using the GitHub CLI.

For review feedback, read current comments and verify claims against the code and
request. Fix supported in-scope findings, explain rejected claims, and defer
separate work rather than adding incidental cleanup. Recheck affected behavior
and final submission text after changes.

On rejected pushes inspect divergence. Never retry with plain force or rewrite
shared history. Use a lease only within the owner's existing branch/ref safety
policy and authorization; this reference does not relax it.

Follow the repository release process. Do not invent version bumps, changelogs or
release artifacts. Report submission links, validation, remaining risks and state.
