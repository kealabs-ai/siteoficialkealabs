import React from 'react';
import '../styles/financeiro.css';

const FinanceiroCard = ({ titulo, valor, icon, cor, subtitulo }) => {
  const formatarValor = (val) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val);
  };

  return (
    <div className="financeiro-card" style={{ borderLeftColor: cor }}>
      <div className="card-header">
        <span className="card-icon" style={{ backgroundColor: cor }}>
          {icon}
        </span>
        <h3>{titulo}</h3>
      </div>
      <div className="card-body">
        <p className="card-valor">{formatarValor(valor)}</p>
        {subtitulo && <p className="card-subtitulo">{subtitulo}</p>}
      </div>
    </div>
  );
};

export default FinanceiroCard;
