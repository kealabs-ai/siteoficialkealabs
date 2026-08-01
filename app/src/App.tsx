import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';

interface UserData { email: string; }

const routeMap: Record<string, string> = {
  gestao:      '/dashboard',
  orcamentos:  '/builder',
  prospect:    '/dashboard',
  'agent-kea': '/dashboard',
};

const AppLayout: React.FC<{ user: UserData | null; onLogout: () => void }> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('gestao');

  const handleNavigate = (item: string) => {
    setActiveItem(item);
    navigate(routeMap[item] ?? '/dashboard');
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar activeItem={activeItem} onNavigate={handleNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6 flex-shrink-0">
          <p className="text-sm text-[#64748B]">
            Bem-vindo, <span className="font-semibold text-[#0A2540]">{user?.email}</span>
          </p>
          <button
            onClick={onLogout}
            className="text-sm text-[#64748B] hover:text-[#FF6B00] transition-colors font-medium"
          >
            Sair
          </button>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('access_token')
  );
  const [user, setUser] = useState<UserData | null>(null);

  const handleLogin = (userData: UserData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('access_token');
  };

  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/*"
          element={isAuthenticated ? <AppLayout user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
