import React, { useState } from 'react';
import { login } from '../../../services/authService';

const LoginForm = ({ onSubmit, isLoading: externalIsLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

      if (rememberMe) {
        localStorage.setItem('remembered_email', email);
      } else {
        localStorage.removeItem('remembered_email');
      }

      onSubmit({ email, password, ...response });
    } catch (err) {
      setError(err.message || 'Erro ao fazer login. Tente novamente.');
      console.error('Erro no login:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const [rememberMe, setRememberMe] = useState(false);

  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('remembered_email');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const isSubmitting = isLoading || externalIsLoading;

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-title">
        <h2>Bem-vindo</h2>
        <p>Acesse sua conta Kealabs</p>
      </div>

      <div className="form-fields">
        {/* Campo Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-field">
            <span className="input-icon">✉️</span>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              disabled={isSubmitting}
              className="form-input"
              autoComplete="email"
            />
          </div>
        </div>

        {/* Campo Senha */}
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <div className="input-field">
            <span className="input-icon">🔒</span>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isSubmitting}
              className="form-input"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
              title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>

        {/* Checkbox Lembrar-me */}
        <div className="form-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isSubmitting}
            />
            <span>Lembrar-me neste dispositivo</span>
          </label>
          <a href="#forgot" className="forgot-link">Esqueceu a senha?</a>
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div className="error-alert">
            <span className="error-icon">⚠️</span>
            <span className="error-text">{error}</span>
          </div>
        )}

        {/* Botão de Login */}
        <button
          type="submit"
          className="login-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              <span>Entrando...</span>
            </>
          ) : (
            <>
              <span>Entrar</span>
              <span className="button-icon">→</span>
            </>
          )}
        </button>
      </div>

      {/* Footer do Formulário */}
      <div className="form-footer">
        <p>Não tem uma conta? <a href="#signup" className="signup-link">Solicite acesso</a></p>
      </div>
    </form>
  );
};

export default LoginForm;
