# Development environments and setup

Read when a failure differs between laptops and CI, or when you are adding or fixing mise, devenv/Nix, a devcontainer, an env-file template, a bootstrap script, or local services that several checkouts run at once.

The goal is that a developer and a CI runner execute the same commands with the same tool versions. Stick with the tooling the project has; switching managers is its own project.

## Find where each version comes from

Before changing anything, list every place a tool version is declared: `.tool-versions`, `mise.toml`, `.nvmrc`, `package.json` `engines`/`packageManager`, `rust-toolchain.toml`, `go.mod`, Dockerfiles, devcontainer Features, Nix inputs, and versions hard-coded in CI setup steps. Drift usually comes from two of these disagreeing. Reduce to one source where you can and make CI read from it rather than repeat it.

Also check what your dependency updater watches. An updater configured for npm and GitHub Actions won't bump a version in `mise.toml`, a Nix flake or a devcontainer image unless configured to.

## Tool notes

**mise.** Run CI commands through `mise exec -- <cmd>` or a mise task so they use the project's pinned tools; shell activation is for interactive shells. If the repo commits a mise lockfile, make CI install from it strictly and confirm it covers every OS/arch you run on. Look up current flags in the [mise CI docs](https://mise.jdx.dev/continuous-integration.html) rather than guessing.

**devenv / Nix.** Pin inputs and review the lock diff when updating. `devenv test` may start the project's declared services, so read what it launches and how it cleans up. Make the test hook run the real test command.

**NixOS VM tests.** Only worth it when the behaviour depends on the OS itself (systemd units, users, firewall). They need KVM or a capable builder; if that's missing, say so instead of weakening assertions. A VM image that builds hasn't tested anything until a test drives the running guest. Never switch the developer's own machine to a test configuration.

**Devcontainers.** The real definition may be spread across `devcontainer.json`, a Dockerfile or Compose file, Features and lifecycle commands. `initializeCommand` runs on the host. To validate, build the container and run the project's checks inside it; a successful image build says nothing about `postCreateCommand`. Avoid mounting the whole home directory, `--privileged`, the Docker socket, or secrets baked into layers. Don't push images from fork-triggered CI.

## Env files and config templates

- Keep a single list of config keys (often `.env.example` or a typed schema in the app). For each key note what it's for, whether it's required, its format, and whether it's secret. Secret keys get a placeholder, never a working value.
- Check what actually loads env files and in what order: the shell, mise/devenv, Compose and the application can each load their own. In Compose, the `.env` beside the compose file is used for `${VAR}` substitution in the YAML; the container only sees variables passed through `environment:` or `env_file:`.
- Setup scripts must create `.env` only if it's missing; never overwrite a developer's file.
- Error messages and diagnostics name missing or invalid keys, never print values. Don't paste `docker compose config` output when real secrets are loaded.

## Bootstrap and doctor scripts

A bootstrap script installs locked dependencies and creates missing local state, and is safe to run twice. Keep upgrades, starting services and wiping data as separate commands. A doctor script only reads: it reports what's missing and the exact command to fix it, exits non-zero for blockers, and treats optional extras as warnings. Test both from a clean checkout, a second run, and with one prerequisite removed.

## Several checkouts at once

Worktrees and parallel CI jobs share the machine's ports, databases, Docker resources and caches. Give each checkout a unique name (not just the branch slug, which can collide) and use it for the Compose project name, database name and temp directories. Hard-coded `container_name` or external volumes defeat this. Let services bind port 0 or a runtime-assigned port and pass the actual address to tests. Cleanup stops only what that checkout started.

## Generated files

If CI checks that generated code or docs are up to date, regenerate into a scratch directory or use the generator's check mode, then compare including new and deleted files (plain `git diff` ignores untracked output). Pin the generator version so local and CI output match.
