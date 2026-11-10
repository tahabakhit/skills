// Explicit integration check: runs the real pinned installer only in disposable HOME/project paths.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { skillPath } from '../lib/selection.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'taha-skills-real-install-'));
const home = path.join(dir, 'home'); const project = path.join(dir, 'repo with spaces');
fs.mkdirSync(home); fs.mkdirSync(project);
const distribution = JSON.parse(fs.readFileSync(path.join(root, 'distribution.json')));
const globalGroups = distribution.groups.filter(g => g.recommendedScope === 'global');
const localGroups = distribution.groups.filter(g => g.recommendedScope === 'project');
const globalNames = globalGroups.flatMap(g => g.skills);
const localNames = localGroups.flatMap(g => g.skills);
try {
  const result = spawnSync(process.execPath, [path.join(root, 'bin/skills.mjs'), '--global', globalGroups.map(g => g.name).join(','), '--local', localGroups.map(g => g.name).join(','), '--agents', 'pi,claude-code,codex', '--yes'], {
    cwd: project, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024,
    env: { ...process.env, HOME: home, CLAUDE_CONFIG_DIR: path.join(home, '.claude'), XDG_STATE_HOME: path.join(dir, 'state'), NPM_CONFIG_CACHE: process.env.npm_config_cache || process.env.NPM_CONFIG_CACHE || path.join(os.homedir(), '.npm'), NPM_CONFIG_OFFLINE: 'true' }
  });
  process.stdout.write(result.stdout || '');
  if (result.status !== 0) process.stderr.write(result.stderr || '');
  assert.equal(result.status, 0, 'Real installer failed; no live HOME/project was used');
  for (const [base, names] of [[home, globalNames], [project, localNames]]) {
    for (const agentDir of ['.agents/skills', '.claude/skills']) for (const name of names) {
      const target = path.join(base, agentDir, name);
      const provenance = JSON.parse(fs.readFileSync(path.join(skillPath(root, distribution, name), 'PROVENANCE.json')));
      assert.ok(fs.existsSync(path.join(target, 'PROVENANCE.json')));
      for (const file of provenance.files) {
        assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(target, file.path))).digest('hex'), file.sha256);
      }
    }
  }
  const globalLock = JSON.parse(fs.readFileSync(path.join(dir, 'state/skills/.skill-lock.json')));
  const localLock = JSON.parse(fs.readFileSync(path.join(project, 'skills-lock.json')));
  assert.deepEqual(Object.keys(globalLock.skills).sort(), globalNames.slice().sort());
  assert.deepEqual(Object.keys(localLock.skills).sort(), localNames.slice().sort());
  const protectedFile = path.join(home, '.agents/skills/research-work/SKILL.md');
  const bytes = fs.readFileSync(protectedFile);
  const again = spawnSync(process.execPath, [path.join(root, 'bin/skills.mjs'), '--global', 'core', '--agents', 'pi,codex', '--yes'], { cwd: project, encoding: 'utf8', env: { ...process.env, HOME: home, CLAUDE_CONFIG_DIR: path.join(home, '.claude'), XDG_STATE_HOME: path.join(dir, 'state') } });
  assert.notEqual(again.status, 0); assert.match(again.stderr, /--replace/);
  assert.deepEqual(fs.readFileSync(protectedFile), bytes);
  console.log(`Real pinned installer passed: ${globalNames.length + localNames.length} skills, global+project scopes, Pi/Claude Code/Codex receipts, ${2 * (globalNames.length + localNames.length)} physical copies, recorded hashes and locks; unapproved reinstall refused. Disposable state only.`);
} finally { fs.rmSync(dir, { recursive: true }); }
