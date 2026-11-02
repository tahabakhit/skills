# Upstream and local scope

Maintained fork of [https://github.com/bolens/agent-skills](https://github.com/bolens/agent-skills/tree/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d/skills/verify-and-stop)
at `e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d`, directory `skills/verify-and-stop`.
Updates are manual and reviewed; there is no automatic download or update hook.

## Attribution

The immediate source records this audited Caveman revision. Only the MIT skill payload is included, not Engine-linked BSL code. The original LICENSE, including its split-license scope note, is unchanged.

The Julius Brussee material is MIT-licensed. Its reviewed source is
[https://github.com/JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman/tree/3b74643f4d910f496babd4e634b1ba7168816f14/skills/verify-and-stop)
at `3b74643f4d910f496babd4e634b1ba7168816f14`. This is the source-recorded audited revision.
Keep the complete [ancestor license](LICENSE) and
[Bolens license](LICENSE-BOLENS)
for its material and modifications. These files and this fork are not endorsed
by their upstream authors.

## Local adaptations

- Make delivery follow-through optional without changing validation-only scope. In the consolidated catalog, use `deliver-work` when available and already within the requested endpoint.
- Preserve candidate-bound proof, non-vacuous checks, and existing action authority.
- Regroup the complete folder under `skills/core/verify-and-stop`; leave pinned upstream inputs and license notices unchanged.
- Generalize verification to documents, event plans and analysis, with repository, test and runtime directions conditional on the claim. Add non-code acceptance examples without extra gates; reuse valid proof and return to one active coordinator.

The self-contained [provenance record](PROVENANCE.json) lists original source
paths and digests, ancestor evidence, adaptations, and the imported file set.
Required references ship inside this folder. Optional specialists do not grant
additional capability or action authority. No live installation is transferred
by this source import.
