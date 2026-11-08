---
name: agent-engineering
description: "Use when designing or changing an agent-facing tool or harness extension. Not for whole-environment audits or diagnosing a past session."
---

Start from the user's workflow and capabilities the active harness or CLI already
provides. Add the smallest missing surface. A tool exposes agent decisions; a
command or UI exposes user controls. Do not duplicate both surfaces by default.
An extension should need hooks, state, UI or registration rather than just wrap a
command that already works.

Load the relevant branch before designing or reviewing it:

- Agent-facing names, schemas, defaults, results and errors: `references/tool-design.md`.
- Extension surface selection, lifecycle and interoperability: `references/extension-design.md`.
- An extension registering a tool: read both branches.
- Pi-specific work: also read `references/pi.md` and current installed docs/examples.

These branches supply design judgment, not another plan, delegation or approval
workflow. Respect the existing workflow and live-change boundaries. For provider
cache/history changes load an applicable prompt-cache skill. For explicitly
requested behavioral tuning load an applicable reusable-instruction authoring
skill and its calibration branch, not a mandatory experiment for every edit.

Verify the emitted contract and affected lifecycle with proportionate local
checks. Distinguish static/source evidence, isolated tests and live integration;
do not enable or reconfigure the user's harness just to verify an import.
