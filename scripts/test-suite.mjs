import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const checks = [
  ['content integration', 'npm run test:content'],
  ['M4 integration', 'npm run test:m4'],
  ['M5 integration', 'npm run test:m5'],
  ['M6 integration', 'npm run test:m6'],
  ['M7 integration', 'npm run test:m7'],
  ['M8 integration', 'npm run test:m8'],
  ['M9 API tests', 'npm run test:api'],
];

const run = ([name, command]) => new Promise((resolve) => {
  console.log(`\n[test-suite] ${name}`);
  const child = spawn(process.execPath, ['-e', `import { spawn } from 'node:child_process'; const child = spawn(process.env.ComSpec ?? 'cmd.exe', ['/d', '/s', '/c', ${JSON.stringify(command)}], { stdio: 'inherit', windowsVerbatimArguments: true }); child.on('exit', (code, signal) => process.exit(signal ? 1 : (code ?? 1)));`], { cwd: root, stdio: 'inherit' });
  child.on('error', (error) => {
    console.error(`[test-suite] ${name} failed to start: ${error.message}`);
    resolve(1);
  });
  child.on('exit', (code, signal) => {
    if (signal) {
      console.error(`[test-suite] ${name} stopped by ${signal}`);
      resolve(1);
      return;
    }
    resolve(code ?? 1);
  });
});

for (const check of checks) {
  const code = await run(check);
  if (code !== 0) {
    console.error(`\n[test-suite] FAILED: ${check[0]}`);
    process.exitCode = code;
    break;
  }
}

if (!process.exitCode) console.log('\n[test-suite] All configured deterministic checks passed.');
