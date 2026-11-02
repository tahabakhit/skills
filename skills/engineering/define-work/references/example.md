# Example: remember an unfinished filter

This is a fictional example of a small draft, not a claim about an existing app.
The example user has confirmed the behaviors below but has not approved the spec.

---

# Keep the current filter when opening an item and returning

Readiness: draft
Sources: discovery conversation for this example

## Problem and outcome

An analyst filters a list, opens an item, then returns to find the filter reset.
They must repeat the search to continue reviewing. Returning should restore the
list query they were using.

## Scope

In scope: filter preservation when opening an item and returning in the same tab.
Out of scope: saved searches, cross-device sync, preserving state after tab closure.
Constraint: opening a shared item link must keep working without prior list state.

## Acceptance criteria

- AC-1: Given a list filtered to `pending`, when the user opens a result and
  returns using the app's Back to list action, the filter still reads `pending`
  and the list shows only matching items.
- AC-2: The same filter is restored when returning with browser Back.
- AC-3: Given a direct item link with no prior list visit, Back to list opens the
  unfiltered list without an error.

## Verification

| Criterion | Proposed proof | Execution status |
| --- | --- | --- |
| AC-1 | Exercise filter, open item, app back, then assert filter and results | Not run |
| AC-2 | Repeat using browser Back | Not run |
| AC-3 | Open item in a fresh context, use app back, assert unfiltered list | Not run |

Reuse the app's existing browser test setup if sufficient. Its commands and
current coverage have not been inspected in this fictional example.

## Open questions and assumptions

Material questions: none from the supplied example requirements.
Proposed defaults: storage and routing implementation left to delivery.
Approval of this draft is pending.

## Delivery handoff

After approval and a separate request for delivery, pass this spec to the optional
`deliver-work` owner when available. It determines unit size, implementation
approach and the already-authorized endpoint. No issues have been filed,
no tests have run, and no merge or release authority has been granted.
