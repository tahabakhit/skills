import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { select, skillPath } from '../lib/selection.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const distribution = JSON.parse(fs.readFileSync(path.join(root, 'distribution.json')));
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'catalog.json')));
const read = file => fs.readFileSync(file, 'utf8');

test('repository and agent owners have disjoint purposes and scope', () => {
  const engineering = select('engineering', distribution);
  const agents = select('agents', distribution);
  for (const name of ['ci-maintenance', 'dependency-updates', 'release-packaging']) {
    assert.ok(engineering.includes(name));
    assert.equal(agents.includes(name), false);
  }
  for (const name of ['harness-audit', 'skill-authoring', 'agent-session-diagnostics', 'agent-tooling-design']) assert.ok(agents.includes(name));
  for (const former of ['codebase-hygiene', 'harness-checklist', 'agent-delegation', 'analyze-sessions', 'agent-engineering', 'triage-dependency-updates']) assert.throws(() => select(former, distribution), /Unknown/);
  // Skills archived for overlapping pstack are no longer selectable.
  for (const archived of fs.readdirSync(path.join(root, 'archive/skills')).flatMap(b => fs.readdirSync(path.join(root, 'archive/skills', b)))) {
    assert.throws(() => select(archived, distribution), /Unknown/, archived);
  }
});

test('all entrypoints are bounded; large optional agent guides stay behind local routes', () => {
  for (const skill of catalog.skills) {
    const words = read(path.join(root, skill.path, 'SKILL.md')).trim().split(/\s+/).length;
    assert.ok(words < 1300, `${skill.name}: ${words} words`);
  }
  for (const [name, guide] of [['harness-audit', 'audit-checks']]) {
    const folder = skillPath(root, distribution, name);
    const entry = read(path.join(folder, 'SKILL.md'));
    assert.ok(entry.trim().split(/\s+/).length < 400);
    assert.ok(entry.includes(`references/${guide}.md`));
    assert.ok(fs.statSync(path.join(folder, 'references', `${guide}.md`)).isFile());
  }
});
