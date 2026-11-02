import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { validateArtifacts, withArtifacts } from '../scripts/release.mjs';

test('released 0.3.0 record remains immutable and is not the current source group manifest', () => {
  const bytes = fs.readFileSync(new URL('../releases/0.3.0.json', import.meta.url));
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), 'e93cc21563f8fbd4f9a9f0656aa77fb819c81955f25f30f22a63f47eedd20bfd');
  const released = JSON.parse(bytes);
  assert.deepEqual(released.packages.map(p => p.name), [
    '@tahabakhit/skills-core', '@tahabakhit/skills-engineering', '@tahabakhit/skills-content',
    '@tahabakhit/skills-design', '@tahabakhit/skills-data', '@tahabakhit/skills-operations', '@tahabakhit/skills'
  ]);
  assert.ok(released.packages.every(p => p.version === '0.3.0'));
  // Source is also 0.3.0 deliberately: this refactor does not publish or rewrite released bytes.
  const current = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));
  assert.equal(current.version, '0.3.0');
});

// Published SHA-512 test vector for the exact three-byte input "abc".
const abc = 'sha512-' + Buffer.from('ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f', 'hex').toString('base64');
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'taha-release-test-'));
  t.after(() => fs.rmSync(root, { recursive: true }));
  fs.mkdirSync(path.join(root, 'dist/tarballs'), { recursive: true });
  fs.writeFileSync(path.join(root, 'package.json'), '{"name":"@tahabakhit/skills","version":"0.2.0"}');
  fs.writeFileSync(path.join(root, 'distribution.json'), '{"groups":[{"name":"core"}]}');
  const packages = ['@tahabakhit/skills-core', '@tahabakhit/skills'].map((name, i) => {
    const file = path.join(root, `dist/tarballs/fixture-${i}.tgz`); fs.writeFileSync(file, 'abc');
    return { name, version: '0.2.0', file, integrity: abc };
  });
  return { root, manifest: { schemaVersion: 1, sourceHead: 'approved-head', sourceClean: true, packages } };
}
test('publication uses frozen recognized-suffix copies and cleans owned scratch', t => {
  const { manifest } = fixture(t); let scratch;
  withArtifacts(manifest.packages, (rows, dir) => {
    scratch = dir;
    assert.ok(rows.every(row => row.file.endsWith('.tar.gz')));
    fs.writeFileSync(manifest.packages[0].file, 'changed after approval');
    assert.equal(fs.readFileSync(rows[0].file, 'utf8'), 'abc');
  });
  assert.equal(fs.existsSync(scratch), false);
});
test('a changed artifact cannot reach scanning or publication', t => {
  const { manifest } = fixture(t); fs.writeFileSync(manifest.packages[0].file, 'changed');
  assert.throws(() => withArtifacts(manifest.packages, () => assert.fail('not allowed')), /changed before freezing/);
});
test('real release scanner detects a seeded token inside a tgz payload', { skip: spawnSync('gitleaks', ['version']).status !== 0 }, t => {
  const { root } = fixture(t); const seed = path.join(root, 'seed/package'); fs.mkdirSync(seed, { recursive: true });
  fs.writeFileSync(path.join(seed, 'input.txt'), 'token = ' + 'gh' + 'p_' + crypto.randomBytes(27).toString('base64').replace(/[^A-Za-z0-9]/g, 'A'));
  const file = path.join(root, 'dist/tarballs/seed.tgz');
  assert.equal(spawnSync('tar', ['-czf', file, '-C', path.dirname(seed), 'package']).status, 0);
  const integrity = 'sha512-' + crypto.createHash('sha512').update(fs.readFileSync(file)).digest('base64');
  withArtifacts([{ name: 'synthetic-fixture', file, integrity }], (_rows, dir) => {
    const module = new URL('../scripts/release.mjs', import.meta.url).href;
    const result = spawnSync(process.execPath, ['--input-type=module', '-e', `import { scanArtifacts } from ${JSON.stringify(module)}; scanArtifacts(${JSON.stringify(dir)});`], { encoding: 'utf8' });
    assert.notEqual(result.status, 0);
    assert.match(result.stdout + result.stderr, /github-pat|leaks found/);
  });
});
test('approved artifact validation uses immutable bytes and exact clean commit', t => {
  const { root, manifest } = fixture(t);
  assert.equal(validateArtifacts(manifest, 'approved-head', root).length, 2);
  assert.throws(() => validateArtifacts(manifest, 'other-head', root), /clean commit/);
  assert.throws(() => validateArtifacts({ ...manifest, sourceClean: false }, 'approved-head', root), /clean commit/);
  fs.writeFileSync(manifest.packages[0].file, 'abcd');
  assert.throws(() => validateArtifacts(manifest, 'approved-head', root), /artifact changed/);
});
test('approved package set, versions and file locations cannot silently change', t => {
  const { root, manifest } = fixture(t);
  assert.throws(() => validateArtifacts({ ...manifest, packages: manifest.packages.slice(1) }, 'approved-head', root), /package set/);
  const version = structuredClone(manifest); version.packages[0].version = '0.3.0';
  assert.throws(() => validateArtifacts(version, 'approved-head', root), /version mismatch/);
  const outside = path.join(root, 'outside.tgz'); fs.writeFileSync(outside, 'abc');
  const moved = structuredClone(manifest); moved.packages[0].file = outside;
  assert.throws(() => validateArtifacts(moved, 'approved-head', root), /path\/version/);
});
