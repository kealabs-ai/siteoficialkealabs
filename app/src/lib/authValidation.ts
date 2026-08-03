export interface AuthUserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export const getAuthErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') {
    return error;
  }

  const candidate = error as { response?: { status?: number; data?: { message?: string; error?: string; detail?: string } }; message?: string };

  if (candidate.response?.status === 401) {
    return 'Email ou senha incorretos';
  }

  if (candidate.response?.status === 400) {
    return candidate.response?.data?.message || candidate.response?.data?.error || candidate.response?.data?.detail || 'Dados inválidos';
  }

  if (candidate.response?.status === 500) {
    return 'Erro no servidor. Tente novamente mais tarde.';
  }

  if (candidate.message === 'Network Error') {
    return 'Erro de conexão. Verifique sua internet.';
  }

  if (candidate.response?.data?.message) {
    return candidate.response.data.message;
  }

  if (candidate.response?.data?.error) {
    return candidate.response.data.error;
  }

  if (candidate.response?.data?.detail) {
    return candidate.response.data.detail;
  }

  if (candidate.message) {
    return candidate.message;
  }

  return 'Erro ao fazer login. Tente novamente.';
};

export const normalizeUserData = (user: unknown): AuthUserData | null => {
  if (!user || typeof user !== 'object') {
    return null;
  }

  const candidate = user as Record<string, unknown>;
  const id = typeof candidate.id === 'string' ? candidate.id.trim() : '';
  const name = typeof candidate.name === 'string' ? candidate.name.trim() : '';
  const email = typeof candidate.email === 'string' ? candidate.email.trim().toLowerCase() : '';
  const role = typeof candidate.role === 'string' ? candidate.role.trim().toLowerCase() : '';

  if (!isNonEmptyString(id) || !isNonEmptyString(name) || !isNonEmptyString(role)) {
    return null;
  }

  if (!email.includes('@') || email.split('@').length !== 2 || email.startsWith('@') || email.endsWith('@')) {
    return null;
  }

  return {
    id,
    name,
    email,
    role,
  };
};
