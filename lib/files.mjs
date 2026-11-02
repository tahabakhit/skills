import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const excluded = new Set(['metadata.json', '.git', '__pycache__', '__pypackages__']);
const maxBytes = 32 * 1024 * 1024;
export function tree(dir, source = false) {
  const initial = fs.lstatSync(dir);
  if (!initial.isDirectory() || initial.isSymbolicLink()) throw new Error(`Expected a real skill directory: ${dir}`);
  const result = { files: {}, directories: [] };
  let entries = 0; let bytes = 0;
  function visit(current, relative = '') {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (++entries > 4096) throw new Error(`Skill snapshot exceeds 4096 entries: ${dir}`);
      const name = path.join(relative, entry.name); const file = path.join(current, entry.name);
      if (source && excluded.has(entry.name)) throw new Error(`Upstream excludes this source entry; reconcile it before installing: ${file}`);
      if (entry.isSymbolicLink()) throw new Error(`Symlinks are not supported in copied skills: ${file}`);
      if (entry.isDirectory()) { result.directories.push(name); visit(file, name); }
      else if (entry.isFile()) {
        const stat = fs.lstatSync(file); bytes += stat.size;
        if (bytes > maxBytes) throw new Error(`Skill snapshot exceeds 32 MiB: ${dir}`);
        result.files[name] = { hash: crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'), mode: stat.mode & 0o777 };
      } else throw new Error(`Unsupported source file: ${file}`);
    }
  }
  visit(dir);
  result.directories.sort();
  return result;
}
export function fingerprint(file) {
  let stat;
  try { stat = fs.lstatSync(file); } catch (error) { if (error.code === 'ENOENT') return null; throw error; }
  if (stat.isSymbolicLink()) throw new Error(`Refusing symlink: ${file}`);
  const identity = { ino: stat.ino, dev: stat.dev, links: stat.nlink, mtime: stat.mtimeMs, ctime: stat.ctimeMs, mode: stat.mode };
  if (stat.isDirectory()) return { ...identity, tree: tree(file) };
  if (!stat.isFile() || stat.size > maxBytes) throw new Error(`Unsupported or oversized destination: ${file}`);
  return { ...identity, hash: crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex') };
}
