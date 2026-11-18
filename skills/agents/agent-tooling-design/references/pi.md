# Pi extension notes

Checked against Pi 1.5 docs. APIs move: before implementing, open the installed
package's `docs/extensions.md` and `examples/extensions/` (find the package from
`which pi` or the global npm root) and confirm anything below you rely on.

## Where extensions load

- Global: `~/.pi/agent/extensions/*.ts`, `*/index.ts`, or a subfolder whose
  `package.json` has a `pi.extensions` field. Project: `.pi/extensions/`, same
  layouts, loaded only once the project is trusted.
- Extra paths and packages go in `settings.json` under `extensions` and `packages`.
- Test a file without installing it: `pi -e ./my-extension.ts`. Auto-discovered
  extensions hot-reload with `/reload`.

## Registering a tool (`pi.registerTool`)

- `description` goes to the model. `promptSnippet` adds a one-line entry to the system
  prompt's tool list; without it, a custom tool is left out of that list.
- `promptGuidelines` bullets are appended flat to the rules section with no tool
  prefix. Name the tool in each bullet ("Use my_tool when…"), never "this tool".
- Use `StringEnum` from `@earendil-works/pi-ai` for enums; parameters use TypeBox.
- `prepareArguments(args)` runs before validation. Use it to accept old argument
  shapes from resumed sessions; keep `parameters` strict.
- Every result, including partial `onUpdate` results, needs `content` (model-visible)
  and `details` (rendering and state; same type across all results).
- Signal failure by throwing or returning `isError: true`. Any other return is a
  success, whatever the text says.
- Truncate output yourself. Built-in limits are 50 KB / 2000 lines; use `truncateHead`
  or `truncateTail` and tell the model where the full output is.
- Calls from one assistant message run in parallel. Tools that edit files should wrap
  the whole read-modify-write in `withFileMutationQueue(absolutePath, …)`; tools with
  shared in-memory state can set `executionMode: "sequential"`.
- Normalise a leading `@` on path arguments; some models add it.
- Registering a tool named like a built-in (`read`, `bash`, `edit`, `write`, `grep`,
  `find`, `ls`) silently replaces the built-in.

## Exposure and loadout

- `defaultActive: false` registers a tool inactive; `pi.setActiveTools()` activates it.
- `exposure: "deferred"` makes a tool findable by the built-in `tool_search` instead of
  writing your own loader. Tools cannot be unregistered; re-register with
  `exposure: "hidden"` to withdraw one.
- Changing the active tool set mid-session appends a delta; providers that cannot
  represent it get a full checkpoint, which can invalidate the prompt cache.

## State and lifecycle

- Store tool state in result `details` and rebuild it from
  `ctx.sessionManager.getBranch()` on `session_start` and `session_tree`, so branching
  and `/tree` stay correct. Use `pi.appendEntry()` for state the model must not see.
- `session_start` fires with `reason` `startup`, `reload`, `new`, `resume` or `fork`;
  each switch tears down and rebinds the extension. The factory can run without a
  session, so start processes, sockets, watchers and timers in `session_start` or on
  first use, and close them in an idempotent `session_shutdown` handler.
- Code after `await ctx.reload()` still runs from the old version.
- Check `ctx.hasUI` before dialogs and `ctx.mode === "tui"` before TUI components;
  print and JSON modes have no UI.

## Verify

Exercise startup, `/reload`, cancellation (`signal`), resume and fork, and the tool
alongside the other extensions the user runs. Do this with `pi -e` or a separate
session directory, not by changing the user's live settings.
