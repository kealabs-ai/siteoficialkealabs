import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://srv1023256.hstgr.cloud/k1/api'
    : '/k1/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 60000
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config._retryCount = config._retryCount || 0;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para refresh automático do token e retry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const maxRetries = 3;

    // Retry em caso de timeout ou erro de conexão
    if ((error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT' || !error.response) && originalRequest._retryCount < maxRetries) {
      originalRequest._retryCount += 1;
      console.log(`Tentativa ${originalRequest._retryCount} de ${maxRetries}...`);
      
      // Aguarda antes de tentar novamente
      await new Promise(resolve => setTimeout(resolve, 1000 * originalRequest._retryCount));
      return api(originalRequest);
    }

    // Se receber 401 e não for retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (!refreshToken) {
          localStorage.clear();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Tenta renovar o token
        const { data } = await axios.post(
          'https://srv1023256.hstgr.cloud/k1/api/auth/refresh',
          { refresh_token: refreshToken }
        );

        // Atualiza os tokens
        localStorage.setItem('auth_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        // Atualiza o header da requisição original
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

        // Repete a requisição original
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
