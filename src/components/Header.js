import React, { useState } from 'react';
import './Header.css';
import logo from '../assets/kealabs_logo_strategic.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="logo">
            <img src={logo} alt="Kealabs" />
          </div>
          
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={() => setMenuOpen(false)}>Início</a></li>
            <li><a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a></li>
            <li><a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre Nós</a></li>
            <li><a href="https://kealabs.cloud/" target="_blank" rel="noopener noreferrer">Área do Cliente</a></li>
            <li><a href="#contato" className="btn-contato" onClick={() => setMenuOpen(false)}>Fale com um Consultor</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
