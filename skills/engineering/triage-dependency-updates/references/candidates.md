# Assess an update candidate

## Inventory four states

Record declared constraints, resolved lockfile versions, locally installed versions and versions actually bundled or loaded at runtime. Differences have different remedies. Reinstalling committed resolution may fix a stale development environment without changing the repository.

Include build tools, CI actions, container base images and runtime downloads when the request covers them. A top-level dependency list alone misses executable transitive or lifecycle behavior. Keep the inventory scoped to the requested surface.

## Establish availability and reason

Resolve an exact candidate from the ecosystem's authoritative registry or source. Record the evidence date and channel. Distinguish a release announcement from a retrievable artifact. For private sources, use existing authorized access without exposing credentials.

For security updates, check advisory identity, affected/fixed ranges and exploit preconditions. Trace the package to its use in build and runtime. A vulnerable function that is not shipped or reachable may change urgency, but build-time execution can still matter. State uncertainty where reachability cannot be established.

## Assess compatibility and supply chain

Read release changes relevant to the current version gap. Check removed APIs, runtime minimums, native prebuilds, ABI requirements, configuration changes and data/schema transitions. A major version label alone cannot establish actual incompatibility or compatibility.

Inspect changes in package/source identity, maintainers or signing/provenance where evidence exists. Review newly executable lifecycle scripts and unexpected transitive replacements. Verify integrity using the ecosystem's supported mechanism. Do not manufacture an assurance claim from an absent signature feature.

Check whether the project's runtime and package-manager constraints admit the candidate. If not, separate the prerequisite upgrade from this dependency change. Do not silently widen supported runtime policy.

## Make an attributable change

Use the existing package manager's targeted operation and immutable/frozen install rules where prescribed. Review manifests, lockfile entries, graph changes and generated outputs together. Investigate large unrelated churn before committing it.

Group versions that must move together because of shared peer/API contracts. Keep independent changes separate when doing so improves diagnosis. Avoid an arbitrary one-package rule for tightly coupled frameworks and an arbitrary all-at-once rule for unrelated tooling.

## Verify actual use

Run a clean resolution/install check, focused behavior tests and required build lanes. For a bundler/plugin update, inspect the produced application. For a native dependency, exercise the supported target or mark it unavailable. For a client library, exercise the relevant external contract with authorized fixtures or a suitable substitute.

If an advisory fix depends on a feature flag or code path change, verify that condition too. A new version number does not prove the vulnerable behavior is no longer exposed.

## Updater maintenance

When requested, inspect the existing updater's manifest discovery, release channel, grouping, schedule and checks. Confirm it can discover and propose a real candidate. An immutable pin plus a disabled updater is not a maintained dependency policy.

Report adopted, deferred and blocked candidates with evidence and residual risk. Do not publish artifacts or modify workstation packages as a side effect of repository dependency triage.
