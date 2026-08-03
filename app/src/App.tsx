import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/global.css';
import { api } from './lib/api';
import { normalizeUserData } from './lib/authValidation';
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

// Componente de Layout Privado
const PrivateLayout: React.FC<{
  user: UserData | null;
  onLogout: () => void;
}> = ({ user, onLogout }) => {
  return (
    <div className="App">
      <ClientHeader onLogout={onLogout} user={user || undefined} />
      <main className="client-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

// Componente Principal
const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isValidating, setIsValidating] = useState(true);
  const location = useLocation();

  // Validar token ao carregar
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      validateToken(token)
        .then((isValid) => {
          let parsedUser: UserData | null = null;

          try {
            parsedUser = normalizeUserData(JSON.parse(storedUser));
          } catch {
            parsedUser = null;
          }

          if (isValid && parsedUser) {
            setIsAuthenticated(true);
            setUser(parsedUser);
          } else {
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            localStorage.removeItem('token_expires_in');
            localStorage.removeItem('token_type');
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
    const normalizedUser = normalizeUserData(userData);

    if (!normalizedUser) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      localStorage.removeItem('token_expires_in');
      localStorage.removeItem('token_type');
      return;
    }

    console.log('Login bem-sucedido:', normalizedUser);
    setUser(normalizedUser);
    setIsAuthenticated(true);
  };

  const handleLogout = (): void => {
    console.log('Logout realizado');
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

  return <PrivateLayout user={user} onLogout={handleLogout} />;
};

// Componente App com BrowserRouter
const App: React.FC = () => {
  return (
    <BrowserRouter basename="/app">
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
