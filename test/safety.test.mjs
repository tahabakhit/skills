import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { createPlan } from '../lib/plan.mjs';
import { executePlan, verifyLock } from '../lib/install.mjs';
import { tree } from '../lib/files.mjs';
import { validateDistribution } from '../lib/selection.mjs';
import { outputDirectory } from '../scripts/build-packages.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const distribution = JSON.parse(fs.readFileSync(path.join(root, 'distribution.json')));
function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'taha-skills-safety-'));
  t.after(() => fs.rmSync(dir, { recursive: true }));
  const home = path.join(dir, 'home'); const project = path.join(dir, 'repo');
  fs.mkdirSync(home); fs.mkdirSync(project);
  return { dir, home, project, env: {}, cwd: project };
}
function sourceFixture(c) {
  const source = path.join(c.dir, 'source'); fs.mkdirSync(source);
  fs.cpSync(path.join(root, 'skills'), path.join(source, 'skills'), { recursive: true });
  return source;
}
const opts = { local: 'shell-scripting', agents: 'pi' };

for (const scope of ['project', 'global']) test(`${scope} hard-linked locks are refused without touching the other name`, t => {
  const c = fixture(t); const other = path.join(c.dir, 'outside.json');
  const lock = scope === 'global' ? path.join(c.home, '.agents/.skill-lock.json') : path.join(c.project, 'skills-lock.json');
  const value = JSON.stringify({ version: scope === 'global' ? 3 : 1, skills: {} });
  fs.writeFileSync(other, value); fs.mkdirSync(path.dirname(lock), { recursive: true }); fs.linkSync(other, lock);
  const options = scope === 'global' ? { global: 'workstation', agents: 'pi' } : opts;
  assert.throws(() => createPlan(options, distribution, root, c), /hard-linked lock/);
  assert.equal(fs.readFileSync(other, 'utf8'), value); assert.equal(fs.statSync(lock).nlink, 2);
});
test('a newly added hard link invalidates previously confirmed lock identity', t => {
  const c = fixture(t); const lock = path.join(c.project, 'skills-lock.json');
  fs.writeFileSync(lock, '{"version":1,"skills":{}}');
  const p = createPlan(opts, distribution, root, c); fs.linkSync(lock, path.join(c.dir, 'new-alias.json'));
  assert.throws(() => executePlan(p, distribution, { replace: true, runner: () => assert.fail('not allowed') }), /changed after planning/);
});
test('new targets after confirmation are refused even with replace', t => {
  const c = fixture(t); const p = createPlan(opts, distribution, root, c);
  const target = path.join(c.project, '.agents/skills/shell-scripting');
  fs.mkdirSync(target, { recursive: true }); fs.writeFileSync(path.join(target, 'owner.txt'), 'new owner data');
  let called = false;
  assert.throws(() => executePlan(p, distribution, { replace: true, runner: () => { called = true; } }), /changed after planning/);
  assert.equal(called, false); assert.equal(fs.readFileSync(path.join(target, 'owner.txt'), 'utf8'), 'new owner data');
});
test('new lock contents invalidate old replacement authorization', t => {
  const c = fixture(t); const p = createPlan(opts, distribution, root, c);
  const lock = path.join(c.project, 'skills-lock.json'); const value = '{"version":1,"skills":{"foreign":{"source":"elsewhere"}}}';
  fs.writeFileSync(lock, value);
  assert.throws(() => executePlan(p, distribution, { replace: true, runner: () => assert.fail('not allowed') }), /changed after planning/);
  assert.equal(fs.readFileSync(lock, 'utf8'), value);
});
test('package root, not just its skill folders, is protected', t => {
  const c = fixture(t); const source = sourceFixture(c);
  assert.throws(() => createPlan({ ...opts, project: source }, distribution, source, c), /overlap/);
  c.env.XDG_STATE_HOME = source;
  assert.throws(() => createPlan({ global: 'workstation', agents: 'pi' }, distribution, source, c), /overlap/);
});
test('source directory symlink aliases are refused before global or local writes', t => {
  const c = fixture(t); const source = sourceFixture(c);
  const real = path.join(c.dir, 'actual'); fs.renameSync(path.join(source, 'skills/workstation/shell-scripting'), real);
  fs.symlinkSync(real, path.join(source, 'skills/workstation/shell-scripting'));
  assert.throws(() => createPlan({ global: 'backup-restore', local: 'shell-scripting', agents: 'pi' }, distribution, source, c), /symlink/);
  assert.deepEqual(fs.readdirSync(c.home), []); assert.deepEqual(fs.readdirSync(c.project), []);
});
test('upstream-excluded source entries fail before any scope writes', t => {
  const c = fixture(t); const source = sourceFixture(c);
  fs.writeFileSync(path.join(source, 'skills/workstation/shell-scripting/metadata.json'), '{}');
  assert.throws(() => createPlan({ global: 'backup-restore', local: 'shell-scripting', agents: 'pi' }, distribution, source, c), /excludes/);
  assert.deepEqual(fs.readdirSync(c.home), []);
});
test('changed package bytes invalidate a confirmed plan', t => {
  const c = fixture(t); const source = sourceFixture(c); const p = createPlan(opts, distribution, source, c);
  fs.appendFileSync(path.join(source, 'skills/workstation/shell-scripting/SKILL.md'), '\nchanged\n');
  assert.throws(() => executePlan(p, distribution, { runner: () => assert.fail('not allowed') }), /source changed/);
});
test('source snapshots include executable bits and empty directories', t => {
  const c = fixture(t); const dir = path.join(c.dir, 'skill'); fs.mkdirSync(dir);
  fs.writeFileSync(path.join(dir, 'helper.sh'), '#!/bin/sh\nexit 0\n', { mode: 0o755 });
  fs.mkdirSync(path.join(dir, 'empty'));
  const first = tree(dir, true);
  assert.equal(first.files['helper.sh'].mode, 0o755); assert.deepEqual(first.directories, ['empty']);
  fs.chmodSync(path.join(dir, 'helper.sh'), 0o644); assert.notDeepEqual(tree(dir), first);
  fs.chmodSync(path.join(dir, 'helper.sh'), 0o755); fs.rmdirSync(path.join(dir, 'empty')); assert.notDeepEqual(tree(dir), first);
});
test('home aliases are normalized in the actual child environment', t => {
  const c = fixture(t); const alias = path.join(c.dir, 'home alias'); fs.symlinkSync(c.home, alias);
  const p = createPlan({ global: 'workstation', agents: 'pi' }, distribution, root, { ...c, home: alias });
  assert.equal(p.childEnv.HOME, c.home); assert.equal(p.jobs[0].targets[0].path, path.join(c.home, '.agents/skills/chezmoi'));
});
test('cross-plan target/lock ancestry is refused', t => {
  const c = fixture(t);
  c.env.CLAUDE_CONFIG_DIR = path.join(c.project, 'skills-lock.json');
  assert.throws(() => createPlan({ global: 'backup-restore', local: 'shell-scripting', agents: 'claude-code' }, distribution, root, c), /destinations overlap/);
});
test('unexpected global default metadata cannot pass verification', () => {
  const before = { version: 3, skills: {} };
  const after = { version: 3, skills: {}, dismissed: { foreign: true } };
  const job = { scope: 'global', lockExisted: false, names: [], lock: '/fixture/lock' };
  assert.throws(() => verifyLock(before, after, job, [], '/fixture'), /Unexpected global/);
});
test('build output cannot follow symlink ancestors outside source', t => {
  const c = fixture(t); const source = path.join(c.dir, 'source'); const outside = path.join(c.dir, 'outside');
  fs.mkdirSync(source); fs.mkdirSync(outside); fs.symlinkSync(outside, path.join(source, 'dist'));
  assert.throws(() => outputDirectory(path.join(source, 'dist/npm'), source), /symlink/);
  assert.deepEqual(fs.readdirSync(outside), []);
});
test('marked canonical content behind an alias is not deleted by the builder', t => {
  const c = fixture(t); const source = path.join(c.dir, 'source'); const skill = path.join(source, 'skills/core/valuable');
  fs.mkdirSync(skill, { recursive: true });
  fs.writeFileSync(path.join(skill, '.skills-generated.json'), '{"owner":"@tahabakhit/skills"}');
  fs.writeFileSync(path.join(skill, 'sentinel'), 'retain original');
  fs.symlinkSync(path.join(source, 'skills'), path.join(c.dir, 'alias'));
  assert.throws(() => outputDirectory(path.join(c.dir, 'alias/core/valuable'), source), /symlink/);
  assert.equal(fs.readFileSync(path.join(skill, 'sentinel'), 'utf8'), 'retain original');
});
test('package group traversal and upstream name truncation are rejected', () => {
  const group = structuredClone(distribution); group.groups[0].name = '../outside';
  assert.throws(() => validateDistribution(group, root), /group name/);
  const name = structuredClone(distribution); name.groups[0].skills[0] = 'a'.repeat(256);
  assert.throws(() => validateDistribution(name, root), /Invalid skill name/);
});
