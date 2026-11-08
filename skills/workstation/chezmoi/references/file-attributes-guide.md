> Read the [safety gate](safety-workflow.md) first. Imported examples are documentation only, not permission to execute. Confirm syntax with actual local --help. Dry-run and previews can execute hooks, templates, tools or downloads.

When you need complete attribute tables or root control directive rules, follow the topic links below.

## Target entry attributes

chezmoi encodes permissions, target types, and management behavior into source file and directory name prefixes:

- Target attributes (`dot_`, `private_`, `executable_`, `exact_`, `readonly_`, `empty_`, `symlink_`, `create_`, `modify_`, `remove_`).
- Prefixes compose left to right: `private_dot_ssh/encrypted_private_id_ed25519.age`.

## Root control files

Special control files at the root of the source state configure scope, deletion, and minimum version constraints:

- `.chezmoiroot`: Re-root the target state calculation to a subdirectory.
- `.chezmoiremove`: Define patterns for files to remove during apply.
- `.chezmoiversion`: Enforce a minimum chezmoi version requirement.

## Reference guides

- [attributes.md](file-attributes-attributes.md): Complete attribute prefix table, allowed combinations by target type, and path composition examples.
- [directives.md](file-attributes-directives.md): Root control directives (`.chezmoiroot`, `.chezmoiremove`, `.chezmoiversion`).

## Related skills

- Consult [cli-commands guide](cli-commands-guide.md) for `chezmoi add`, `chezmoi forget`, and `chezmoi destroy`.
- Consult [externals guide](externals-guide.md) for external file, archive, and git repository imports.
- Consult [secrets-management guide](secrets-management-guide.md) for `encrypted_` prefix workflows.
