import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
test('documented local profiling commands produce readable Node and Python profiles', t => {
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'skills-profiling-'));
  t.after(() => fs.rmSync(scratch, { recursive: true, force: true }));
  fs.writeFileSync(path.join(scratch, 'bench.mjs'), [
    'let total = 0;',
    'for (let i = 0; i < 250000; i++) total += Math.sqrt(i);',
    'if (!Number.isFinite(total)) throw new Error("invalid fixture");',
  ].join('\n'));
  fs.writeFileSync(path.join(scratch, 'bench.py'), [
    'def work():',
    '    return sum(i * i for i in range(10000))',
    'work()',
  ].join('\n'));
  const reference = read('skills/engineering/systematic-debugging/references/performance-profiling.md');
  const command = reference.match(/```sh\n([\s\S]*?)\n```/)[1];
  const result = spawnSync('sh', ['-eu', '-c', `${command}\nprintf '\\nPROFILE_DIR=%s\\n' "$profile_dir"`], {
    cwd: scratch,
    env: { ...process.env, TMPDIR: scratch, PATH: `${path.dirname(process.execPath)}:${process.env.PATH}`, NODE_OPTIONS: '' },
    encoding: 'utf8',
    timeout: 30000,
  });
  assert.equal(result.status, 0, result.error?.message || result.stderr);
  const profileDir = result.stdout.match(/PROFILE_DIR=(.+)/)[1];
  assert.equal(path.dirname(profileDir), scratch);
  const cpu = JSON.parse(fs.readFileSync(path.join(profileDir, 'cpu.cpuprofile'), 'utf8'));
  assert.ok(cpu.nodes.length > 0);
  assert.ok(cpu.endTime >= cpu.startTime);
  const python = spawnSync('python3', ['-c', [
    'import pstats, sys',
    'stats = pstats.Stats(sys.argv[1])',
    'assert any(key[2] == "work" for key in stats.stats)',
  ].join('\n'), path.join(profileDir, 'python.prof')], { encoding: 'utf8', timeout: 10000 });
  assert.equal(python.status, 0, python.error?.message || python.stderr);
});
