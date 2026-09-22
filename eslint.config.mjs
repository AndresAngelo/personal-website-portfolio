import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  {
    ignores: ['dist/**', '.astro/**', '.vercel/**', 'node_modules/**'],
  },
  ...eslintPluginAstro.configs.recommended,
];
