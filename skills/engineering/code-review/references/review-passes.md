# Review surfaces

Use inside the candidate boundary established by the code-review entrypoint. These
are behavioral surfaces to inspect, not another scope, reporting or review loop.

## Requirements and compatibility

Trace agreed behavior through real callers, supported versions and persisted/wire
formats. Compare exact error, cancellation and retry semantics where compatibility
requires them. A reviewer preference is not an unstated requirement. For deletion,
check dynamic lookup, configuration, generated registries, plugins and documented
external consumers as well as static imports; no local match does not prove unused.

## Correctness and state

Trace values across seams with concrete inputs. Enumerate consequential concurrency
orderings: can an older response overwrite newer state? Distinguish a failed write
from a lost response after durable commit before recommending retries.

Compare accepted values with downstream storage/representation limits. For money,
check units, direction, rounding and issued-record immutability against the actual
contract, without inventing financial policy. For tenancy/authorization, follow the
runtime principal through reads, writes, rejection defaults and switching; one-tenant
fixtures cannot prove isolation.

## Test evidence

Ask which credible wrong behavior an assertion rejects and whether the test reaches
the relevant production boundary. Look for correlated oracles, provider-shaped fakes,
broad rejection assertions and silently skipped cases. Direct registration, export,
rendering or type checks can prove those contracts, not unrelated behavior.

Match run identity and environment to the reviewed candidate. Source tests do not
prove generated archive contents; a successful formatter cannot prove its producer
passed. Missing execution is a limitation/proof gap, not a fabricated product defect.
For deeper evidence ranking and counterexamples, use the optional
[evidence judgment](review-judgment/guide.md) reference.

## Operational effects

Trace build/install/deploy effects, required checks and recovery when touched. A YAML
syntax pass does not prove CI trust or event behavior. Apply governing standards
without expanding into unrelated architecture cleanup. For unfamiliar security or
protocol behavior, obtain authoritative evidence or state the uncertainty; a library
name or checklist item is not an exploit proof.

The entrypoint alone owns finding shape, reconciliation, read-only boundaries and
candidate freshness after repairs.
