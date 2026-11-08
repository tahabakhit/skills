# Review

Review the current change against the supplied base ref (default HEAD).

1. Read the task notes, repository rules and applicable review-judgment skill.
   Run the notes' acceptance checks or the repo's documented verification gate;
   fix failures before asking for review.
2. Before writing a diff, check `git ls-files notes` and stop for another notes
   location if any are tracked. Then check `git check-ignore -q notes/x`; if
   needed append `notes/` to the path from
   `git rev-parse --git-path info/exclude`, preserving existing exclusions.
3. Save `git diff <base-ref>` to `notes/review-<task-slug>.diff` without staging.
   Append the output of `git ls-files --others --exclude-standard -- . ':!notes/'`
   under a heading so the reviewer knows to read new source files too. Inspect
   the diff/list for secrets before handing it off.
4. Run `kro ask reviewer "Review the change in <absolute diff path>. Notes: <absolute notes path>. Task: <one-line task>"`
   with at least an 1800-second tool timeout (or in the background under harness
   caps). Before kro deployment use `agent-consult reviewer`. Failure means
   preserve any printed answer, show the diagnostic and stop, not treat a
   failed consultation as approval. Follow the [Herdr cleanup guidance](herdr.md)
   rather than automatically re-asking.
5. Verify each finding against code. Fix confirmed issues, rerun affected checks
   and the repository gate. Record rejected findings and reasons.
6. Update the notes and report findings/fixes, rejected findings and check
   results/limits. Review is not authority to commit, push or deploy.
