import { existsSync, lstatSync, readFileSync, unlinkSync } from 'fs';
import net from 'net';
import { spawn } from 'child_process';
import {
  clickRefStr,
  clickStr,
  clickXyStr,
  evalRawStr,
  htmlRefStr,
  htmlStr,
  loadAllStr,
  navStr,
  netStr,
  shotElementStr,
  shotRefStr,
  shotStr,
  typeRefStr,
  typeStr,
} from './actions.mjs';
import { evalStr } from './evaluate.mjs';
import { formatPageList, formatPagesJson, getPages, getTargetRef } from './pages.mjs';
import { CDP } from './protocol.mjs';
import {
  DAEMON_CONNECT_DELAY,
  DAEMON_CONNECT_TIMEOUT,
  IDLE_TIMEOUT,
  IS_WINDOWS,
  PAGES_CACHE,
  getWsUrl,
  resolvePrefix,
  sleep,
  sockPath,
} from './runtime.mjs';
import { findStr, positiveInteger, snapshotStr } from './snapshot.mjs';

async function runDaemon(targetId, discoveryRecovery) {
  const sp = sockPath(targetId);

  const cdp = new CDP();
  try {
    await cdp.connect(await getWsUrl(discoveryRecovery));
  } catch (e) {
    process.stderr.write(`Daemon: cannot connect to Chrome: ${e.message}\n`);
    process.exit(1);
  }

  let sessionId;
  try {
    const res = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
    sessionId = res.sessionId;
  } catch (e) {
    process.stderr.write(`Daemon: attach failed: ${e.message}\n`);
    cdp.close();
    process.exit(1);
  }

  const elementRefs = new Map();

  // Shutdown helpers
  let alive = true;
  let socketIdentity;
  function shutdown() {
    if (!alive) return;
    alive = false;
    // Node/libuv unlinks a bound Unix path inside server.close(). Check ownership
    // before that call; exiting without close must leave a replacement alone.
    let ownsPath = IS_WINDOWS;
    if (!IS_WINDOWS && socketIdentity) {
      try {
        const current = lstatSync(sp);
        ownsPath = current.ino === socketIdentity.ino && current.dev === socketIdentity.dev;
      } catch {}
    }
    if (ownsPath) server.close();
    cdp.close();
    process.exit(0);
  }

  // Exit if target goes away or Chrome disconnects
  cdp.onEvent('Target.targetDestroyed', (params) => {
    if (params.targetId === targetId) shutdown();
  });
  cdp.onEvent('Target.detachedFromTarget', (params) => {
    if (params.sessionId === sessionId) shutdown();
  });
  cdp.onClose(() => shutdown());
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  // Idle timer
  let idleTimer = setTimeout(shutdown, IDLE_TIMEOUT);
  function resetIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(shutdown, IDLE_TIMEOUT);
  }

  // Handle a command
  async function handleCommand({ cmd, args, targetRef }) {
    resetIdle();
    try {
      let result;
      switch (cmd) {
        case 'list': {
          const pages = await getPages(cdp);
          result = formatPageList(pages);
          break;
        }
        case 'list_raw': {
          const pages = await getPages(cdp);
          result = JSON.stringify(pages);
          break;
        }
        case 'tabsjson': {
          const pages = await getPages(cdp);
          result = formatPagesJson(pages);
          break;
        }
        case 'snap': case 'snapshot': result = await snapshotStr(cdp, sessionId, elementRefs, targetRef || await getTargetRef(cdp, targetId), args[0], args[1]); break;
        case 'find': result = await findStr(cdp, sessionId, elementRefs, targetRef || await getTargetRef(cdp, targetId), args[0], args[1], args[2]); break;
        case 'eval': result = await evalStr(cdp, sessionId, args[0]); break;
        case 'shot': case 'screenshot': result = await shotStr(cdp, sessionId, args[0], targetId); break;
        case 'shotel': case 'screenshot-element': case 'elementshot': result = await shotElementStr(cdp, sessionId, args[0], args[1], targetId); break;
        case 'shotref': result = await shotRefStr(cdp, sessionId, elementRefs, args[0], args[1], targetId); break;
        case 'html': result = await htmlStr(cdp, sessionId, args[0]); break;
        case 'htmlref': result = await htmlRefStr(cdp, sessionId, elementRefs, args[0]); break;
        case 'nav': case 'navigate': result = await navStr(cdp, sessionId, args[0]); break;
        case 'net': case 'network': result = await netStr(cdp, sessionId); break;
        case 'click': result = await clickStr(cdp, sessionId, args[0]); break;
        case 'clickref': result = await clickRefStr(cdp, sessionId, elementRefs, args[0]); break;
        case 'clickxy': result = await clickXyStr(cdp, sessionId, args[0], args[1]); break;
        case 'type': result = await typeStr(cdp, sessionId, args[0]); break;
        case 'typeref': result = await typeRefStr(cdp, sessionId, elementRefs, args[0], args[1]); break;
        case 'loadall': {
          const interval = positiveInteger(args[1] ?? '1500', 'loadall interval');
          if (interval > 30000) throw new Error('loadall interval must not exceed 30000ms');
          result = await loadAllStr(cdp, sessionId, args[0], interval);
          break;
        }
        case 'evalraw': result = await evalRawStr(cdp, sessionId, args[0], args[1]); break;
        case 'stop': return { ok: true, result: '', stopAfter: true };
        default: return { ok: false, error: `Unknown command: ${cmd}` };
      }
      return { ok: true, result: result ?? '' };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }

  let commandQueue = Promise.resolve();
  function enqueueCommand(request) {
    const pending = commandQueue.then(() => handleCommand(request));
    commandQueue = pending.then(() => undefined, () => undefined);
    return pending;
  }

  // Unix socket server — NDJSON protocol
  // Wire format: each message is one JSON object followed by \n (newline-delimited JSON).
  // Request:  { "id": <number>, "cmd": "<command>", "args": ["arg1", "arg2", ...] }
  // Response: { "id": <number>, "ok": <boolean>, "result": "<string>" }
  //           or { "id": <number>, "ok": false, "error": "<message>" }
  const server = net.createServer((conn) => {
    let buf = '';
    conn.on('error', () => conn.destroy());
    conn.on('data', (chunk) => {
      buf += chunk.toString();
      if (buf.length > 1024 * 1024) { conn.destroy(); return; }
      const lines = buf.split('\n');
      buf = lines.pop(); // keep incomplete last line
      for (const line of lines) {
        if (!line.trim()) continue;
        let req;
        try {
          req = JSON.parse(line);
          if (!req || typeof req.cmd !== 'string' ||
              (req.cmd !== 'stop' && !Array.isArray(req.args))) throw new Error('Invalid request');
        } catch {
          conn.write(JSON.stringify({ ok: false, error: 'Invalid JSON request', id: null }) + '\n');
          continue;
        }
        enqueueCommand(req).then((res) => {
          const payload = JSON.stringify({ ...res, id: req.id }) + '\n';
          if (res.stopAfter) conn.end(payload, shutdown);
          else conn.write(payload);
        });
      }
    });
  });

  let recoveredStale = false;
  server.on('error', async (e) => {
    if (!IS_WINDOWS && e.code === 'EADDRINUSE' && !recoveredStale) {
      recoveredStale = true;
      let previous;
      try { previous = lstatSync(sp); } catch {}
      try {
        const other = await connectToSocket(sp);
        other.destroy();
        shutdown(); // Another startup won; the CLI can use its bridge.
        return;
      } catch (error) {
        if (error.code === 'ECONNREFUSED' && previous?.isSocket()) {
          try {
            const current = lstatSync(sp);
            if (current.ino === previous.ino && current.dev === previous.dev) {
              unlinkSync(sp);
              server.listen(sp);
              return;
            }
          } catch {}
        }
      }
    }
    process.stderr.write(`Daemon server listen failed: ${e.message}\n`);
    cdp.close();
    process.exit(1);
  });

  // Exclusive listen wins startup; only a verified stale inode may be removed.
  server.listen(sp, () => { if (!IS_WINDOWS) socketIdentity = lstatSync(sp); });
}

// ---------------------------------------------------------------------------
// CLI ↔ daemon communication
// ---------------------------------------------------------------------------

function connectToSocket(sp) {
  return new Promise((resolve, reject) => {
    const conn = net.connect(sp);
    conn.on('connect', () => resolve(conn));
    conn.on('error', reject);
  });
}

async function getOrStartTabDaemon(targetId) {
  const sp = sockPath(targetId);
  // Try existing daemon
  try { return await connectToSocket(sp); } catch {}

  // Do not unlink on a failed connect: a concurrent startup may own the path.
  // The listening daemon handles verified stale socket recovery.

  // Spawn daemon
  const child = spawn(process.execPath, [process.argv[1], '_daemon', targetId], {
    detached: true,
    stdio: 'ignore',
  });
  child.unref();

  const deadline = Date.now() + DAEMON_CONNECT_TIMEOUT;
  while (Date.now() < deadline) {
    await sleep(DAEMON_CONNECT_DELAY);
    try { return await connectToSocket(sp); } catch {}
  }
  throw new Error(`Tab bridge did not become ready within ${DAEMON_CONNECT_TIMEOUT / 1000}s. The target may have closed or Chrome may not be answering.`);
}

function sendCommand(conn, req, timeout = 6 * 60 * 1000) {
  return new Promise((resolve, reject) => {
    let buf = '';
    let settled = false;
    // loadall may run for five minutes. A lost bridge must still terminate.
    const timer = setTimeout(() => onError(new Error('Tab bridge response timed out; check effects before retrying')), timeout);

    const cleanup = () => {
      clearTimeout(timer);
      conn.off('data', onData);
      conn.off('error', onError);
      conn.off('end', onEnd);
      conn.off('close', onClose);
    };

    const onData = (chunk) => {
      buf += chunk.toString();
      const idx = buf.indexOf('\n');
      if (idx === -1) return;
      settled = true;
      cleanup();
      try { resolve(JSON.parse(buf.slice(0, idx))); }
      catch { reject(new Error('Invalid JSON response from tab bridge')); }
      conn.end();
    };

    const onError = (error) => {
      if (settled) return;
      settled = true;
      cleanup();
      conn.destroy();
      reject(error);
    };

    const onEnd = () => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error('Connection closed before response'));
    };

    const onClose = () => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error('Connection closed before response'));
    };

    conn.on('data', onData);
    conn.on('error', onError);
    conn.on('end', onEnd);
    conn.on('close', onClose);
    req.id = 1;
    conn.write(JSON.stringify(req) + '\n');
  });
}

// ---------------------------------------------------------------------------
// Stop daemons
// ---------------------------------------------------------------------------

async function stopDaemons(targetPrefix) {
  if (!existsSync(PAGES_CACHE)) return;
  const pages = JSON.parse(readFileSync(PAGES_CACHE, 'utf8'));
  const targets = targetPrefix
    ? [resolvePrefix(targetPrefix, pages.map(p => p.targetId), 'target')]
    : pages.map(p => p.targetId);

  for (const targetId of targets) {
    const sp = sockPath(targetId);
    try {
      const conn = await connectToSocket(sp);
      await sendCommand(conn, { cmd: 'stop' });
    } catch {
      // A failed stop is not authority to remove a potentially live socket.
    }
  }
}

export { getOrStartTabDaemon, runDaemon, sendCommand, stopDaemons };
