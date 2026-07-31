import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ClientHeader.css';

interface ClientHeaderProps {
  onLogout: () => void;
  user?: { email: string };
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ onLogout, user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

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
          <a
            href="/app/dashboard"
            className={`nav-link ${isActive('/app/dashboard') || isActive('/app/') ? 'active' : ''}`}
          >
            Dashboard
          </a>
          <a
            href="/app/builder"
            className={`nav-link ${isActive('/app/builder') ? 'active' : ''}`}
          >
            Novo Orçamento
          </a>
        </nav>

        <div className="header-user">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleLogout} className="logout-btn">
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;
