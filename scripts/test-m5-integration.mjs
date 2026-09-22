import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const [widget, header, messages, input, citations, indicator, client] = await Promise.all([
  read('src/components/ChatWidget.astro'),
  read('src/components/ChatHeader.astro'),
  read('src/components/ChatMessages.astro'),
  read('src/components/ChatInput.astro'),
  read('src/components/CitationDisplay.astro'),
  read('src/components/StreamingIndicator.astro'),
  import('../src/lib/chatClient.ts'),
]);

assert.match(widget, /<ChatHeader \/>/);
assert.match(widget, /<ChatMessages messages=\{\[welcomeMessage\]\} \/>/);
assert.match(widget, /<ChatInput \/>/);
assert.match(widget, /<StreamingIndicator \/>/);
assert.match(widget, /localStorage\.setItem\(HISTORY_KEY/);
assert.match(widget, /slice\(-MAX_HISTORY\)/);
assert.match(widget, /@media \(max-width: 480px\)/);
assert.match(widget, /@media \(prefers-reduced-motion: reduce\)/);
assert.doesNotMatch(widget, /onChunk: \(chunk\) => \{ if \(assistant\) assistant\.textContent = resultText\(assistant\.textContent \?\? ''\, chunk\)/);
assert.match(header, /data-chat-clear/);
assert.match(header, /data-chat-close/);
assert.match(messages, /aria-live="polite"/);
assert.match(messages, /inline-citation/);
assert.match(input, /maxlength=\{maxLength\}/);
assert.match(input, /chat:submit/);
assert.match(citations, /Preview source/);
assert.match(indicator, /data-streaming-cancel/);

const originalFetch = globalThis.fetch;
const chunks = [];
globalThis.fetch = async (_input, init) => {
  const request = JSON.parse(init.body);
  assert.equal(request.query, 'Where is the source?');
  assert.deepEqual(request.history, [{ role: 'user', content: 'Earlier question' }]);
  const encoder = new TextEncoder();
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode('data: {"answer":"The answer starts in "}\n\n'));
      controller.enqueue(encoder.encode('data: {"answer":"The answer starts in the docs. [1]","sources":[{"id":"source-1","source":"docs/about.md","content":"About"}]}\n\n'));
      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });
  return new Response(body, { headers: { 'content-type': 'text/event-stream' } });
};

try {
  const result = await client.sendMessage(' Where is the source? ', {
    history: [{ role: 'user', content: 'Earlier question' }],
    onChunk: (chunk) => chunks.push(chunk),
  });
  assert.equal(result.answer, 'The answer starts in the docs. [1]');
  assert.equal(result.sources[0].source, 'docs/about.md');
  assert.equal(chunks.length, 2);
  await assert.rejects(() => client.sendMessage('   '), /Please enter a question/);
} finally {
  globalThis.fetch = originalFetch;
}

console.log('M5 integration checks passed: composition, streaming, citations, persistence, responsive hooks, and accessibility wiring.');
