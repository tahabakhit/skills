import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repo = fileURLToPath(new URL('../', import.meta.url));
const script = path.join(repo, 'skills/agents/analyze-sessions/scripts/analyze.py');

function temporary(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'pi-personal-'));
  fs.chmodSync(root, 0o700);
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}

function fixture(t) {
  const root = temporary(t);
  const agent = path.join(root, 'agent');
  fs.mkdirSync(agent);
  const make = (id, cwd = '/fixture/project', sub = false, parent = 'parent-one', content = 'remember fixture marker') => {
    const location = sub
      ? path.join(agent, 'minimal-subagents', createHash('sha256').update(parent).digest('hex').slice(0, 20), id, 'transcript', id + '.jsonl')
      : path.join(agent, 'sessions', 'encoded', id + '.jsonl');
    fs.mkdirSync(path.dirname(location), { recursive: true });
    const records = [
      { type: 'session', id, cwd, timestamp: '2026-01-02T10:00:00Z', version: 3 },
      { type: 'message', message: { role: 'user', content: [{ type: 'text', text: content }], timestamp: 1 } },
      { type: 'message', message: { role: 'assistant', model: sub ? 'child-model' : 'parent-model',
        content: [{ type: 'text', text: 'answer marker' }, { type: 'thinking', thinking: 'HIDDEN_REASONING' }],
        usage: { input: 10, output: 5, cacheRead: 2, cacheWrite: 1, cost: { total: sub ? 0.25 : 1 } } } },
      { type: 'message', message: { role: 'toolResult', content: [{ type: 'text', text: 'TOOL_BODY' }], usage: { cost: { total: 0.25 } } } },
    ];
    fs.writeFileSync(location, records.map(r => JSON.stringify(r)).join('\n') + '\n{partial');
    return location;
  };
  const run = (...args) => spawnSync('python3', ['-B', script, ...args], {
    cwd: root, encoding: 'utf8', timeout: 10000,
    env: { PATH: process.env.PATH, HOME: root, PI_CODING_AGENT_DIR: agent,
      PYTHONDONTWRITEBYTECODE: '1', LANG: 'C.UTF-8' },
  });
  const good = (...args) => {
    const result = run(...args);
    assert.equal(result.status, 0, result.stderr);
    return JSON.parse(result.stdout);
  };
  return { root, agent, make, run, good };
}
const window = ['--since', '2026-01-01', '--until', '2026-02-01'];

test('analysis requires explicit scope and rejects invalid or ambiguous requests', t => {
  const f = fixture(t);
  f.make('parent-one');
  f.make('parent-two');
  for (const args of [['list'], ['search', '--all'], ['show', '--all'],
    ['list', '--all', '--limit', '0'], ['list', '--all', '--max-chars', '10001'],
    ['list', '--all', '--since', 'nonsense'], ['list', '--session', ''],
    ['list', '--session', 'parent', ...window], ['list', '--cwd', ''],
    ['list', '--all', '--since', '2026-02-01', '--until', '2026-01-01']]) {
    assert.notEqual(f.run(...args).status, 0, JSON.stringify(args));
  }
});

test('analysis scopes exact cwds, bounds dates, skips malformed records and excludes subagents by default', t => {
  const f = fixture(t);
  f.make('parent-one');
  f.make('other', '/fixture/project-extra', false, '', 'UNRELATED_PRIVATE_TEXT');
  f.make('child', '/fixture/worktree', true);
  const report = f.good('prompts', '--cwd', '/fixture/project', ...window);
  assert.equal(report.sessions_scanned, 1);
  assert.equal(report.rows.length, 1);
  assert.equal(report.rows[0].text, 'remember fixture marker');
  assert.equal(report.warnings.malformed_records, 2);
  assert.doesNotMatch(JSON.stringify(report), /UNRELATED_PRIVATE_TEXT|HIDDEN_REASONING/);
  assert.equal(f.good('list', '--cwd', '/fixture/project', '--since', '2026-01-03').rows.length, 0);
  assert.equal(f.good('list', '--all', '--since', '2026-01-01', '--until', '2026-01-02T10:00:00Z').rows.length, 0);
});

test('analysis discovers owner-hash subagents, deduplicates IDs and separates tool usage from assistant costs', t => {
  const f = fixture(t);
  const parent = f.make('parent-one');
  const child = f.make('child-one', '/fixture/worktree', true);
  const nested = path.join(parent.replace(/\.jsonl$/, ''), 'old', 'run-1', 'duplicate.jsonl');
  fs.mkdirSync(path.dirname(nested), { recursive: true });
  fs.copyFileSync(child, nested);
  const report = f.good('cost', '--cwd', '/fixture/project', ...window, '--include-subagents');
  assert.equal(report.sessions_scanned, 2);
  assert.equal(report.warnings.duplicate_session_ids, 1);
  assert.equal(report.rows[0].assistant_cost, 1.25);
  assert.equal(report.rows[0].tool_reported_cost, 0.5);
  assert.equal(report.rows[0].input_tokens, 20);
  const models = f.good('cost', '--cwd', '/fixture/project', ...window, '--include-subagents', '--by', 'model');
  assert.equal(models.rows.find(row => row.group === 'child-model').assistant_cost, 0.25);
});

test('analysis searches literal text, omits thinking, reports missing cost and bounds output', t => {
  const f = fixture(t);
  const location = f.make('parent-one', '/fixture/project', false, '', 'a'.repeat(12000) + 'MARKER');
  const search = f.good('search', '--all', ...window, '--term', 'marker', '--role', 'user', '--max-chars', '200');
  assert.match(search.rows[0].text, /MARKER/);
  const shown = f.good('show', '--session', 'parent-one', ...window);
  assert.match(JSON.stringify(shown), /TOOL_BODY|truncated/);
  assert.doesNotMatch(JSON.stringify(shown), /HIDDEN_REASONING/);
  const message = { type: 'message', message: { role: 'assistant', content: [{ type: 'text', text: 'z'.repeat(9000) }], usage: { cost: { total: null } } } };
  fs.appendFileSync(location, '\n' + Array.from({ length: 30 }, () => JSON.stringify(message)).join('\n'));
  const report = f.good('cost', '--all', ...window);
  assert.equal(report.rows[0].missing_cost_messages, 30);
  const result = f.run('show', '--session', 'parent-one', ...window, '--limit', '1000', '--max-chars', '10000');
  assert.equal(result.status, 0, result.stderr);
  assert.ok(Buffer.byteLength(result.stdout) <= 40000);
  assert.ok(JSON.parse(result.stdout).omitted_rows > 0);
});

test('analysis never follows symlinked roots, directories or logs and never modifies fixture logs', t => {
  const f = fixture(t);
  const original = f.make('parent-one');
  const bytes = fs.readFileSync(original);
  const outside = path.join(f.root, 'outside');
  fs.mkdirSync(outside);
  fs.copyFileSync(original, path.join(outside, 'outside.jsonl'));
  fs.symlinkSync(outside, path.join(f.agent, 'sessions', 'linked-dir'));
  fs.symlinkSync(path.join(outside, 'outside.jsonl'), path.join(path.dirname(original), 'linked-file.jsonl'));
  assert.equal(f.good('list', '--all', ...window).rows.length, 1);
  fs.symlinkSync(f.agent, path.join(f.root, 'alias'));
  assert.equal(f.good('list', '--all', ...window, '--agent-dir', path.join(f.root, 'alias')).rows.length, 0);
  assert.deepEqual(fs.readFileSync(original), bytes);
  assert.equal(fs.existsSync(path.join(path.dirname(script), '__pycache__')), false);
});
