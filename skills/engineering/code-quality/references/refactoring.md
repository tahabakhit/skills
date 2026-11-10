# Structural judgment during a refactor

The active delivery procedure owns sequencing and proof. For an explicit
behavior-preserving refactor or compatibility migration, use available change-safely
guidance; this reference judges the target structure rather than starting another
migration plan. Without that specialist, preserve the requested contract, identify
real consumers and report missing version/recovery evidence.

A useful extraction improves ownership, change locality, contract enforcement,
lifecycle or traversability—not merely folder layout or line counts. Look for:

- one authority for each moved invariant, state transition and external effect;
- deliberate import direction and visible composition/runtime selection;
- public APIs, persisted formats, errors and operational signals preserved unless
  their change is explicitly accepted;
- consumers including re-exports, reflection, configuration, plugins and generated
  bindings, not only direct imports;
- compatibility paths with a named supported consumer and removal condition.

Prefer an atomic structural move when all owned consumers can change together.
Staged compatibility is necessary for independently deployed versions or persistent
state. Old/new adapters may coexist temporarily, but cannot become competing policy
or state authorities. Baseline evidence can live in the existing task record; no
separate ceremonial document is needed.

Split by owner, dependency or lifecycle, not arbitrary size. Merge wrappers that
always change together, but preserve genuine package/effect boundaries. Resolve
cycles by choosing policy direction and moving composition upward; a generic utils
folder or service locator only hides the edge. Move resource failure/cancellation
and cleanup rules with its state, not just types.

Do not mix a discovered bug fix or dependency modernization into mechanical movement
silently. Make an accepted behavior change and its proof explicit. These judgments
complement the existing work plan; they do not impose another completion checklist.
