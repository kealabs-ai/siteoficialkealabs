import React from 'react';
import './Hero.css';
import bannerImage from '../assets/banner_home.png';

const Hero = () => {
  return (
    <section id="home" className="hero" style={{ backgroundImage: `url(${bannerImage})` }}>
      <div className="container">
        <div className="hero-content">
          <div className="hero-buttons-container">
            <a href="#servicos" className="btn btn-primary">
              Explorar Soluções
            </a>
            <a href="#contato" className="btn btn-secondary">
              Falar com Consultor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
