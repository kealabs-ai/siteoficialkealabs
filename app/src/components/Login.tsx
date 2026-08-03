import React, { useState, FormEvent, ChangeEvent } from 'react';
import { api } from '../lib/api';
import { normalizeUserData, getAuthErrorMessage } from '../lib/authValidation';
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

    try {
      console.log('Iniciando login com:', { email });

      const response = await api.post<LoginResponse>('/auth/login', {
        email: email.trim(),
        password: password.trim(),
      });

      console.log('Resposta do login:', response.data);

      const payload = response.data ?? {};
      const accessToken = payload.access_token || payload.accessToken || payload.token;
      const refreshToken = payload.refresh_token || payload.refreshToken;
      const expiresIn = payload.expires_in ?? payload.expiresIn;
      const user = payload.user ?? payload.profile ?? payload.data?.user ?? null;

      const normalizedUser = normalizeUserData(user);
      const enteredEmail = email.trim().toLowerCase();

      if (!accessToken || !normalizedUser || normalizedUser.email !== enteredEmail) {
        const serverMessage = payload.message || payload.error || payload.detail || 'Resposta inválida do servidor';
        throw new Error(serverMessage);
      }

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken || '');
      localStorage.setItem('token_expires_in', String(expiresIn ?? ''));
      localStorage.setItem('token_type', 'bearer');
      localStorage.setItem('user', JSON.stringify(normalizedUser));

      console.log('Login bem-sucedido para:', normalizedUser.email);

      // Chamar callback com dados do usuário
      onLogin(normalizedUser);
    } catch (err: any) {
      console.error('Erro completo:', err);
      setError(getAuthErrorMessage(err));
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
