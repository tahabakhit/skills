# Optional platform boundaries

These examples identify native evidence sources. They are not a universal repair script. Use installed-version help, the machine's actual configuration and official vendor documentation to choose exact flags and procedures. Do not install a command because it appears here.

## Shared Linux evidence

- `/etc/os-release` identifies the userland distribution. Check whether the shell is inside a container or other namespace before attributing it to the host.
- `systemctl` and `journalctl` apply where systemd manages the affected unit. Distinguish user and system units. Scope logs to the unit and relevant time interval. Avoid copying environment values or unfiltered unit contents that can include secrets.
- `findmnt`, `df`, `lsblk` and filesystem-native status tools answer different questions. Mount success does not prove free space, healthy media or boot recoverability.
- `ip` and `ss` can establish local interface/route/socket state. They do not by themselves prove DNS, external reachability or application authentication. NetworkManager's `nmcli` applies only when it owns that connection.
- Native exit status, unavailable capability and permission denial should remain distinct fields in evidence. Do not convert all failures into a healthy summary.

## Arch and derivative systems

Package investigation uses the installed pacman database and transaction log. Package preparation uses the actual PKGBUILD/build environment and source verification. Transaction recovery requires the selected kernel, initramfs generator, bootloader and mounted boot layout, not a memorized generic boot recipe.

An Arch-based system can add repositories and tooling with separate support policies. Confirm which component comes from CachyOS before choosing chwd, optimized kernels or scheduling guidance. Neither a distro label nor a nearby skill grants permission to change those components.

Primary documentation leads:

- https://wiki.archlinux.org/title/System_maintenance
- https://wiki.archlinux.org/title/Pacman
- https://wiki.cachyos.org/

## Fedora/RHEL and image deployments

On mutable RPM systems, `rpm` and the installed `dnf` version can identify package ownership and transaction evidence. Image deployments may use `rpm-ostree` or `bootc`; they are not interchangeable with a normal dnf host upgrade. Confirm the installed deployment model before prescribing a change.

For SELinux, inspect relevant denial evidence, expected labels, process domain and intended access. A missing policy exception, wrong label and unauthorized application behavior are different causes. Do not treat disabling enforcement as diagnostic proof of a correct repair.

Primary documentation leads:

- https://docs.fedoraproject.org/
- https://docs.redhat.com/
- https://www.freedesktop.org/software/systemd/man/latest/systemctl.html
- https://www.freedesktop.org/software/systemd/man/latest/journalctl.html

Documentation links are runtime research entry points. Their current pages and every distro version were not verified by this draft. Use matching product/version docs for concrete operations.

## Specialists remain capabilities

This general workflow does not supply an Arch failed-upgrade recipe, a Fedora image rollback contract, SELinux policy expertise, backup tooling, storage repair, an SSH recovery console, or tested package-build isolation. Use available scoped specialist guidance when needed. If the consequence cannot be evaluated with the available knowledge/access, stop that action with a named gap rather than claim equivalent expertise.
