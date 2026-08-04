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
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <img src={logo} alt="Kealabs" className="login-logo" />
          <p>Área do Cliente</p>
        </div>

        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default LoginPage;
