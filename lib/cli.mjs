import fs from 'node:fs';
import path from 'node:path';
import { createInterface } from 'node:readline/promises';
import { parseArgs, select, selectAgents, selections, validateDistribution } from './selection.mjs';
import { createPlan, inspectPlan, installerArgs } from './plan.mjs';
import { executePlan } from './install.mjs';

export const help = `Usage: npx @tahabakhit/skills [options]

No options: interactively choose global and repository-local groups or skills.
  --global core,engineering  Groups, group numbers, skill names, or all
  --local data,content       Select different skills for the repository
  --project PATH            Repository directory (default: current directory)
  --agents pi,codex         pi, claude-code, codex (comma-separated)
  --dry-run                 Show the plan without installing or downloading
  --yes                     Confirm this explicit plan without prompting
  --replace                 Permit replacement of selected existing directories/lock entries
  --list                    List groups and individual skills, no network or writes
  --version                 Print this package version
  --help                    Show this help

Examples:
  npx @tahabakhit/skills
  npx @tahabakhit/skills --global core --local data --agents pi,codex --dry-run
  npx @tahabakhit/skills --local analyze-data,document-review --agents claude-code --yes

The wrapper calls pinned Vercel Skills CLI with explicit names, agents and copy mode.
It does not install all skills by default. Existing symlinks and unsafe locks are refused.
Use --replace only after checking ownership. Installs are not transactional across scopes.
`;

export function describe(distribution, log = console.log) {
  distribution.groups.forEach((group, i) => {
    log(`${i + 1}. ${group.name} (${group.skills.length}): ${group.description}`);
    log(`   ${group.skills.join(', ')}`);
  });
}
export function printPlan(plan, log = console.log) {
  log('\nInstallation plan (nothing has been changed):');
  for (const job of plan.jobs) {
    log(`${job.scope}: ${job.names.join(', ')}`);
    log(`  Agents: ${job.agents.join(', ')}`);
    for (const target of job.targets) log(`  Copy: ${target.path}`);
    log(`  Lock: ${job.lock}`);
    for (const collision of job.collisions) log(`  EXISTING: ${collision}`);
    log(`  Command: npx ${installerArgs(plan, job).map(s => JSON.stringify(s)).join(' ')}`);
  }
  log('Copies remain usable if the npx cache is cleared. Re-run this CLI to update local-source installs.');
}
async function askValid(rl, signal, question, validate) {
  while (true) {
    const answer = (await rl.question(question, { signal })).trim();
    try { validate(answer); return answer; } catch (error) { console.error(error.message); }
  }
}
async function choose(options, distribution, rl, signal) {
  describe(distribution);
  if (!Object.hasOwn(options, 'global') && !Object.hasOwn(options, 'local')) {
    options.global = await askValid(rl, signal, '\nGlobally: groups/numbers or skill names, comma-separated (Enter: none): ', s => select(s, distribution));
    options.local = await askValid(rl, signal, 'In this repository (Enter: none): ', s => {
      if (select(options.global, distribution).length || select(s, distribution).length) selections({ ...options, local: s }, distribution);
    });
  }
  if (!select(options.global, distribution).length && !select(options.local, distribution).length) return false;
  if (select(options.local, distribution).length && !options.project) {
    options.project = (await rl.question(`Repository path [${process.cwd()}]: `, { signal })).trim() || process.cwd();
  }
  if (!options.agents) {
    const menu = distribution.agents.map((a, i) => `${i + 1}=${a}`).join(', ');
    options.agents = await askValid(rl, signal, `Agents (${menu}), comma-separated: `, s => selectAgents(s, distribution));
  }
  return true;
}
async function confirm(plan, options, distribution, rl, signal) {
  if (options.yes) return true;
  if (!rl) throw new Error('Nothing installed. Use --yes to confirm a non-interactive plan.');
  if ((await rl.question('Type install to continue, or Enter to cancel: ', { signal })).trim() !== 'install') return false;
  inspectPlan(plan, distribution);
  if (!plan.jobs.some(j => j.collisions.length) || options.replace) return true;
  const response = await rl.question('Existing selections will be replaced. Type replace after checking their owner: ', { signal });
  options.replace = response.trim() === 'replace';
  return options.replace;
}
function needsPrompt(options) {
  return (!Object.hasOwn(options, 'global') && !Object.hasOwn(options, 'local')) || !options.agents;
}
export async function main(args, root) {
  const options = parseArgs(args);
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  if (options.version) return console.log(`${pkg.name}@${pkg.version}`);
  const distribution = validateDistribution(JSON.parse(fs.readFileSync(path.join(root, 'distribution.json'), 'utf8')), root);
  if (options.help) return console.log(help.replaceAll('@tahabakhit/skills', pkg.name).replace('--global core --local data', `--global ${distribution.groups[0].name}`).replace('--local analyze-data,document-review', `--local ${distribution.groups[0].skills[0]}`));
  if (options.list) return describe(distribution);
  if (!process.stdin.isTTY && needsPrompt(options)) throw new Error('Non-interactive input: specify --global/--local and --agents. Use --dry-run or --yes.');
  let rl;
  const controller = new AbortController();
  try {
    if (process.stdin.isTTY && (needsPrompt(options) || !options.yes)) {
      rl = createInterface({ input: process.stdin, output: process.stdout });
      rl.once('close', () => controller.abort());
      rl.on('SIGINT', () => controller.abort());
      if (needsPrompt(options) && !await choose(options, distribution, rl, controller.signal)) return console.log('Cancelled. Nothing selected.');
    }
    const plan = createPlan(options, distribution, root);
    printPlan(plan);
    if (options['dry-run']) return;
    if (!await confirm(plan, options, distribution, rl, controller.signal)) return console.log('Cancelled. Nothing installed.');
    executePlan(plan, distribution, { replace: options.replace });
  } finally { rl?.close(); }
}
