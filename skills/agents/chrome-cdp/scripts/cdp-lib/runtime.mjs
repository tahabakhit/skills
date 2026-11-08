import { existsSync, lstatSync, mkdirSync, readFileSync } from 'fs';
import http from 'http';
import { createHash } from 'node:crypto';
import { homedir } from 'os';
import { resolve } from 'path';

const TIMEOUT = 15000;
const NAVIGATION_TIMEOUT = 30000;
const IDLE_TIMEOUT = 20 * 60 * 1000;
const DAEMON_CONNECT_DELAY = 300;
const DAEMON_CONNECT_TIMEOUT = TIMEOUT + 2000;
const MIN_TARGET_PREFIX_LEN = 8;
const IS_WINDOWS = process.platform === 'win32';
if (!IS_WINDOWS) process.umask(0o077);
const BASE_RUNTIME_DIR = IS_WINDOWS
  ? resolve(process.env.LOCALAPPDATA || resolve(homedir(), 'AppData', 'Local'), 'cdp')
  : process.env.XDG_RUNTIME_DIR
    ? resolve(process.env.XDG_RUNTIME_DIR, 'cdp')
    : resolve(homedir(), '.cache', 'cdp');
function privateDirectory(dir) {
  mkdirSync(dir, { recursive: true, mode: 0o700 });
  const stat = lstatSync(dir);
  if (stat.isSymbolicLink() || !stat.isDirectory() ||
      (!IS_WINDOWS && (stat.uid !== process.getuid() || (stat.mode & 0o077) !== 0))) {
    throw new Error(`CDP runtime must be an owned private directory, not a symlink: ${dir}`);
  }
}
privateDirectory(BASE_RUNTIME_DIR);
// Cache and bridge identities must follow explicit browser selection, not just a
// target ID. Snapshot the file so discovery and namespace use identical bytes.
const explicitPortFile = process.env.CDP_PORT_FILE
  ? readFileSync(process.env.CDP_PORT_FILE, 'utf8').trim() : undefined;
const host = process.env.CDP_HOST || '127.0.0.1';
const selection = explicitPortFile !== undefined
  ? ['file', host, resolve(process.env.CDP_PORT_FILE), explicitPortFile]
  : process.env.CDP_PORT ? ['port', host, process.env.CDP_PORT]
    : process.env.CDP_HOST ? ['host', host] : undefined;
const RUNTIME_DIR = selection
  ? resolve(BASE_RUNTIME_DIR, createHash('sha256').update(JSON.stringify(selection)).digest('hex').slice(0, 16))
  : BASE_RUNTIME_DIR;
privateDirectory(RUNTIME_DIR);
const PAGES_CACHE = resolve(RUNTIME_DIR, 'pages.json');

function sockPath(targetId) {
  if (typeof targetId !== 'string' || !/^[A-Za-z0-9_-]+$/.test(targetId)) {
    throw new Error('Invalid target ID for tab bridge');
  }
  return IS_WINDOWS
    ? `\\\\.\\pipe\\cdp-${targetId}`
    : resolve(RUNTIME_DIR, `cdp-${targetId}.sock`);
}

async function getJson(url, timeout = 2000) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, { timeout }, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`HTTP ${res.statusCode} from ${url}`));
          return;
        }
        try { resolve(JSON.parse(body)); } catch (err) { reject(err); }
      });
    });
    req.on('timeout', () => req.destroy(new Error(`Timeout fetching ${url}`)));
    req.on('error', reject);
  });
}

async function probeDebugPort(port, host = process.env.CDP_HOST || '127.0.0.1') {
  const version = await getJson(`http://${host}:${port}/json/version`);
  if (!version.webSocketDebuggerUrl) throw new Error(`No webSocketDebuggerUrl from ${host}:${port}`);
  return version.webSocketDebuggerUrl;
}

function portFileUrl(contents, host) {
  const lines = contents.trim().split('\n');
  const port = Number(lines[0]);
  if (lines.length < 2 || !/^\d+$/.test(lines[0]) || port < 1 || port > 65535 ||
      !/^\/devtools\/browser\/[A-Za-z0-9_-]+$/.test(lines[1])) {
    throw new Error('Invalid explicit or discovered DevToolsActivePort file');
  }
  return `ws://${host}:${port}${lines[1]}`;
}

async function getWsUrl(recovery = 'Ask the user for an approved debugging endpoint or set CDP_PORT/CDP_PORT_FILE.') {
  const home = homedir();
  // macOS: ~/Library/Application Support/<name>/DevToolsActivePort
  const macBrowsers = [
    'Google/Chrome', 'Google/Chrome Beta', 'Google/Chrome for Testing',
    'Chromium', 'BraveSoftware/Brave-Browser', 'Microsoft Edge',
  ];
  // Linux: ~/.config/<name>/DevToolsActivePort
  const linuxBrowsers = [
    'google-chrome', 'google-chrome-beta', 'chromium',
    'vivaldi', 'vivaldi-snapshot',
    'BraveSoftware/Brave-Browser', 'microsoft-edge',
  ];
  // Linux Flatpak: ~/.var/app/<app-id>/config/<name>/DevToolsActivePort
  const flatpakBrowsers = [
    ['org.chromium.Chromium', 'chromium'],
    ['com.google.Chrome', 'google-chrome'],
    ['com.brave.Browser', 'BraveSoftware/Brave-Browser'],
    ['com.microsoft.Edge', 'microsoft-edge'],
    ['com.vivaldi.Vivaldi', 'vivaldi'],
  ];
  const candidates = [
    process.env.CDP_PORT_FILE,
    ...macBrowsers.flatMap(b => [
      resolve(home, 'Library/Application Support', b, 'DevToolsActivePort'),
      resolve(home, 'Library/Application Support', b, 'Default/DevToolsActivePort'),
    ]),
    ...linuxBrowsers.flatMap(b => [
      resolve(home, '.config', b, 'DevToolsActivePort'),
      resolve(home, '.config', b, 'Default/DevToolsActivePort'),
    ]),
    ...flatpakBrowsers.flatMap(([appId, name]) => [
      resolve(home, '.var/app', appId, 'config', name, 'DevToolsActivePort'),
      resolve(home, '.var/app', appId, 'config', name, 'Default/DevToolsActivePort'),
    ]),
    // Windows: %LOCALAPPDATA%/<name>/User Data/DevToolsActivePort
    ...(IS_WINDOWS ? ['Google/Chrome', 'BraveSoftware/Brave-Browser', 'Microsoft/Edge'].flatMap(b => {
      const base = process.env.LOCALAPPDATA || resolve(home, 'AppData/Local');
      return [
        resolve(base, b, 'User Data/DevToolsActivePort'),
        resolve(base, b, 'User Data/Default/DevToolsActivePort'),
      ];
    }) : []),
  ].filter(Boolean);
  const host = process.env.CDP_HOST || '127.0.0.1';

  // Explicit selection must fail closed, never silently attach another profile.
  if (process.env.CDP_PORT_FILE) {
    return portFileUrl(explicitPortFile, host);
  }
  if (process.env.CDP_PORT) return probeDebugPort(process.env.CDP_PORT, host);

  // With no explicit selector, try the standard port then known profile files.
  const ports = ['9222'];
  const errors = [];
  for (const port of ports) {
    try { return await probeDebugPort(port, host); }
    catch (err) { errors.push(`${host}:${port} ${err.message}`); }
  }

  // Fallback for browsers that expose a dynamic debugging port through
  // DevToolsActivePort instead of the fixed 9222 endpoint.
  const portFile = candidates.find(p => existsSync(p));
  if (portFile) {
    return portFileUrl(readFileSync(portFile, 'utf8'), host);
  }

  throw new Error(`CDP HTTP discovery failed and no DevToolsActivePort found. ${recovery} Tried: ${errors.join('; ')}`);
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function resolvePrefix(prefix, candidates, noun = 'target', missingHint = '') {
  const upper = prefix.toUpperCase();
  const matches = candidates.filter(candidate => candidate.toUpperCase().startsWith(upper));
  if (matches.length === 0) {
    const hint = missingHint ? ` ${missingHint}` : '';
    throw new Error(`No ${noun} matching prefix "${prefix}".${hint}`);
  }
  if (matches.length > 1) {
    throw new Error(`Ambiguous prefix "${prefix}" — matches ${matches.length} ${noun}s. Use more characters.`);
  }
  return matches[0];
}

function getDisplayPrefixLength(targetIds) {
  if (targetIds.length === 0) return MIN_TARGET_PREFIX_LEN;
  const maxLen = Math.max(...targetIds.map(id => id.length));
  for (let len = MIN_TARGET_PREFIX_LEN; len <= maxLen; len++) {
    const prefixes = new Set(targetIds.map(id => id.slice(0, len).toUpperCase()));
    if (prefixes.size === targetIds.length) return len;
  }
  return maxLen;
}

export {
  DAEMON_CONNECT_DELAY,
  DAEMON_CONNECT_TIMEOUT,
  IDLE_TIMEOUT,
  IS_WINDOWS,
  NAVIGATION_TIMEOUT,
  PAGES_CACHE,
  RUNTIME_DIR,
  TIMEOUT,
  getDisplayPrefixLength,
  getWsUrl,
  probeDebugPort,
  resolvePrefix,
  sleep,
  sockPath,
};
