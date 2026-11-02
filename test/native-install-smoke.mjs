// Explicit integration test: standard upstream CLI, disposable targets, no wrapper.
// Usage: node test/native-install-smoke.mjs /path/to/skills/dist/cli.mjs [published-Git-commit]
// Supplying a commit tests real GitHub tree sources; omitting it uses local sources.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { tree } from '../lib/files.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const cli = process.argv[2];
assert.ok(cli && path.isAbsolute(cli) && fs.statSync(cli).isFile(), 'Provide an absolute upstream CLI path; this test never downloads it');
const distribution = JSON.parse(fs.readFileSync(path.join(root, 'distribution.json')));
const githubRef = process.argv[3];
if (githubRef) assert.match(githubRef, /^[a-f0-9]{40}$/, 'Use an immutable published commit for remote checks');
const sourceFor = group => githubRef
  ? `https://github.com/tahabakhit/skills/tree/${githubRef}${group ? `/skills/${group}` : ''}`
  : path.join(root, ...(group ? ['skills', group] : []));
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'skills-native-groups-'));
const home = path.join(scratch, 'home');
const project = path.join(scratch, 'project with spaces');
fs.mkdirSync(home); fs.mkdirSync(project);
const env = {
  PATH: process.env.PATH, HOME: home, CLAUDE_CONFIG_DIR: path.join(home, '.claude'),
  XDG_CONFIG_HOME: path.join(scratch, 'config'), XDG_DATA_HOME: path.join(scratch, 'data'),
  XDG_STATE_HOME: path.join(scratch, 'state'), XDG_CACHE_HOME: path.join(scratch, 'cache'),
  DISABLE_TELEMETRY: '1', DO_NOT_TRACK: '1', CI: '1', GIT_TERMINAL_PROMPT: '0'
};
function install(source, names, cwd, global = false) {
  const args = [cli, 'add', source, '--skill', '*', '--agent', 'pi', 'claude-code', 'codex', '--copy', '--yes', '--json'];
  if (global) args.push('--global');
  const result = spawnSync(process.execPath, args, { cwd, env, encoding: 'utf8', timeout: 30000, maxBuffer: 8 * 1024 * 1024 });
  assert.equal(result.status, 0, result.stderr || result.error?.message);
  const receipts = JSON.parse(result.stdout);
  assert.deepEqual(receipts.map(r => r.name).sort(), names.slice().sort(), `complete native selection: ${source}`);
  for (const row of receipts) {
    assert.equal(row.status, 'installed'); assert.equal(row.mode, 'copy');
    assert.equal(row.scope, global ? 'global' : 'project');
    assert.deepEqual(row.agents.slice().sort(), ['Claude Code', 'Codex', 'Pi']);
  }
  return receipts;
}
function checkCopies(base, group) {
  for (const name of group.skills) {
    const expected = tree(path.join(root, 'skills', group.name, name), true);
    for (const agent of ['.agents', '.claude']) {
      assert.deepEqual(tree(path.join(base, agent, 'skills', name)), expected, `${agent}: ${name}`);
    }
  }
}
try {
  // An unrelated live-looking copy must survive whole-bundle composition.
  const unrelated = path.join(project, '.agents/skills/unrelated/SKILL.md');
  fs.mkdirSync(path.dirname(unrelated), { recursive: true }); fs.writeFileSync(unrelated, 'keep');
  for (const group of distribution.groups) {
    const global = group.recommendedScope === 'global';
    install(sourceFor(group.name), group.skills, project, global);
    checkCopies(global ? home : project, group);
    console.log(`Native ${global ? 'global' : 'project'} bundle passed: ${group.name} (${group.skills.length})`);
  }
  assert.equal(fs.readFileSync(unrelated, 'utf8'), 'keep');
  const baseNames = distribution.groups.find(g => g.name === 'core').skills;
  const localNames = distribution.groups.filter(g => g.name !== 'core').flatMap(g => g.skills);
  const localLock = JSON.parse(fs.readFileSync(path.join(project, 'skills-lock.json')));
  const globalLock = JSON.parse(fs.readFileSync(path.join(scratch, 'state/skills/.skill-lock.json')));
  assert.deepEqual(Object.keys(localLock.skills).sort(), localNames.slice().sort());
  assert.deepEqual(Object.keys(globalLock.skills).sort(), baseNames.slice().sort());
  for (const name of baseNames) assert.equal(fs.existsSync(path.join(project, '.agents/skills', name)), false, 'no local base duplication');
  const umbrella = path.join(scratch, 'umbrella'); fs.mkdirSync(umbrella);
  const allNames = distribution.groups.flatMap(g => g.skills);
  install(sourceFor(), allNames, umbrella);
  for (const group of distribution.groups) checkCopies(umbrella, group);
  assert.equal(fs.existsSync(path.join(umbrella, '.agents/skills/unslop')), false);
  assert.equal(fs.existsSync(path.join(project, 'skills-lock.json.taha-install')), false);
  console.log(`Native upstream passed (${githubRef ? `GitHub ${githubRef}` : 'local sources'}): six subtree sources + umbrella, ${allNames.length} skills, full bytes/modes/references, Pi/Claude/Codex receipts, no local base copies. Disposable targets only.`);
} finally { fs.rmSync(scratch, { recursive: true, force: true }); }
