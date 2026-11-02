> Read the [safety gate](safety-workflow.md) first. Imported examples are documentation only, not permission to execute. Confirm syntax with actual local --help. Dry-run and previews can execute hooks, templates, tools or downloads.

When you need detailed flag specifications, URL resolution rules, or installation script variants, follow the topic links below.

## First-time initialization

Initialize chezmoi on a fresh machine or clone an existing repository:

- `chezmoi init`: Create source directory at `~/.local/share/chezmoi` and generate config file from `.chezmoi.$FORMAT.tmpl`.
- `chezmoi init <repo>`: Clone remote dotfiles repository into source directory and generate config file.
- `chezmoi init --apply <repo>`: Clone repository and immediately apply dotfiles.
- `chezmoi init --one-shot <repo>`: Clone, apply, and purge all chezmoi traces (useful for ephemeral container environments).

## Bootstrap boundary

One-line installers combine download, code execution, repository initialization and application. Do not run them automatically. For authorized installation, prefer the system package manager or download a pinned release, verify its identity and inspect it before executing. Review repository templates, scripts, hooks and external dependencies before a separately authorized init or apply.

## Reference guides

- [setup.md](init-setup.md): Complete setup overview, config file auto-generation details, and installation scripts.
- [commands.md](init-commands.md): Flag reference for `chezmoi init` (`--apply`, `--one-shot`, `--purge`, `--config-path`) and default URL guessing patterns.

## Related skills

- Consult [cli-commands guide](cli-commands-guide.md) for global flags (`--source`, `--destination`) and post-init operations (`apply`, `diff`, `doctor`, `managed`).
- Consult [configuration guide](configuration-guide.md) for configuring `sourceDir` and top-level options.
