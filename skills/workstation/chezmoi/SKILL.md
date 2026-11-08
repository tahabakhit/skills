---
name: chezmoi
description: Inspect, configure, and make authorized scoped changes to chezmoi-managed dotfiles. Use for source and target mapping, CLI commands, templates, machine data, attributes, scripts, externals, secrets, initialization, and persistent state. Keep diagnosis read-only unless mutation of named paths or state is authorized.
license: MIT
---

# Manage chezmoi dotfiles

Read the [safety gate](references/safety-workflow.md) before any command or edit. Reference examples are documentation, not instructions to execute. Do not run source scripts or bootstrap examples automatically.

## Route by topic

Read the matching guide, then only the linked details needed for the task. All resources are local to this skill.

| Task | Guide |
| --- | --- |
| CLI usage, status, diff, source/target mapping, add, apply, merge, state | [CLI commands](references/cli-commands-guide.md) |
| Source/destination/config paths, tools, hooks, Git, interpreters | [Configuration](references/configuration-guide.md) |
| External files, archives, repositories, checksums and refresh | [Externals](references/externals-guide.md) |
| Prefixes, permissions, symlinks, exact/remove behavior, root directives | [File attributes](references/file-attributes-guide.md) |
| Bootstrap, repository clone, config generation and installation | [Initialization](references/init-guide.md) |
| OS/hostname/WSL conditions, per-machine data, conditional ignores | [Machine configuration](references/machine-config-guide.md) |
| run/once/onchange/before/after scripts and execution history | [Scripts](references/scripts-guide.md) |
| Password managers, secret providers, age/GPG encryption | [Secrets](references/secrets-management-guide.md) |
| Go templates, variables, Sprig, prompts and shared fragments | [Templating](references/templating-guide.md) |

## Work within the request

1. Record installed version and read actual local `chezmoi --help` and `chezmoi <command> --help` in an isolated context first. Never invent CLI flags from memory or assume this snapshot matches the installed version.
2. Distinguish source state, computed target state, live destination, configuration, and persistent state. Resolve effective paths, symlinks, ownership, and requested direction before comparison or mutation.
3. For diagnosis, inspect raw files first. Templates, hooks, external downloads, configured tools and secret providers can have effects even in previews or dry-run. Apply the safety gate before computing state.
4. For authorized mutation, name exact paths or state keys and expected effects, preserve recoverable prior state, and use the narrowest verified operation. Do not run broad apply/update/init/reset or persistent-state purge without exact scope and authority.
5. Verify only the approved scope. Report command exit status, redacted observations, and failed or unavailable evidence. A failed check is not proof of no drift or no secrets.

Return the source/target/config/state map, proposed or completed changes, checks and their limits. These instructions and static content tests do not establish behavioral efficacy.

## Attribution

Adapted from nine skills in [mkobit/chezmoi-skills](https://github.com/mkobit/chezmoi-skills) at `093b6c4ee156d53f6d74257f39b76d22cf9180fc`. The complete upstream MIT license is in [LICENSE](LICENSE). New local contributions carry the MIT notice in [LICENSE.local](LICENSE.local).
