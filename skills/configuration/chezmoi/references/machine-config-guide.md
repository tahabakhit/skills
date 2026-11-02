> Read the [safety gate](safety-workflow.md) first. Imported examples are documentation only, not permission to execute. Confirm syntax with actual local --help. Dry-run and previews can execute hooks, templates, tools or downloads.

When you need detailed OS branching examples, data merging rules, or WSL detection snippets, follow the topic links below.

## Identifying machines

Key built-in variables for distinguishing machines:

- `.chezmoi.os`: Operating system (`"linux"`, `"darwin"`, `"windows"`).
- `.chezmoi.arch`: CPU architecture (`"amd64"`, `"arm64"`).
- `.chezmoi.hostname`: Hostname up to the first `.`.
- `.chezmoi.fqdnHostname`: Fully-qualified hostname.
- `.chezmoi.osRelease`: Linux distribution metadata from `/etc/os-release`.
- `.chezmoi.kernel.osrelease`: Linux kernel release string (used for WSL detection).

Run `chezmoi data` to inspect all variables on the local machine.

## Per-machine data sources

- Config file `[data]` section (generated from `.chezmoi.$FORMAT.tmpl` on init): Dynamic per-machine values such as email, work roles, or prompt inputs.
- `.chezmoidata.$FORMAT` / `.chezmoidata/` files in source state: Static data shared across all machines, read before template evaluation.

## Reference guides

- [os-patterns.md](machine-config-os-patterns.md): Branching patterns for OS, Linux distribution, WSL detection, and hostname conditionals.
- [per-machine-data.md](machine-config-per-machine-data.md): Data source resolution, precedence, and merge semantics.
- [conditional-ignore.md](machine-config-conditional-ignore.md): Conditional ignore rules using `.chezmoiignore.tmpl`.

## Related skills

- Consult [templating guide](templating-guide.md) for template syntax, Sprig functions, and variable references.
- Consult [configuration guide](configuration-guide.md) for config file setup and options.
- Consult [file-attributes guide](file-attributes-guide.md) for source attribute prefixes and root control files.
