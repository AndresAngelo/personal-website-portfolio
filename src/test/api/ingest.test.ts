import { POST as ingestEndpoint } from '../../pages/api/ingest';
import { assert, expectStatus } from '../utils/assertions';

const request = (body: BodyInit | null, contentType = 'application/json') => new Request('http://localhost/api/ingest', {
  method: 'POST',
  headers: { 'content-type': contentType },
  body,
});

const json = async (response: Response): Promise<Record<string, unknown>> => {
  assert.match(response.headers.get('content-type') ?? '', /^application\/json(?:;|$)/);
  return response.json() as Promise<Record<string, unknown>>;
};

const unsupported = await ingestEndpoint({ request: request('document', 'text/plain') } as any);
expectStatus(unsupported, 415);
assert.equal((await json(unsupported)).error, 'Content-Type must be application/json.');

const malformed = await ingestEndpoint({ request: request('{') } as any);
expectStatus(malformed, 400);
assert.equal((await json(malformed)).error, 'Request body must be valid JSON.');

for (const [body, message] of [
  [{}, 'Request body must include a string content field.'],
  [{ content: 'document', format: 'pdf' }, 'format must be one of: markdown, html, text.'],
  [{ content: 'document', metadata: [] }, 'metadata must be an object.'],
] as const) {
  const response = await ingestEndpoint({ request: request(JSON.stringify(body)) } as any);
  expectStatus(response, 400);
  assert.equal((await json(response)).error, message);
}

const unavailable = await ingestEndpoint({
  request: request(JSON.stringify({ content: 'valid document', format: 'text' })),
} as any);
expectStatus(unavailable, 500);
assert.match(String((await json(unavailable)).error), /configured|not configured/i);
