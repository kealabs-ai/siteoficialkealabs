import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Transforme <span className="highlight-verde">Dados</span> em <span className="highlight-laranja">Decisões</span> Inteligentes
            </h1>
            <p className="hero-subtitle">
              Soluções em IA, APIs e Dashboards que impulsionam o crescimento do seu negócio com tecnologia de ponta
            </p>
            
            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">⚡</span>
                <span className="feature-text">Implementação Rápida</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span className="feature-text">Resultados Mensuráveis</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <span className="feature-text">Segurança Garantida</span>
              </div>
            </div>

            <div className="hero-buttons">
              <a href="#servicos" className="btn btn-primary">
                Explorar Soluções
              </a>
              <a href="#contato" className="btn btn-secondary">
                Fale com Consultor
              </a>
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
                <div className="stat-icon">📊</div>
                <div className="stat-value">+40%</div>
                <div className="stat-label">Produtividade</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⚙️</div>
                <div className="stat-value">100%</div>
                <div className="stat-label">Automação</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
