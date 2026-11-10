Locate the installed Pi package and read its current extension documentation,
relevant SDK/tool contracts and matching examples before implementation. Discover
paths from the installed executable/package and environment; do not assume the
same package scope, version or home directory on every machine.

Verify tool registration, argument preparation, execution, cancellation, error
signaling, result conversion and prompt metadata against that version. Do not
mandate a dependency upgrade or migration just because upstream examples use a
newer API. Report a compatibility blocker if required work exceeds the scope.

Trace the actual model-visible path: exposed tool names and schemas, conditional
activation, prompt additions, prepared arguments, executed result, truncation and
provider conversion. Inspect the assembled result rather than only source text.

Keep user-facing renderers and private state distinct from model-visible content.
Every fact needed to recover or continue belongs in the actual model-visible
result. Verify how this SDK marks failure and partial effects; an error-looking
string is not proof the runtime records a failed call.

After a runtime change, exercise affected startup, reload, cancellation and
cross-extension behavior in an isolated setup. Live activation needs its own
authorization. Copy edits to guidance do not require a live extension experiment.
