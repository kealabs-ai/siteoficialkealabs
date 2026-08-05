import React from 'react';

const PrecoPreview = ({ preco, parcelas, mdrPercentage, commissionRate }) => {
  const mdrValor = preco * mdrPercentage;
  const totalCobrado = preco + mdrValor;
  const parcelaMes = totalCobrado / parcelas;
  const liquidoAntecipado = preco;

  return (
    <div className="preco-preview">
      <div className="preview-header">
        <h3>Preview de Preço</h3>
      </div>
      
      <div className="preview-grid">
        <div className="preview-item">
          <span className="label">Setup Líquido</span>
          <span className="valor">R$ {preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
        
        <div className="preview-item">
          <span className="label">MDR ({(mdrPercentage * 100).toFixed(1)}%)</span>
          <span className="valor">R$ {mdrValor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
        
        <div className="preview-item highlight">
          <span className="label">Cobrar do Cliente</span>
          <span className="valor">{parcelas}× R$ {parcelaMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>

        {commissionRate > 0 && (
          <div className="preview-item commission">
            <span className="label">Comissão ({(commissionRate * 100).toFixed(1)}%)</span>
            <span className="valor">R$ {(preco * commissionRate).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        )}
      </div>

      <div className="preview-details">
        <div className="detail-row">
          <span>Total Cobrado:</span>
          <strong>R$ {totalCobrado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
        </div>
        <div className="detail-row">
          <span>Líquido Mês a Mês:</span>
          <strong>R$ {(preco / parcelas).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
        </div>
        <div className="detail-row">
          <span>Líquido Antecipado:</span>
          <strong>R$ {liquidoAntecipado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
        </div>
      </div>
    </div>
  );
};

export default PrecoPreview;
