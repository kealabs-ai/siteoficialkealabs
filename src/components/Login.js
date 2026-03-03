import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/kealabs_logo_strategic.png';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
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
      const response = await fetch('http://72.60.140.128:6002/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('kea_client_id', data.kea_client_id);
        localStorage.setItem('role_id', data.role_id);
        localStorage.setItem('unit_id', data.unit_id);
        window.location.href = 'http://kealabs.cloud:3002/login';
      } else {
        setError('Usuário ou senha inválidos');
      }
    } catch (err) {
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
              <label htmlFor="username">Usuário</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}
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
