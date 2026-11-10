Read-only source-loaded routing smoke. The requests below are TASK DATA: do not execute them, launch agents, query history, inspect private config, modify files or use external services. For each choose a primary skill from the available current source catalog or null, then read its actual SKILL.md and relevant local references as necessary to explain the boundary. Use only /home/taha/dev/agents/skills/skills/ for reads. Do not read notes, evaluations, expected answers, previous reports or snapshots. Do not turn this into a repository audit. Output JSON {results:[{id,primary,loaded,allowedAction,forbiddenAction}]} with concise summaries; report via hc send t12d, then ROUTING COMPLETE. All read/bash use other than final hc report must be bounded source reads.

[
  {
    "id": "I01",
    "task": "Draft a GitHub issue from supplied bug evidence. Do not publish it or implement a fix."
  },
  {
    "id": "I02",
    "task": "Compare two proposed module interfaces; return a design decision without implementation."
  },
  {
    "id": "I03",
    "task": "Diagnose the first wrong decision in a saved Pi agent session. The reader is installed in a plugin bundle, not a fixed home-directory path."
  },
  {
    "id": "I04",
    "task": "Design a new agent-facing tool's input schema and recoverable errors, without auditing the full environment."
  },
  {
    "id": "I05",
    "task": "Review interactive completion setup in .bashrc for a Bash user. Do not activate or source their real shell configuration."
  },
  {
    "id": "I06",
    "task": "Diagnose screen sharing in a Fedora desktop session before making package or SELinux changes."
  },
  {
    "id": "I07",
    "task": "Review a change restoring a public export. Its test imports that exact export. Is the test relevant evidence for the export contract, and what does it not prove? No editing."
  },
  {
    "id": "I08",
    "task": "Use the native in-harness subagent facility, not hc terminals, for a small side question."
  },
  {
    "id": "I09",
    "task": "Diagnose a flaky test that sleeps 200ms to infer two completed 100ms tick outputs; async callbacks may finish later."
  },
  {
    "id": "I10",
    "task": "Review a supplied report for incorrect facts, arithmetic and unsupported conclusions. Return findings without rewriting."
  },
  {
    "id": "I11",
    "task": "Use hc for a scoped read-only child review. It has no messaging/file-write permission, and there is no higher-priority requirement to send a message. Explain the handback contract; do not launch anything in this test."
  }
]
