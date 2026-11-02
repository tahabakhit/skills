# Defense-in-Depth Validation

This retained upstream example illustrates different responsibilities, not a
requirement to duplicate checks at every layer or a guarantee that bugs become
impossible. Add a boundary check only where it protects a distinct contract.
Use the project's tested containment procedure rather than treating a string
prefix as a filesystem boundary. The unsafe upstream prefix guard is omitted
below. This document does not supply a security-tested replacement.

## Overview

When you fix a bug caused by invalid data, adding validation at one place feels sufficient. But that single check can be bypassed by different code paths, refactoring, or mocks.

**Core principle:** Protect distinct contracts at the boundaries that need them.
Show which failure path each check prevents; avoid automatic duplicate validation.

## Why Multiple Layers

Single validation: "We fixed the bug"
Multiple justified layers: "We checked distinct failure paths"

Different layers catch different cases:
- Entry validation catches most bugs
- Business logic catches edge cases
- Environment guards prevent context-specific dangers
- Debug logging helps when other layers fail

## The Four Layers

### Layer 1: Entry Point Validation
**Purpose:** Reject obviously invalid input at API boundary

```typescript
function createProject(name: string, workingDirectory: string) {
  if (!workingDirectory || workingDirectory.trim() === '') {
    throw new Error('workingDirectory cannot be empty');
  }
  if (!existsSync(workingDirectory)) {
    throw new Error(`workingDirectory does not exist: ${workingDirectory}`);
  }
  if (!statSync(workingDirectory).isDirectory()) {
    throw new Error(`workingDirectory is not a directory: ${workingDirectory}`);
  }
  // ... proceed
}
```

### Layer 2: Business Logic Validation
**Purpose:** Ensure data makes sense for this operation

```typescript
function initializeWorkspace(projectDir: string, sessionId: string) {
  if (!projectDir) {
    throw new Error('projectDir required for workspace initialization');
  }
  // ... proceed
}
```

### Layer 3: Environment Guards
**Purpose:** Prevent dangerous operations in specific contexts

Before a test runs `git init`, establish an owned disposable fixture root and
use an existing tested procedure to verify the actual target stays inside it.
That procedure must reject sibling-prefix paths, parent traversal, and symlinks
escaping the root, and account for filesystem races where relevant. Check valid
descendants and these rejection cases with synthetic fixtures. A normalized
string prefix is insufficient. If no safe procedure exists, leave this mutation
unperformed and report the missing protection rather than improvising a guard.

### Layer 4: Debug Instrumentation
**Purpose:** Capture context for forensics

```typescript
async function gitInit(directory: string) {
  const stack = new Error().stack;
  logger.debug('About to git init', {
    directory,
    cwd: process.cwd(),
    stack,
  });
  // ... proceed
}
```

## Applying the Pattern

When you find a bug:

1. **Trace the data flow** - Where does bad value originate? Where used?
2. **Map all checkpoints** - List every point data passes through
3. **Choose justified checks** - Protect distinct entry, business, or environment contracts; keep debugging context safe
4. **Test the protected paths** - Verify each retained check catches its intended failure without assuming every layer needs another check

## Example from Session

Bug: Empty `projectDir` caused `git init` in source code

**Data flow:**
1. Test setup → empty string
2. `Project.create(name, '')`
3. `WorkspaceManager.createWorkspace('')`
4. `git init` runs in `process.cwd()`

**Four layers added:**
- Layer 1: `Project.create()` validates not empty/exists/writable
- Layer 2: `WorkspaceManager` validates projectDir not empty
- Layer 3: `WorktreeManager` refuses git init outside tmpdir in tests
- Layer 4: Stack trace logging before git init

**Historical result:** Upstream reported 1847 tests passing and could no longer
reproduce that example. This is not a local test result or proof that all bugs
are impossible.

## Key Insight

The upstream account reports different responsibilities at four layers:
- Different code paths bypassed entry validation
- Mocks bypassed business logic checks
- Edge cases on different platforms needed environment guards
- Debug logging identified structural misuse

Retain checks justified by actual contracts and evidence. One well-placed check
may suffice; multiple layers need distinct responsibilities and relevant tests.
