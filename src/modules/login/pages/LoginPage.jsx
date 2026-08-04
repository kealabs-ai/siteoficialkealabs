import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../../services/authService';
import LoginForm from '../components/LoginForm';
import LoginBenefits from '../components/LoginBenefits';
import '../styles/login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    try {
      // Obter dados do usuário logado
      const user = await getCurrentUser();

      // Armazenar dados do usuário
      localStorage.setItem('user', JSON.stringify(user));

      // Redirecionar para dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      // Mesmo com erro ao obter dados, redirecionar se o token foi salvo
      if (localStorage.getItem('auth_token')) {
        navigate('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-left">
          <LoginBenefits />
        </div>
        <div className="login-right">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
