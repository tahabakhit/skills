- Layout is `skills/<bundle>/<name>/SKILL.md`, with optional `references/`. A bundle is
  one Claude/Codex plugin; Pi loads every skill through the `pi` manifest in
  `package.json`.
- Adding, removing or renaming a skill means updating `.claude-plugin/marketplace.json`
  and the README table in the same change.
- Run `scripts/check.sh` and `claude plugin validate .` before committing.
- Skills adapted from another project keep that project's `LICENSE` and an
  `UPSTREAM.md` naming the source and commit. Never drop them when rewriting.
- Write skills with the `skill-authoring` skill in this repo.
- Nothing here is published to npm; native package managers own installs.
