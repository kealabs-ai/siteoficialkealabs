import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './ClientHeader.css';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface ClientHeaderProps {
  onLogout: () => void;
  user?: UserData;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ onLogout, user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path || 
           (path === '/' && (location.pathname === '/' || location.pathname === '/dashboard'));
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="client-header">
      <div className="header-container">
        <div className="header-logo">
          <h1>Kealabs</h1>
          <span className="logo-subtitle">Área do Cliente</span>
        </div>

        <nav className="header-nav">
          <Link
            to="/"
            className={`nav-link ${isActive('/') || isActive('/dashboard') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link
            to="/builder"
            className={`nav-link ${isActive('/builder') ? 'active' : ''}`}
          >
            Novo Orçamento
          </Link>
        </nav>

        <div className="header-user">
          <div className="user-info">
            <span className="user-name">{user?.name || 'Usuário'}</span>
            <span className="user-role">{user?.role || 'cliente'}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;
