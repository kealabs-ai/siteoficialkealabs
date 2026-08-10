import React from 'react';

const PrecoPreview = ({ preco, parcelas, mdrPercentage, commissionRate }) => {
  const mdr = mdrPercentage || 0;
  const commission = commissionRate || 0;
  const mdrValor = preco * mdr || 0;
  const totalCobrado = preco + mdrValor || 0;
  const parcelaMes = totalCobrado / parcelas || 0;
  const liquidoAntecipado = preco || 0;

  return (
    <div className="preco-preview">
      <div className="preview-header">
        <h3>Preview de Preço</h3>
      </div>
      
      <div className="preview-grid">
        <div className="preview-item">
          <span className="label">Setup Líquido</span>
          <span className="valor">R$ {(preco || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
        
        <div className="preview-item">
          <span className="label">MDR ({(mdr * 100).toFixed(1)}%)</span>
          <span className="valor">R$ {(mdrValor || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
        
        <div className="preview-item highlight">
          <span className="label">Cobrar do Cliente</span>
          <span className="valor">{parcelas}× R$ {(parcelaMes || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>

        {commission > 0 && (
          <div className="preview-item commission">
            <span className="label">Comissão ({(commission * 100).toFixed(1)}%)</span>
            <span className="valor">R$ {(preco * commission || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        )}
      </div>

      <div className="preview-details">
        <div className="detail-row">
          <span>Total Cobrado:</span>
          <strong>R$ {(totalCobrado || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
        </div>
        <div className="detail-row">
          <span>Líquido Mês a Mês:</span>
          <strong>R$ {((preco / parcelas) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
        </div>
        <div className="detail-row">
          <span>Líquido Antecipado:</span>
          <strong>R$ {(liquidoAntecipado || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
        </div>
      </div>
    </div>
  );
};

export default PrecoPreview;
