import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { validateDistribution, skillPath } from '../lib/selection.mjs';
import { tree } from '../lib/files.mjs';
import { overlaps, safePath } from '../lib/plan.mjs';

export const root = fileURLToPath(new URL('../', import.meta.url));
export function outputDirectory(dir, source = root) {
  dir = path.resolve(dir);
  source = fs.realpathSync(source);
  safePath(dir, path.parse(dir).root);
  const generated = path.join(source, 'dist');
  const underGenerated = path.relative(generated, dir);
  const allowed = underGenerated === '' || (!underGenerated.startsWith('..') && !path.isAbsolute(underGenerated));
  if (overlaps(dir, source) && !allowed) throw new Error('Build output overlaps canonical source');
  if (fs.existsSync(dir)) {
    if (fs.lstatSync(dir).isSymbolicLink()) throw new Error(`Build output is a symlink: ${dir}`);
    const marker = path.join(dir, '.skills-generated.json');
    if (!fs.existsSync(marker) || JSON.parse(fs.readFileSync(marker)).owner !== '@tahabakhit/skills') throw new Error(`Refusing to replace unowned output: ${dir}`);
  }
  if (overlaps(dir, path.join(source, 'skills')) || dir === source) throw new Error('Build output overlaps canonical source');
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, '.skills-generated.json'), JSON.stringify({ owner: '@tahabakhit/skills' }) + '\n');
}
export function buildPackages(out = path.join(root, 'dist', 'npm'), source = root) {
  const pkg = JSON.parse(fs.readFileSync(path.join(source, 'package.json')));
  const distribution = validateDistribution(JSON.parse(fs.readFileSync(path.join(source, 'distribution.json'))), source);
  outputDirectory(out, source);
  const packages = [];
  for (const group of distribution.groups) {
    const dir = path.join(out, group.name);
    fs.mkdirSync(dir, { recursive: true });
    for (const part of ['bin', 'lib', 'LICENSE']) fs.cpSync(path.join(source, part), path.join(dir, part), { recursive: true });
    for (const name of group.skills) {
      const folder = skillPath(source, distribution, name);
      safePath(folder, source);
      tree(folder, true); // Refuse unsupported/excluded inputs before copying.
      fs.cpSync(folder, skillPath(dir, distribution, name), { recursive: true });
    }
    const manifest = {
      name: `@tahabakhit/skills-${group.name}`, version: pkg.version, description: group.description,
      license: pkg.license, author: pkg.author, repository: pkg.repository, homepage: pkg.homepage,
      engines: pkg.engines, publishConfig: pkg.publishConfig,
      bin: { [`taha-skills-${group.name}`]: 'bin/skills.mjs' },
      files: ['bin', 'lib', 'skills', 'distribution.json', 'LICENSE', 'README.md'], pi: { skills: ['./skills'] }
    };
    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify(manifest, null, 2) + '\n');
    fs.writeFileSync(path.join(dir, 'distribution.json'), JSON.stringify({ ...distribution, groups: [group] }, null, 2) + '\n');
    fs.writeFileSync(path.join(dir, 'README.md'), `# ${manifest.name}\n\n${group.description}.\n\nContains: ${group.skills.join(', ')}. Every folder retains its notices, provenance and references.\n\nNative group source: \`npx skills add https://github.com/tahabakhit/skills/tree/main/skills/${group.name} --skill "*" -a pi${group.recommendedScope === 'global' ? ' --global' : ''}\`. The optional compatibility selector is \`npx ${manifest.name}\`, or \`npx ${manifest.name} --help\` for explicit global/project options.\n\nNo automatic installation hook. The selector invokes Vercel ${distribution.installer} after confirmation. It copies skills, refuses existing symlinks, and requires explicit consent to replace existing selections. Do not install the same skill from this package and the umbrella package.\n\nWorkflow evidence and limits: https://github.com/tahabakhit/skills/blob/main/CATALOG.md\n\nThese are workflow procedures, not proof of improved model performance.\n`);
    packages.push({ name: manifest.name, version: pkg.version, dir });
  }
  return [...packages, { name: pkg.name, version: pkg.version, dir: source }];
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try { console.log(JSON.stringify(buildPackages(), null, 2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
