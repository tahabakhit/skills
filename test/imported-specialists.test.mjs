import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const json = p => JSON.parse(fs.readFileSync(path.join(root, p)));
const text = p => fs.readFileSync(path.join(root, p), 'utf8');

test('installed names have one distribution owner and no CLI-managed or legacy aliases', () => {
  const distribution = json('distribution.json');
  const groups = Object.fromEntries(distribution.groups.map(g => [g.name, g.skills]));
  assert.deepEqual(groups.core, ['discover-work', 'research-work', 'create-content', 'verify-and-stop']);
  assert.equal(groups.configuration, undefined);
  assert.equal(groups.operations, undefined);
  assert.equal(groups.design, undefined);
  assert.ok(!fs.existsSync(path.join(root, 'skills/configuration')));
  const names = distribution.groups.flatMap(g => g.skills);
  assert.equal(new Set(names).size, 43);
  for (const name of ['unslop', 'technical-writing', 'migration', 'safe-refactor', 'herdr-core', 'ketch', 'operate-systems', 'arch-package-maintenance', 'arch-update-recovery', 'rhel-fedora', 'workstation-health-triage']) {
    assert.ok(!names.includes(name));
    assert.ok(!fs.existsSync(path.join(root, 'skills', name)));
  }
  for (const file of ['document-structure', 'sentence-style', 'repository-verification']) assert.ok(fs.existsSync(path.join(root, 'skills/core/create-content/references', `${file}.md`)));
  assert.match(text('skills/engineering/change-safely/SKILL.md'), /Refactor branch/);
  assert.match(text('skills/engineering/change-safely/SKILL.md'), /Migration branch/);
});
