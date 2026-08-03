import React, { useState, FormEvent, ChangeEvent } from 'react';
import { api } from '../lib/api';
import { normalizeUserData } from '../lib/authValidation';
import './Login.css';

interface LoginProps {
  onLogin: (userData: UserData) => void;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: UserData;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('admin@kealabs.cloud');
  const [password, setPassword] = useState<string>('123456');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validação básica
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Por favor, insira um email válido');
      setLoading(false);
      return;
    }

    try {
      console.log('Iniciando login com:', { email });
      
      // Fazer requisição de login
      const response = await api.post<LoginResponse>('/auth/login', {
        email: email.trim(),
        password: password.trim(),
      });

      console.log('Resposta do login:', response.data);

      const { access_token, refresh_token, user, expires_in } = response.data;

      const normalizedUser = normalizeUserData(user);

      // Validar resposta
      if (!access_token || !normalizedUser) {
        throw new Error('Resposta inválida do servidor');
      }

      // Armazenar tokens
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('token_expires_in', expires_in.toString());
      localStorage.setItem('token_type', 'bearer');

      // Armazenar informações do usuário
      localStorage.setItem('user', JSON.stringify(user));

      console.log('Login bem-sucedido para:', normalizedUser.email);

      // Chamar callback com dados do usuário
      onLogin(normalizedUser);
    } catch (err: any) {
      console.error('Erro completo:', err);
      
      let message = 'Erro ao fazer login. Tente novamente.';

      if (err.response?.status === 401) {
        message = 'Email ou senha incorretos';
      } else if (err.response?.status === 400) {
        message = err.response?.data?.message || 'Dados inválidos';
      } else if (err.response?.status === 500) {
        message = 'Erro no servidor. Tente novamente mais tarde.';
      } else if (err.message === 'Network Error') {
        message = 'Erro de conexão. Verifique sua internet.';
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.response?.data?.error) {
        message = err.response.data.error;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Kealabs</h1>
          <p>Área do Cliente</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="seu@email.com"
              disabled={loading}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              disabled={loading}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="error-message" role="alert">
              ⚠️ {error}
            </div>
          )}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          {/* Informações de teste */}
          <div className="login-info">
            <p>Credenciais de teste:</p>
            <small>Email: admin@kealabs.cloud</small>
            <small>Senha: 123456</small>
          </div>
        </form>

        <div className="login-footer">
          <a href="#forgot">Esqueceu a senha?</a>
          <span>•</span>
          <a href="/">Voltar ao site</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
