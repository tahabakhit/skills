import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { skillPath } from '../lib/selection.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const json = p => JSON.parse(fs.readFileSync(path.join(root, p)));
const text = p => fs.readFileSync(path.join(root, p), 'utf8');
function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'skills-specialists-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return dir;
}
function compare(args) {
  return spawnSync('python3', [path.join(root, 'skills/configuration/managed-config-drift/scripts/compare-trees.py'), ...args], { encoding: 'utf8', timeout: 5000, env: { PATH: process.env.PATH, PYTHONDONTWRITEBYTECODE: '1' } });
}

test('installed names have one distribution owner and no CLI-managed or legacy aliases', () => {
  const distribution = json('distribution.json');
  const groups = Object.fromEntries(distribution.groups.map(g => [g.name, g.skills]));
  assert.deepEqual(groups.core, ['discover-work', 'research-work', 'create-content', 'verify-and-stop']);
  assert.deepEqual(groups.configuration, ['managed-config-drift']);
  assert.equal(groups.operations, undefined);
  assert.equal(groups.design, undefined);
  const names = distribution.groups.flatMap(g => g.skills);
  assert.equal(new Set(names).size, 21);
  for (const name of ['unslop', 'technical-writing', 'migration', 'safe-refactor', 'herdr-core', 'ketch', 'operate-systems', 'arch-linux', 'arch-package-maintenance', 'arch-update-recovery', 'cachyos', 'rhel-fedora', 'workstation-health-triage']) {
    assert.ok(!names.includes(name));
    assert.ok(!fs.existsSync(path.join(root, 'skills', name)));
  }
  for (const file of ['document-structure', 'sentence-style', 'repository-verification']) assert.ok(fs.existsSync(path.join(root, 'skills/core/create-content/references', `${file}.md`)));
  assert.match(text('skills/engineering/change-safely/SKILL.md'), /Refactor branch/);
  assert.match(text('skills/engineering/change-safely/SKILL.md'), /Migration branch/);
});

test('preserved optional helper bytes match pinned audited inputs', () => {
  for (const name of ['managed-config-drift']) {
    const folder = skillPath(root, json('distribution.json'), name);
    const record = JSON.parse(fs.readFileSync(path.join(folder, 'PROVENANCE.json')));
    for (const file of record.upstreamFiles.filter(f => f.path.startsWith('scripts/'))) {
      const bytes = fs.readFileSync(path.join(folder, file.path));
      assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), file.sha256);
    }
  }
});

test('drift helper classifies content, links and exclusions without changing inputs', t => {
  const dir = fixture(t); const live = path.join(dir, 'live'); const managed = path.join(dir, 'managed');
  fs.mkdirSync(live); fs.mkdirSync(managed);
  fs.writeFileSync(path.join(live, 'config'), 'local');
  fs.writeFileSync(path.join(managed, 'config'), 'managed');
  fs.symlinkSync('old', path.join(live, 'link')); fs.symlinkSync('new', path.join(managed, 'link'));
  fs.writeFileSync(path.join(live, 'cache'), 'private');
  const result = compare([`${live}=${managed}`, '--exclude', 'cache']);
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stdout, /changed\tconfig\tfile->file/);
  assert.match(result.stdout, /changed\tlink\tsymlink->symlink/);
  assert.doesNotMatch(result.stdout, /cache|private|local|managed-only/);
  assert.equal(fs.readFileSync(path.join(live, 'config'), 'utf8'), 'local');
  fs.copyFileSync(path.join(live, 'config'), path.join(managed, 'config'));
  fs.unlinkSync(path.join(managed, 'link')); fs.symlinkSync('old', path.join(managed, 'link'));
  assert.equal(compare([`${live}=${managed}`, '--exclude', 'cache']).status, 0);
  assert.equal(compare([`${live}=${dir}/missing`]).status, 2);
});