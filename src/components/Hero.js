import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Transforme Dados em <span className="highlight-verde">Inteligência</span> com <span className="highlight-laranja">IA</span>
          </h1>
          <p className="hero-subtitle">
            Soluções completas em Business Intelligence, Data Analytics e Agentes de IA para impulsionar seu negócio com decisões baseadas em dados.
          </p>
          <div className="hero-buttons">
            <a href="#contato" className="btn btn-primary">Fale com um Consultor</a>
            <a href="#servicos" className="btn btn-secondary">Conheça Nossos Serviços</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-card">
            <div className="metric-bar bar-1"></div>
            <div className="metric-bar bar-2"></div>
            <div className="metric-bar bar-3"></div>
          </div>
          
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-icon">🚀</div>
              <div className="stat-value">+40%</div>
              <div className="stat-label">Produtividade</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-value">100%</div>
              <div className="stat-label">Satisfação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
