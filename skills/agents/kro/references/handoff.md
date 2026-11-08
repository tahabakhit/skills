# Handoff

Update the named task's notes, or the current task when no slug is supplied.

Check its Owner line; do not overwrite another session's checkpoint without
explicit transfer. Rewrite `notes/<task-slug>.md` so a fresh session can continue:
current step and approval state, commits/touched paths, verified checks with
results and limitations, failures, exact next steps and owner-only decisions.
Correct stale claims rather than preserving a log. Record `git status --short`.
Keep facts that cannot be recovered from code/Git; move durable knowledge to docs
only when authorized. Do not commit unless asked.

Before a manual fresh-context rollover, successfully save this checkpoint and
read it back. If the write fails, do not request rollover. This is a workflow
gate, not an automatic compaction hook. Leave native overflow recovery available.

When inside Herdr, `hc ls --all --json --label kro=1` lists helper address
summaries, not names or ownership. Hydrate each local address with
`hc get <address> --json`; identify this parent's children by `kro.parent` equal
to `HC_TERMINAL_ID`, then verify session/task ownership before attributing them
to this task. Report verified names alongside addresses; leave missing or
ambiguous mappings marked unknown. Use `kro tidy` only under its ownership rules;
never close owner-opened sessions. If kro is absent or session ownership cannot
be verified, report remaining children for manual attention instead. Normal
helper consultations already close their own children. Explicitly release/transfer
ownership when handing work to another session; do not infer transfer from age.
