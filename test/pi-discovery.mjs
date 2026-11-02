// Optional installed-host check, not an agent-behavior evaluation.
// Usage: node test/pi-discovery.mjs /absolute/path/to/pi/dist/core/skills.js
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const loader = process.argv[2];
assert.ok(loader && path.isAbsolute(loader), 'Supply the installed Pi skill-loader path');
const { loadSkillsFromDir } = await import(pathToFileURL(loader).href);
const distribution = JSON.parse(fs.readFileSync(path.join(root, 'distribution.json')));
function check(dir, names) {
  const result = loadSkillsFromDir({ dir, source: 'grouping-fixture' });
  assert.deepEqual(result.diagnostics, [], `Pi diagnostics for ${dir}`);
  assert.deepEqual(result.skills.map(skill => skill.name).sort(), names.slice().sort());
}
check(path.join(root, 'skills'), distribution.groups.flatMap(group => group.skills));
for (const group of distribution.groups) check(path.join(root, 'skills', group.name), group.skills);
console.log('Installed Pi loader discovers the umbrella and each of six native bundle directories without diagnostics. No agent session or live settings changed.');
