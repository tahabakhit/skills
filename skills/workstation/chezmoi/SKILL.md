---
name: chezmoi
description: Find and resolve drift between a chezmoi source repository and the live machine, and add, update or retire chezmoi-managed dotfiles. Use when live config differs from dotfiles, after editing config in place, before or after pulling dotfiles changes, or when deciding whether a file should be managed. Not for configuration no dotfiles manager owns.
license: MIT
---

# Manage chezmoi dotfiles

## 1. Read the repository's rules

Run `chezmoi source-path` and read that repository's `AGENTS.md`, `README` and
contributing docs. Its rules on applying, scripts, secrets, docs and commit
gates override this skill. If the source is not the user's own, read the
config file's `hooks`, `.chezmoiexternal*` and `.chezmoiscripts` first: any
chezmoi command, `status` included, can run hooks.

## 2. Take the inventory

When asked to update or sync, run `git fetch` in the source and
`git pull --ff-only` if it is behind and clean. Never use `chezmoi update`,
which pulls and applies everything.

Run `scripts/drift.sh` (bash, jq, chezmoi). It prints the source branch and
uncommitted count, then one row per drifted target. It reads state and renders
templates. It does not apply, add, fetch or run scripts. Rerun it after every
change; it is the progress check.

## 3. Resolve each row

The class compares what chezmoi last wrote, the live file and the rendered
source. `SOURCE` is the source entry kind: `plain`, `template`, `modify`,
`encrypted`, `symlink`, `dir` or `script`.

| Class | Who moved | Resolution |
| --- | --- | --- |
| `apply` | Source only | Show `chezmoi diff <target>`. Apply only with the user's go-ahead: `chezmoi apply --exclude=scripts <target>`. |
| `re-add` | Live only | `plain`: `chezmoi re-add <target>`. Other kinds: re-add skips them, so port the live change into the source file by hand, keeping template logic. |
| `merge` | Both | Read the source side with `git log -p -- <source path>` and the live side with `chezmoi diff <target>`; that diff mixes both sides, and source commits newer than the live file's mtime are usually the source side. Write the merge into the source file. Do not run `chezmoi merge`; it opens an interactive tool. |
| `live-deleted` | Live file removed | Ask whether to restore it (`apply`) or stop managing it (`chezmoi forget <target>`). |
| `script` | Script would run on next apply | Report it. Never run scripts as part of drift work. |

`chezmoi diff` shows what apply would do: `-` lines are live, `+` lines are
the source. A `re-add` or `merge` is finished when `chezmoi diff <target>` is
empty, or shows only source changes the user still wants applied.

Before moving live content into source, check it for tokens, keys, hostnames,
display identifiers and other per-machine values. Those belong in template
data or stay unmanaged. When an application rewrites its own config on every
launch, the row will come back after each re-add. Propose a `modify_` script
that owns only the managed keys, or an ignore entry, instead of re-adding
again.

Do not paste diffs of `encrypted` entries or templates that call secret
functions. Summarize them.

## 4. Add or retire files

- Find candidate config with `chezmoi unmanaged <dir>` on a named directory,
  never on all of HOME.
- `chezmoi add <path>` after the secret check. Add `--template` when the
  content differs between machines.
- `chezmoi forget <target>` stops managing a file and leaves it live.
  `.chezmoiremove` deletes live files on the next apply; use it only when the
  user wants that deletion.

## 5. Finish

Rerun `scripts/drift.sh`. The remaining rows should be the ones the user chose
to defer. Commit in the source repository under its own gate. Report each
target with its class, what changed in source or live, and what remains.
