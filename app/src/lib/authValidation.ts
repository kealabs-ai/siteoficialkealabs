/**
 * Validação e normalização de dados de autenticação
 */

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

/**
 * Normaliza dados do usuário de diferentes formatos de resposta
 */
export function normalizeUserData(data: any): UserData | null {
  if (!data) {
    return null;
  }

  // Tentar extrair dados de diferentes formatos
  const id = data.id || data.userId || data.user_id;
  const name = data.name || data.fullName || data.full_name || 'Usuário';
  const email = data.email || data.mail;
  const role = data.role || data.userRole || data.user_role || 'usuario';

  // Validar dados obrigatórios
  if (!id || !email) {
    return null;
  }

  return {
    id: String(id),
    name: String(name),
    email: String(email).toLowerCase(),
    role: String(role).toLowerCase(),
  };
}

/**
 * Obtém mensagem de erro apropriada baseada no erro de autenticação
 */
export function getAuthErrorMessage(error: any): string {
  // Erro de resposta HTTP
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    // 401 - Não autorizado
    if (status === 401) {
      return data?.message || data?.error || 'Email ou senha incorretos';
    }

    // 400 - Requisição inválida
    if (status === 400) {
      return data?.message || data?.error || 'Dados inválidos. Verifique email e senha.';
    }

    // 403 - Proibido
    if (status === 403) {
      return data?.message || data?.error || 'Acesso negado. Verifique suas permissões.';
    }

    // 500 - Erro do servidor
    if (status === 500) {
      return 'Erro no servidor. Tente novamente mais tarde.';
    }

    // Outros erros HTTP
    return data?.message || data?.error || `Erro ${status}: Tente novamente.`;
  }

  // Erro de rede
  if (error.message === 'Network Error') {
    return 'Erro de conexão. Verifique sua internet.';
  }

  // Erro de timeout
  if (error.code === 'ECONNABORTED') {
    return 'Requisição expirou. Tente novamente.';
  }

  // Erro customizado
  if (error.message) {
    return error.message;
  }

  // Erro genérico
  return 'Erro ao fazer login. Tente novamente.';
}

/**
 * Valida se os dados do usuário são válidos
 */
export function isValidUserData(data: any): boolean {
  const normalized = normalizeUserData(data);
  return normalized !== null;
}

/**
 * Valida se o token é válido (formato básico)
 */
export function isValidToken(token: string): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }

  // JWT deve ter 3 partes separadas por pontos
  const parts = token.split('.');
  return parts.length === 3;
}

/**
 * Valida credenciais de entrada
 */
export function validateCredentials(email: string, password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validar email
  if (!email || email.trim().length === 0) {
    errors.push('Email é obrigatório');
  } else if (!isValidEmail(email)) {
    errors.push('Email inválido');
  }

  // Validar senha
  if (!password || password.length === 0) {
    errors.push('Senha é obrigatória');
  } else if (password.length < 3) {
    errors.push('Senha deve ter pelo menos 3 caracteres');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Valida formato de email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitiza entrada de usuário para logging (remove dados sensíveis)
 */
export function sanitizeForLogging(data: any): any {
  if (!data) return null;

  const sanitized = { ...data };

  // Remover dados sensíveis
  delete sanitized.password;
  delete sanitized.access_token;
  delete sanitized.refresh_token;
  delete sanitized.token;

  // Mascarar email
  if (sanitized.email) {
    const [name, domain] = sanitized.email.split('@');
    sanitized.email = `${name.substring(0, 2)}***@${domain}`;
  }

  return sanitized;
}
