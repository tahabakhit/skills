> Read the [safety gate](safety-workflow.md) first. Imported examples are documentation only, not permission to execute. Confirm syntax with actual local --help. Dry-run and previews can execute hooks, templates, tools or downloads.

When you need complete variable tables, prompt signatures, Sprig function lists, or fragment patterns, follow the topic links below.

## Template fundamentals

Source files ending with `.tmpl` are processed using Go `text/template` syntax prior to target application.
The `.tmpl` extension is stripped from the final target path.

```gotmpl
{{ .chezmoi.os }}                         output a value
{{ if eq .chezmoi.os "darwin" }}...{{ end }}   conditional evaluation
{{ range .myList }}{{ . }}{{ end }}       list iteration
{{- ... -}}                               trim surrounding whitespace
{{ "value" | upper }}                     pipe through template function
```

## Previewing and testing templates

- Preview rendered output from stdin: `chezmoi execute-template < dot_gitconfig.tmpl`.
- View rendered target file content: `chezmoi cat ~/.gitconfig`.
- Inspect all available template variables: `chezmoi data`.

## Reference guides

- [built-in-variables.md](templating-built-in-variables.md): Built-in `.chezmoi.*` variables (OS, architecture, hostname, directories, kernel).
- [sprig-functions.md](templating-sprig-functions.md): Sprig functions and chezmoi-specific functions (`output`, `include`, `joinPath`, `lookPath`).
- [prompt-functions.md](templating-prompt-functions.md): Interactive prompt functions for config templates (`promptString`, `promptBool`, `promptInt`, `promptChoice`).
- [shared-template-fragments.md](templating-shared-template-fragments.md): Reusable template components stored under `.chezmoitemplates/`.

## Related skills

- Consult [machine-config guide](machine-config-guide.md) for OS, WSL, and distribution branching patterns.
- Consult [secrets-management guide](secrets-management-guide.md) for password manager template functions.
- Consult [configuration guide](configuration-guide.md) for template data injection via `[data]` or `.chezmoidata`.
