import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const catalog = JSON.parse(read('catalog.json'));
const distribution = JSON.parse(read('distribution.json'));

test('semantic domains, package owners and optional handoffs have distinct valid identities', () => {
  assert.ok(catalog.taxonomy.domain.includes('independent'));
  const names = new Set(catalog.skills.map(s => s.name));
  for (const skill of catalog.skills) {
    const group = distribution.groups.find(g => g.skills.includes(skill.name));
    assert.equal(skill.bundle, group.name);
    assert.equal(skill.path, `skills/${skill.bundle}/${skill.name}`);
    assert.equal(new Set(skill.optionalSkills).size, skill.optionalSkills.length);
    for (const optional of skill.optionalSkills) assert.ok(names.has(optional), `${skill.name} -> ${optional}`);
  }
});

test('adapted loaded guides are plain references, not stale skill entrypoints', () => {
  for (const file of [
    'skills/agents/harness-audit/references/audit-checks.md',
    'skills/agents/typesafe-ai/references/integration-guide.md'
  ]) assert.doesNotMatch(read(file), /^---\s*\nname:/);
});
