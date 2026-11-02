import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { isDeepStrictEqual } from 'node:util';
import { selections, selectAgents, skillPath } from './selection.mjs';
import { tree, fingerprint } from './files.mjs';

export function lstat(file) {
  try { return fs.lstatSync(file); } catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}
export function object(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
export function overlaps(a, b) {
  const inside = (x, y) => { const r = path.relative(x, y); return r === '' || (!r.startsWith(`..${path.sep}`) && r !== '..' && !path.isAbsolute(r)); };
  return inside(a, b) || inside(b, a);
}
function absoluteOverride(value, fallback, name) {
  const result = value || fallback;
  if (!path.isAbsolute(result) || !result.trim()) throw new Error(`${name} must be an absolute path`);
  return result;
}
export function safePath(target, root) {
  let current = target;
  while (current !== path.dirname(current)) {
    const stat = lstat(current);
    if (stat?.isSymbolicLink()) throw new Error(`Refusing a managed or dangling symlink: ${current}. Reconcile its owner separately.`);
    if (current !== target && stat && !stat.isDirectory()) throw new Error(`Parent is not a directory: ${current}`);
    if (current === root) break;
    current = path.dirname(current);
  }
}
export function readLock(file, scope) {
  const stat = lstat(file);
  if (!stat) return { version: scope === 'global' ? 3 : 1, skills: {} };
  if (stat.nlink > 1) throw new Error(`Refusing a hard-linked lock: ${file}. Reconcile its owner separately.`);
  if (stat.size > 5_000_000) throw new Error(`Lock exceeds 5 MB: ${file}`);
  const lock = JSON.parse(fs.readFileSync(file, 'utf8'));
  const version = scope === 'global' ? 3 : 1;
  if (!object(lock) || lock.version !== version || !object(lock.skills)) throw new Error(`Unsupported or malformed lock: ${file}`);
  if (scope === 'project' && Object.keys(lock).some(k => !['version', 'skills'].includes(k))) throw new Error(`Project lock has extension fields that upstream would discard: ${file}`);
  for (const entry of Object.values(lock.skills)) {
    if (!object(entry) || typeof entry.source !== 'string') throw new Error(`Malformed lock entry: ${file}`);
  }
  return lock;
}
function environment(options, context) {
  const env = context.env ?? process.env;
  const home = fs.realpathSync(context.home ?? os.homedir());
  const project = fs.realpathSync(path.resolve(options.project ?? context.cwd ?? process.cwd()));
  if (!fs.statSync(project).isDirectory()) throw new Error('Project must be a directory');
  const claude = absoluteOverride(env.CLAUDE_CONFIG_DIR?.trim(), path.join(home, '.claude'), 'CLAUDE_CONFIG_DIR');
  const state = absoluteOverride(env.XDG_STATE_HOME, path.join(home, '.agents'), 'XDG_STATE_HOME');
  const globalLock = env.XDG_STATE_HOME ? path.join(state, 'skills', '.skill-lock.json') : path.join(state, '.skill-lock.json');
  return { home, project, claude, globalLock, childEnv: { HOME: home, CLAUDE_CONFIG_DIR: claude, XDG_STATE_HOME: env.XDG_STATE_HOME || '' } };
}
export function createPlan(options, distribution, source, context = {}) {
  const selected = selections(options, distribution);
  const agents = selectAgents(options.agents, distribution);
  const { home, project, claude, globalLock, childEnv } = environment(options, context);
  if (selected.local.length && (project === home || project === path.parse(project).root)) throw new Error('Choose a repository directory, not your home or filesystem root');
  const jobs = [];
  for (const [scope, names] of [['global', selected.global], ['project', selected.local]]) {
    if (!names.length) continue;
    const base = scope === 'global' ? home : project;
    const target = agent => agent === 'claude-code' ? path.join(scope === 'global' ? claude : path.join(project, '.claude'), 'skills') : path.join(base, '.agents', 'skills');
    const targets = [...new Set(agents.map(target))].flatMap(dir => names.map(name => ({ name, path: path.join(dir, name) })));
    const lock = scope === 'global' ? globalLock : path.join(project, 'skills-lock.json');
    jobs.push({ scope, names, agents, targets, lock, base });
  }
  const plan = { source: fs.realpathSync(source), project, home, childEnv, installer: distribution.installer, jobs };
  return inspectPlan(plan, distribution);
}
function jobPaths(job) {
  return [...job.targets.map(t => t.path), job.lock];
}
function checkPaths(plan) {
  const all = plan.jobs.flatMap(jobPaths);
  for (const job of plan.jobs) for (const file of jobPaths(job)) {
    safePath(file, job.base);
    if (overlaps(plan.source, file)) throw new Error(`Source/destination overlap: ${file}`);
  }
  for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
    if (overlaps(all[i], all[j])) throw new Error(`Planned destinations overlap: ${all[i]} and ${all[j]}`);
  }
}
function snapshotSources(plan, distribution) {
  const snapshots = {};
  for (const name of distribution.groups.flatMap(g => g.skills)) {
    const dir = skillPath(plan.source, distribution, name);
    safePath(dir, plan.source);
    snapshots[name] = tree(dir, true);
  }
  if (plan.sourceTrees && !isDeepStrictEqual(plan.sourceTrees, snapshots)) throw new Error('Package source changed after planning. Create and inspect a fresh plan.');
  plan.sourceTrees = snapshots;
}
function authorize(job) {
  const paths = [...job.targets.map(t => t.path), job.lock];
  const snapshots = Object.fromEntries(paths.map(file => [file, fingerprint(file)]));
  if (job.authorized && !isDeepStrictEqual(job.authorized, snapshots)) throw new Error('Destinations or lock changed after planning. Create and inspect a fresh plan, even with --replace.');
  job.authorized = snapshots;
  job.lockExisted = Boolean(lstat(job.lock));
  const lock = readLock(job.lock, job.scope);
  job.collisions = job.targets.filter(t => lstat(t.path)).map(t => t.path);
  job.collisions.push(...job.names.filter(n => Object.hasOwn(lock.skills, n)).map(n => `${job.lock}#${n}`));
}
export function inspectPlan(plan, distribution) {
  checkPaths(plan);
  snapshotSources(plan, distribution);
  for (const job of plan.jobs.filter(j => !j.completed)) authorize(job);
  return plan;
}
export function installerArgs(plan, job) {
  return ['--yes', plan.installer, 'add', plan.source, '--skill', ...job.names, '--agent', ...job.agents, '--copy', '--yes', '--json', ...(job.scope === 'global' ? ['--global'] : [])];
}
