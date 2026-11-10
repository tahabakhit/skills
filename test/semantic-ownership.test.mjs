import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const catalog = JSON.parse(read('catalog.json'));
const distribution = JSON.parse(read('distribution.json'));

test('standalone setup copies cannot drift from the maintained CI judgment', () => {
  for (const file of ['development-environments.md', 'setup-contracts.md', 'command-evidence.md']) {
    assert.equal(read(`skills/engineering/systematic-debugging/references/${file}`), read(`skills/engineering/ci-maintenance/references/${file}`), file);
  }
});

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
  for (const name of ['discover-work', 'verify-and-stop']) assert.equal(catalog.skills.find(s => s.name === name).domain, 'cross-domain');
  assert.equal(catalog.skills.find(s => s.name === 'research-work').domain, 'research');
});

test('adapted loaded guides are plain references, not stale skill entrypoints', () => {
  for (const file of [
    'skills/engineering/code-review/references/review-judgment/guide.md',
    'skills/engineering/git-hygiene/references/submission/guide.md',
    'skills/core/create-content/references/communication/guide.md',
    'skills/agents/harness-audit/references/audit-checks.md',
    'skills/agents/typesafe-ai/references/integration-guide.md'
  ]) assert.doesNotMatch(read(file), /^---\s*\nname:/);
  assert.equal(fs.existsSync(path.join(root, 'skills/engineering/deliver-work/references/repository-delivery')), false);
});

test('documented output wait handles fast startup and delayed completed work', t => {
  const document = read('skills/engineering/systematic-debugging/condition-based-waiting.md');
  const blocks = [...document.matchAll(/```typescript\n([\s\S]*?)\n```/g)].map(m => m[1]);
  const helper = blocks.find(b => b.startsWith('async function waitFor'));
  const example = blocks.find(b => b.includes('const baseline = manager.getCompletedOutputs().length;'));
  assert.ok(helper && example, 'execute the actual documented helper and corrected example');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'skills-output-wait-'));
  t.after(() => fs.rmSync(dir, { recursive: true }));
  const file = path.join(dir, 'fixture.mts');
  fs.writeFileSync(file, `import assert from 'node:assert/strict';\n${helper}\n
for (const fast of [true, false]) {
  const outputs: number[] = [10, 20];
  const manager = {
    getCompletedOutputs: () => outputs,
    startTool: async () => {
      if (fast) outputs.push(30, 40);
      else { setTimeout(() => outputs.push(30), 5); setTimeout(() => outputs.push(40), 25); }
    }
  };
  ${example}
  assert.equal(outputs.length, 4, 'new completed outputs, not old baseline or nominal ticks');
}
await assert.rejects(waitFor(() => false, 'missing output', 5), /missing output/);
console.log('documented wait: fast startup, delayed completion and bounded failure passed');
`);
  const result = spawnSync(process.execPath, ['--experimental-strip-types', file], { encoding: 'utf8', timeout: 10000 });
  assert.equal(result.status, 0, result.stderr || result.error?.message);
  assert.match(result.stdout, /bounded failure passed/);
});
