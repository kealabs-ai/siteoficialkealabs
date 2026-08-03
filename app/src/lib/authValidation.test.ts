import { describe, it, expect } from 'vitest';
import { normalizeUserData, getAuthErrorMessage } from './authValidation';

describe('getAuthErrorMessage', () => {
  it('maps 401 responses to the expected message', () => {
    expect(getAuthErrorMessage({ response: { status: 401, data: { message: 'Falha' } } })).toBe('Email ou senha incorretos');
  });

  it('preserves server-provided error details', () => {
    expect(getAuthErrorMessage({ response: { status: 400, data: { message: 'Dados inválidos' } } })).toBe('Dados inválidos');
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
