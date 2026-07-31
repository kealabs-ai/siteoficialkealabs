import React, { useState } from 'react';
import './ClientHeader.css';

interface ClientHeaderProps {
  onLogout: () => void;
  user?: UserInfo;
}

interface UserInfo {
  email: string;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ onLogout, user }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleLogoutClick = (): void => {
    setMenuOpen(false);
    onLogout();
  };

  return (
    <header className="client-header">
      <div className="container">
        <nav className="client-nav">
          <div className="logo">
            <h1>Kealabs</h1>
          </div>
          
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`client-nav-menu ${menuOpen ? 'active' : ''}`}>
            <li><a href="/">Voltar ao Site</a></li>
            <li><a href="#dashboard" onClick={() => setMenuOpen(false)}>Dashboard</a></li>
            <li><a href="#projetos" onClick={() => setMenuOpen(false)}>Projetos</a></li>
            <li><a href="#suporte" onClick={() => setMenuOpen(false)}>Suporte</a></li>
            <li className="nav-user">
              <span className="user-email">{user?.email}</span>
              <button className="btn-logout" onClick={handleLogoutClick}>Sair</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default ClientHeader;
