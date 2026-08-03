export interface AuthUserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

const DEMO_CREDENTIALS: Array<{ email: string; password: string }> = [
  { email: 'admin@kealabs.cloud', password: '123456' },
];

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export const validateCredentials = (email: string, password: string): { valid: boolean; error?: string } => {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = password.trim();

  if (!normalizedEmail || !normalizedPassword) {
    return { valid: false, error: 'Por favor, preencha todos os campos' };
  }

  if (!normalizedEmail.includes('@') || normalizedEmail.split('@').length !== 2 || normalizedEmail.startsWith('@') || normalizedEmail.endsWith('@')) {
    return { valid: false, error: 'Por favor, insira um email válido' };
  }

  const isKnownCredential = DEMO_CREDENTIALS.some(
    (credential) => credential.email === normalizedEmail && credential.password === normalizedPassword,
  );

  if (!isKnownCredential) {
    return { valid: false, error: 'Email ou senha incorretos' };
  }

  return { valid: true };
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
