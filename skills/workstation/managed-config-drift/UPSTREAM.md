# Source and changes

Adapted from `bolens/agent-skills` at `e7c49bfa5b71c3bf3ebf97f090aab78842b0e63d`, folder `managed-config-drift`. The audited installed input matched that revision. The comparator is preserved unchanged, not rewritten in this repository's implementation language. Its optional Python runtime and unbounded hashing/traversal are documented in the entrypoint.

The entrypoint now covers Linux/macOS ownership, preference formats and filesystem
name/metadata limits. The Python comparator remains unchanged; Linux-only fixture
results do not establish macOS runtime acceptance.

Complete project and Bolens MIT notices ship here. Updates are reviewed manually.
