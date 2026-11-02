import path from 'node:path';
import fs from 'node:fs';

const values = new Set(['global', 'local', 'agents', 'project']);
const switches = new Set(['yes', 'replace', 'dry-run', 'list', 'help', 'version']);
export function parseArgs(args) {
  const options = {};
  for (let i = 0; i < args.length; i++) {
    const flag = args[i].replace(/^--/, '');
    if (switches.has(flag) && args[i].startsWith('--')) options[flag] = true;
    else if (values.has(flag) && args[i].startsWith('--')) {
      if (!args[i + 1] || args[i + 1].startsWith('--')) throw new Error(`Missing value for --${flag}`);
      if (Object.hasOwn(options, flag)) throw new Error(`Repeated --${flag}`);
      options[flag] = args[++i];
    } else throw new Error(`Unknown argument: ${args[i]}`);
  }
  return options;
}

export function split(value = '') {
  return value.split(',').map(s => s.trim()).filter(Boolean);
}

export function select(value, distribution) {
  const names = distribution.groups.flatMap(g => g.skills);
  const selected = new Set();
  for (const token of split(value)) {
    const group = distribution.groups.find((g, i) => g.name === token || String(i + 1) === token);
    const matches = token === 'all' ? names : group?.skills ?? (names.includes(token) ? [token] : null);
    if (!matches) throw new Error(`Unknown group or skill: ${token}. Use --list.`);
    for (const name of matches) selected.add(name);
  }
  return names.filter(name => selected.has(name));
}

export function selectAgents(value, distribution) {
  const agents = split(value).map(token => distribution.agents[Number(token) - 1] ?? token);
  if (!agents.length) throw new Error('Choose at least one agent. Use --agents pi,claude-code,codex.');
  for (const agent of agents) if (!distribution.agents.includes(agent)) throw new Error(`Unknown agent: ${agent}`);
  return [...new Set(agents)];
}

export function validateDistribution(distribution, root) {
  if (distribution.schemaVersion !== 1 || distribution.installer !== 'skills@1.7.4') throw new Error('Unsupported distribution manifest');
  const groups = distribution.groups.map(g => g.name);
  if (groups.some(name => !/^[a-z][a-z0-9-]{0,63}$/.test(name) || name === 'all')) throw new Error('Invalid package group name');
  if (new Set(groups).size !== groups.length) throw new Error('Duplicate package group');
  const names = distribution.groups.flatMap(g => g.skills);
  if (new Set(names).size !== names.length) throw new Error('Skills must have exactly one package owner');
  for (const name of names) {
    if (typeof name !== 'string' || name.length > 255 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) throw new Error(`Invalid skill name: ${name}`);
    const entry = fs.readFileSync(path.join(root, 'skills', name, 'SKILL.md'), 'utf8');
    if (!entry.startsWith(`---\nname: ${name}\n`)) throw new Error(`Entrypoint name mismatch: ${name}`);
  }
  return distribution;
}

export function selections(options, distribution) {
  const global = select(options.global, distribution);
  const local = select(options.local, distribution);
  const overlap = global.filter(name => local.includes(name));
  if (overlap.length) throw new Error(`Choose one scope per skill: ${overlap.join(', ')}`);
  if (!global.length && !local.length) throw new Error('Nothing selected. Use --global and/or --local, or run interactively.');
  return { global, local };
}
