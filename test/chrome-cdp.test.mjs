// Exercise the chrome-cdp CLI against private local fixtures only.
// Fake CDP responses cover local CLI/IPC decisions, not Chrome compatibility.
import assert from 'node:assert/strict';
import { execFile, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import net from 'node:net';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import test from 'node:test';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

function fixture(t) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-test-'));
  t.after(() => fs.rmSync(tmp, { recursive: true, force: true }));
  const home = path.join(tmp, 'home');
  fs.mkdirSync(home, { mode: 0o700 });
  const rendered = path.join(tmp, 'rendered');
  fs.cpSync(path.join(root, 'skills/agents/chrome-cdp'), path.join(rendered, 'chrome-cdp'), { recursive: true });
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  const scripts = walk(rendered).filter(file => file.endsWith('.mjs')).map(file => path.relative(rendered, file));
  assert.equal(scripts.length, 9);
  assert.equal(fs.statSync(path.join(rendered, 'chrome-cdp/scripts/cdp.mjs')).mode & 0o100, 0o100, 'entrypoint is owner-executable');
  const f = { tmp, home, env: { PATH: process.env.PATH, HOME: home, LANG: 'C.UTF-8' } };
  // Keep Unix sockets below macOS's 104-byte path limit too.
  const runtime = fs.mkdtempSync('/tmp/cdp-fixture-');
  fs.chmodSync(runtime, 0o700);
  t.after(() => fs.rmSync(runtime, { recursive: true, force: true }));
  const childEnv = { ...f.env, XDG_RUNTIME_DIR: runtime };
  const scriptRoot = path.join(rendered, 'chrome-cdp/scripts');
  const entry = path.join(scriptRoot, 'cdp.mjs');
  const moduleUrl = name => pathToFileURL(path.join(scriptRoot, 'cdp-lib', `${name}.mjs`)).href;
  const run = (args, env = {}, cwd = f.tmp) => new Promise(resolve => {
    execFile(process.execPath, args, { cwd, env: { ...childEnv, ...env },
      timeout: 12000, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
      resolve({ status: error ? error.code : 0, stdout, stderr });
    });
  });
  const cli = (args, env, cwd) => run([entry, ...args], env, cwd);
  const evaluate = (code, env) => run(['--input-type=module', '--eval', code], env);
  const runtimeDir = async env => ok(await evaluate(`
    import {RUNTIME_DIR} from ${JSON.stringify(moduleUrl('runtime'))}; console.log(RUNTIME_DIR);
  `, env)).trim();
  return { ...f, runtime, rendered, scripts, entry, moduleUrl, run, cli, evaluate, runtimeDir };
}

const fakeWebSocket = `
import { appendFileSync } from 'node:fs';
globalThis.WebSocket = class {
  constructor() { queueMicrotask(() => this.onopen?.()); }
  send(raw) {
    const request = JSON.parse(raw);
    appendFileSync(process.env.FIXTURE_TRACE, JSON.stringify({pid: process.pid, ...request}) + '\\n');
    let result = {};
    if (request.method === 'Target.getTargets') result = {targetInfos: [
      {targetId: 'AAAABBBB11111111', type: 'page', title: 'Fixture one', url: 'https://example.invalid/one'},
      {targetId: 'AAAABBBB22222222', type: 'page', title: 'Fixture two', url: 'https://example.invalid/two'}
    ]};
    if (request.method === 'Target.attachToTarget') result = {sessionId: 'fixture-session'};
    if (request.method === 'Accessibility.getFullAXTree') result = {nodes: [
      {nodeId: 'root', role: {value: 'RootWebArea'}, childIds: ['button']},
      {nodeId: 'button', parentId: 'root', backendDOMNodeId: 7, role: {value: 'button'}, name: {value: 'Inspect'}}
    ]};
    if (request.method === 'Runtime.evaluate') result = {result: {value:
      request.params.expression.includes('document.title')
        ? {title: 'Fixture', url: 'https://example.invalid/one'}
        : request.params.expression === 'fixture-pid' ? process.pid : 42}};
    if (request.method === 'Page.captureScreenshot') result = {data: ''};
    queueMicrotask(() => this.onmessage?.({data: JSON.stringify({id: request.id, result})}));
  }
  close() { queueMicrotask(() => this.onclose?.()); }
};
`;

async function server(t, handler) {
  const s = http.createServer(handler);
  await new Promise(resolve => s.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => { s.closeAllConnections(); s.close(resolve); }));
  return s.address().port;
}

function ok(result) {
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout;
}

test('target-named CLI parses, help stays offline, and unsafe open URLs fail before discovery', async t => {
  const f = fixture(t);
  for (const file of f.scripts) {
    const result = spawnSync(process.execPath, ['--check', path.join(f.rendered, file)], { env: f.env });
    assert.equal(result.status, 0, result.stderr.toString());
  }
  assert.match(ok(await f.cli(['--help'])), /Usage: cdp/);
  const runtime = path.join(f.runtime, 'cdp');
  assert.equal(fs.statSync(runtime).mode & 0o777, 0o700);
  assert.deepEqual(fs.readdirSync(runtime), [], 'help does not discover tabs or create a bridge');
  const result = await f.cli(['open', 'javascript:alert(1)']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Only http\/https/);
  assert.deepEqual(fs.readdirSync(runtime), []);
});

test('runtime refuses permissive and symlinked directories, and rejects unsafe target paths', async t => {
  const f = fixture(t);
  const runtime = path.join(f.runtime, 'cdp');
  fs.mkdirSync(runtime, { mode: 0o755 });
  fs.chmodSync(runtime, 0o755);
  assert.match((await f.cli(['--help'])).stderr, /owned private directory/);
  fs.rmdirSync(runtime);
  const outside = path.join(f.tmp, 'outside');
  fs.mkdirSync(outside, { mode: 0o700 });
  fs.symlinkSync(outside, runtime);
  assert.match((await f.cli(['--help'])).stderr, /not a symlink/);
  assert.deepEqual(fs.readdirSync(outside), []);
  fs.unlinkSync(runtime);
  ok(await f.evaluate(`
    import assert from 'node:assert/strict';
    import {sockPath} from ${JSON.stringify(f.moduleUrl('runtime'))};
    assert.throws(() => sockPath('../escape'), /Invalid target ID/);
  `));
});

test('explicit endpoint selectors fail closed and port-file selection takes precedence', async t => {
  const f = fixture(t);
  let requests = 0;
  const port = await server(t, (_req, res) => { requests++; res.writeHead(503); res.end('{}'); });
  const profile = path.join(f.home, '.config/chromium');
  fs.mkdirSync(profile, { recursive: true });
  fs.writeFileSync(path.join(profile, 'DevToolsActivePort'), '12345\n/devtools/browser/wrong-profile\n');
  const code = `import {getWsUrl} from ${JSON.stringify(f.moduleUrl('runtime'))}; console.log(await getWsUrl());`;
  const failure = await f.evaluate(code, { CDP_PORT: String(port) });
  assert.notEqual(failure.status, 0);
  assert.match(failure.stderr, /HTTP 503/);
  assert.equal(failure.stdout, '', 'must not return fallback profile');
  const selected = path.join(f.tmp, 'selected-port');
  fs.writeFileSync(selected, '23456\n/devtools/browser/selected\n');
  assert.equal(ok(await f.evaluate(code, { CDP_PORT: String(port), CDP_PORT_FILE: selected })).trim(),
    'ws://127.0.0.1:23456/devtools/browser/selected');
  assert.equal(requests, 1, 'explicit port file bypasses HTTP discovery');
  fs.writeFileSync(selected, 'malformed');
  assert.match((await f.evaluate(code, { CDP_PORT_FILE: selected })).stderr, /Invalid explicit/);
});

test('CLI isolates selectors, rejects ambiguous targets, survives concurrent startup and resolves caller output paths', async t => {
  const f = fixture(t);
  const preload = path.join(f.tmp, 'fake-websocket.mjs');
  const trace = path.join(f.tmp, 'trace.jsonl');
  fs.writeFileSync(preload, fakeWebSocket);
  const port = await server(t, (_req, res) => {
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ webSocketDebuggerUrl: 'ws://127.0.0.1/fixture-no-real-websocket' }));
  });
  const env = { CDP_PORT: String(port), FIXTURE_TRACE: trace,
    NODE_OPTIONS: `--import=${pathToFileURL(preload).href}` };
  const target = 'AAAABBBB1';
  const selectedRuntime = await f.runtimeDir(env);
  const socket = path.join(selectedRuntime, 'cdp-AAAABBBB11111111.sock');
  try {
    const pages = JSON.parse(ok(await f.cli(['tabsjson'], env)));
    assert.deepEqual(pages.map(page => page.ref_id), ['AAAABBBB1', 'AAAABBBB2']);
    assert.equal(fs.statSync(path.join(selectedRuntime, 'pages.json')).mode & 0o777, 0o600);
    assert.match((await f.cli(['eval', 'AAAABBBB', '42'], env)).stderr, /Ambiguous prefix/);
    assert.ok(!fs.existsSync(socket));
    const starts = await Promise.all([f.cli(['snap', target], env), f.cli(['snap', target], env)]);
    const first = JSON.parse(ok(starts[0]));
    ok(starts[1]);
    const id = first.elements[0].id;
    const second = JSON.parse(ok(await f.cli(['snap', target], env)));
    assert.notEqual(second.elements[0].id, id);
    assert.match((await f.cli(['htmlref', target, String(id)], env)).stderr, /Unknown element id/);
    assert.equal(ok(await f.cli(['eval', target, '42'], env)).trim(), '42');
    assert.equal(fs.statSync(socket).mode & 0o077, 0);
    const calls = fs.readFileSync(trace, 'utf8').trim().split('\n').map(line => JSON.parse(line));
    const attachments = calls.filter(call => call.method === 'Target.attachToTarget');
    assert.ok(attachments.length >= 1 && attachments.length <= 2);
    for (const call of attachments) assert.equal(call.params.targetId, 'AAAABBBB11111111');
    const activePid = Number(ok(await f.cli(['eval', target, 'fixture-pid'], env)).trim());
    for (const call of attachments.filter(call => call.pid !== activePid)) {
      let alive = true;
      for (let i = 0; i < 40 && alive; i++) {
        try { process.kill(call.pid, 0); await delay(25); }
        catch (error) { assert.equal(error.code, 'ESRCH'); alive = false; }
      }
      assert.ok(!alive, 'losing startup must not leave an unreachable attached daemon');
    }
    const otherSelector = await f.cli(['snap', target], { ...env, CDP_PORT: String(port + 1) });
    assert.match(otherSelector.stderr, /No page list cached/, 'must not reuse the old selector cache/bridge');
    const outputCwd = path.join(f.tmp, 'caller-b');
    fs.mkdirSync(outputCwd);
    ok(await f.cli(['shot', target, 'relative.png'], env, outputCwd));
    assert.ok(fs.existsSync(path.join(outputCwd, 'relative.png')));
    assert.ok(!fs.existsSync(path.join(f.tmp, 'relative.png')));
    for (const interval of ['-1', 'NaN', '999999']) {
      assert.match((await f.cli(['loadall', target, 'button', interval], env)).stderr,
        /positive integer|must not exceed/);
    }
    ok(await f.cli(['stop', target], env));
    for (let i = 0; i < 40 && fs.existsSync(socket); i++) await delay(25);
    assert.ok(!fs.existsSync(socket), 'stop removes daemon socket');
    // A child exiting without server.close leaves a real stale Unix socket.
    ok(await f.evaluate(`
      import net from 'node:net';
      net.createServer().listen(${JSON.stringify(socket)}, () => process.exit(0));
    `, env));
    assert.ok(fs.lstatSync(socket).isSocket());
    const recovered = JSON.parse(ok(await f.cli(['snap', target], env)));
    assert.equal(recovered.title, 'Fixture', 'one startup recovers a verified stale socket');
    ok(await f.cli(['stop', target], env));
  } finally {
    await f.cli(['stop'], env);
    // Emergency cleanup is restricted to fixture daemon PIDs, never host browsers.
    if (fs.existsSync(trace)) {
      for (const pid of new Set(fs.readFileSync(trace, 'utf8').trim().split('\n')
        .map(line => JSON.parse(line)).filter(call => call.method === 'Target.attachToTarget').map(call => call.pid))) {
        try { process.kill(pid, 'SIGTERM'); } catch (error) { if (error.code !== 'ESRCH') throw error; }
      }
    }
  }
});

test('protocol never retries evaluation/mutations and rejects pending work on disconnect', async t => {
  const f = fixture(t);
  ok(await f.evaluate(`
    import assert from 'node:assert/strict';
    import {CDP, cdpTimeoutAttempts} from ${JSON.stringify(f.moduleUrl('protocol'))};
    for (const method of ['Runtime.evaluate', 'Input.insertText', 'Page.navigate'])
      assert.equal(cdpTimeoutAttempts(method), 1);
    assert.equal(cdpTimeoutAttempts('Accessibility.getFullAXTree'), 2);
    globalThis.WebSocket = class {
      constructor() { queueMicrotask(() => this.onopen()); }
      send() { queueMicrotask(() => this.onclose()); }
      close() {}
    };
    const cdp = new CDP();
    await cdp.connect('ws://fixture.invalid');
    await assert.rejects(cdp.send('Runtime.evaluate'), /closed; check effects/);
  `));
});

test('element screenshots translate scrolled viewport bounds to page-space clips', async t => {
  const f = fixture(t);
  ok(await f.evaluate(`
    import assert from 'node:assert/strict';
    import {shotRefStr, shotElementStr} from ${JSON.stringify(f.moduleUrl('actions'))};
    const clips = [];
    let offscreen = false;
    const cdp = {async send(method, params) {
      if (method === 'DOM.resolveNode') return {object: {objectId: 'fixture'}};
      if (method === 'DOM.describeNode') return {node: {backendNodeId: 7}};
      if (method === 'DOM.getBoxModel') return {model: {border:
        offscreen ? [20,-500,60,-500,60,-400,20,-400] : [20,30,60,30,60,80,20,80]}};
      if (method === 'Page.getLayoutMetrics') return {cssVisualViewport: {
        pageX: 100, pageY: 2000, clientWidth: 800, clientHeight: 600
      }};
      if (method === 'Page.captureScreenshot') { clips.push(params.clip); return {data: ''}; }
      if (method === 'Runtime.evaluate') return params.returnByValue === false
        ? {result: {objectId: 'fixture'}} : {result: {value: 1}};
      return {};
    }};
    await shotRefStr(cdp, 'session', new Map([[1,7]]), '1', ${JSON.stringify(path.join(f.tmp, 'ref.png'))}, 'target');
    await shotElementStr(cdp, 'session', 'div', ${JSON.stringify(path.join(f.tmp, 'element.png'))}, 'target');
    const expected = {x: 110, y: 2020, width: 60, height: 70, scale: 1};
    assert.deepEqual(clips, [expected, expected]);
    offscreen = true;
    await assert.rejects(shotElementStr(cdp, 'session', 'div', 'must-not-write.png', 'target'), /no visible screenshot box/);
    assert.equal(clips.length, 2, 'offscreen capture must fail, not produce a misleading 1px image');
  `));
});

test('bridge IPC rejects malformed responses and bounds silent waits', async t => {
  const f = fixture(t);
  const socket = path.join(f.runtime, 'ipc.sock');
  let silent = false;
  const connections = new Set();
  const s = net.createServer(conn => {
    connections.add(conn);
    conn.on('close', () => connections.delete(conn));
    conn.on('data', () => { if (!silent) conn.end('not-json\n'); });
  });
  await new Promise(resolve => s.listen(socket, resolve));
  t.after(() => new Promise(resolve => {
    for (const conn of connections) conn.destroy();
    s.close(resolve);
  }));
  const code = expected => `
    import assert from 'node:assert/strict';
    import net from 'node:net';
    import {sendCommand} from ${JSON.stringify(f.moduleUrl('daemon'))};
    const conn = net.connect(${JSON.stringify(socket)});
    await new Promise((resolve, reject) => { conn.on('connect', resolve); conn.on('error', reject); });
    await assert.rejects(sendCommand(conn, {cmd: 'fixture'}, 100), new RegExp(${JSON.stringify(expected)}));
  `;
  ok(await f.evaluate(code('Invalid JSON response')));
  silent = true;
  ok(await f.evaluate(code('timed out')));
});
