# Commit, issue and PR submission judgment

The git-hygiene entrypoint owns the candidate, index and authorized submission
stage. This reference supplies message/history judgment; it does not start delivery,
choose new gates or grant publication authority. Use the existing task and review
record instead of creating another completion protocol.

For a commit, name the actual effect with concrete nouns and an active verb; follow
repository grammar. Explain reasons, constraints and deliberate limitations in the
body rather than narrating files. Keep coupled behavior/tests/docs together and
split only independently understandable or shippable states.

Preserve useful review/failure history. Amend only when permitted for the same
unpushed state. A failed hook/rejected commit created no new commit: fix and retry,
never amend the preceding commit as a consequence. Do not rewrite shared history or
fabricate authorship/trailers. Resolve ambiguous identities without silently switching
accounts or bypassing protection.

For the requested submission text, read the guide-relative branch:

- [Issue evidence and wording](references/issues.md).
- [PR description and review-risk wording](references/pull-requests.md).

Distinguish observed behavior, expectation and inferred cause. Report actual
validation and its limits, and return links only for artifacts actually published.
A request for a draft stops at text. For broader implementation or merge/release
follow-through, return to the existing coordinator or available deliver-work owner.
