import React, { useState } from 'react';
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
            <li><a href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</a></li>
            <li><a href="#usuarios" onClick={() => setMenuOpen(false)}>Usuários</a></li>
            <li><a href="#relatorios" onClick={() => setMenuOpen(false)}>Relatórios</a></li>
            <li><a href="#configuracoes" onClick={() => setMenuOpen(false)}>Configurações</a></li>
            <li><a href="/" className="btn-voltar">Voltar ao Site</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default OwnerHeader;
