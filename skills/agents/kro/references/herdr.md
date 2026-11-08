# Herdr and task names

`HC_TERMINAL_ID` means this process runs inside Herdr. `herdr-app` drives the
window; `hc` runs terminals. Use `herdr-app ls`, `herdr-app commands` and
`hc <command> --help` for installed capabilities. To open an agent pane, prefer
`herdr-app do terminal.open --folder <dir> --place right --argv '["pi"]'`:
direct argv ends with the program, unlike agent buttons that can leave a shell.
Only open panes when authorized; the opener owns their cleanup.

- `kro ask <scout|critic|reviewer> "<self-contained task>"` runs a read-only
  helper, prints its transcript answer and closes it. Give the surrounding tool
  1800 seconds; helper timeout defaults to 1500. One writer only; helpers are Pi
  scouts or official Claude Code/Opus critics and reviewers, not Codex workers.
  Exit 70 after a printed answer can mean its own helper cleanup failed. Preserve
  the answer, report the cleanup warning/leftover helper and stop for resolution;
  never automatically re-ask or treat the failed lifecycle as clean success.
- `kro name <task-slug>` sets the task label and verifies the current terminal's
  explicit app tab before renaming it. Shared/ambiguous/unmapped tabs are refused.
  This CLI does NOT change the native harness name: use Pi `/name <task-slug>`
  or Claude/Codex `/rename <task-slug>`. At launch, Pi `--name` or Claude `-n`
  can set it. No opaque transcript/session database edits.
- `kro tidy` reaps only verified same-session helper children whose consult owner
  is dead, including busy/blocked orphans. It never sweeps unrelated/user-opened
  panes or a helper still owned by a live consult. Normal ask cleanup does not
  depend on stale reaping. Old agent-consult PID-only records are left alone.

Supply `KRO_SESSION_ID` only from an actual native harness session ID, never a
repo name, terminal ID, task slug or made-up persistent token. If unavailable,
leave it unset: ask still works, but tidy reports ownership-unverified children.
No automatic session-ID bridge is installed. Linux stale reaping also requires
the recorded observer PID namespace to match; unavailable, different or older
namespace-less identities are left alone. Darwin stale reaping is disabled
until a reliable process-start identity is supported; normal ask cleanup works.
Do not reuse a previous harness session's ID after a restart.

Task slug = notes filename = native session name = Herdr tab name. Keep the
space name as the repo. Helper names are `<role>-<task-slug>-<4 hex>`, with the
display slug truncated to fit Core's 32-byte limit. Before naming, ask falls
back to the sanitized working-directory basename. In prose use `pi <slug>`
or `critic for <slug>`, not a bare terminal ID. Internal IDs remain for verified
CLI targeting, not conversation labels.
