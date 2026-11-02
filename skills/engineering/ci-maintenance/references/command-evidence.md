# Command and environment evidence

## Preserve the producer result

A test command piped through a formatter or log collector can fail while the final process succeeds. Preserve both statuses using mechanisms appropriate to the actual execution shell, or run the producer into an owned temporary output file and capture its exit status before rendering it. Do not assume one shell's pipeline-status variables exist in another.

Define the result policy explicitly. A failing producer cannot become a passing test because the renderer succeeded. If rendering is itself required, its failure also needs an appropriate non-pass. Keep logs available on failure.

Exercise the wrapper with controlled commands:

| Producer | Renderer | Expected |
| --- | --- | --- |
| Exit 0 | Exit 0 | Success |
| Exit 7 | Exit 0 | Non-pass preserving producer failure |
| Exit 0 | Exit 9 | Non-pass when rendering is required |
| Exit 7 | Exit 9 | Non-pass with both causes visible |
| Cancelled or timed out | Any | No test-pass claim |

Also check missing result files and partial output. A report generator should not fabricate an empty passing suite when collection failed.

## Reproduce the environment contract

Identify runtime/compiler versions, package-manager version, lockfile mode, service versions, external tools and setup commands that affect execution. Verify declared setup in a clean supported environment. Do not rely on a warm cache, globally installed CLI or a service left by another job.

Allocate ports and mutable service state per concurrent job. Record process ownership so cleanup stops only what the job started. A worktree alone cannot isolate a shared database or listening port.

Make setup and teardown failures visible. The application test may never have run when seed, migration or browser installation failed. Classify that as unavailable or failed setup rather than a product pass. Keep the original test error if teardown also fails.

## Measure optimization

Use comparable revisions/workloads and separate queue delay, setup, execution and artifact/report overhead. Inspect the critical path. More shards can increase setup cost or overwhelm shared services. Cache changes can make a broken dependency declaration appear healthy.

Compare before and after with enough observations to expose variance. Preserve correctness checks when optimizing. A faster lane that skips required behavior is a coverage reduction, not a speed improvement.

## Evidence receipt

Record the command, working directory, tested revision, relevant runtime versions, start/end status and observed result. Record output/artifact identity when later stages consume it. Keep observation time distinct from report creation.

State which environment/event combinations remain untested. A successful local setup is useful evidence, but it cannot establish a different hosted runner's privileges, architecture or provider event semantics.
