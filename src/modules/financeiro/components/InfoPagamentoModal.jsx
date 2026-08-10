import React, { useState, useEffect } from 'react';
import asaasService from '../services/asaasService';
import '../styles/financeiro.css';

const InfoPagamentoModal = ({ isOpen, paymentId, onClose }) => {
  const [infoPagamento, setInfoPagamento] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tipoSelecionado, setTipoSelecionado] = useState('pix');

  useEffect(() => {
    if (isOpen && paymentId) {
      carregarInfoPagamento();
    }
  }, [isOpen, paymentId]);

  const carregarInfoPagamento = async () => {
    setLoading(true);
    setError(null);
    try {
      const dados = await asaasService.obterInfoPagamento(paymentId);
      setInfoPagamento(dados);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderPixInfo = () => {
    if (!infoPagamento?.pix) return null;

    const { pix } = infoPagamento;
    return (
      <div className="pagamento-info">
        <h3>Informações PIX</h3>
        
        {pix.encodedImage && (
          <div className="qr-code-container">
            <img 
              src={`data:image/png;base64,${pix.encodedImage}`} 
              alt="QR Code PIX" 
              className="qr-code"
            />
          </div>
        )}

        {pix.payload && (
          <div className="info-field">
            <label>Payload PIX:</label>
            <div className="payload-container">
              <code>{pix.payload}</code>
              <button 
                className="btn-copy"
                onClick={() => navigator.clipboard.writeText(pix.payload)}
                title="Copiar"
              >
                📋
              </button>
            </div>
          </div>
        )}

        {pix.expirationDate && (
          <div className="info-field">
            <label>Data de Expiração:</label>
            <p>{new Date(pix.expirationDate).toLocaleString('pt-BR')}</p>
          </div>
        )}

        {pix.description && (
          <div className="info-field">
            <label>Descrição:</label>
            <p>{pix.description}</p>
          </div>
        )}
      </div>
    );
  };

  const renderCartaoInfo = () => {
    if (!infoPagamento?.creditCard) return null;

    const { creditCard } = infoPagamento;
    return (
      <div className="pagamento-info">
        <h3>Informações Cartão de Crédito</h3>

        {creditCard.creditCardNumber && (
          <div className="info-field">
            <label>Número do Cartão:</label>
            <p>**** **** **** {creditCard.creditCardNumber}</p>
          </div>
        )}

        {creditCard.creditCardBrand && (
          <div className="info-field">
            <label>Bandeira:</label>
            <p>{creditCard.creditCardBrand}</p>
          </div>
        )}

        {creditCard.creditCardToken && (
          <div className="info-field">
            <label>Token:</label>
            <div className="token-container">
              <code>{creditCard.creditCardToken}</code>
              <button 
                className="btn-copy"
                onClick={() => navigator.clipboard.writeText(creditCard.creditCardToken)}
                title="Copiar"
              >
                📋
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderBoletoInfo = () => {
    if (!infoPagamento?.bankSlip) return null;

    const { bankSlip } = infoPagamento;
    return (
      <div className="pagamento-info">
        <h3>Informações Boleto</h3>

        {bankSlip.barCode && (
          <div className="info-field">
            <label>Código de Barras:</label>
            <div className="barcode-container">
              <code>{bankSlip.barCode}</code>
              <button 
                className="btn-copy"
                onClick={() => navigator.clipboard.writeText(bankSlip.barCode)}
                title="Copiar"
              >
                📋
              </button>
            </div>
          </div>
        )}

        {bankSlip.identificationField && (
          <div className="info-field">
            <label>Campo de Identificação:</label>
            <code>{bankSlip.identificationField}</code>
          </div>
        )}

        {bankSlip.nossoNumero && (
          <div className="info-field">
            <label>Nosso Número:</label>
            <p>{bankSlip.nossoNumero}</p>
          </div>
        )}

        {bankSlip.bankSlipUrl && (
          <div className="info-field">
            <label>Link do Boleto:</label>
            <a 
              href={bankSlip.bankSlipUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-link"
            >
              Baixar Boleto 📥
            </a>
          </div>
        )}

        {bankSlip.daysAfterDueDateToRegistrationCancellation && (
          <div className="info-field">
            <label>Dias para Cancelamento:</label>
            <p>{bankSlip.daysAfterDueDateToRegistrationCancellation}</p>
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Informações de Pagamento</h2>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>

        {loading && <div className="loading">Carregando informações de pagamento...</div>}

        {error && (
          <div className="error-message">
            <p>Erro: {error}</p>
            <button onClick={carregarInfoPagamento} className="btn-retry">
              Tentar Novamente
            </button>
          </div>
        )}

        {infoPagamento && !loading && (
          <div className="pagamento-container">
            <div className="tabs-pagamento">
              {infoPagamento.pix && (
                <button
                  className={`tab-pagamento ${tipoSelecionado === 'pix' ? 'active' : ''}`}
                  onClick={() => setTipoSelecionado('pix')}
                >
                  PIX
                </button>
              )}
              {infoPagamento.creditCard && (
                <button
                  className={`tab-pagamento ${tipoSelecionado === 'cartao' ? 'active' : ''}`}
                  onClick={() => setTipoSelecionado('cartao')}
                >
                  Cartão
                </button>
              )}
              {infoPagamento.bankSlip && (
                <button
                  className={`tab-pagamento ${tipoSelecionado === 'boleto' ? 'active' : ''}`}
                  onClick={() => setTipoSelecionado('boleto')}
                >
                  Boleto
                </button>
              )}
            </div>

            <div className="pagamento-content">
              {tipoSelecionado === 'pix' && renderPixInfo()}
              {tipoSelecionado === 'cartao' && renderCartaoInfo()}
              {tipoSelecionado === 'boleto' && renderBoletoInfo()}
            </div>
          </div>
        )}

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoPagamentoModal;
