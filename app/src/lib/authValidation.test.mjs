import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeUserData } from './authValidation.js';

test('rejects malformed user payloads', () => {
  assert.equal(normalizeUserData(null), null);
  assert.equal(normalizeUserData({}), null);
  assert.equal(normalizeUserData({ id: '1', name: 'Ana', email: 'email-invalido', role: 'admin' }), null);
});

test('normalizes valid user payloads', () => {
  const normalized = normalizeUserData({
    id: ' 1 ',
    name: ' Ana Maria ',
    email: ' ana@kealabs.com ',
    role: ' admin ',
  });

  assert.deepEqual(normalized, {
    id: '1',
    name: 'Ana Maria',
    email: 'ana@kealabs.com',
    role: 'admin',
  });
});
