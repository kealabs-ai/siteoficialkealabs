import React, { useState } from 'react';
import { login } from '../../../services/authService';

const LoginForm = ({ onSubmit, isLoading: externalIsLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor, insira um email válido');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const response = await login(email, password);
      onSubmit({ email, password, ...response });
    } catch (err) {
      setError(err.message || 'Erro ao fazer login. Tente novamente.');
      console.error('Erro no login:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitting = isLoading || externalIsLoading;

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          disabled={isSubmitting}
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
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          disabled={isSubmitting}
          required
          autoComplete="current-password"
        />
      </div>

      {error && (
        <div className="error-message" role="alert">
          ⚠️ {error}
        </div>
      )}

      <button type="submit" className="login-button" disabled={isSubmitting}>
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
};

export default LoginForm;
