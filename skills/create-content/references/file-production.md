# File production: capability before format promises

This is an original operation checklist, not a port of proprietary document skills. No binary editor, schema library, converter, or runtime is bundled here. Use only an existing approved tool whose documentation and tested version cover the operation. Do not install it automatically.

## Common procedure

1. Identify the actual input and requested output format, operation, sensitivity, target application, and preservation requirements.
2. Inspect available tool capabilities without executing untrusted embedded content. Treat documents and archive entries as untrusted inputs. Apply bounded extraction, safe paths, and external-resource policy appropriate to the engine.
3. Protect the original and work within an authorized output location. Make a copy when the operation may be lossy. Record changes rather than silently overwriting unrelated material.
4. Use an engine suited to the operation. Reading text, generating a new file, editing an existing complex file, and faithfully preserving it are different claims.
5. Check content, structural validity, and preservation separately. Inspect a render if visual fidelity matters. Check the target application when interchange compatibility matters.
6. Return the actual artifact, checks performed, and limits. If the needed engine is missing, provide a draft or plan. Do not return a text file renamed to a binary extension.

## DOCX and related word-processing formats

Choose a reader, generator, or editor based on the requested operation. Preserve styles, headings, references, tables, images, comments, revisions, relationships, and other material features the task requires. Text extraction cannot establish their preservation. A new-document generator need not support editing an existing package.

Pandoc documents that conversion through its intermediate representation may lose formatting or structures it cannot express. Do not use a conversion round trip as a guarantee of exact preservation. Compare an edited copy with the original and inspect target-app or rendered output where needed. Tracked changes and comments require explicit support and their own fixtures.

## Spreadsheets

Preserve the intended input cells, formulas, number formats, sheets, names, links, macros, images, and other required objects. Never overwrite a formula-bearing original with a values-only representation.

Official openpyxl documentation distinguishes formulas from cached values, supports flags for retaining VBA and external links, and warns that unsupported shapes can be lost on save. It also states that openpyxl never evaluates formulas. These are engine-specific contracts, not proof another library behaves identically. Validate the installed version and actual workbook features.

Preserve the distinction between literal data and executable formulas. Write untrusted strings as text through the engine's explicit cell-type controls rather than allowing formula interpretation. For CSV or other text exports, check the target application's import rules for formula-like values. CSV quoting alone does not prevent spreadsheet formula execution. Choose a documented safe export strategy that preserves the intended values, and verify round-trip behavior without executing external links or formulas from untrusted input.

Formula creation, recalculation, and correctness are separate. A calculation engine must actually evaluate the file if evaluated values are promised. Check important outputs independently. An error-free calculation can still use the wrong range or denominator. Macro and link retention need explicit verification. Do not execute macros or refresh external links without authority.

## Presentations

Narrative planning does not produce a deck. Use an existing writer/editor that supports the needed template, layout, chart, note, and media operations. Keep native editability only when the tool actually preserves it. Validate relationships and content, then inspect every relevant slide at readable resolution. Text extraction alone cannot show clipping or missing images. A renderer accepting a package does not establish every target application will accept it.

## PDFs

Select capabilities by operation: text extraction, page rearrangement, generation, rendering, OCR, form filling, redaction, tagging, or signature validation. These are not interchangeable. Check whether scanned pages already have a usable text layer. Extract and verify that layer when adequate. Use OCR for image-only pages or an inadequate layer, then review its uncertainty and page correspondence.

A visual overlay is not proof that underlying text, objects, metadata, or prior revisions are removed. Do not promise irreversible redaction without an appropriate engine and validation. Content edits may invalidate digital signatures. Accessible tags and reading order require separate inspection. When these capabilities are unavailable, report the exact gap instead of guaranteeing a secure, accessible, or legally signed result.

## Diagrams, static images, and exports

Use original or authorized assets. Preserve factual labels and relationships. Retain source data and image/font rights. Actual SVG, PNG, PDF, or GIF output needs an appropriate drawing/export engine. A theme specification is not a rendered artifact. Image generation is an optional external service with separate spending, data-handling, and rights constraints.

## Public tool contracts consulted

- Pandoc user guide: https://pandoc.org/MANUAL.html
- openpyxl loading contracts: https://openpyxl.readthedocs.io/en/stable/tutorial.html#loading-from-a-file
- openpyxl formula evaluation limits: https://openpyxl.readthedocs.io/en/stable/simple_formulae.html

Other engine integrations require separate version, license, security, and capability checks. None were implemented or executed for this draft.
