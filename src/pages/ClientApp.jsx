import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';
import Login from '../components/ClientApp/Login';
import ClientHeader from '../components/ClientApp/ClientHeader';

const ClientApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <ClientHeader onLogout={handleLogout} user={user} />
      <main className="client-main">
        <div className="container">
          <h1>Bem-vindo, {user?.email}!</h1>
          <p>Você está na sua área de cliente Kealabs</p>
        </div>
      </main>
    </div>
  );
};

export default ClientApp;
