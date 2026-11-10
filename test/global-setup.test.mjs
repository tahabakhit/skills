import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const root = new URL('../', import.meta.url);
const read = name => JSON.parse(fs.readFileSync(new URL(name, root)));
const distribution = read('distribution.json');
const catalog = read('catalog.json');
const marketplace = read('.claude-plugin/marketplace.json');
const retained = {
  engineering: ['ci-maintenance', 'dependency-updates', 'release-packaging'],
  workstation: ['chezmoi', 'managed-config-drift', 'shell-scripting', 'backup-restore'],
  linux: ['linux-administration', 'linux-desktop', 'arch-linux', 'fedora', 'cachyos'],
  macos: ['macos-administration'],
  agents: ['agents-md', 'skill-authoring', 'agent-tooling-design', 'agent-session-diagnostics', 'harness-audit', 'prompt-caching']
};
const excluded = ['analyze-pi-sessions', 'chrome-cdp', 'typesafe-ai', 'analyze-data', 'data-pipelines', 'interface-review'];

function checkMirrors(registry, catalog, marketplace) {
  const owners = registry.groups.flatMap(group => group.skills.map(name => ({
    name, bundle: group.name, path: `skills/${group.name}/${name}`,
    provenance: `skills/${group.name}/${name}/PROVENANCE.json`
  })));
  assert.deepEqual(catalog.skills.map(({ name, bundle, path, provenance }) => ({ name, bundle, path, provenance })), owners);
  assert.deepEqual(marketplace.plugins.map(({ name, source, skills, description }) => ({ name, source, skills, description })),
    registry.groups.map(group => ({
      name: group.name, source: `./skills/${group.name}`, skills: ['./'], description: group.skills.join(', ')
    })));
}

test('all 19 retained skills have exactly five global owners and matching native plugins', () => {
  assert.deepEqual(Object.fromEntries(distribution.groups.map(group => [group.name, group.skills])), retained);
  assert.ok(distribution.groups.every(group => group.recommendedScope === 'global'));
  checkMirrors(distribution, catalog, marketplace);
  const folders = fs.readdirSync(new URL('skills/', root)).flatMap(group =>
    fs.readdirSync(new URL(`skills/${group}/`, root)));
  assert.deepEqual(folders.sort(), Object.values(retained).flat().sort());
  for (const name of excluded) {
    assert.equal(folders.includes(name), false);
    assert.equal(catalog.skills.some(skill => skill.optionalSkills.includes(name)), false);
  }
  assert.deepEqual(read('package.json').pi, { skills: ['./skills'] });
});

test('mirror checks reject wrong plugin sources, omitted members and same-count owner swaps', () => {
  const wrongSource = structuredClone(marketplace);
  wrongSource.plugins[0].source = './skills/agents';
  assert.throws(() => checkMirrors(distribution, catalog, wrongSource), /deep-equal/);
  const omitted = structuredClone(catalog);
  omitted.skills.pop();
  assert.throws(() => checkMirrors(distribution, omitted, marketplace), /deep-equal/);
  const swapped = structuredClone(catalog);
  [swapped.skills[0].bundle, swapped.skills[3].bundle] = [swapped.skills[3].bundle, swapped.skills[0].bundle];
  assert.throws(() => checkMirrors(distribution, swapped, marketplace), /deep-equal/);
});
