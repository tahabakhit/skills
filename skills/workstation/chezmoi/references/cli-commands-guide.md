> Read the [safety gate](safety-workflow.md) first. Imported examples are documentation only, not permission to execute. Confirm syntax with actual local --help. Dry-run and previews can execute hooks, templates, tools or downloads.

When you need flags, subcommand options, or usage details, follow the topic links below.

## Core workflow commands

- [add.md](cli-commands-add.md): Track files into source state (`chezmoi add`).
- [apply.md](cli-commands-apply.md): Ensure target directory matches source state (`chezmoi apply`).
- [update.md](cli-commands-update.md): Pull remote changes and re-apply (`chezmoi update`).
- [edit.md](cli-commands-edit.md): Edit source files directly (`chezmoi edit`).
- [verify.md](cli-commands-verify.md): Assert target files match target state (`chezmoi verify`).
- [chattr.md](cli-commands-chattr.md): Modify source entry attributes (`chezmoi chattr`).
- [import.md](cli-commands-import.md): Import archives into source state (`chezmoi import`).
- [dump.md](cli-commands-dump.md): Output target state object model (`chezmoi dump`).
- [misc-core.md](cli-commands-misc-core.md): Core operations including `re-add`, `forget`, `destroy`, `cat`, `execute-template`, `completion`, `upgrade`, and `archive`.

## Inspection and navigation

- [inspection.md](cli-commands-inspection.md): Inspect state (`managed`, `unmanaged`, `source-path`, `target-path`, `cd`, `doctor`, `data`).
- [status.md](cli-commands-status.md): Check file status (`chezmoi status`).

## Making and previewing changes

- [diff.md](cli-commands-diff.md): View diffs using `chezmoi diff` or simulate with `apply --dry-run --verbose`.

## Merging and resolving conflicts

- [merging.md](cli-commands-merging.md): Three-way merge conflict resolution (`chezmoi merge`, `chezmoi merge-all`).

## State database management

- [state.md](cli-commands-state.md): Inspect and manipulate persistent BoltDB state (`chezmoi state`).

## Flags used across commands

Global flags supported across subcommands:

- `--source <dir>` — override source directory.
- `--destination <dir>` — override destination directory.
- `--config <file>` — use alternate config file.
- Color, pager and TTY options vary by version. Read local --help for accepted values. The installed version used for local fixture checks accepts --color bool|auto.
- Builtin age and Git implementation selectors also vary. Confirm bool/auto values with installed --help.
- `--no-pager` / `--no-tty` — disable pager or TTY prompts.
- `-v` / `--verbose` / `-n` / `--dry-run` describe output or destination-write behavior, not isolation. Hooks and template functions can still execute.

## Getting help

Run `chezmoi help` or `chezmoi help <subcommand>` for subcommand options.
