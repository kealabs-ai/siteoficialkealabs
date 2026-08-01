import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './styles/global.css';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';

interface UserData {
  email: string;
}

const routeMap: Record<string, string> = {
  gestao:     '/',
  orcamentos: '/builder',
  prospect:   '/',
  'agent-kea': '/',
};

const AppLayout: React.FC<{ user: UserData | null; onLogout: () => void }> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('gestao');

  const handleNavigate = (item: string) => {
    setActiveItem(item);
    navigate(routeMap[item] ?? '/');
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar activeItem={activeItem} onNavigate={handleNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
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
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('access_token')
  );
  const [user, setUser] = useState<UserData | null>(null);

  const handleLogin = (userData: UserData): void => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('access_token');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <AppLayout user={user} onLogout={handleLogout} />
    </BrowserRouter>
  );
};

export default App;
