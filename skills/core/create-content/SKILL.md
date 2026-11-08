---
name: create-content
description: Draft or edit articles, technical explanations, analytical reports, marketing copy, communications, diagrams, or supported document artifacts. Preserve evidence, author voice, requested format, and action boundaries.
---

# Create content

Produce the requested content, not a larger publishing workflow. Reading these instructions does not supply a document editor, spreadsheet calculator, renderer, or messaging integration.

## Establish the job

Identify audience, purpose, format, supplied evidence and endpoint from the request and existing drafts, templates and conventions. Ask only about unresolved choices that materially change the result.

Choose the editing scope:

- For a new draft, build the argument from supported facts.
- For a revision, preserve the author's useful argument, vocabulary, emphasis, and voice.
- For a point edit, change the named span and only the minimum surrounding text needed for it to read correctly.

A request for a draft does not authorize sending it. A report does not authorize changing a product. A specification edit must not silently change its acceptance requirements.

## Draft from evidence

Organize around what the reader needs to understand or do. Use concrete language and consistent terms. Preserve exact quotations, numbers, units, and uncertainty. Do not invent testimonials, performance statistics, customers, policies, guarantees, citations, study methods, or results to make the prose persuasive.

If a desired claim lacks support, give the closest supported wording and name the evidence needed for the stronger claim. When new investigation is necessary, use available authorized research capability or report the gap. Do not fabricate a research step already completed.

For analytical reports, distinguish observations, calculations, estimates, forecasts, and recommendations. Check material arithmetic, scope, time periods, units, and denominators. Avoid counting the same underlying activity twice. Keep assumptions visible and scenarios conditional. Read [analytical-reports.md](references/analytical-reports.md) when these issues matter.

For marketing, communication, or collaborative authoring, read [writing-modes.md](references/writing-modes.md). Use the requested voice and headings instead of imposing a corporate template or simulated expert panel.

For developer documents, read [document structure](references/document-structure.md),
[sentence style](references/sentence-style.md) or
[repository verification](references/repository-verification.md) as needed.
Choose tutorial, how-to, reference or explanation by the reader's need. Verify
symbols, paths, flags, defaults and examples against the repository; do not change
code to make prose true. Base PR/commit titles on the final diff and project policy.

For prose cleanup, fix the point and structure before polishing words. Cut filler,
repetition, canned transitions and generic praise; use supported facts or honest
uncertainty instead. Prefer plain verbs, consistent names and conditions beside
the claims they limit. Keep deliberate voice and useful detail; brevity is not
permission to flatten an argument.

Stay within the requested edit. Preserve exact code, identifiers, commands, error
text, quotations, citations, legal language and necessary qualifiers. Do not impose
punctuation bans, manufacture personality or rewrite untouched files. Make generic
paragraphs specific or cut them.

## Select a supported output path

Plain-text drafting and review need only the supplied material and the host's text tools. An actual DOCX, workbook, slide deck, PDF, image, or diagram requires an available engine that supports the specific operation. Creation, reading, editing, rendering, formula calculation, OCR, secure redaction, and accessible tagging are separate capabilities.

Read [file-production.md](references/file-production.md) before touching a binary artifact or exporting tabular text such as CSV. Confirm what must survive the change. Work on a copy where appropriate. Do not silently flatten formulas, revisions, comments, links, macros, charts, forms, signatures, or accessibility structure. Report unsupported preservation requirements before a destructive round trip.

Use existing approved engines. Do not install tools, download a runtime, enable hooks, spend money, upload content, or alter host settings merely because the requested format needs them. If capability is absent, return a useful draft or production plan with an explicit gap. Never rename text to a binary extension and claim the format was produced.

## Review and hand back

Check the artifact against its purpose, requested scope, factual record, and format. Remove accidental churn and unsupported claims. Inspect rendered output when the claim depends on appearance and a renderer is available. Text extraction and package validity do not prove visual fidelity. A rendered spreadsheet does not prove the formulas calculate correctly.

Lead with the finished artifact. Add explanation only for material choices, checks or limits the reader needs; a point edit does not need an editorial report. Describe self-checks and optional independent review honestly. Stop before sending or publishing unless authorized.
