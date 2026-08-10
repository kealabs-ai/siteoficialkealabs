import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import '../styles/modal.css';

const ProspectModal = ({ prospect, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nome: prospect?.nome || '',
    email: prospect?.email || '',
    cpfCnpj: prospect?.cpfCnpj || '',
    telefone: prospect?.telefone || '',
    empresa: prospect?.empresa || '',
    origem: prospect?.origem || '',
    status: prospect?.status || 'NEW',
    observacoes: prospect?.observacoes || ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome.trim()) {
      alert('Nome é obrigatório');
      return;
    }

    setLoading(true);
    try {
      await onSave(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{prospect ? 'Editar Prospect' : 'Novo Prospect'}</h2>
          <button className="btn-close-icon" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Nome *</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Nome do prospect"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@exemplo.com"
              />
            </div>
            <div className="form-group">
              <label>Telefone</label>
              <InputMask
                mask="(99) 99999-9999"
                maskChar="_"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
              >
                {(inputProps) => <input {...inputProps} type="tel" />}
              </InputMask>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>CPF / CNPJ</label>
              <InputMask
                mask="999.999.999-99"
                maskChar="_"
                name="cpfCnpj"
                value={formData.cpfCnpj}
                onChange={handleChange}
                placeholder="000.000.000-00"
              >
                {(inputProps) => <input {...inputProps} type="text" />}
              </InputMask>
            </div>
            <div className="form-group">
              <label>Empresa</label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                placeholder="Nome da empresa"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Origem</label>
              <select
                name="origem"
                value={formData.origem}
                onChange={handleChange}
              >
                <option value="">Selecione uma origem</option>
                <option value="Instagram">Instagram</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Site">Site</option>
                <option value="Indicação">Indicação</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="NEW">Novo</option>
                <option value="CONTACTED">Contatado</option>
                <option value="NEGOTIATING">Negociando</option>
                <option value="APPROVED">Aprovado</option>
                <option value="REJECTED">Rejeitado</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Observações</label>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              placeholder="Adicione observações sobre o prospect"
              rows="4"
            />
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProspectModal;
