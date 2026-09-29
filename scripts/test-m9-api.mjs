import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const tests = ['src/test/api/chat.test.ts', 'src/test/api/ingest.test.ts', 'src/test/api/status.test.ts'];

const run = (test) => new Promise((resolve) => {
  const child = spawn(process.execPath, ['node_modules/tsx/dist/cli.mjs', test], {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, ASTRO_ENV: 'test' },
  });
  child.on('error', (error) => {
    console.error(`[m9-api] ${test} failed to start: ${error.message}`);
    resolve(1);
  });
  child.on('exit', (code, signal) => resolve(signal ? 1 : (code ?? 1)));
});

for (const test of tests) {
  const code = await run(test);
  if (code !== 0) {
    process.exitCode = code;
    break;
  }
}

if (!process.exitCode) {
  assert.ok(tests.length === 3);
  console.log('M9 API tests passed: chat, ingestion, status, error handling, and response formats.');
}
