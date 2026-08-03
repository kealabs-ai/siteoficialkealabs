import { describe, it, expect } from 'vitest';
import { normalizeUserData, validateCredentials } from './authValidation';

describe('validateCredentials', () => {
  it('rejects invalid credentials', () => {
    expect(validateCredentials('admin@kealabs.cloud', 'wrong-password')).toEqual({
      valid: false,
      error: 'Email ou senha incorretos',
    });
  });

  it('accepts the expected demo credentials', () => {
    expect(validateCredentials('admin@kealabs.cloud', '123456')).toEqual({ valid: true });
  });
});

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
