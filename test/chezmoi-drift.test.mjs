import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

const script = path.resolve('skills/workstation/chezmoi/scripts/drift.sh');
const hasChezmoi = spawnSync('chezmoi', ['--version']).status === 0;

test('drift.sh classifies who moved each target', { skip: !hasChezmoi && 'chezmoi not installed' }, (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'chezmoi-drift-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const home = path.join(root, 'home');
  const source = path.join(root, 'source');
  const config = path.join(home, '.config');
  mkdirSync(path.join(config, 'chezmoi'), { recursive: true });
  mkdirSync(source);
  writeFileSync(path.join(config, 'chezmoi/chezmoi.toml'), `sourceDir = ${JSON.stringify(source)}\n`);
  const env = {
    PATH: process.env.PATH, HOME: home, XDG_CONFIG_HOME: config,
    XDG_DATA_HOME: path.join(home, '.local/share'), XDG_CACHE_HOME: path.join(home, '.cache'),
    XDG_STATE_HOME: path.join(home, '.local/state'),
  };
  const src = (name, body) => writeFileSync(path.join(source, name), body);
  const live = (name, body) => writeFileSync(path.join(home, name), body);

  for (const name of ['apply', 'readd', 'merge', 'deleted']) src(`dot_${name}`, 'v1\n');
  src('dot_tmpl.tmpl', '{{ "v1" }}\n');
  execFileSync('chezmoi', ['apply', '--force'], { env });

  src('dot_apply', 'v2\n');
  live('.readd', 'v2\n');
  live('.tmpl', 'v2\n');
  src('dot_merge', 'source\n');
  live('.merge', 'live\n');
  unlinkSync(path.join(home, '.deleted'));

  const out = execFileSync(script, { env, encoding: 'utf8' });
  const rows = Object.fromEntries(out.split('\n')
    .filter((line) => line.includes(home))
    .map((line) => line.trim().split(/\s+/))
    .map(([cls, , kind, target]) => [path.basename(target), `${cls} ${kind}`]));

  assert.deepEqual(rows, {
    '.apply': 'apply plain',
    '.readd': 're-add plain',
    '.tmpl': 're-add template',
    '.merge': 'merge plain',
    '.deleted': 'live-deleted plain',
  });
});
