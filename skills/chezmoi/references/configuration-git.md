> Read the [safety gate](safety-workflow.md) first. Imported examples are documentation only, not permission to execute. Confirm syntax with actual local --help. Dry-run and previews can execute hooks, templates, tools or downloads.

# Git integration configuration

Reference: <https://www.chezmoi.io/reference/configuration-file/variables/#git>
Configure how chezmoi interacts with git in the source directory.

## Git variables

| Variable | Type | Default | Description |
| --- | --- | --- | --- |
| `git.autoAdd` | `bool` | `false` | Add changes to the source state after any change. |
| `git.autoCommit` | `bool` | `false` | Commit changes to the source state after any change. |
| `git.autoPush` | `bool` | `false` | Push changes to the source state after any change. |
| `git.command` | `string` | `"git"` | git CLI command. |
| `git.commitMessageTemplate` | `string` | `none` | Commit message template. |
| `git.commitMessageTemplateFile` | `string` | `none` | Commit message template file (relative to source directory). |
| `git.lfs` | `bool` | `false` | Run `git lfs pull` after cloning. |

### Auto-commit behavior

With `autoCommit = true`, chezmoi automatically commits whenever a change is made to the source directory, with a commit message generated from the files changed.
The [cli-commands guide](cli-commands-guide.md) ([update reference](cli-commands-update.md)) covers update workflows and failure modes.

### Examples

```toml
[git]
  autoCommit = true
  autoPush = false
  commitMessageTemplate = "chore: update dotfiles"
```

Use a template file for git commit messages:

```toml
[git]
  autoCommit = true
  commitMessageTemplateFile = ".commit-template.tmpl"
```
