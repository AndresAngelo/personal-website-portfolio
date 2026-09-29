import { GET as statusEndpoint } from '../../pages/api/status';
import { assert, expectStatus } from '../utils/assertions';

const response = await statusEndpoint({ request: new Request('http://localhost/api/status', { method: 'GET' }) } as any);
expectStatus(response, 503);
assert.match(response.headers.get('content-type') ?? '', /^application\/json(?:;|$)/);
const body = await response.json() as Record<string, any>;
assert.equal(body.status, 'degraded');
assert.match(body.version, /^\d+\.\d+\.\d+$/);
assert.deepEqual(body.services?.vectorDatabase, {
  status: 'unavailable',
  connected: false,
});
assert.equal(typeof body.error, 'string');
