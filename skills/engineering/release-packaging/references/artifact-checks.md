# Artifact checks

Read when inspecting a specific artifact format, checking native compatibility, or testing upgrade and uninstall.

## Listing contents

| Format | List contents | Also check |
| --- | --- | --- |
| npm | `npm pack --dry-run` or `tar -tzf pkg.tgz` | `files`, `.npmignore`, `bin`, `exports` in the packed `package.json` |
| Python wheel | `unzip -l dist/*.whl` | `*.dist-info/METADATA` requirements, `entry_points.txt`; `twine check dist/*` |
| Python sdist | `tar -tzf dist/*.tar.gz` | it builds a working wheel on its own |
| Debian | `dpkg -c pkg.deb`, `dpkg -I pkg.deb` | maintainer scripts (`postinst`, `prerm`), `Depends` |
| RPM | `rpm -qlp pkg.rpm`, `rpm -qp --scripts pkg.rpm` | `Requires` (`rpm -qpR`) |
| Container | `docker image inspect`, `docker history`, `docker run --rm --entrypoint sh img -c 'ls ...'` | user, entrypoint, exposed secrets in layers |
| tar/zip binary | `tar -tzf` / `unzip -l` | permissions and symlinks with `tar -tvzf` |

Check archives for absolute paths or `../` entries before extracting anything unfamiliar.

## Native binaries

- `file <bin>` for architecture and format.
- Linux: `ldd <bin>` or `readelf -d <bin>` for needed libraries; `objdump -T <bin> | grep GLIBC_` shows the glibc symbol versions required, the highest of which is your real glibc floor. For wheels, `auditwheel show` reports the manylinux tag the binary actually satisfies.
- macOS: `otool -L <bin>` for linked libraries and `otool -l` (look for `LC_BUILD_VERSION`/`minos`) for the minimum OS. Watch for links to Homebrew paths such as `/opt/homebrew` or `/usr/local`.
- Musl (Alpine) and glibc builds are not interchangeable even on the same architecture.

## Source-tree leaks to look for

- Code that finds templates or data relative to the repository root instead of via the package's own path or resource API.
- A launcher script with a hard-coded path from the build machine.
- A runtime import of something only listed as a dev dependency.
- Version reported by the app (`--version`) disagreeing with the package metadata.

Check that the new version sorts after the previous one under the ecosystem's rules (PEP 440, semver, Debian version ordering). Prerelease and local suffixes sort in surprising ways and can stop an upgrade from happening.

## Upgrade and uninstall

1. In a disposable target, install the previous released version and create the state a real user would have: config edits, data files, a running service.
2. Install the new artifact over it. Check data and config survive, schema migrations ran once, service users and file ownership are right, and the service comes back.
3. Uninstall (and, for distro packages, purge separately). Compare what remains against what the project intends: user data and hand-edited config normally stay; generated files, service units and running processes normally go.
4. If downgrade or rollback is claimed, test it. Reinstalling old package files doesn't undo a data migration; state whether the old version can read new data and what restore path exists.

Record the artifact digest, target, commands and observed result for each step.
