import React from 'react';
import './Sobre.css';

const Sobre = () => {
  return (
    <section id="sobre" className="sobre">
      <div className="container">
        <div className="sobre-content">
          <div className="sobre-text">
            <h2>Sobre a Kealabs</h2>
            <p>
              A Kealabs é uma empresa especializada em Business Intelligence, Data Analytics e 
              Inteligência Artificial. Desenvolvemos soluções personalizadas que transformam dados 
              em insights estratégicos para impulsionar o crescimento do seu negócio.
            </p>
            <p>
              Nossa missão é democratizar o acesso à inteligência de dados, oferecendo tecnologia 
              de ponta com suporte especializado. Combinamos expertise técnica com visão de negócio 
              para entregar resultados mensuráveis.
            </p>
            <div className="sobre-stats">
              <div className="stat">
                <div className="stat-number">+40%</div>
                <div className="stat-label">Aumento de Produtividade</div>
              </div>
              <div className="stat">
                <div className="stat-number">Intelligence</div>
                <div className="stat-label">Prompts Inteligentes</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Satisfação Garantida</div>
              </div>
            </div>
          </div>
          <div className="sobre-visual">
            <div className="kea-symbol">
              <div className="pilar"></div>
              <div className="barras">
                <div className="barra b1"></div>
                <div className="barra b2"></div>
                <div className="barra b3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sobre;
