import React, { useState, useEffect } from 'react';
import '../styles/financeiro.css';

const CobrancaModal = ({ isOpen, cobranca, onClose, onSave, loading }) => {
  const [formData, setFormData] = useState({
    customerId: '',
    value: '',
    dueDate: '',
    description: '',
    billingType: 'BOLETO',
  });

  useEffect(() => {
    if (cobranca) {
      setFormData({
        customerId: cobranca.customerId || '',
        value: cobranca.value || '',
        dueDate: cobranca.dueDate || '',
        description: cobranca.description || '',
        billingType: cobranca.billingType || 'BOLETO',
      });
    } else {
      setFormData({
        customerId: '',
        value: '',
        dueDate: '',
        description: '',
        billingType: 'BOLETO',
      });
    }
  }, [cobranca, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{cobranca ? 'Editar Cobrança' : 'Nova Cobrança'}</h2>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="cobranca-form">
          <div className="form-group">
            <label>ID do Cliente</label>
            <input
              type="text"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              placeholder="ID do cliente no Asaas"
              required
            />
          </div>

          <div className="form-group">
            <label>Valor</label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>Data de Vencimento</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descrição da cobrança"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Tipo de Cobrança</label>
            <select
              name="billingType"
              value={formData.billingType}
              onChange={handleChange}
            >
              <option value="BOLETO">Boleto</option>
              <option value="CREDIT_CARD">Cartão de Crédito</option>
              <option value="PIX">PIX</option>
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CobrancaModal;
