import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { buildPackages, outputDirectory, root } from './build-packages.mjs';
import { safePath } from '../lib/plan.mjs';

const registry = 'https://registry.npmjs.org';
function run(command, args, cwd = root, capture = false) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit', maxBuffer: 32 * 1024 * 1024 });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${args[0]} failed (${result.status}). Publication stopped; already published versions remain immutable.`);
  return result.stdout;
}
export function registryResult(result, integrity) {
  if (result.error) throw result.error;
  let data;
  try { data = JSON.parse(result.stdout); } catch { throw new Error('Registry returned an unreadable response'); }
  if (result.status === 0) {
    if (data !== integrity) throw new Error('This version already exists with different bytes. Choose a new version; do not overwrite it.');
    return 'identical';
  }
  if (data?.error?.code === 'E404') return 'missing';
  throw new Error(`Registry check failed: ${data?.error?.code ?? result.status}`);
}
export function packAll(source = root) {
  const packages = buildPackages(path.join(source, 'dist', 'npm'), source);
  const destination = path.join(source, 'dist', 'tarballs');
  outputDirectory(destination, source);
  return packages.map(pkg => {
    const rows = JSON.parse(run('npm', ['pack', '--ignore-scripts', '--pack-destination', destination, '--json'], pkg.dir, true));
    const row = rows[0];
    if (rows.length !== 1 || row.name !== pkg.name || row.version !== pkg.version) throw new Error('Unexpected packed package identity');
    return { name: pkg.name, version: pkg.version, file: path.join(destination, row.filename), integrity: row.integrity, shasum: row.shasum, entries: row.entryCount };
  });
}
function requirePublicationAccess() {
  if (run('git', ['status', '--porcelain'], root, true).trim()) throw new Error('Commit and verify source before publishing. The checkout must be clean.');
  run('npm', ['whoami', `--registry=${registry}`]);
  run('gitleaks', ['git', '--log-opts=HEAD', '--redact', '--no-banner', root]);
}
function registryState(row) {
  const result = spawnSync('npm', ['view', `${row.name}@${row.version}`, 'dist.integrity', '--json', `--registry=${registry}`], { encoding: 'utf8' });
  return registryResult(result, row.integrity);
}
function publish(rows, dryRun) {
  for (const row of rows) {
    if (!dryRun && registryState(row) === 'identical') {
      console.log(`Already published with identical bytes: ${row.name}@${row.version}`);
      continue;
    }
    run('npm', ['publish', row.file, '--ignore-scripts', '--access', 'public', `--registry=${registry}`, ...(dryRun ? ['--dry-run'] : [])]);
    if (!dryRun && registryState(row) !== 'identical') throw new Error(`Published package not yet verifiable: ${row.name}; inspect before retrying.`);
  }
}
export function validateArtifacts(manifest, head, source = root) {
  if (manifest.schemaVersion !== 1 || manifest.sourceHead !== head || manifest.sourceClean !== true) throw new Error('Artifacts are not approved for this clean commit. Run publish:dry-run after committing.');
  const pkg = JSON.parse(fs.readFileSync(path.join(source, 'package.json')));
  const distribution = JSON.parse(fs.readFileSync(path.join(source, 'distribution.json')));
  const expected = [...distribution.groups.map(g => `@tahabakhit/skills-${g.name}`), pkg.name].sort();
  const names = manifest.packages.map(p => p.name).sort();
  if (JSON.stringify(names) !== JSON.stringify(expected)) throw new Error('Approved package set differs from current distribution');
  for (const row of manifest.packages) {
    safePath(row.file, source);
    if (row.version !== pkg.version || path.dirname(row.file) !== path.join(source, 'dist', 'tarballs')) throw new Error('Approved artifact path/version mismatch');
    const integrity = `sha512-${crypto.createHash('sha512').update(fs.readFileSync(row.file)).digest('base64')}`;
    if (integrity !== row.integrity) throw new Error(`Approved artifact changed: ${row.name}`);
  }
  return manifest.packages;
}
export function withArtifacts(rows, consume) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'taha-skills-release-'));
  try {
    const frozen = rows.map((row, index) => {
      // Gitleaks recognizes .tar.gz but this version skips the equivalent .tgz suffix.
      const file = path.join(dir, `${index}.tar.gz`);
      fs.copyFileSync(row.file, file, fs.constants.COPYFILE_EXCL);
      const integrity = `sha512-${crypto.createHash('sha512').update(fs.readFileSync(file)).digest('base64')}`;
      if (integrity !== row.integrity) throw new Error(`Artifact changed before freezing: ${row.name}`);
      return { ...row, file };
    });
    return consume(frozen, dir);
  } finally { fs.rmSync(dir, { recursive: true }); }
}
export function scanArtifacts(dir) {
  run('gitleaks', ['dir', '--redact', '--no-banner', '--max-archive-depth', '2', dir]);
}
function publishArtifacts(rows, dryRun) {
  return withArtifacts(rows, (frozen, dir) => { scanArtifacts(dir); publish(frozen, dryRun); });
}
function approved() {
  const file = path.join(root, 'dist', 'approved-release.json');
  safePath(file, root);
  const manifest = JSON.parse(fs.readFileSync(file, 'utf8'));
  return validateArtifacts(manifest, run('git', ['rev-parse', 'HEAD'], root, true).trim());
}
function prepare() {
  const manifest = {
    schemaVersion: 1,
    sourceHead: run('git', ['rev-parse', 'HEAD'], root, true).trim(),
    sourceClean: !run('git', ['status', '--porcelain'], root, true).trim(),
    packages: packAll()
  };
  fs.writeFileSync(path.join(root, 'dist', 'release.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(JSON.stringify(manifest, null, 2));
  return manifest;
}
export function release(mode) {
  if (!['--pack', '--dry-run', '--publish'].includes(mode)) throw new Error('Use --pack, --dry-run or --publish');
  if (mode === '--publish') {
    requirePublicationAccess();
    const rows = approved(); publishArtifacts(rows, false);
    return rows;
  }
  const manifest = prepare();
  if (mode === '--dry-run') {
    publishArtifacts(manifest.packages, true);
    fs.writeFileSync(path.join(root, 'dist', 'approved-release.json'), JSON.stringify(manifest, null, 2) + '\n');
    console.log(manifest.sourceClean ? 'Exact tarballs approved for this clean commit.' : 'Dry run passed, but source is dirty. Commit and rerun before publication.');
  }
  return manifest.packages;
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    if (process.argv.length !== 3) throw new Error('Exactly one mode is required: --pack, --dry-run or --publish');
    release(process.argv[2]);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
