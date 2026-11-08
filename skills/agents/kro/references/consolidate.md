# Consolidate

Weekly manual memory pass for the current repo, using the supplied period
(default 7d). No scheduler or unattended agent is installed.

1. Read `notes/*.md`, not other scratch files. Use the applicable session reader
   to find recent transcripts for this repo and the selected period. The
   analyze-sessions skill reads Pi transcripts only; do not pretend it reads
   Claude/Codex sessions. If a transcript source is unavailable, say which facts
   could not be checked.
2. Check notes against transcripts AND current code/docs. Correct stale or
   duplicate claims only within this session's ownership or with an explicit
   transfer. Prepare a handoff checkpoint before requesting fresh context.
3. Propose deletion/archive of finished notes; never delete automatically.
4. Propose durable repo facts for their owning topic docs or AGENTS.md. Do not
   edit those destinations until approved.
5. Propose cross-repo personal preferences for `~/.agents/memory/`: MEMORY.md
   is an index under 200 lines and 25 KB, one fact/topic file per memory. Repo
   facts stay in repo docs, temporary task state in notes. Do not import private
   transcripts, credentials, employer content or legacy Claude memory in bulk.
6. Only after approval, one designated writer re-reads shared files immediately
   before editing. Stop on conflicting edits; there is no enforced cross-session
   lock or atomic compare-and-swap writer. Keep the runtime directory private,
   preserve unrelated facts and update its index. Never track/deploy memory
   contents through chezmoi or Git.
7. Report corrections, proposed removals/promotions and evidence gaps.
