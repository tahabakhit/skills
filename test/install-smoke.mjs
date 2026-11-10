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
const env = { ...process.env, HOME: home, CLAUDE_CONFIG_DIR: path.join(home, '.claude'), XDG_STATE_HOME: path.join(dir, 'state'), NPM_CONFIG_CACHE: process.env.npm_config_cache || process.env.NPM_CONFIG_CACHE || path.join(os.homedir(), '.npm'), NPM_CONFIG_OFFLINE: 'true' };
try {
  const scopeArgs = [];
  if (globalGroups.length) scopeArgs.push('--global', globalGroups.map(g => g.name).join(','));
  if (localGroups.length) scopeArgs.push('--local', localGroups.map(g => g.name).join(','));
  const result = spawnSync(process.execPath, [path.join(root, 'bin/skills.mjs'), ...scopeArgs, '--agents', 'pi,claude-code,codex', '--yes'], {
    cwd: project, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024,
    env
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
  const localLockPath = path.join(project, 'skills-lock.json');
  assert.deepEqual(Object.keys(globalLock.skills).sort(), globalNames.slice().sort());
  if (localNames.length) {
    const localLock = JSON.parse(fs.readFileSync(localLockPath));
    assert.deepEqual(Object.keys(localLock.skills).sort(), localNames.slice().sort());
  } else {
    assert.equal(fs.existsSync(localLockPath), false, 'global-only install creates no project lock');
    assert.deepEqual(fs.readdirSync(project), [], 'global-only install leaves the project untouched');
  }
  const override = spawnSync(process.execPath, [path.join(root, 'bin/skills.mjs'), '--local', 'engineering', '--agents', 'pi,claude-code,codex', '--yes'], {
    cwd: project, encoding: 'utf8', env
  });
  assert.equal(override.status, 0, override.stderr);
  const localLock = JSON.parse(fs.readFileSync(localLockPath));
  const engineering = distribution.groups.find(g => g.name === 'engineering');
  assert.deepEqual(Object.keys(localLock.skills).sort(), engineering.skills.slice().sort());
  for (const name of engineering.skills) for (const agent of ['.agents', '.claude']) {
    assert.deepEqual(fs.readFileSync(path.join(project, agent, 'skills', name, 'SKILL.md')), fs.readFileSync(path.join(root, 'skills/engineering', name, 'SKILL.md')));
  }
  const protectedFile = path.join(home, '.agents/skills/shell-scripting/SKILL.md');
  const bytes = fs.readFileSync(protectedFile);
  const again = spawnSync(process.execPath, [path.join(root, 'bin/skills.mjs'), '--global', 'workstation', '--agents', 'pi,codex', '--yes'], { cwd: project, encoding: 'utf8', env });
  assert.notEqual(again.status, 0); assert.match(again.stderr, /--replace/);
  assert.deepEqual(fs.readFileSync(protectedFile), bytes);
  console.log(`Real pinned installer passed: ${globalNames.length + localNames.length} default skills, no empty scope arguments or project lock for global-only defaults, explicit local engineering override, Pi/Claude Code/Codex receipts, recorded hashes and locks; unapproved reinstall refused. Disposable state only.`);
} finally { fs.rmSync(dir, { recursive: true }); }
