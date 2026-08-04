import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './OwnerHeader.css';

const OwnerHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="owner-header">
      <div className="container">
        <nav className="owner-nav">
          <div className="logo">
            <h1>Kealabs</h1>
            <span className="badge">Proprietário</span>
          </div>
          
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`owner-nav-menu ${menuOpen ? 'active' : ''}`}>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
            <li><Link to="/usuarios" onClick={() => setMenuOpen(false)}>Usuários</Link></li>
            <li><Link to="/relatorios" onClick={() => setMenuOpen(false)}>Relatórios</Link></li>
            <li><Link to="/configuracoes" onClick={() => setMenuOpen(false)}>Configurações</Link></li>
            <li><a href="/" className="btn-voltar">Voltar ao Site</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default OwnerHeader;
