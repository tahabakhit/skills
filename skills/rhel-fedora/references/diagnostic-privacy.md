# Diagnostic privacy

Apply this contract before every command example in this folder. Examples name possible evidence, not a mandatory collection script or authority to mutate the host.

Tool stdout reaches the agent before its final response is written. Do not collect secrets first and promise to redact later. Avoid raw service environments, unit contents, repo URLs/config dumps, subscription identifiers, process arguments, crash memory and unrestricted journals. Even hostnames, user paths, device identifiers and addresses may be private.

Prefer narrowly selected non-sensitive properties. For example:

```sh
systemctl show unit_name --property=ActiveState,SubState,Result,FragmentPath,DropInPaths
systemctl --user show pipewire.service --property=ActiveState,SubState,Result
rpm -q package_name
```

Review path sensitivity before even these queries. Unit names and package names are placeholders, not literal targets. For session checks, request only the relevant standard desktop/session fields, never a full environment dump. To investigate a secret-valued variable, report presence/absence rather than its value.

When logs or config text are necessary, scope by unit, incident time and line count. Have an approved local redactor or trusted local reviewer produce a safe excerpt before any output reaches the agent. Selecting a journal priority does not redact its messages. If no safe extraction route is available, ask for a redacted excerpt or state the evidence gap. Do not improvise a regex and claim it removes every credential.

Keep raw evidence private, temporary and outside version control. A request to repair a machine does not authorize uploading its logs. Share or retain only the requested artifact after reviewing it. A later secret scan cannot reverse disclosure.

Mutation examples require existing authority for the exact target and stage. Explain consequences and recovery. Continue within that authority without repeated confirmation gates. Stop when scope would expand, a consequential choice is unresolved or authority is missing. Never run a reference's whole command block as a script.
