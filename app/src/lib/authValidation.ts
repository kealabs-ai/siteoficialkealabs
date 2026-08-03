export interface AuthUserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

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
