# Focused Linux diagnostics

Use installed-version help and the identified owner. The following is a decision
sequence, not a script to execute wholesale. Diagnosis does not authorize restart,
mounting, package installation, firewall changes or network reconfiguration.

## Services and scheduled jobs

Identify system versus user units, the execution user and the failure timestamp.
Select safe status properties and bounded unit/time journal excerpts; unit files,
drop-ins and environments may contain secrets and need local review/redaction.
Compare effective drop-ins with the authoritative source rather than editing
vendor units under /usr/lib.

Separate enablement, active state, exit result, socket activation and application
health. Inspect timers together with their target services. A successful timer
trigger does not prove the service's intended operation completed.

Check the service's identity, permissions, working directory, dependencies,
sandboxing and expected files/sockets. Use its native config validator where
available. daemon-reload reloads unit definitions; it neither restarts the
application nor validates all service configuration.

## Resource and filesystem pressure

Correlate the incident with memory pressure/OOM evidence, CPU/IO pressure, free
space and inode exhaustion. Check the affected mount/namespace and deleted-open
files when justified; do not equate disk usage with filesystem corruption.
Do not enumerate every mount or run storage probes that can hang on unavailable
devices. Bound duration and preserve incomplete results.

Do not delete caches, vacuum journals, kill processes or run filesystem repair
merely to create space. Establish the owner, retention/recovery implications and
requested authority. Offline repair needs its own filesystem-specific procedure.

## Network path, one layer at a time

Identify the failing application, destination and relevant namespace. Establish:
local link/address -> route -> DNS -> TCP/UDP reachability -> TLS -> application
response/authentication. A ping failure is not proof the service is down; a
working IP connection does not establish DNS or TLS correctness.

Use safe summaries from the installed network owner (for example NetworkManager
only where it manages that connection). Avoid full connection exports, proxy
environments, VPN profiles and packet captures in an agent transcript. Do not
send credentials to arbitrary test endpoints.

Preserve the active SSH/remote-access route before changing addresses, routes,
DNS, VPN or firewall state. Consider user versus system proxies, split DNS and
container networking without turning local triage into network architecture.

## Primary references

- [systemctl](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html)
- [journalctl](https://www.freedesktop.org/software/systemd/man/latest/journalctl.html)

Consult the installed network manager and application documentation for concrete
operations; there is no distribution-independent repair command.
