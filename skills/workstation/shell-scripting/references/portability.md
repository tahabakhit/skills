# Portability and failure handling

## Establish the real baseline

POSIX.1-2024 added pipefail, but deployed sh implementations and older baselines
may not support it. Do not label it universally non-POSIX or assume it works
everywhere. Use the declared baseline and actual interpreter help/tests. When
producer status matters on older sh, avoid the pipeline or explicitly record
each stage's status in private temporary files; do not silently drop failures.

Bash arrays, [[ tests, process substitution and the Bash PIPESTATUS array do not
belong in a script targeting older portable sh. Zsh has different array,
word-splitting and glob behavior. Interpreter choice is part of the API.

For set -e, examine conditional calls, AND/OR lists, functions, substitutions and
pipelines. Do not hide expected failures with a global "|| true". Capture a
failing status in an else branch before another command overwrites it.

## Files, processes and cleanup

- Pass untrusted input as data, never shell source. Use -- where supported; for
  portable tools without it, normalize leading-dash operands appropriately.
- Do not build argument lists by joining strings. Bash/Zsh arrays or distinct
  positional parameters preserve argument boundaries.
- Create temporary directories privately with the installed mktemp interface.
  Track exactly which paths the script owns before installing cleanup traps.
- Preserve the original exit status through cleanup. Keep traps safe under
  partial initialization and cancellation; never remove user-selected directories.
- An external timeout is not universal on macOS. If required, declare an existing
  runtime capability or use a reviewed supervisor, not an incidental installation.
- Test cancellation and failed subprocesses, not just the happy path. A timeout,
  denied access or missing tool is incomplete evidence.

## GNU and BSD utilities

Check the installed interface before selecting flags for sed -i, stat, date,
readlink, find, xargs and timeout. Do not assume GNU long options or BSD syntax
based only on the current development machine. Avoid in-place edits when writing
a separate validated candidate is safer. NUL-delimited paths need support at both
ends of the pipeline. LC_ALL=C can stabilize byte-oriented parsing but is not a
universal fix for Unicode requirements.

## Startup is a separate execution contract

Zsh normally reads the zshenv layer for all invocations, zprofile for login
shells, zshrc for interactive shells and zlogin for login shells; global paths
depend on the installation, and RCS/GLOBAL_RCS and ZDOTDIR affect discovery.
Keep noninteractive startup quiet and minimal. Guard terminal-only behavior;
do not assume a GUI application, SSH command, CI job and terminal inherit the
same environment. Repeated startup should not duplicate PATH entries or hooks.

## Primary references

- [POSIX shell language](https://pubs.opengroup.org/onlinepubs/9799919799/utilities/V3_chap02.html)
- [ShellCheck shell-option compatibility](https://www.shellcheck.net/wiki/SC3040)
- [Zsh startup files](https://zsh.sourceforge.io/Doc/Release/Files.html)

These are reference leads, not a guarantee of features in an installed version.
