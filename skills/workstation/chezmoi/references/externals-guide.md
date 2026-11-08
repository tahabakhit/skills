> Read the [safety gate](safety-workflow.md) first. Imported examples are documentation only, not permission to execute. Confirm syntax with actual local --help. Dry-run and previews can execute hooks, templates, tools or downloads.

When you need schema declarations, parameter options, or caching rules, follow the topic links below.

## External dependency types

chezmoi supports importing third-party resources into the target state using `.chezmoiexternal.$FORMAT` files:

- `file`: Download single files or single compressed files.
- `archive`: Extract directory trees from tarballs or zip archives.
- `archive-file`: Extract single files from zip or tarball archives.
- `git-repo`: Clone or update git repositories into managed paths.

## Reference guides

- [declarations.md](externals-declarations.md): Comprehensive guide for `.chezmoiexternal.$FORMAT` schemas (`file`, `archive`, `archive-file`, `git-repo`), field parameters (`exact`, `refreshPeriod`, `stripComponents`, `checksum`, `include`, `exclude`), and refresh/caching mechanisms.

## Related skills

- Consult [file-attributes guide](file-attributes-guide.md) for attribute prefix handling in extracted paths.
- Consult [cli-commands guide](cli-commands-guide.md) for applying externals with `chezmoi apply --refresh-externals`.
- Consult [templating guide](templating-guide.md) for template expansion inside `.chezmoiexternal.$FORMAT.tmpl`.
