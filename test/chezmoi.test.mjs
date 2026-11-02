import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const folder = fileURLToPath(new URL('../skills/chezmoi/', import.meta.url));
const read = relative => fs.readFileSync(path.join(folder, relative), 'utf8');
const provenance = JSON.parse(read('PROVENANCE.json'));
const topics = ['cli-commands', 'configuration', 'externals', 'file-attributes', 'init',
  'machine-config', 'scripts', 'secrets-management', 'templating'];
const identity = (bytes, algorithm = 'sha256') => crypto.createHash(algorithm).update(bytes).digest('hex');
const blob = bytes => identity(Buffer.concat([Buffer.from(`blob ${bytes.length}\0`), bytes]), 'sha1');
function payloadFiles(dir, prefix = '') {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    assert.equal(entry.isSymbolicLink(), false, `No symlinks: ${entry.name}`);
    const name = `${prefix}${entry.name}`;
    return entry.isDirectory() ? payloadFiles(path.join(dir, entry.name), `${name}/`) : [name];
  });
}

test('chezmoi entrypoint has portable scalar frontmatter and concise nine-topic routing', () => {
  const text = read('SKILL.md');
  const match = text.match(/^---\n([\s\S]+?)\n---\n/);
  assert.ok(match, 'frontmatter delimiters');
  const fields = Object.fromEntries(match[1].split('\n').map(line => {
    assert.match(line, /^[a-z]+: [^\n]+$/);
    return [line.slice(0, line.indexOf(':')), line.slice(line.indexOf(':') + 2)];
  }));
  assert.deepEqual(Object.keys(fields).sort(), ['description', 'license', 'name']);
  assert.equal(fields.name, 'chezmoi');
  assert.equal(fields.license, 'MIT');
  assert.ok(fields.description.length < 1024);
  assert.ok(text.length < 4500, 'entrypoint routes rather than embedding every topic');
  assert.match(text, /references\/safety-workflow\.md/);
  for (const topic of topics) assert.ok(text.includes(`references/${topic}-guide.md`), topic);
});

test('chezmoi markdown closure survives a standalone copy with a flat reference directory', t => {
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'chezmoi-skill-copy-'));
  t.after(() => fs.rmSync(scratch, { recursive: true, force: true }));
  const copy = path.join(scratch, 'chezmoi');
  fs.cpSync(folder, copy, { recursive: true });
  const files = payloadFiles(copy);
  const refs = fs.readdirSync(path.join(copy, 'references'), { withFileTypes: true });
  assert.equal(refs.length, 48);
  for (const entry of refs) {
    assert.ok(entry.isFile(), `flat file: ${entry.name}`);
    assert.match(entry.name, /^[a-z]+(?:-[a-z]+)+\.md$/);
  }
  for (const name of files.filter(file => file.endsWith('.md'))) {
    const text = fs.readFileSync(path.join(copy, name), 'utf8');
    assert.equal((text.match(/^```/gm) || []).length % 2, 0, `balanced fences: ${name}`);
    for (const [, link] of text.matchAll(/\]\(([^)]+)\)/g)) {
      if (/^(https?:|#)/.test(link)) continue;
      const target = path.resolve(copy, path.dirname(name), link.split('#')[0]);
      assert.ok(target.startsWith(`${copy}${path.sep}`), `${name}: ${link} stays local`);
      assert.ok(fs.statSync(target).isFile(), `${name}: ${link} resolves`);
    }
  }
});

test('chezmoi import accounts for all nine original entrypoints and all 38 references', () => {
  assert.equal(provenance.upstream.repository, 'https://github.com/mkobit/chezmoi-skills');
  assert.equal(provenance.upstream.revision, '093b6c4ee156d53f6d74257f39b76d22cf9180fc');
  const originals = provenance.upstream.files;
  assert.equal(originals.length, 48, '9 entrypoints + 38 references + license');
  assert.equal(new Set(originals.map(file => file.path)).size, 48);
  assert.equal(new Set(originals.map(file => file.destination)).size, 48);
  for (const topic of topics) {
    assert.ok(originals.some(file => file.path === `skills/chezmoi-${topic}/SKILL.md`
      && file.destination === `references/${topic}-guide.md`));
    assert.match(read(`references/${topic}-guide.md`), /safety-workflow\.md/);
  }
  for (const file of originals) {
    assert.match(file.sha256, /^[a-f0-9]{64}$/);
    assert.match(file.gitBlob, /^[a-f0-9]{40}$/);
    assert.ok(file.changes.length > 0);
    assert.ok(provenance.files.some(payload => payload.path === file.destination));
  }
  assert.equal(originals.filter(file => file.path.includes('/references/')).length, 38);
  assert.deepEqual(provenance.requiredSiblingSkills, []);
});

test('chezmoi provenance matches every resulting payload SHA-256 and Git blob, excluding itself', () => {
  assert.equal(provenance.schemaVersion, 1);
  assert.equal(provenance.name, 'chezmoi');
  const actual = payloadFiles(folder).filter(name => name !== 'PROVENANCE.json').sort();
  assert.deepEqual(provenance.files.map(file => file.path).sort(), actual);
  assert.equal(actual.length, 51);
  for (const file of provenance.files) {
    assert.match(file.path, /^[A-Za-z0-9_./-]+$/);
    assert.ok(!file.path.split('/').includes('..') && !path.isAbsolute(file.path));
    const bytes = fs.readFileSync(path.join(folder, file.path));
    assert.equal(file.sha256, identity(bytes), file.path);
    assert.equal(file.gitBlob, blob(bytes), file.path);
  }
  assert.match(provenance.verification.scope, /Not legal clearance, agent compliance or behavioral efficacy/);
});

test('chezmoi retains the complete original Mike Kobit MIT bytes and local contribution notice', () => {
  const upstream = fs.readFileSync(path.join(folder, 'LICENSE'));
  assert.equal(identity(upstream), 'd35abd1fb6a99ae97122b1304e69dd20b62c88e2c60333ca28973b5fc4aec15f');
  assert.equal(blob(upstream), '840bb03cc726f3c3a4a2531c09a97885790c4d59');
  for (const license of provenance.licenses) {
    const text = read(license.file);
    assert.ok(text.includes(license.copyright));
    assert.match(text, /Permission is hereby granted, free of charge/);
    assert.match(text, /THE SOFTWARE IS PROVIDED "AS IS"/);
    assert.match(text, /LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE/);
  }
  const original = provenance.upstream.files.find(file => file.path === 'LICENSE');
  assert.equal(original.sha256, identity(upstream));
});

test('chezmoi safety instructions explicitly gate execution, secrets, state and mutation', () => {
  const gate = read('references/safety-workflow.md');
  for (const pattern of [
    /Source state/, /Target state/, /Destination state/, /Configuration/, /Persistent state/,
    /read-only diagnosis/, /Resolve symlinks and path overlap/, /Hooks can run even with --dry-run/,
    /A dry-run is not a sandbox/, /Excluding scripts does not disable hooks/,
    /output, outputList and exec can execute commands/, /Secret functions can contact services/,
    /Do not print raw secret values/, /Never put access tokens in repository URLs/,
    /Do not run broad apply\/update\/init\/reset or persistent-state purge without exact scope and authority/,
    /Never clear all scriptState\/entryState to fix one script/,
    /Read actual local --help/, /failed, denied, timed-out and unavailable evidence/,
    /not agent compliance or behavioral efficacy/,
  ]) assert.match(gate, pattern);
  for (const file of provenance.upstream.files.filter(file => file.destination.endsWith('.md'))) {
    assert.match(read(file.destination), /Read the \[safety gate\]\(safety-workflow\.md\) first/);
  }
});

test('chezmoi regressions: exact cleanup scope, negative modifiers and corrected imported examples', () => {
  assert.match(read('references/file-attributes-attributes.md'), /`dot_config\/exact_helix\/` ensures/);
  assert.match(read('references/file-attributes-attributes.md'), /can remove unrelated entries/);
  assert.match(read('references/cli-commands-chattr.md'), /chezmoi chattr -- -template ~\/.zshrc/);
  assert.doesNotMatch(read('references/init-commands.md'), /https:\/\/user:TOKEN@/);
  assert.doesNotMatch(read('references/init-setup.md'), /sh -c "\$\(curl|iex "&/);
  assert.doesNotMatch(read('references/scripts-state-management.md'), /`list-buckets`/);
  assert.doesNotMatch(read('references/cli-commands-apply.md'), /`file`, `symlink`, or `dir`|Simulate without making changes/);
  assert.match(read('references/file-attributes-directives.md'), /May be included by init --data/);
  assert.doesNotMatch(read('references/configuration-core.md'), /XDG_SHARE_HOME/);
  assert.doesNotMatch(read('references/machine-config-conditional-ignore.md'), /chezmoi cat ~\/.chezmoiignore/);
  for (const name of ['password-managers', 'secret-providers']) {
    const text = read(`references/secrets-management-${name}.md`);
    assert.doesNotMatch(text, /`\.chezmoi\.toml`/);
    assert.match(text, /inspected active config file/);
    assert.match(text, /source \.chezmoi\.toml\.tmpl init template/);
  }
});

function findChezmoi() {
  const names = process.platform === 'win32' ? ['chezmoi.exe'] : ['chezmoi'];
  for (const dir of (process.env.PATH || '').split(path.delimiter).filter(Boolean)) {
    for (const name of names) {
      const file = path.resolve(dir, name);
      try { fs.accessSync(file, fs.constants.X_OK); return file; } catch { /* Next candidate. */ }
    }
  }
  return null;
}
const executable = findChezmoi();
function cliFixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'chezmoi-inert-fixture-'));
  fs.chmodSync(dir, 0o700);
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const dirs = Object.fromEntries(['home', 'config', 'data', 'state', 'cache', 'runtime', 'tmp', 'source', 'destination']
    .map(name => [name, path.join(dir, name)]));
  for (const value of Object.values(dirs)) fs.mkdirSync(value, { mode: 0o700 });
  const config = path.join(dirs.config, 'chezmoi.toml');
  const persistent = path.join(dirs.state, 'fixture.boltdb');
  fs.writeFileSync(config, `sourceDir = ${JSON.stringify(dirs.source)}\ndestDir = ${JSON.stringify(dirs.destination)}\n`
    + `persistentState = ${JSON.stringify(persistent)}\ncacheDir = ${JSON.stringify(dirs.cache)}\n`
    + `tempDir = ${JSON.stringify(dirs.tmp)}\nworkingTree = ${JSON.stringify(dirs.source)}\n`);
  const env = { PATH: path.dirname(executable) + path.delimiter + '/usr/bin:/bin', HOME: dirs.home,
    USERPROFILE: dirs.home, XDG_CONFIG_HOME: dirs.config, XDG_DATA_HOME: dirs.data,
    XDG_STATE_HOME: dirs.state, XDG_CACHE_HOME: dirs.cache, XDG_RUNTIME_DIR: dirs.runtime,
    TMPDIR: dirs.tmp, TMP: dirs.tmp, TEMP: dirs.tmp, LANG: 'C', LC_ALL: 'C' };
  const run = args => spawnSync(executable, ['--config', config, ...args], {
    cwd: dir, env, encoding: 'utf8', timeout: 10000, input: '',
  });
  return { ...dirs, dir, config, persistent, run };
}
function success(result) {
  assert.ifError(result.error);
  assert.equal(result.signal, null);
  assert.equal(result.status, 0, result.stderr);
  return result.stdout;
}
function localHelp(c, command, flags) {
  const output = success(c.run([...command, '--help']));
  for (const flag of flags) assert.ok(output.includes(flag), `${command.join(' ')} documents ${flag}`);
}

test('installed chezmoi documents fixture flags and renders an inert template in isolation', { skip: !executable }, t => {
  const c = cliFixture(t);
  localHelp(c, [], ['--config', '--source', '--destination', '--persistent-state']);
  localHelp(c, ['execute-template'], ['--init', '--promptString']);
  success(c.run(['--version']));
  assert.equal(success(c.run(['execute-template', '{{ "fixture" | upper }}'])), 'FIXTURE');
  assert.equal(success(c.run(['execute-template', '{{ .chezmoi.sourceDir }}'])), c.source);
  assert.equal(success(c.run(['execute-template', '{{ .chezmoi.destDir }}'])), c.destination);
  assert.deepEqual(fs.readdirSync(c.destination), []);
  assert.deepEqual(fs.readdirSync(c.home), []);
});

test('installed chezmoi maps inert source paths and previews without destination writes', { skip: !executable }, t => {
  const c = cliFixture(t);
  localHelp(c, ['apply'], ['--dry-run', '--recursive']);
  localHelp(c, ['target-path'], []);
  localHelp(c, ['cat'], []);
  fs.writeFileSync(path.join(c.source, 'dot_fixture.tmpl'), '{{ "fixture" | upper }}\n');
  const target = path.join(c.destination, '.fixture');
  assert.equal(success(c.run(['target-path', path.join(c.source, 'dot_fixture.tmpl')])).trim(), target);
  assert.equal(success(c.run(['cat', target])), 'FIXTURE\n');
  success(c.run(['apply', '--dry-run', '--recursive=false', target]));
  assert.deepEqual(fs.readdirSync(c.destination), []);
  assert.deepEqual(fs.readdirSync(c.home), []);
});

test('installed chezmoi exact attribute maps only to the inert Helix subtree', { skip: !executable }, t => {
  const c = cliFixture(t);
  localHelp(c, ['dump'], ['--format']);
  fs.mkdirSync(path.join(c.source, 'dot_config', 'exact_helix'), { recursive: true });
  fs.writeFileSync(path.join(c.source, 'dot_config', 'exact_helix', 'config.toml'), '# inert fixture\n');
  const dump = JSON.parse(success(c.run(['dump', '--format=json'])));
  assert.equal(dump['.config'].type, 'dir');
  assert.equal(dump['.config/helix'].type, 'dir');
  const configDir = path.join(c.destination, '.config');
  const helixDir = path.join(configDir, 'helix');
  fs.mkdirSync(helixDir, { recursive: true });
  const unrelated = path.join(configDir, 'unrelated');
  const stale = path.join(helixDir, 'stale');
  fs.writeFileSync(unrelated, 'preserve unrelated\n');
  fs.writeFileSync(stale, 'stale fixture\n');
  localHelp(c, ['apply'], ['--dry-run', '--verbose']);
  const preview = success(c.run(['apply', '--dry-run', '--verbose', configDir]));
  assert.match(preview, /\.config\/helix\/stale/, `plan removes unmanaged file only inside exact Helix: ${preview}`);
  assert.ok(!preview.includes('unrelated'), 'plan does not remove unrelated parent entries');
  assert.equal(fs.readFileSync(unrelated, 'utf8'), 'preserve unrelated\n');
  assert.equal(fs.readFileSync(stale, 'utf8'), 'stale fixture\n');
  assert.equal(fs.existsSync(path.join(helixDir, 'config.toml')), false);
});
