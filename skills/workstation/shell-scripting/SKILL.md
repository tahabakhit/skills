---
name: shell-scripting
description: Write, review, test, or port POSIX sh, Bash, and Zsh scripts and startup files across Linux and macOS. Use for shell semantics, GNU/BSD differences, safe subprocess handling, and isolated tests; not general host administration or automatic shell activation.
license: MIT
compatibility: Linux and macOS with the intended shells installed. Linters and test tools are optional capabilities, not permission to install them.
---

# Shell scripting

Identify the target shell from the request, startup filename and environment.
Use that shell's syntax for interactive examples and startup/functions: Bash for
.bashrc, Zsh for .zshrc, and the declared target for other files. The user's current
login shell does not override a script's shebang or repository interpreter contract.

Identify the file's owner, interpreter and minimum supported versions before
editing. The interactive login shell does not determine a script's interpreter.
Keep the repository's declared shell contract; do not turn sh into Bash or replace
a login shell merely for convenience. Read repository instructions and tests.

## Choose the right lane

- For portable scripts, use the actual supported sh baseline, not Bash syntax
  behind a sh shebang. Prefer a small sh/jq program when it meets the task.
- For an existing Bash program, establish its minimum version. macOS's system
  Bash may be 3.2; Bash 4+ features need an explicit runtime dependency.
- For Zsh startup or functions, use Zsh semantics. Never test a Bash file by
  sourcing it into Zsh, or vice versa.
- If structured parsing, concurrency, or cleanup is becoming fragile, use the
  repository's existing language or propose a small Go/Rust tool.

Read [portability and failure handling](references/portability.md) for pipelines,
quoting, temporary files, GNU/BSD tools and startup modes.

## Preserve failures and boundaries

Quote data expansions, pass arguments as distinct words, and avoid eval or
interpolated command strings. Do not parse filenames with ls or assume a newline
is a safe filename delimiter. Prefer structured output and jq for JSON.

Choose error handling deliberately. set -e is context-dependent, not exception
handling. Check critical commands explicitly and preserve the producer's status
instead of reporting only tee, grep or a final formatter. Distinguish a legitimate
negative result from a command failure.

Do not execute an unreviewed script to discover its behavior. Sourcing is execution.
Avoid set -x around credentials; inherited environments and startup files can
leak secrets or trigger live tools even during a test.

## Validate in isolation

1. Add a regression fixture for the actual failure before changing production code
   when feasible. Cover spaces, empty inputs, leading dashes and failed subprocesses.
2. Parse with the intended interpreter's syntax-check mode; syntax checks are not
   behavioral tests. Run ShellCheck for sh/Bash and the repository's formatter.
   ShellCheck does not validate Zsh; use Zsh's parser and focused behavior tests.
3. Run only reviewed fixtures with private HOME/XDG/config/temp/state roots,
   controlled PATH and mocked package managers, network tools and service commands.
   Remove inherited tokens and agent sockets. HOME redirection alone is not a sandbox.
4. Exercise each declared shell/OS lane available. Report an unavailable macOS,
   BSD-tool or older-Bash lane as untested, not passed.
5. For startup changes, distinguish noninteractive, login, interactive and
   interactive-login behavior. Use a disposable terminal/PTY where needed; check
   stdout, stderr, exit status, PATH ordering and repeat initialization.

Do not install dependencies, source live startup files, activate a shell, change
an account, or apply dotfiles as a test without authority for that exact operation.
Use chezmoi guidance for managed deployment, not direct edits to generated copies.

Return the interpreter/version contract, changed source, regression evidence,
test matrix and remaining target-runtime gaps.
