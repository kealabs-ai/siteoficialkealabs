import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';
import { api } from './lib/api';
import Login from './components/Login';
import ClientHeader from './components/ClientHeader';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Validar se o token é válido
const validateToken = async (token: string): Promise<boolean> => {
  try {
    // Tenta fazer uma requisição para validar o token
    const response = await api.get('/auth/validate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    console.error('Token inválido:', error);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    localStorage.removeItem('token_expires_in');
    localStorage.removeItem('token_type');
    return false;
  }
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isValidating, setIsValidating] = useState(true);

  // Validar token ao carregar
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      validateToken(token)
        .then((isValid) => {
          if (isValid) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
          setUser(null);
        })
        .finally(() => setIsValidating(false));
    } else {
      setIsValidating(false);
    }
  }, []);

  const handleLogin = (userData: UserData): void => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    localStorage.removeItem('token_expires_in');
    localStorage.removeItem('token_type');
  };

  if (isValidating) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: '#F8FAFC',
          fontSize: '1rem',
          color: '#64748B',
        }}
      >
        Carregando...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ClientHeader onLogout={handleLogout} user={user || undefined} />
        <main className="client-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
