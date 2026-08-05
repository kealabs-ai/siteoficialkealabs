import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const SecaoCliente = ({ formData, setFormData }) => {
  const [prospects, setProspects] = useState([]);

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const { data } = await api.get('/prospects');
        setProspects(data || []);
      } catch (err) {
        console.error('Erro ao buscar prospects:', err);
      }
    };
    fetchProspects();
  }, []);

  const handleProspectChange = (prospectId) => {
    const prospect = prospects.find(p => p.id === prospectId);
    if (prospect) {
      setFormData({
        ...formData,
        prospectId,
        nome: prospect.nome || '',
        email: prospect.email || '',
        cpfCnpj: prospect.cpfCnpj || '',
        telefone: prospect.telefone || ''
      });
    }
  };

  const formatarTelefone = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (apenasNumeros.length <= 10) {
      return apenasNumeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return apenasNumeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  return (
    <fieldset className="form-section">
      <legend>Cliente</legend>
      
      <div className="form-group">
        <label>Selecionar Prospect</label>
        <select 
          value={formData.prospectId}
          onChange={(e) => handleProspectChange(e.target.value)}
        >
          <option value="">-- Selecione um prospect --</option>
          {prospects.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Nome *</label>
        <input
          type="text"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>E-mail</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>CPF / CNPJ</label>
          <input
            type="text"
            value={formData.cpfCnpj}
            onChange={(e) => setFormData({ ...formData, cpfCnpj: e.target.value })}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Telefone / WhatsApp</label>
        <input
          type="tel"
          value={formData.telefone}
          onChange={(e) => setFormData({ ...formData, telefone: formatarTelefone(e.target.value) })}
          placeholder="(11) 99999-9999"
        />
      </div>
    </fieldset>
  );
};

export default SecaoCliente;
