import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parseArgs, select, selectAgents, selections, validateDistribution, skillPath } from '../lib/selection.mjs';
import { createPlan, installerArgs } from '../lib/plan.mjs';
import { checkReceipts, executePlan, verifyLock } from '../lib/install.mjs';
import { buildPackages, outputDirectory } from '../scripts/build-packages.mjs';
import { registryResult } from '../scripts/release.mjs';
import { tree } from '../lib/files.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const distribution = JSON.parse(fs.readFileSync(path.join(root, 'distribution.json')));
const hash = 'a'.repeat(64);
const core = ['discover-work', 'research-work', 'create-content', 'verify-and-stop'];
const labels = { pi: 'Pi', codex: 'Codex', 'claude-code': 'Claude Code' };
function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'taha-skills-test-'));
  t.after(() => fs.rmSync(dir, { recursive: true }));
  const home = path.join(dir, 'home'); const project = path.join(dir, 'repo with spaces');
  fs.mkdirSync(home); fs.mkdirSync(project);
  return { dir, home, project, cwd: project, env: {} };
}
function plan(t, options = {}) {
  const context = fixture(t);
  return { context, plan: createPlan({ local: 'discover-work', agents: 'pi,claude-code,codex', project: context.project, ...options }, distribution, root, context) };
}
function receipts(p, job) {
  return job.names.map(name => ({ name, status: 'installed', scope: job.scope, mode: 'copy', source: p.source, hash, agents: job.agents.map(a => labels[a]) }));
}
// Independent stand-in for the upstream contract documented in installer-contract.md.
function upstream(p, job, corrupt = false) {
  for (const target of job.targets) {
    fs.cpSync(skillPath(p.source, distribution, target.name), target.path, { recursive: true });
    if (corrupt) fs.writeFileSync(path.join(target.path, 'SKILL.md'), 'wrong bytes');
  }
  const lock = fs.existsSync(job.lock) ? JSON.parse(fs.readFileSync(job.lock)) : { version: job.scope === 'global' ? 3 : 1, skills: {}, ...(job.scope === 'global' ? { dismissed: {} } : {}) };
  for (const name of job.names) lock.skills[name] = { source: p.source, sourceType: 'local', [job.scope === 'global' ? 'skillFolderHash' : 'computedHash']: hash };
  fs.mkdirSync(path.dirname(job.lock), { recursive: true });
  fs.writeFileSync(job.lock, JSON.stringify(lock));
  return JSON.stringify(receipts(p, job));
}
function cli(args, context) {
  return spawnSync(process.execPath, [path.join(root, 'bin', 'skills.mjs'), ...args], { cwd: context.project, encoding: 'utf8', env: { ...process.env, HOME: context.home, CLAUDE_CONFIG_DIR: '', XDG_STATE_HOME: '' } });
}

test('groups select known literal owners, never every skill implicitly', () => {
  assert.deepEqual(select('core', distribution), core);
  assert.deepEqual(select('1,core,discover-work', distribution), core);
  assert.deepEqual(select('data', distribution), ['analyze-data', 'data-pipelines']);
  assert.deepEqual(select('', distribution), []);
  assert.deepEqual(select('all', distribution), distribution.groups.flatMap(g => g.skills));
  assert.deepEqual(select('macos', distribution), ['macos']);
  assert.throws(() => select('configuration', distribution), /Unknown/);
  assert.throws(() => select('core,nonexistent', distribution), /Unknown/);
  assert.throws(() => select('../core', distribution), /Unknown/);
});
test('catalog paths and provenance agree with the distribution owner, not workflow domain', () => {
  const catalog = JSON.parse(fs.readFileSync(path.join(root, 'catalog.json')));
  assert.deepEqual(catalog.skills.map(s => s.name).sort(), distribution.groups.flatMap(g => g.skills).sort());
  assert.deepEqual(distribution.groups.map(g => [g.name, g.skills.length, g.recommendedScope]), [
    ['core', 4, 'global'], ['engineering', 12, 'project'], ['content', 1, 'project'],
    ['interface-review', 1, 'project'], ['data', 2, 'project'],
    ['workstation', 4, 'global'], ['linux', 5, 'global'], ['macos', 1, 'global'], ['agents', 13, 'global']
  ]);
  for (const skill of catalog.skills) {
    const relative = path.relative(root, skillPath(root, distribution, skill.name));
    assert.equal(skill.path, relative);
    assert.equal(skill.provenance, `${relative}/PROVENANCE.json`);
    assert.equal(fs.existsSync(path.join(root, 'skills', skill.name, 'SKILL.md')), false);
  }
  for (const alias of ['configuration', 'design', 'operations', 'unslop', 'technical-writing', 'migration', 'safe-refactor', 'herdr-core', 'ketch', 'operate-systems', 'arch-package-maintenance', 'arch-update-recovery', 'rhel-fedora', 'workstation-health-triage']) {
    assert.throws(() => select(alias, distribution), /Unknown/);
    assert.equal(fs.existsSync(path.join(root, 'skills', alias)), false);
  }
});
test('argument parser fails closed on unknown, missing and repeated values', () => {
  assert.deepEqual(parseArgs(['--global', 'core', '--local', 'data', '--yes']), { global: 'core', local: 'data', yes: true });
  for (const args of [['--global'], ['--force'], ['--local', '--yes'], ['--local', 'data', '--local', 'core']]) assert.throws(() => parseArgs(args));
});
test('scope overlap and empty selection are rejected', () => {
  assert.throws(() => selections({ global: 'core', local: 'create-content' }, distribution), /one scope/);
  assert.throws(() => selections({}, distribution), /Nothing selected/);
});
test('agent IDs and numbers are explicit and deduplicated', () => {
  assert.deepEqual(selectAgents('1,2,3,pi', distribution), ['pi', 'claude-code', 'codex']);
  assert.throws(() => selectAgents('', distribution));
  assert.throws(() => selectAgents('all', distribution));
});
test('manifest names and one-owner partition are validated', () => {
  validateDistribution(distribution, root);
  const copy = structuredClone(distribution);
  copy.groups[1].skills.push('discover-work');
  assert.throws(() => validateDistribution(copy, root), /one package owner/);
});
test('Pi/Codex share canonical targets while Claude has a distinct project path', t => {
  const { context, plan: p } = plan(t);
  assert.deepEqual(p.jobs[0].targets.map(t => t.path), [path.join(context.project, '.agents/skills/discover-work'), path.join(context.project, '.claude/skills/discover-work')]);
  assert.equal(p.jobs[0].lock, path.join(context.project, 'skills-lock.json'));
  assert.deepEqual(installerArgs(p, p.jobs[0]), ['--yes', 'skills@1.7.4', 'add', root.replace(/\/$/, ''), '--skill', 'discover-work', '--agent', 'pi', 'claude-code', 'codex', '--copy', '--yes', '--json']);
});
test('global targets, Claude override and XDG lock match pinned installer contract', t => {
  const c = fixture(t);
  c.env = { CLAUDE_CONFIG_DIR: path.join(c.dir, 'claude elsewhere'), XDG_STATE_HOME: path.join(c.dir, 'state'), CODEX_HOME: path.join(c.dir, 'codex detection only') };
  const p = createPlan({ global: 'discover-work', agents: 'pi,codex,claude-code', project: c.project }, distribution, root, c);
  assert.deepEqual(p.jobs[0].targets.map(t => t.path), [path.join(c.home, '.agents/skills/discover-work'), path.join(c.dir, 'claude elsewhere/skills/discover-work')]);
  assert.equal(p.jobs[0].lock, path.join(c.dir, 'state/skills/.skill-lock.json'));
  assert.equal(installerArgs(p, p.jobs[0]).at(-1), '--global');
});
test('relative environment overrides and home/root project targets are refused', t => {
  const c = fixture(t);
  const opts = { local: 'core', agents: 'pi', project: c.project };
  for (const key of ['CLAUDE_CONFIG_DIR', 'XDG_STATE_HOME']) assert.throws(() => createPlan(opts, distribution, root, { ...c, env: { [key]: 'relative' } }), /absolute/);
  for (const project of [c.home, '/']) assert.throws(() => createPlan({ ...opts, project }, distribution, root, c), /repository directory/);
});
test('dangling target and parent symlinks are never followed or replaced', t => {
  const c = fixture(t);
  fs.symlinkSync(path.join(c.dir, 'missing'), path.join(c.project, '.agents'));
  assert.throws(() => createPlan({ local: 'core', agents: 'pi', project: c.project, replace: true }, distribution, root, c), /symlink/);
  assert.equal(fs.readlinkSync(path.join(c.project, '.agents')), path.join(c.dir, 'missing'));
});
test('source/destination overlaps are rejected before any upstream invocation', t => {
  const c = fixture(t);
  assert.throws(() => createPlan({ local: 'discover-work', agents: 'pi', project: skillPath(root, distribution, 'discover-work') }, distribution, root, c), /overlap/);
});
test('malformed, future and extension-bearing project locks are preserved', t => {
  const c = fixture(t); const lock = path.join(c.project, 'skills-lock.json');
  for (const text of ['broken', '{"version":2,"skills":{}}', '{"version":1,"skills":{},"custom":"keep"}', '{"version":1,"skills":{"foreign":null}}']) {
    fs.writeFileSync(lock, text);
    assert.throws(() => createPlan({ local: 'core', agents: 'pi', project: c.project }, distribution, root, c));
    assert.equal(fs.readFileSync(lock, 'utf8'), text);
  }
});
test('collision in either scope prevents every installer write', t => {
  const { context, plan: p } = plan(t, { global: 'verify-and-stop' });
  fs.mkdirSync(path.join(context.home, '.agents/skills/verify-and-stop'), { recursive: true });
  let called = false;
  assert.throws(() => executePlan(p, distribution, { runner: () => { called = true; }, log() {} }), /--replace/);
  assert.equal(called, false);
  assert.equal(fs.existsSync(path.join(context.project, '.agents')), false);
});
test('JSON receipts must confirm every exact name, agent, source, scope and mode', t => {
  const { plan: p } = plan(t); const job = p.jobs[0];
  const valid = receipts(p, job);
  assert.equal(checkReceipts(JSON.stringify(valid), p, job).length, 1);
  for (const patch of [{ status: 'failed' }, { name: 'unknown' }, { agents: ['Pi'] }, { agents: ['Pi', 'Codex', 'Claude Code', 'Unknown'] }, { source: '/wrong' }, { scope: 'global' }, { mode: 'symlink' }, { hash: null }]) {
    assert.throws(() => checkReceipts(JSON.stringify([{ ...valid[0], ...patch }]), p, job));
  }
  assert.throws(() => checkReceipts(JSON.stringify([...valid, ...valid]), p, job));
  assert.throws(() => checkReceipts('not JSON', p, job));
});
test('successful copies and lock entries are independently checked', t => {
  const { context, plan: p } = plan(t);
  executePlan(p, distribution, { runner: () => {
    assert.equal(fs.existsSync(`${p.jobs[0].lock}.taha-install`), false);
    assert.ok(!Object.hasOwn(p.jobs[0], 'guard'));
    return upstream(p, p.jobs[0]);
  }, log() {} });
  assert.ok(fs.existsSync(path.join(context.project, '.claude/skills/discover-work/LICENSE-MATT')));
  assert.equal(fs.existsSync(`${p.jobs[0].lock}.taha-install`), false);
});
test('successful exit/receipts do not hide wrong destination bytes', t => {
  const { plan: p } = plan(t);
  assert.throws(() => executePlan(p, distribution, { runner: () => upstream(p, p.jobs[0], true), log() {} }), /differ/);
  assert.equal(fs.existsSync(`${p.jobs[0].lock}.taha-install`), false);
});
test('legacy guard files neither block installs nor get changed', t => {
  const { plan: p } = plan(t);
  const legacy = `${p.jobs[0].lock}.taha-install`;
  fs.writeFileSync(legacy, 'left by an older wrapper');
  executePlan(p, distribution, { runner: () => upstream(p, p.jobs[0]), log() {} });
  assert.equal(fs.readFileSync(legacy, 'utf8'), 'left by an older wrapper');
  assert.ok(!Object.hasOwn(p.jobs[0], 'guard'));
});
test('later scope failure does not erase verified earlier work', t => {
  const { context, plan: p } = plan(t, { global: 'verify-and-stop' }); const messages = [];
  assert.throws(() => executePlan(p, distribution, { runner: args => {
    if (!args.includes('--global')) throw new Error('local fixture failure');
    return upstream(p, p.jobs[0]);
  }, log: s => messages.push(s) }), /local fixture/);
  assert.match(messages[0], /Verified global/);
  assert.ok(fs.existsSync(path.join(context.home, '.agents/skills/verify-and-stop/SKILL.md')));
  assert.equal(fs.existsSync(path.join(context.project, '.agents/skills/discover-work')), false);
});
test('lock preservation checks detect lost or changed unrelated entries', t => {
  const { context, plan: p } = plan(t); const job = p.jobs[0];
  const foreign = { source: '../foreign', sourceType: 'local', computedHash: 'kept' };
  const before = { version: 1, skills: { foreign } };
  const after = { version: 1, skills: { foreign: { ...foreign, source: path.resolve(context.project, '../foreign') }, 'discover-work': { source: p.source, sourceType: 'local', computedHash: hash } } };
  verifyLock(before, after, job, receipts(p, job), context.project);
  delete after.skills.foreign;
  assert.throws(() => verifyLock(before, after, job, receipts(p, job), context.project), /unrelated/);
});
test('noninteractive CLI cannot silently choose scope or install', t => {
  const c = fixture(t);
  const result = cli([], c);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Non-interactive/);
  assert.deepEqual(fs.readdirSync(c.home), []);
});
test('help/list/version and dry run are network-free and leave no installation files', t => {
  const c = fixture(t);
  for (const args of [['--help'], ['--version'], ['--list'], ['--local', 'data', '--agents', 'pi,codex', '--dry-run']]) {
    const result = cli(args, c);
    assert.equal(result.status, 0, result.stderr);
  }
  assert.deepEqual(fs.readdirSync(c.project), []);
  assert.deepEqual(fs.readdirSync(c.home), []);
});
test('domain packages preserve the complete canonical skill trees and install scope', t => {
  const c = fixture(t); const rows = buildPackages(path.join(c.dir, 'built'));
  const source = JSON.parse(fs.readFileSync(path.join(root, 'package.json')));
  assert.deepEqual(rows.map(r => r.name), [...distribution.groups.map(g => `@tahabakhit/skills-${g.name}`), source.name]);
  for (const row of rows.slice(0, -1)) {
    const pkg = JSON.parse(fs.readFileSync(path.join(row.dir, 'package.json')));
    const group = distribution.groups.find(g => pkg.name === `@tahabakhit/skills-${g.name}`);
    assert.equal(pkg.version, source.version); assert.equal(pkg.publishConfig.access, 'public');
    assert.equal(pkg.scripts, undefined); assert.equal(pkg.dependencies, undefined);
    const readme = fs.readFileSync(path.join(row.dir, 'README.md'), 'utf8');
    const nativeCommand = readme.match(/Native group source: `([^`]+)`/)[1];
    assert.equal(nativeCommand.endsWith(' --global'), group.recommendedScope === 'global');
    const result = spawnSync(process.execPath, [path.join(row.dir, 'bin/skills.mjs'), '--list'], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    const bundled = JSON.parse(fs.readFileSync(path.join(row.dir, 'distribution.json')));
    assert.deepEqual(bundled.groups, [group]);
    assert.deepEqual(fs.readdirSync(path.join(row.dir, 'skills')), [group.name]);
    assert.deepEqual(tree(path.join(row.dir, 'skills', group.name)), tree(path.join(root, 'skills', group.name)));
  }
});
test('builder refuses unowned or symlinked output without deleting evidence', t => {
  const c = fixture(t); const out = path.join(c.dir, 'unowned'); fs.mkdirSync(out); fs.writeFileSync(path.join(out, 'keep'), 'owner work');
  assert.throws(() => outputDirectory(out), /unowned/);
  assert.equal(fs.readFileSync(path.join(out, 'keep'), 'utf8'), 'owner work');
  const alias = path.join(c.dir, 'alias'); fs.symlinkSync(out, alias);
  assert.throws(() => outputDirectory(alias), /symlink/);
});
test('registry retries distinguish identical immutable versions, absence and auth failure', () => {
  assert.equal(registryResult({ status: 0, stdout: '"sha512-same"' }, 'sha512-same'), 'identical');
  assert.equal(registryResult({ status: 1, stdout: '{"error":{"code":"E404"}}' }, 'sha512-same'), 'missing');
  assert.throws(() => registryResult({ status: 0, stdout: '"different"' }, 'sha512-same'), /different bytes/);
  assert.throws(() => registryResult({ status: 1, stdout: '{"error":{"code":"E401"}}' }, 'sha512-same'), /E401/);
  assert.throws(() => registryResult({ status: 1, stdout: 'not JSON' }, ''), /unreadable/);
});
