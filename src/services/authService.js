const API_BASE_URL = 'https://srv1023256.hstgr.cloud/k1/api';

// Chaves para localStorage
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';

/**
 * Fazer login com email e senha
 */
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao fazer login');
    }

    const data = await response.json();

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

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expirado, tentar renovar
        await refreshToken();
        return getCurrentUser(); // Tentar novamente
      }
      throw new Error('Erro ao obter dados do usuário');
    }

    const data = await response.json();

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

    const response = await fetch(`${API_BASE_URL}/auth/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenToValidate}`,
      },
      body: JSON.stringify({ token: tokenToValidate }),
    });

    if (!response.ok) {
      throw new Error('Token inválido');
    }

    const data = await response.json();
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

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshTokenValue }),
    });

    if (!response.ok) {
      // Refresh token expirado, fazer logout
      logout();
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    const data = await response.json();

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
 * Fazer requisição autenticada genérica
 */
export const authenticatedFetch = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      throw new Error('Não autenticado');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // Token expirado, tentar renovar
      await refreshToken();
      return authenticatedFetch(endpoint, options); // Tentar novamente
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro na requisição');
    }

    return await response.json();
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
