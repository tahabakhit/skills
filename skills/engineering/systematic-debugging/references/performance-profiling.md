# Diagnose a performance problem

Use for a slow path, performance regression, memory growth or an explicitly requested optimization. An ordinary correctness bug does not need a profiling campaign. Keep the debugging skill's diagnosis/fix boundary; this reference adds measurement technique, not a second workflow.

## Establish a useful baseline

Choose the affected operation and outcome: elapsed time, tail latency, throughput, peak memory or retained memory. Record the candidate, runtime/build, input size and distribution, concurrency, hardware and cache state. Use a representative local fixture before exercising a shared service. Set a duration, load ceiling and stop condition for load tests; check whether requests create data, send messages or incur charges.

Separate startup from steady state and cold from warm caches. Repeat comparable runs and retain individual results. For request latency, record failures and timeouts as well as successful responses; a faster run that rejects more work is not an improvement. Do not average regional or per-run p95 values into a global p95. Small samples cannot establish reliable tail latency.

## Choose the evidence

| Symptom | Useful next evidence | Common misreading |
| --- | --- | --- |
| High CPU during slow work | CPU samples and hot call stacks | The hottest function is not necessarily avoidable work |
| Slow requests with low CPU | Request spans, query time, queue depth, connection waits | A CPU flamegraph does not account for all waiting time |
| Memory grows across repeated work | Heap/retention comparisons after comparable lifecycle and GC points | High RSS or temporary allocation alone does not prove a leak |
| Throughput flattens as concurrency rises | Queueing, saturation, errors, lock contention | More workers can worsen contention |

Trace the expensive work to its caller and input. Form a prediction before changing it: for example, batching lookups should reduce query count without changing results. A profile locates costs; it does not prove correctness or identify a universal single bottleneck.

## Use existing tools first

Check the installed runtime's flags and the project's profiling setup. These examples execute the target program or tests and write artifacts; inspect their effects first. No package downloads, privilege changes or production attachment are implied.

- **Node.js:** built-in `--cpu-prof` for CPU samples. Heap snapshots and inspector sessions need separate handling; they can pause work, expose data or add significant memory overhead. Do not expose an inspector publicly.
- **Python:** `cProfile` for deterministic call timing. Use `tracemalloc` snapshots for Python allocation traces; it does not account for every native allocation. Sampling profilers such as py-spy are options only if already available and attachment is authorized; overhead is not zero.
- **Go:** existing benchmarks with `-benchmem`, `-cpuprofile` and `-memprofile`; inspect profiles with `go tool pprof`. Do not add a network pprof endpoint merely to obtain a profile. Blocking/scheduling problems may need block profiles or execution traces.
- **Rust:** existing release-mode benchmarks; installed perf or cargo-flamegraph where supported. Retain symbols when needed to interpret stacks. An unoptimized debug build is not a release baseline.
- **BEAM/Elixir:** existing Telemetry events for request-level timing, then scoped `:eprof`/`:fprof` or installed sampling tools when needed. Tracing all processes can disrupt a busy system.

For an inspected, finite local program, these Zsh-compatible examples keep output outside the checkout:

```sh
profile_dir=$(mktemp -d)
node --cpu-prof --cpu-prof-dir="$profile_dir" --cpu-prof-name=cpu.cpuprofile ./bench.mjs
python3 -m cProfile -o "$profile_dir/python.prof" ./bench.py
```

`bench.mjs` and `bench.py` are project-specific placeholders, not provided helpers. Profiles can contain paths, function names and sensitive runtime information; retain or share them only under the task's data policy. See the [Node CPU profiler](https://nodejs.org/api/cli.html#--cpu-prof), [Python profiling](https://docs.python.org/3.14/library/profile.html) and [Go test flags](https://pkg.go.dev/cmd/go#hdr-Testing_flags) for version-specific details.

## Compare the candidate

When optimization is authorized, change one relevant factor and rerun the same workload. Alternate baseline/candidate runs when drift matters. Report the metric, units, individual results or spread, correctness checks and workload limits. Keep a change only when its benefit or required resource bound justifies its complexity. If results overlap the observed noise, say the improvement is unproven rather than assigning a precise speedup. Do not undo another writer's work to restore a baseline.

Adapted from DROO's performance-profiler references; pinned inputs and changes are in `../PROVENANCE.json`, with the full notice in `../LICENSE-DROO`.
