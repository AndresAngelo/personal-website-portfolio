import { POST as chatEndpoint } from '../../pages/api/chat';
import { assert, expectStatus } from '../utils/assertions';

const request = (body: string) => new Request('http://localhost/api/chat', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body,
});

const json = async (response: Response): Promise<Record<string, unknown>> => {
  assert.match(response.headers.get('content-type') ?? '', /^application\/json(?:;|$)/);
  return response.json() as Promise<Record<string, unknown>>;
};

const invalid = await chatEndpoint({ request: request(JSON.stringify({ query: '   ' })) } as any);
expectStatus(invalid, 400);
assert.equal((await json(invalid)).error, 'Chat query must not be empty.');

const malformed = await chatEndpoint({ request: request('{') } as any);
expectStatus(malformed, 400);
assert.match(String((await json(malformed)).error), /JSON|Unexpected end/);

const unavailable = await chatEndpoint({ request: request(JSON.stringify({ query: 'What is this portfolio?' })) } as any);
expectStatus(unavailable, 500);
assert.match(String((await json(unavailable)).error), /GROQ_API_KEY/);
