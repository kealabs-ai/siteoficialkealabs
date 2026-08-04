import React, { useState } from 'react';

const LoginForm = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
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

    onSubmit({ email, password });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-header">
        <div className="logo-container">
          <h1 className="logo">Kealabs</h1>
          <p className="tagline">Área do Cliente</p>
        </div>
      </div>

      <div className="form-content">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            disabled={isLoading}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              className="form-input"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Entrando...
            </>
          ) : (
            'Entrar'
          )}
        </button>

        <div className="login-footer">
          <a href="#forgot" className="forgot-password">Esqueceu a senha?</a>
          <span className="divider">•</span>
          <a href="/" className="back-to-site">Voltar ao site</a>
        </div>
      </div>

      <div className="login-info">
        <p>Não tem uma conta? <a href="#signup">Solicite acesso</a></p>
      </div>
    </form>
  );
};

export default LoginForm;
