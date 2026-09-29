import { strict as assert } from 'node:assert';

export { assert };

export const fixture = <T>(value: T): T => structuredClone(value);

export const expectStatus = (response: Response, status: number): void => {
  assert.equal(response.status, status);
};
