> Read the [safety gate](safety-workflow.md) first. Imported examples are documentation only, not permission to execute. Confirm syntax with actual local --help. Dry-run and previews can execute hooks, templates, tools or downloads.

When you need detailed syntax examples, full function signatures, or backend configurations, follow the topic links below.

## Approaches to secrets

chezmoi supports two strategies for secrets in dotfiles:

1. **Template functions** — fetch secrets dynamically at apply time from a password manager or secret store.
2. **Encrypted files** — store secrets encrypted in the source repository using `age` or `gpg`.

Use template functions when credentials rotate frequently or are managed centrally.
Use encrypted files when credentials need to be stored directly in the repository.

## Secret templates in config

Password manager functions can be used directly in `chezmoi.toml.tmpl`:

```toml
[data]
  gitSigningKey = {{ onepasswordRead "op://vault/GPG Key/public key" | quote }}
```

## Best practices

- Store the `age` identity or `gpg` private key outside the source repository.
- Rotate secrets in the password manager rather than modifying chezmoi templates.
- Consult [password-managers.md](secrets-management-password-managers.md) for 1Password, Bitwarden, Vault, and KeePassXC function signatures and examples.
- Consult [secret-providers.md](secrets-management-secret-providers.md) for pass, gopass, OS keyring, generic CLI tools, and cloud secret functions.
- Consult [encryption.md](secrets-management-encryption.md) for `age` and `gpg` setup guides and naming patterns.
