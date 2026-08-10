import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import api from '../../../services/api';

const SecaoCliente = ({ formData, setFormData }) => {
  const [prospects, setProspects] = useState([]);

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        const { data } = await api.get('/prospects');
        let prospectsList = data?.data || data || [];
        
        if (!Array.isArray(prospectsList)) {
          prospectsList = prospectsList ? [prospectsList] : [];
        }
        
        const mappedProspects = prospectsList
          .filter(p => p && p.id)
          .map(p => ({
            id: String(p.id),
            nome: p.name || '',
            email: p.email || '',
            cpfCnpj: p.cpf_cnpj || '',
            telefone: p.phone || '',
            empresa: p.company || '',
            origem: p.source || '',
            status: p.status || 'NEW',
            observacoes: p.notes || '',
            createdAt: p.created_at || new Date().toISOString()
          }));
        
        setProspects(mappedProspects);
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

  const formatarCpfCnpj = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (apenasNumeros.length <= 11) {
      return apenasNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return apenasNumeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
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
          <InputMask
            mask="999.999.999-99"
            maskChar="_"
            value={formData.cpfCnpj}
            onChange={(e) => setFormData({ ...formData, cpfCnpj: e.target.value })}
            placeholder="000.000.000-00"
          >
            {(inputProps) => <input {...inputProps} type="text" />}
          </InputMask>
        </div>
      </div>

      <div className="form-group">
        <label>Telefone / WhatsApp</label>
        <InputMask
          mask="(99) 99999-9999"
          maskChar="_"
          value={formData.telefone}
          onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
          placeholder="(11) 99999-9999"
        >
          {(inputProps) => <input {...inputProps} type="tel" />}
        </InputMask>
      </div>
    </fieldset>
  );
};

export default SecaoCliente;
