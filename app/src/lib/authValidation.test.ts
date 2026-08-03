import { describe, it, expect } from 'vitest';
import { normalizeUserData } from './authValidation';

describe('normalizeUserData', () => {
  it('rejects malformed user payloads', () => {
    expect(normalizeUserData(null)).toBeNull();
    expect(normalizeUserData({})).toBeNull();
    expect(normalizeUserData({ id: '1', name: 'Ana', email: 'email-invalido', role: 'admin' })).toBeNull();
  });

  it('normalizes valid user payloads', () => {
    expect(normalizeUserData({
      id: ' 1 ',
      name: ' Ana Maria ',
      email: ' ana@kealabs.com ',
      role: ' admin ',
    })).toEqual({
      id: '1',
      name: 'Ana Maria',
      email: 'ana@kealabs.com',
      role: 'admin',
    });
  });
});
