import React from 'react';
import './Footer.css';
import logo from '../assets/kealabs_logo_strategic.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <img src={logo} alt="Kealabs" />
            </div>
            <p>Business Intelligence e Agentes de IA</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Empresa</h4>
              <a href="#sobre">Sobre Nós</a>
              <a href="#servicos">Serviços</a>
              <a href="#contato">Contato</a>
            </div>
            
            <div className="footer-column">
              <h4>Serviços</h4>
              <a href="#servicos">Desenvolvimento de APIs</a>
              <a href="#servicos">Desenvolvimento Front-end</a>
              <a href="#servicos">Engenharia de IA</a>
              <a href="#servicos">Criação de Dashboards</a>
              <a href="#servicos">Consultoria Lean Delivery</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Kealabs. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
