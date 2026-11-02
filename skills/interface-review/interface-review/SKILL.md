---
name: interface-review
description: Review a proposed or existing interface for usability and accessibility. Report prioritized evidence-bounded findings without redesigning or implementing it unasked.
---

# Interface review

Identify the task, audience, consequences, requested scope, and evidence actually supplied. A proposal supports design reasoning. Source supports implementation findings. Neither proves keyboard behavior, screen-reader output, measured contrast, or user outcomes that were not tested.

Prioritize blocked tasks, destructive mistakes, inaccessible actions, and misleading states before cosmetic preferences. For each material finding, give the observation, its user impact, the smallest adequate remedy, and the verification still needed. Separate confirmed findings from risks and unknowns. Do not inflate a heuristic score into standards certification.

Review action names, semantic controls, target areas and spacing, focus and keyboard behavior, error prevention and recovery, content hierarchy, and relevant empty/loading/error states. Measure the interactive hit area rather than assuming an icon's visible dimensions equal its target. An Escape handler alone does not establish accessible modal behavior. Ask what receives focus on open, how it moves, whether background content remains interactive, and where focus returns.

Match protective friction to consequences. A destructive irreversible action may need deliberate confirmation, a clear consequence statement, or recovery even when ordinary actions should be quick. Preserve the user's requested feature and established design constraints. Do not replace the visual identity as a side effect of review.

Conclude at the scope of the evidence. Say what can be recommended now and what remains unverified. If only text is supplied, do useful text-based analysis and stop. Do not claim tests ran, certify a whole interface, start tools, or implement changes without the required capabilities and authority.
