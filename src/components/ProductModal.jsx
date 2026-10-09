import React from 'react';
import { createPortal } from 'react-dom';
import './ProductModal.css';

const ProductModal = ({ isOpen, onClose, data, type = 'product' }) => {
  if (!isOpen || !data) return null;

  const isProduct = type === 'product';
  const content = isProduct ? data.descricaoCompleta : data;

  return createPortal(
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <div className="modal-icone">{data.icone || data.icon}</div>
          <h2>{content.titulo}</h2>
          <p className="modal-subtitulo">{content.subtitulo}</p>
          {data.link && (
            <a href={data.link} target="_blank" rel="noopener noreferrer" className="modal-link" title="Visitar site">
              🌐
            </a>
          )}
        </div>

        <div className="modal-body">
          <p className="modal-descricao">{content.descricao}</p>

          {content.funcionalidades && (
            <div className="modal-section">
              <h3>Funcionalidades Principais</h3>
              <div className="funcionalidades-grid">
                {content.funcionalidades.map((func, idx) => (
                  <div key={idx} className="funcionalidade-item">
                    <h4>{func.titulo}</h4>
                    <p>{func.descricao}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {content.modeloNegocio && (
            <div className="modal-section">
              <h3>Modelo de Negócio</h3>
              <div className="modelo-grid">
                {content.modeloNegocio.map((modelo, idx) => (
                  <div key={idx} className="modelo-item">
                    <h4>{modelo.titulo}</h4>
                    <p>{modelo.descricao}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {content.beneficios && (
            <div className="modal-section">
              <h3>Benefícios</h3>
              <div className="beneficios-lista">
                {content.beneficios.map((beneficio, idx) => (
                  <div key={idx} className="beneficio-item">
                    <span className="beneficio-check">✓</span>
                    <p>{beneficio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isProduct && (
            <div className="modal-cta">
              <a href="#contato" className="btn-primary" onClick={onClose}>
                Solicite uma Demonstração
              </a>
            </div>
          )}

          {!isProduct && (
            <div className="modal-cta">
              <button className="btn-saiba-mais" onClick={onClose}>
                {content.titulo}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProductModal;
