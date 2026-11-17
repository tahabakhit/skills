- Layout is `skills/<bundle>/<name>/SKILL.md`, with optional `references/`. A bundle is
  one Claude/Codex plugin; Pi loads every skill through the `pi` manifest in
  `package.json`.
- Adding, removing or renaming a skill means updating `.claude-plugin/marketplace.json`
  and the README table in the same change.
- Every skill here is original and owned by this repo. Don't import or paste
  third-party skill text; write it fresh.
- Write skills with the `skill-authoring` skill in this repo.
- Nothing here is published to npm; native package managers own installs.
