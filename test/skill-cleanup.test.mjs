import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { select, skillPath } from '../lib/selection.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const distribution = JSON.parse(fs.readFileSync(path.join(root, 'distribution.json')));
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'catalog.json')));
const read = file => fs.readFileSync(file, 'utf8');

// Preserve origin identities/notices while allowing declared, root-hashed adaptations.
for (const [owner, former, subdir] of [['create-content', 'communication', 'communication']]) {
  test(`${former} has a traceable adapted reference under ${owner}, not another skill`, () => {
    const folder = skillPath(root, distribution, owner);
    const reference = path.join(folder, 'references', subdir);
    const origin = JSON.parse(read(path.join(reference, 'PROVENANCE.json')));
    const current = JSON.parse(read(path.join(folder, 'PROVENANCE.json')));
    const imported = current.imports.find(i => i.sourceRecord === `references/${subdir}/PROVENANCE.json`);
    assert.ok(imported, 'retained input record is identified by current provenance');
    assert.ok(imported.adaptedFiles.includes('guide.md'));
    assert.ok(read(path.join(folder, 'SKILL.md')).includes(`references/${subdir}/guide.md`));
    for (const file of origin.files) {
      const relative = file.path === 'SKILL.md' ? 'guide.md' : file.path;
      const target = path.join(reference, relative);
      const actual = crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex');
      if (!imported.adaptedFiles.includes(relative)) assert.equal(actual, file.sha256, `unchanged input: ${former}/${file.path}`);
      assert.ok(current.files.some(f => f.path === `references/${subdir}/${relative}` && f.sha256 === actual), 'current bytes recorded separately from input');
    }
    assert.doesNotMatch(read(path.join(reference, 'guide.md')), /^---\s*\nname:/);
    assert.equal(fs.existsSync(path.join(reference, 'SKILL.md')), false);
    assert.equal(catalog.skills.some(s => s.name === former), false);
    assert.throws(() => select(former, distribution), /Unknown/);
  });
}

test('repository and agent owners have disjoint purposes and scope', () => {
  const engineering = select('engineering', distribution);
  const agents = select('agents', distribution);
  for (const name of ['ci-maintenance', 'dependency-updates', 'release-packaging']) {
    assert.ok(engineering.includes(name));
    assert.equal(agents.includes(name), false);
  }
  for (const name of ['harness-audit', 'skill-authoring', 'agent-session-diagnostics', 'analyze-pi-sessions', 'agent-tooling-design']) assert.ok(agents.includes(name));
  for (const [group, name] of [['linux', 'linux-administration'], ['macos', 'macos-administration']]) assert.ok(select(group, distribution).includes(name));
  for (const former of ['codebase-hygiene', 'harness-checklist', 'agent-delegation', 'analyze-sessions', 'agent-engineering', 'triage-dependency-updates']) assert.throws(() => select(former, distribution), /Unknown/);
  // Skills archived for overlapping pstack are no longer selectable.
  for (const archived of fs.readdirSync(path.join(root, 'archive/skills')).flatMap(b => fs.readdirSync(path.join(root, 'archive/skills', b)))) {
    assert.throws(() => select(archived, distribution), /Unknown/, archived);
  }
});

test('active OS handoffs use discoverable administration names', () => {
  const routes = [
    ['skills/linux/linux-desktop/SKILL.md', 'linux-administration'],
    ['skills/linux/arch-linux/SKILL.md', 'linux-administration'],
    ['skills/linux/fedora/SKILL.md', 'linux-administration'],
    ['skills/linux/arch-linux/references/update-recovery.md', 'linux-administration'],
    ['skills/workstation/managed-config-drift/SKILL.md', 'macos-administration'],
    ['skills/linux/linux-administration/SKILL.md', 'macos-administration']
  ];
  for (const [file, owner] of routes) {
    const body = read(path.join(root, file));
    assert.ok(body.includes(owner), `${file} routes to ${owner}`);
    assert.doesNotMatch(body, /`(?:linux|macos)`|(?:in|and|use|Use) (?:linux|macos)(?=[;' .])/);
    assert.ok(catalog.skills.some(s => s.name === owner));
  }
});

test('all entrypoints are bounded; large optional agent guides stay behind local routes', () => {
  for (const skill of catalog.skills) {
    const words = read(path.join(root, skill.path, 'SKILL.md')).trim().split(/\s+/).length;
    assert.ok(words < 1300, `${skill.name}: ${words} words`);
  }
  for (const [name, guide] of [['harness-audit', 'audit-checks'], ['typesafe-ai', 'integration-guide']]) {
    const folder = skillPath(root, distribution, name);
    const entry = read(path.join(folder, 'SKILL.md'));
    assert.ok(entry.trim().split(/\s+/).length < 400);
    assert.ok(entry.includes(`references/${guide}.md`));
    assert.ok(fs.statSync(path.join(folder, 'references', `${guide}.md`)).isFile());
  }
});
