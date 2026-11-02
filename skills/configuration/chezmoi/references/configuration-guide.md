> Read the [safety gate](safety-workflow.md) first. Imported examples are documentation only, not permission to execute. Confirm syntax with actual local --help. Dry-run and previews can execute hooks, templates, tools or downloads.

When you need detailed configuration keys, schema tables, or advanced options, follow the topic links below.

## Config file location

chezmoi reads its config file from `~/.config/chezmoi/chezmoi.$FORMAT`, where `$FORMAT` is `json`, `jsonc`, `toml`, or `yaml`.
Use `chezmoi doctor` to confirm the active configuration path.
Use `chezmoi source-path` to print the active source directory.

## Inspecting and regenerating configuration

```sh
chezmoi execute-template "{{ .chezmoi.config }}"    # print computed configuration
chezmoi init --prompt                                 # rerun configuration prompts
```

## Key configuration areas

- [core.md](configuration-core.md): Top-level configuration options (`sourceDir`, `destDir`, `umask`, `pager`, `color`, `mode`).
- [data.md](configuration-data.md): Data injection options (`[data]`, `.chezmoidata.$FORMAT` files).
- [tools.md](configuration-tools.md): Tool integration for editing (`[edit]`), diffing (`[diff]`), and three-way merging (`[merge]`).
- [hooks.md](configuration-hooks.md): Operation lifecycle hooks (`.pre` and `.post`) for commands and git events.
- [git.md](configuration-git.md): Git integration options (`autoCommit`, `autoPush`, `commitMessageTemplate`).
- [interpreters.md](configuration-interpreters.md): Custom script interpreter mappings and extension rules.
- [pinentry-textconv-warnings.md](configuration-pinentry-textconv-warnings.md): GnuPG pinentry settings, textconv diff transformers, and warning suppression.

## Related skills

- Consult [secrets-management guide](secrets-management-guide.md) for `encryption` (`age` or `gpg`) setup.
- Consult [machine-config guide](machine-config-guide.md) for machine-specific configuration templates (`.chezmoi.$FORMAT.tmpl`).
