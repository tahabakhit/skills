#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { main } from '../lib/cli.mjs';

try {
  await main(process.argv.slice(2), fileURLToPath(new URL('../', import.meta.url)));
} catch (error) {
  if (error.name === 'AbortError') {
    console.error('Cancelled. Inspect any scope already reported as installed.');
    process.exitCode = 130;
  } else {
    console.error(`Installation stopped: ${error.message}`);
    process.exitCode = 1;
  }
}
