import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const root = new URL('../', import.meta.url);
const distribution = JSON.parse(fs.readFileSync(new URL('distribution.json', root)));
const read = name => fs.readFileSync(new URL(name, root), 'utf8');

test('current bundle tables cover every distribution group, count and scope', () => {
  for (const file of ['README.md', 'CATALOG.md', 'ARCHITECTURE.md']) {
    const rows = read(file).split('\n').filter(line => /^\| /.test(line));
    for (const group of distribution.groups) {
      const row = rows.find(line => line.startsWith(`| [${group.name}](`) || line.startsWith(`| ${group.name} |`));
      assert.ok(row, `${file}: missing ${group.name}`);
      const cells = row.split('|').map(cell => cell.trim());
      assert.match(cells[2], group.recommendedScope === 'global' ? /^Global/ : /^Local/, `${file}: ${group.name} scope`);
      assert.match(cells[3], new RegExp(`(?:^|\\()${group.skills.length}(?:\\)|$)`), `${file}: ${group.name} count`);
    }
  }
});

test('installation package table matches generated identities and source counts', () => {
  const total = distribution.groups.reduce((count, group) => count + group.skills.length, 0);
  const packages = [
    ['@tahabakhit/skills', total],
    ...distribution.groups.map(group => [`@tahabakhit/skills-${group.name}`, group.skills.length])
  ];
  const rows = read('INSTALL.md').split('\n');
  for (const [name, count] of packages) {
    assert.ok(rows.some(row => row.startsWith(`| \`${name}\` | ${count} |`)), `INSTALL.md: ${name} count`);
  }
});
