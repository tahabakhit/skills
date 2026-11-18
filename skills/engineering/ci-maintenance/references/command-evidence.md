# Command evidence

Read when writing or changing a test wrapper, log collector, reporter, setup step or Make target that CI depends on.

## Keep the producer's exit status

A test command piped into a formatter, `tee` or a report generator can fail while the pipeline succeeds.

- Bash `set -o pipefail` returns the status of the rightmost failing stage, not necessarily the test command's. If you need each stage's status, read `PIPESTATUS` immediately after the pipeline, before any other command, and remember `set -e` may exit first.
- `PIPESTATUS` is Bash-only (Zsh has `pipestatus`; POSIX sh has neither). Check which shell actually runs the step.
- Simpler and portable: write the producer's output to a file, capture `$?`, then render the file.
- Make runs each recipe line in its own shell. Keep the option and the pipeline on one line (or use `.ONESHELL` deliberately); don't change every recipe's semantics to fix one.

Decide the result policy explicitly and test the wrapper against it with stub commands:

| Producer | Renderer | Expected |
| --- | --- | --- |
| exit 0 | exit 0 | pass |
| exit 7 | exit 0 | fail, producer's status visible |
| exit 0 | exit 9 | fail if the report is required |
| exit 7 | exit 9 | fail, both causes visible |
| killed or timed out | any | no pass |

Also feed it a missing results file and truncated output. A JUnit or coverage reporter that finds no results must not publish an empty passing suite.

## Setup and teardown

If seeding, migrations, browser installation or service start fails, the tests never ran. Report that as a setup failure, not a test pass. If teardown also fails, keep the original test error as the headline.

Give each concurrent job its own ports, database and writable state, and stop only processes the job started. A separate worktree does not isolate a shared database or a listening port.

Wait for real readiness (a query succeeds, the app answers with the expected response) with a deadline, not a fixed `sleep` or an open port.

## Measuring speed changes

Compare the same workload on comparable revisions, with several runs to see variance. Split queue time, setup, execution and artifact upload. Cache changes can hide a missing dependency declaration: confirm a cold run still passes.
