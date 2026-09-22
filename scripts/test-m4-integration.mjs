import assert from 'node:assert/strict';

import { ingestDocument, getIngestionStatus } from '../src/lib/ingestion.ts';
import { chat, NO_CONTEXT_FALLBACK } from '../src/lib/rag.ts';
import { generateEmbeddings, EMBEDDING_DIMENSION } from '../src/lib/embeddings.ts';
import { POST as ingest } from '../src/pages/api/ingest.ts';
import { POST as chatEndpoint } from '../src/pages/api/chat.ts';

const embedding = Array.from({ length: 384 }, (_, index) => index === 0 ? 1 : 0);
const storedVectors = [];
const embeddedInputs = [];

const dependencies = {
  embed: async (inputs) => {
    embeddedInputs.push(...inputs);
    return inputs.map((input) => ({ ...input, embedding }));
  },
  upsert: async (vectors) => {
    storedVectors.push(...vectors);
    return { upsertedCount: vectors.length };
  },
};

const start = performance.now();
const record = await ingestDocument({
  id: 'integration-document',
  title: 'Integration document',
  format: 'markdown',
  source: 'integration.md',
  content: '# Portfolio\n\nThe portfolio assistant is grounded in verified project information.',
}, { dependencies });
const elapsed = performance.now() - start;

assert.equal(record.status, 'completed');
assert.equal(record.chunkCount, embeddedInputs.length);
assert.equal(record.upsertedCount, storedVectors.length);
assert.equal(getIngestionStatus(record.id)?.status, 'completed');
assert.equal(storedVectors[0].metadata?.source, 'integration.md');
assert.equal(storedVectors[0].values.length, 384);
assert.equal(EMBEDDING_DIMENSION, 384);

const generated = await generateEmbeddings(['one', 'two'], {
  client: { featureExtraction: async ({ inputs }) => inputs.map(() => embedding) },
});
assert.equal(generated.length, 2);
assert.equal(generated[0].length, 384);
await assert.rejects(
  () => generateEmbeddings(['bad'], { client: { featureExtraction: async () => [1, 2, 3] } }),
  /unexpected dimension|invalid embedding response shape/,
);

let chatCalls = 0;
const chatResult = await chat('What is the portfolio assistant grounded in?', {
  embed: async () => embedding,
  search: async () => [{
    id: storedVectors[0].id,
    score: 0.99,
    metadata: { ...storedVectors[0].metadata, content: embeddedInputs[0].content },
  }],
  client: {
    chat: {
      completions: {
        create: async (request) => {
          chatCalls += 1;
          assert.match(request.messages[0].content, /verified project information/);
          return { choices: [{ message: { content: 'It is grounded in verified project information. [1]' } }] };
        },
      },
    },
  },
});
assert.equal(chatCalls, 1);
assert.match(chatResult.answer, /verified project information/);
assert.equal(chatResult.sources[0].source, 'integration.md');

const noContext = await chat('Unknown question', {
  embed: async () => embedding,
  search: async () => [],
});
assert.equal(noContext.answer, NO_CONTEXT_FALLBACK);
assert.deepEqual(noContext.sources, []);

const validIngestResponse = await ingest({
  request: new Request('http://localhost/api/ingest', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ content: 'valid document', format: 'text' }),
  }),
});
assert.equal(validIngestResponse.status, 500);

const invalidIngestResponse = await ingest({
  request: new Request('http://localhost/api/ingest', {
    method: 'POST',
    headers: { 'content-type': 'text/plain' },
    body: 'invalid content type',
  }),
});
assert.equal(invalidIngestResponse.status, 415);

const invalidChatResponse = await chatEndpoint({
  request: new Request('http://localhost/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: '' }),
  }),
});
assert.equal(invalidChatResponse.status, 400);

assert.ok(elapsed < 5000, `local integration flow exceeded 5 seconds: ${elapsed.toFixed(1)}ms`);
console.log(`M4 integration checks passed in ${elapsed.toFixed(1)}ms.`);
