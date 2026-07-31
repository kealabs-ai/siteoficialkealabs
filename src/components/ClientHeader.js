import React, { useState } from 'react';
import './ClientHeader.css';
import logo from '../assets/kealabs_logo_strategic.png';

const ClientHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="client-header">
      <div className="container">
        <nav className="client-nav">
          <div className="logo">
            <img src={logo} alt="Kealabs" />
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
            <li><a href="#perfil" className="btn-perfil" onClick={() => setMenuOpen(false)}>Meu Perfil</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default ClientHeader;
