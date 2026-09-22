import { spawnSync } from 'node:child_process';

const command = process.platform === 'win32' ? 'astro.cmd' : 'astro';
const env = { ...process.env };

// The local Windows environment blocks Astro's native compiler binding.
// Astro's WASI binding provides a portable fallback for this build command.
if (process.platform === 'win32') {
  env.NAPI_RS_FORCE_WASI = '1';
}

const result = spawnSync(command, ['build'], {
  env,
  shell: process.platform === 'win32',
  stdio: 'inherit',
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
