import React, { useState, FormEvent, ChangeEvent } from 'react';
import { api } from '../lib/api';
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

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post<LoginResponse>('/auth/login', {
        email,
        password,
      });

      const { access_token, refresh_token, user, expires_in } = response.data;

      // Armazenar tokens
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('token_expires_in', expires_in.toString());
      localStorage.setItem('token_type', 'bearer');

      // Armazenar informações do usuário
      localStorage.setItem('user', JSON.stringify(user));

      // Chamar callback com dados do usuário
      onLogin({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Erro ao fazer login. Verifique suas credenciais.';
      setError(message);
      console.error('Erro de autenticação:', err);
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
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
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
