> Read the [safety gate](safety-workflow.md) first. Imported examples are documentation only, not permission to execute. Confirm syntax with actual local --help. Dry-run and previews can execute hooks, templates, tools or downloads.

When you need execution details, environment variable lists, or state management commands, follow the topic links below.

## Script file naming prefixes

| Prefix | Execution trigger |
| --- | --- |
| `run_` | Every `chezmoi apply` |
| `run_once_` | Once per unique content (tracked by SHA256) |
| `run_onchange_` | When script content changes since last run |
| `run_before_` | Before target files are updated |
| `run_after_` | After target files are updated |

Prefixes compose left to right: `run_once_before_00-install-packages.sh`.

## Filtering script execution

- Skip running scripts during apply: `chezmoi apply --exclude=scripts`.
- Run only scripts without modifying files: `chezmoi apply --include=scripts`.

## Reference guides

- [script-execution.md](scripts-script-execution.md): Execution model, script ordering, environment variables, content hashing, and code examples.
- [state-management.md](scripts-state-management.md): Managing script execution history and resetting `scriptState` / `entryState` buckets.

## Related skills

- Consult [cli-commands guide](cli-commands-guide.md) for `chezmoi state` subcommand flags.
- Consult [templating guide](templating-guide.md) for rendering logic in `.tmpl` scripts.
