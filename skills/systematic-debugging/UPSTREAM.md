# Upstream and local scope

Maintained fork of [https://github.com/bolens/agent-skills](https://github.com/bolens/agent-skills/tree/e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d/skills/systematic-debugging)
at `e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d`, directory `skills/systematic-debugging`.
Updates are manual and reviewed; there is no automatic download or update hook.

## Attribution

Eight original files match this historical comparison exactly. Root-cause tracing is also derived from it. Bolens rewrote the entrypoint and polluter helper. The source's whole-folder local-original label is incomplete. The historical import revision is unknown.

The Jesse Vincent material is MIT-licensed. Its reviewed source is
[https://github.com/obra/superpowers](https://github.com/obra/superpowers/tree/f2cbfbefebbfef77321e4c9abc9e949826bea9d7/skills/systematic-debugging)
at `f2cbfbefebbfef77321e4c9abc9e949826bea9d7`. This is an audited content comparison, not an asserted historical import revision.
Keep the complete [ancestor license](LICENSE-SUPERPOWERS) and
[Bolens license](LICENSE)
for its material and modifications. These files and this fork are not endorsed
by their upstream authors.

## Local adaptations

- Vendor three CI support references and localize required links.
- Mark PR, fleet, NixOS, Git, TDD and publication-audit specialists optional; do not auto-install them.
- Document helper prerequisites and non-sandboxed test execution.
- Retain historical prompts and example outcome claims as data, not instructions or local evaluation results.
- Preserve diagnostic producer status and privacy; omit the unsafe prefix-only containment example.

The self-contained [provenance record](PROVENANCE.json) lists original source
paths and digests, ancestor evidence, adaptations, and the imported file set.
Required references ship inside this folder. Optional specialists do not grant
additional capability or action authority. No live installation is transferred
by this source import.
