import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const json = p => JSON.parse(fs.readFileSync(path.join(root, p)));
const text = p => fs.readFileSync(path.join(root, p), 'utf8');
function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'skills-specialists-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return dir;
}
function compare(args) {
  return spawnSync('python3', [path.join(root, 'skills/managed-config-drift/scripts/compare-trees.py'), ...args], { encoding: 'utf8', timeout: 5000, env: { PATH: process.env.PATH, PYTHONDONTWRITEBYTECODE: '1' } });
}
function collector(dir, args = []) {
  return spawnSync('/usr/bin/bash', [path.join(root, 'skills/workstation-health-triage/scripts/collect-health.sh'), 'quick', ...args], {
    encoding: 'utf8', timeout: 5000,
    env: { PATH: `${dir}/bin:/usr/bin:/bin`, HOME: dir, PYTHONDONTWRITEBYTECODE: '1', FIXTURE_PID: path.join(dir, 'probe.pid') }
  });
}
function probes(dir) {
  fs.mkdirSync(path.join(dir, 'bin'));
  for (const cmd of ['uname', 'uptime', 'free', 'df', 'systemctl', 'coredumpctl', 'findmnt', 'lsblk', 'stat']) {
    fs.writeFileSync(path.join(dir, 'bin', cmd), '#!/bin/sh\nprintf "synthetic probe\\n"\n', { mode: 0o755 });
  }
}

test('installed names have one distribution owner and no CLI-managed or legacy aliases', () => {
  const distribution = json('distribution.json');
  const groups = Object.fromEntries(distribution.groups.map(g => [g.name, g.skills]));
  assert.ok(groups.core.includes('unslop'));
  assert.deepEqual(groups.operations, ['operate-systems', 'arch-linux', 'arch-package-maintenance', 'arch-update-recovery', 'cachyos', 'rhel-fedora', 'managed-config-drift', 'workstation-health-triage', 'chezmoi']);
  const names = distribution.groups.flatMap(g => g.skills);
  assert.equal(new Set(names).size, 30);
  for (const name of ['technical-writing', 'migration', 'safe-refactor', 'herdr-core', 'ketch']) assert.ok(!names.includes(name));
  for (const file of ['document-structure', 'sentence-style', 'repository-verification']) assert.ok(fs.existsSync(path.join(root, 'skills/create-content/references', `${file}.md`)));
  assert.match(text('skills/change-safely/SKILL.md'), /Refactor branch/);
  assert.match(text('skills/change-safely/SKILL.md'), /Migration branch/);
});

test('preserved optional helper bytes match pinned audited inputs', () => {
  for (const name of ['managed-config-drift', 'workstation-health-triage']) {
    const record = json(`skills/${name}/PROVENANCE.json`);
    for (const file of record.upstreamFiles.filter(f => f.path.startsWith('scripts/'))) {
      const bytes = fs.readFileSync(path.join(root, 'skills', name, file.path));
      assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), file.sha256);
    }
  }
});

test('drift helper classifies content, links and exclusions without changing inputs', t => {
  const dir = fixture(t); const live = path.join(dir, 'live'); const managed = path.join(dir, 'managed');
  fs.mkdirSync(live); fs.mkdirSync(managed);
  fs.writeFileSync(path.join(live, 'config'), 'local');
  fs.writeFileSync(path.join(managed, 'config'), 'managed');
  fs.symlinkSync('old', path.join(live, 'link')); fs.symlinkSync('new', path.join(managed, 'link'));
  fs.writeFileSync(path.join(live, 'cache'), 'private');
  const result = compare([`${live}=${managed}`, '--exclude', 'cache']);
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stdout, /changed\tconfig\tfile->file/);
  assert.match(result.stdout, /changed\tlink\tsymlink->symlink/);
  assert.doesNotMatch(result.stdout, /cache|private|local|managed-only/);
  assert.equal(fs.readFileSync(path.join(live, 'config'), 'utf8'), 'local');
  fs.copyFileSync(path.join(live, 'config'), path.join(managed, 'config'));
  fs.unlinkSync(path.join(managed, 'link')); fs.symlinkSync('old', path.join(managed, 'link'));
  assert.equal(compare([`${live}=${managed}`, '--exclude', 'cache']).status, 0);
  assert.equal(compare([`${live}=${dir}/missing`]).status, 2);
});

test('collector uses private exclusive output with synthetic probes only', t => {
  const dir = fixture(t); probes(dir); const report = path.join(dir, 'report');
  const result = collector(dir, ['--output', report]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, '');
  assert.equal(fs.statSync(report).mode & 0o777, 0o600);
  const bytes = fs.readFileSync(report);
  assert.match(bytes.toString(), /synthetic probe/);
  assert.notEqual(collector(dir, ['--output', report]).status, 0);
  assert.deepEqual(fs.readFileSync(report), bytes);
  fs.symlinkSync(report, path.join(dir, 'link'));
  assert.notEqual(collector(dir, ['--output', path.join(dir, 'link')]).status, 0);
  assert.deepEqual(fs.readFileSync(report), bytes);
});

test('collector marks output limits and timed-out synthetic probes, then reaps owned child', t => {
  const dir = fixture(t); probes(dir);
  fs.writeFileSync(path.join(dir, 'bin/uname'), '#!/bin/sh\nprintf "%3000s" x\n', { mode: 0o755 });
  const limited = path.join(dir, 'limited');
  assert.equal(collector(dir, ['--output', limited, '--max-bytes', '1024']).status, 1);
  assert.match(fs.readFileSync(limited, 'utf8'), /OUTPUT_LIMIT/);
  fs.writeFileSync(path.join(dir, 'bin/uname'), '#!/bin/sh\nprintf "%s" "$$" > "$FIXTURE_PID"\nexec /bin/sleep 30\n', { mode: 0o755 });
  const timed = path.join(dir, 'timed');
  const result = collector(dir, ['--output', timed, '--total-timeout', '1']);
  assert.equal(result.status, 1, result.stderr);
  assert.match(fs.readFileSync(timed, 'utf8'), /TIMEOUT/);
  const pid = Number(fs.readFileSync(path.join(dir, 'probe.pid'), 'utf8'));
  assert.throws(() => process.kill(pid, 0), { code: 'ESRCH' });
});

test('Fedora adaptation removes unfiltered secret dumps and repeated approval gates', () => {
  const entrypoint = text('skills/rhel-fedora/SKILL.md');
  assert.match(entrypoint, /diagnostic-privacy\.md/);
  assert.match(entrypoint, /rpm-ostree/);
  assert.doesNotMatch(entrypoint, /CVE-2026|docs\/local\/audits|wait for an explicit yes|stop at the plan/);
  for (const ref of ['packages-and-repos', 'systemd-and-journal', 'session-display-and-mobile']) {
    const value = text(`skills/rhel-fedora/references/${ref}.md`);
    assert.match(value, /diagnostic-privacy\.md/);
    assert.doesNotMatch(value, /show-environment|config-manager --dump|Environment=|systemctl cat/);
  }
});
