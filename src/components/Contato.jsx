import React from 'react';
import './Contato.css';

const Contato = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/5535984331546?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20consultor%20da%20Kealabs', '_blank');
  };

  return (
    <section id="contato" className="contato">
      <div className="container">
        <h2 className="section-title">Fale com um Consultor</h2>
        <p className="section-subtitle">
          Entre em contato e descubra como podemos transformar seus dados em resultados
        </p>
        
        <div className="contato-content">
          <div className="whatsapp-section">
            <div className="whatsapp-card">
              <div className="whatsapp-icon">💬</div>
              <h3>Converse pelo WhatsApp</h3>
              <p>Fale diretamente com nosso consultor e tire suas dúvidas em tempo real.</p>
              <button onClick={handleWhatsApp} className="btn-whatsapp">
                <span className="whatsapp-logo">✉️</span>
                Iniciar Conversa
              </button>
              <p className="whatsapp-number">(35) 98433-1546</p>
            </div>
          </div>
          
          <div className="contato-info">
            <div className="info-item">
              <h3>📧 E-mail</h3>
              <p>kealabs.ai@gmail.com</p>
            </div>
            <div className="info-item">
              <h3>📱 Telefone</h3>
              <p>(35) 98433-1546</p>
            </div>
            <div className="info-item">
              <h3>📍 Localização</h3>
              <p>Passos, Brasil</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contato;
