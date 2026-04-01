import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/kealabs_logo_strategic.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://srv1023256.hstgr.cloud/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Armazena os tokens JWT
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redireciona para o sistema
        window.location.href = 'https://kealabs.cloud';
      } else {
        setError(data.message || 'Usuário ou senha inválidos');
      }
    } catch (err) {
      console.error('Erro de autenticação:', err);
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <img src={logo} alt="Kealabs" className="login-logo" />
            <h2>Área do Cliente</h2>
            <p>Acesse sua conta para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="login-error">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="seu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <a href="https://wa.me/5535984331546?text=Ol%C3%A1%2C%20esqueci%20minha%20senha" className="forgot-password" target="_blank" rel="noopener noreferrer">
              Esqueci minha senha
            </a>
          </form>

          <div className="login-footer">
            <a href="/">← Voltar ao site</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
