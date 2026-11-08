> Read the [safety gate](safety-workflow.md) first. Imported examples are documentation only, not permission to execute. Confirm syntax with actual local --help. Dry-run and previews can execute hooks, templates, tools or downloads.

# Setup and installation

## Setup overview

chezmoi generates your dotfiles for your local machine.
It combines two main sources of data:

1. **The source directory** (`~/.local/share/chezmoi`), which is common to all your machines, and is a clone of your dotfiles repo.
Each file that chezmoi manages has a corresponding file in the source directory.
2. **The config file**, typically `~/.config/chezmoi/chezmoi.toml` (although you can use JSON or YAML if you prefer), which is specific to the local machine.

## Automatic config file generation

`chezmoi init` can create a config file automatically, if one does not already exist.
If your repo contains a file called `.chezmoi.$FORMAT.tmpl` where `$FORMAT` is one of the supported config file formats (json, jsonc, toml, or yaml) then `chezmoi init` will execute that template to generate your initial config file.

Specifically, if you have `.chezmoi.toml.tmpl` that looks like this:

```toml
{{- $email := promptStringOnce . "email" "Email address" -}}

[data]
    email = {{ $email | quote }}
```

Then `chezmoi init` will create an initial `chezmoi.toml` using this template.
`promptStringOnce` is a special function that prompts the user for a value if it is not already set in your data.

## Re-create your config file

If you change your config file template, chezmoi will warn you if your current config file was not generated from that template.
You can re-generate your config file by running:

```sh
chezmoi init
```

## Install

### Binary installation and one-shot bootstraps

Prefer an authorized install through the host package manager. Otherwise select an immutable release for the correct OS/architecture, verify its published identity, and inspect downloaded bytes before executing. Identify the exact binary installation directory and overwrite effects.

Upstream documents shell and PowerShell download-and-execute installers at https://get.chezmoi.io. Do not pipe remote code into an interpreter. Do not combine installation with init --apply as an inspection step. Review the selected dotfiles repository before separately authorized initialization and application.

Private repositories need an approved SSH setup or credential helper, not tokens in repository URLs. One-shot mode can apply dotfiles and remove source, config, caches and the binary. Its cleanup effects require exact authority just as its installation effects do.

### Password manager pre-installation hook

To install a password manager or prerequisite tools before chezmoi evaluates source state during `init`, use a `read-source-state.pre` hook in `.chezmoi.$FORMAT.tmpl`.

```toml
[hooks.read-source-state.pre]
command = ".install-password-manager.sh"
```

### Non-Git VCS repositories

When using non-Git version control systems (such as Mercurial or Jujutsu), create an empty `.git` directory in the source location (`mkdir -p ~/.local/share/chezmoi/.git`) to bypass automatic Git clone behavior during initialization.

### init flags

See the flags table in [commands.md](init-commands.md).
