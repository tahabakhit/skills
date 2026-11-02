import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { isDeepStrictEqual } from 'node:util';
import { inspectPlan, installerArgs, lstat, readLock } from './plan.mjs';
import { tree } from './files.mjs';

const labels = { pi: 'Pi', 'claude-code': 'Claude Code', codex: 'Codex' };
export function checkReceipts(text, plan, job) {
  const receipts = JSON.parse(text);
  if (!Array.isArray(receipts) || receipts.length !== job.names.length) throw new Error('Incomplete installer receipt');
  for (const name of job.names) {
    const rows = receipts.filter(r => r.name === name);
    const row = rows[0];
    if (rows.length !== 1 || row.status !== 'installed' || row.mode !== 'copy' || row.scope !== job.scope) throw new Error(`Installer did not confirm a complete copied install: ${name}`);
    const expected = job.agents.map(a => labels[a]).sort();
    if (!isDeepStrictEqual(row.agents?.slice().sort(), expected)) throw new Error(`Installer omitted or added agent targets: ${name}`);
    if (row.source !== plan.source || !/^[a-f0-9]{64}$/.test(row.hash)) throw new Error(`Installer source identity missing: ${name}`);
  }
  return receipts;
}
function normalized(entry, project) {
  if (!entry) return entry;
  const copy = structuredClone(entry);
  if (copy.sourceType === 'local') copy.source = path.resolve(project, copy.source);
  return copy;
}
function verifyEntries(after, job, receipts, project) {
  for (const receipt of receipts) {
    const entry = after.skills[receipt.name];
    const hash = job.scope === 'global' ? entry?.skillFolderHash : entry?.computedHash;
    if (entry?.sourceType !== 'local' || hash !== receipt.hash || path.resolve(project, entry.source) !== receipt.source) throw new Error(`Missing or stale installed identity in ${job.lock}: ${receipt.name}`);
  }
}
export function verifyLock(before, after, job, receipts, project) {
  const beforeOther = { ...before }; delete beforeOther.skills;
  const afterOther = { ...after }; delete afterOther.skills;
  if (job.scope === 'global' && !job.lockExisted) {
    if (!isDeepStrictEqual(afterOther.dismissed, {})) throw new Error('Unexpected global lock defaults');
    delete afterOther.dismissed;
  }
  if (!isDeepStrictEqual(beforeOther, afterOther)) throw new Error(`Installer changed unrelated lock metadata: ${job.lock}`);
  for (const [name, entry] of Object.entries(before.skills)) {
    if (job.names.includes(name)) continue;
    if (!isDeepStrictEqual(normalized(entry, project), normalized(after.skills[name], project))) throw new Error(`Installer changed an unrelated lock entry: ${name}`);
  }
  const allowed = new Set([...Object.keys(before.skills), ...job.names]);
  if (Object.keys(after.skills).some(n => !allowed.has(n))) throw new Error(`Unexpected entries added to ${job.lock}`);
  verifyEntries(after, job, receipts, project);
}
export function runInstaller(args, cwd, overrides = {}) {
  if (process.platform === 'win32') throw new Error('This wrapper is currently verified on Linux. On Windows use Vercel Skills CLI directly.');
  const result = spawnSync('npx', args, { cwd, env: { ...process.env, ...overrides }, stdio: ['inherit', 'pipe', 'inherit'], encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Skills CLI failed (${result.signal ?? result.status}); some targets may already have changed. Inspect before retrying.`);
  return result.stdout;
}
function verifyCopies(plan, job, expected) {
  for (const target of job.targets) {
    if (!isDeepStrictEqual(tree(path.join(plan.source, 'skills', target.name), true), expected[target.name])) throw new Error('Package source changed during installation');
    if (!isDeepStrictEqual(tree(target.path), expected[target.name])) throw new Error(`Installed files differ from the package: ${target.path}`);
  }
}
function executeJob(plan, job, distribution, replace, runner) {
  inspectPlan(plan, distribution);
  if (job.collisions.length && !replace) throw new Error('Existing skills or lock entries require explicit --replace. No installer was started for this scope.');
  const guard = job.guard;
  fs.mkdirSync(path.dirname(guard), { recursive: true });
  const fd = fs.openSync(guard, 'wx');
  job.guardIdentity = fs.fstatSync(fd);
  try {
    inspectPlan(plan, distribution);
    if (job.collisions.length && !replace) throw new Error('Selection changed while waiting for the installer guard. Inspect the plan again.');
    const before = readLock(job.lock, job.scope);
    const expected = plan.sourceTrees;
    fs.writeFileSync(fd, `pid=${process.pid}\n`);
    const receipts = checkReceipts(runner(installerArgs(plan, job), plan.project, plan.childEnv), plan, job);
    verifyCopies(plan, job, expected);
    if (!lstat(job.lock)) throw new Error(`Installer did not write its lock: ${job.lock}`);
    verifyLock(before, readLock(job.lock, job.scope), job, receipts, plan.project);
  } finally {
    fs.closeSync(fd);
    const stat = lstat(guard);
    if (stat?.ino === job.guardIdentity.ino && stat.dev === job.guardIdentity.dev) fs.unlinkSync(guard);
    delete job.guardIdentity;
  }
}
export function executePlan(plan, distribution, { replace = false, runner = runInstaller, log = console.log } = {}) {
  inspectPlan(plan, distribution);
  if (!replace && plan.jobs.some(j => j.collisions.length)) throw new Error('Existing skills or lock entries require explicit --replace. Nothing installed.');
  for (const job of plan.jobs) {
    executeJob(plan, job, distribution, replace, runner);
    job.completed = true;
    log(`Verified ${job.scope}: ${job.names.length} skills for ${job.agents.join(', ')} (files, receipts and lock).`);
  }
}
