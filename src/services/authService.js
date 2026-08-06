import api from './api';

// Chaves para localStorage
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';

/**
 * Fazer login com email e senha
 */
export const login = async (email, password) => {
  try {
    const { data } = await api.post('/auth/login', { email, password });
    
    // Armazenar tokens
    if (data.access_token) {
      localStorage.setItem(TOKEN_KEY, data.access_token);
    }
    if (data.refresh_token) {
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
    }

    return data;
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};

/**
 * Obter dados do usuário logado
 */
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      throw new Error('Token não encontrado');
    }

    const { data } = await api.get('/auth/me');

    // Armazenar dados do usuário
    localStorage.setItem(USER_KEY, JSON.stringify(data));

    return data;
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    throw error;
  }
};

/**
 * Validar token JWT
 */
export const validateToken = async (token = null) => {
  try {
    const tokenToValidate = token || localStorage.getItem(TOKEN_KEY);

    if (!tokenToValidate) {
      throw new Error('Token não encontrado');
    }

    const { data } = await api.post('/auth/validate', { token: tokenToValidate });
    return data;
  } catch (error) {
    console.error('Erro ao validar token:', error);
    throw error;
  }
};

/**
 * Renovar token de acesso
 */
export const refreshToken = async () => {
  try {
    const refreshTokenValue = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!refreshTokenValue) {
      throw new Error('Refresh token não encontrado');
    }

    const { data } = await api.post('/auth/refresh', { refresh_token: refreshTokenValue });

    // Atualizar tokens
    if (data.access_token) {
      localStorage.setItem(TOKEN_KEY, data.access_token);
    }
    if (data.refresh_token) {
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
    }

    return data;
  } catch (error) {
    console.error('Erro ao renovar token:', error);
    logout();
    throw error;
  }
};

/**
 * Fazer logout
 */
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * Obter token armazenado
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Obter dados do usuário armazenados
 */
export const getStoredUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

/**
 * Verificar se usuário está autenticado
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

/**
 * Fazer requisição autenticada genérica (fallback)
 */
export const authenticatedFetch = async (endpoint, options = {}) => {
  try {
    const response = await api({
      url: endpoint,
      ...options,
    });
    return response.data;
  } catch (error) {
    console.error('Erro na requisição autenticada:', error);
    throw error;
  }
};

export default {
  login,
  getCurrentUser,
  validateToken,
  refreshToken,
  logout,
  getToken,
  getStoredUser,
  isAuthenticated,
  authenticatedFetch,
};
