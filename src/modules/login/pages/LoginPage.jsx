import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../../services/authService';
import LoginForm from '../components/LoginForm';
import logo from '../../../assets/kealabs_logo_strategic.png';
import '../styles/login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    try {
      const user = await getCurrentUser();
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      if (localStorage.getItem('auth_token')) {
        navigate('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background com gradiente e elementos decorativos */}
      <div className="login-background">
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>
        <div className="grid-pattern"></div>
      </div>

      {/* Container principal */}
      <div className="login-container">
        {/* Header com logo */}
        <div className="login-header">
          <div className="logo-wrapper">
            <img src={logo} alt="Kealabs" className="logo-image" />
          </div>
          <h1 className="brand-title">Kealabs</h1>
          <p className="brand-subtitle">AI-First Intelligence Platform</p>
        </div>

        {/* Formulário de login */}
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default LoginPage;
