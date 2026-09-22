import { existsSync, readFileSync, readdirSync, writeFileSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const collections = {
  projects: ['title', 'description', 'tags', 'image', 'link'],
  activities: ['title', 'date', 'description', 'location'],
  faq: ['question', 'answer'],
};

function fail(message) {
  console.error(`Content integration test failed: ${message}`);
  process.exitCode = 1;
}

function frontmatter(file) {
  const source = readFileSync(file, 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`${file} has no YAML frontmatter`);
  return match[1];
}

for (const [collection, requiredFields] of Object.entries(collections)) {
  const directory = join(root, 'src', 'content', collection);
  const files = readdirSync(directory).filter((file) => /\.(md|mdx)$/.test(file));
  if (files.length === 0) fail(`${collection} has no Markdown content files`);

  for (const file of files) {
    const metadata = frontmatter(join(directory, file));
    for (const field of requiredFields) {
      if (!new RegExp(`^${field}:`, 'm').test(metadata)) {
        fail(`${collection}/${file} is missing required field ${field}`);
      }
    }
  }
}

const sourceChecks = [
  ['src/content.config.ts', "defineCollection({\n  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' })"],
  ['src/content.config.ts', "defineCollection({\n  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/activities' })"],
  ['src/content.config.ts', "defineCollection({\n  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/faq' })"],
  ['src/components/ProjectCard.astro', 'project.heroImage ?? project.image'],
  ['src/components/ActivityCard.astro', 'activity.backgroundImage'],
  ['src/components/FAQCard.astro', '<details open={open}>'],
  ['src/lib/projects.ts', 'const pinned = projects.filter'],
];

for (const [relative, expected] of sourceChecks) {
  if (!readFileSync(join(root, relative), 'utf8').includes(expected)) {
    fail(`${relative} is missing integration behavior: ${expected}`);
  }
}

const invalidFile = join(root, 'src', 'content', 'projects', '__integration-invalid.md');
try {
  writeFileSync(invalidFile, '---\ntitle: Invalid fixture\ndescription: missing required fields\n---\n');
  const result = spawnSync('npm.cmd', ['run', 'build'], { cwd: root, encoding: 'utf8', stdio: 'pipe' });
  if (result.status === 0) fail('the build accepted invalid collection content');
} finally {
  if (existsSync(invalidFile)) unlinkSync(invalidFile);
}

if (process.exitCode) process.exit(process.exitCode);
console.log('Content integration checks passed, including invalid-content rejection.');
