import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Transforme Dados em Decisões Inteligentes</h1>
          <p>Soluções em IA, APIs e Dashboards para impulsionar seu negócio</p>
          <a href="#servicos" className="btn-primary">Conheça Nossas Soluções</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
