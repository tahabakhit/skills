---
name: repository-onboarding
description: "Map an unfamiliar repository before its first change or document how to work in it: instruction scope, owning code, safe setup and executable checks. Not broad architecture redesign, automatic dependency installation or a mandatory preflight for familiar tasks."
license: MIT
---

# Orient to a repository

Produce a small, evidence-backed working map for the requested task. Do not inventory
every file or turn onboarding into implementation.

1. Read applicable instruction files, contribution/setup docs and current Git status.
   Identify the repository root, nested scopes, unrelated changes and generated or
   vendored areas. Do not reset, stash, switch branches or overwrite another writer.
2. Trace one relevant entrypoint through its behavior owner, external boundary and
   tests. Use manifests, workspace declarations and real imports to find packages;
   folder names alone do not prove ownership. Record exact paths, not a guessed stack.
3. Derive the runtime, package-manager and toolchain versions from tracked declarations
   and CI. Separate documented commands from commands verified on this checkout.
   Reconcile disagreement rather than silently choosing the newest version.
4. Inspect setup and test scripts before running them. Identify lifecycle hooks,
   network access, credentials, destructive migrations and external services. Prefer
   existing dependencies and isolated fixtures. Ask for required authority before
   installing tools, changing the host or touching shared data.
5. Run the cheapest safe relevant baseline check when authorized. A failing baseline
   is useful evidence: record command, revision, environment and failure without
   weakening assertions or repairing unrelated code. Missing services are not passes.
6. Hand back the behavior owner, applicable instructions, setup prerequisites,
   focused/full checks and known gaps. Distinguish source facts from inference and
   unexecuted documentation. Recommend the next task-specific owner, not every skill.

Keep reusable repository facts in the project's existing contributor documentation
or scoped instructions only when requested. Keep temporary investigation state in
its established notes location. Never put credentials or private machine state in a
shared onboarding guide. Finish once another contributor can locate the owner and
run the relevant checks without repeating this exploration.
