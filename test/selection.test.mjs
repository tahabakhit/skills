import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { skillPath, validateDistribution, selections } from '../lib/selection.mjs';

const distribution = {
  schemaVersion: 1, installer: 'skills@1.7.4',
  groups: [
    { name: 'core', skills: ['discover-work'], recommendedScope: 'global' },
    { name: 'configuration', skills: ['chezmoi'], recommendedScope: 'project' }
  ]
};

test('skillPath derives only the owning group, without filesystem or flat fallback', () => {
  assert.equal(skillPath('/source', distribution, 'discover-work'), path.join('/source', 'skills/core/discover-work'));
  assert.equal(skillPath('/source', distribution, 'chezmoi'), path.join('/source', 'skills/configuration/chezmoi'));
  for (const name of ['unknown', '../discover-work', '/discover-work', 'a/b', '', null, 'a'.repeat(256)]) {
    assert.throws(() => skillPath('/source', distribution, name));
  }
  for (const group of ['../core', '/core', 'a/b', 'all', '', null, 'a'.repeat(65)]) {
    const copy = structuredClone(distribution); copy.groups[0].name = group;
    assert.throws(() => skillPath('/source', copy, 'discover-work'), /group name/);
  }
  const duplicate = structuredClone(distribution); duplicate.groups[1].skills.push('discover-work');
  assert.throws(() => skillPath('/source', duplicate, 'discover-work'), /exactly one package owner/);
});

test('distribution validation requires nested entrypoints even when flat files exist', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'skills-selection-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (const group of distribution.groups) for (const name of group.skills) {
    const flat = path.join(root, 'skills', name);
    fs.mkdirSync(flat, { recursive: true });
    fs.writeFileSync(path.join(flat, 'SKILL.md'), `---\nname: ${name}\n---\n`);
  }
  assert.throws(() => validateDistribution(distribution, root), /ENOENT/);
  for (const group of distribution.groups) for (const name of group.skills) {
    const nested = skillPath(root, distribution, name);
    fs.mkdirSync(nested, { recursive: true });
    fs.writeFileSync(path.join(nested, 'SKILL.md'), `---\nname: ${name}\n---\n`);
  }
  assert.equal(validateDistribution(distribution, root), distribution);
});

test('recommended scope is guidance, not enforcement', () => {
  assert.deepEqual(selections({ global: 'configuration', local: 'core' }, distribution), {
    global: ['chezmoi'], local: ['discover-work']
  });
});
