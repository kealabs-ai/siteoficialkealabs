import { useState, useEffect } from 'react';
import api from '../../../services/api';

// Dados mock para desenvolvimento
const MOCK_PROSPECTS = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    cpfCnpj: '123.456.789-00',
    telefone: '(11) 99999-9999',
    empresa: 'Empresa XYZ',
    origem: 'Instagram',
    status: 'NEW',
    observacoes: 'Prospect interessado em Web',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'maria@exemplo.com',
    cpfCnpj: '987.654.321-00',
    telefone: '(11) 88888-8888',
    empresa: 'Empresa ABC',
    origem: 'WhatsApp',
    status: 'CONTACTED',
    observacoes: 'Aguardando retorno',
    createdAt: '2024-01-14T15:45:00Z'
  },
  {
    id: '3',
    nome: 'Pedro Costa',
    email: 'pedro@exemplo.com',
    cpfCnpj: '456.789.123-00',
    telefone: '(11) 77777-7777',
    empresa: 'Empresa DEF',
    origem: 'Site',
    status: 'NEGOTIATING',
    observacoes: 'Em negociação de valores',
    createdAt: '2024-01-13T14:20:00Z'
  },
  {
    id: '4',
    nome: 'Ana Oliveira',
    email: 'ana@exemplo.com',
    cpfCnpj: '789.123.456-00',
    telefone: '(11) 66666-6666',
    empresa: 'Empresa GHI',
    origem: 'Indicação',
    status: 'APPROVED',
    observacoes: 'Aprovado para implementação',
    createdAt: '2024-01-12T11:15:00Z'
  },
  {
    id: '5',
    nome: 'Carlos Mendes',
    email: 'carlos@exemplo.com',
    cpfCnpj: '321.654.987-00',
    telefone: '(11) 55555-5555',
    empresa: 'Empresa JKL',
    origem: 'Outro',
    status: 'REJECTED',
    observacoes: 'Não se adequa ao escopo',
    createdAt: '2024-01-11T09:00:00Z'
  }
];

export const useProspects = () => {
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useMock, setUseMock] = useState(false);

  useEffect(() => {
    fetchProspects();
  }, []);

  const fetchProspects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      try {
        // Tenta buscar da API real
        const { data } = await api.get('/prospects');
        console.log('Dados brutos da API:', data);
        
        // Extrai a lista do endpoint conforme especificação
        let prospectsList = data?.data || data || [];
        
        // Garante que é um array
        if (!Array.isArray(prospectsList)) {
          prospectsList = prospectsList ? [prospectsList] : [];
        }
        
        console.log('Lista de prospects antes do mapeamento:', prospectsList);
        
        // Mapeia os campos da API para o formato esperado pela tela
        const mappedProspects = prospectsList
          .filter(p => p && p.id) // Filtra prospects válidos com ID
          .map((p, index) => ({
            id: String(p.id), // Garante que ID é string
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
        
        console.log('Prospects mapeados:', mappedProspects);
        
        // Debug: verifica IDs duplicados
        const ids = mappedProspects.map(p => p.id);
        const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
        if (duplicates.length > 0) {
          console.warn('IDs duplicados encontrados:', duplicates);
        }
        
        setProspects(mappedProspects);
        setUseMock(false);
      } catch (apiError) {
        // Se falhar, usa dados mock
        console.warn('Usando dados mock (API indisponível):', apiError.message);
        setProspects(MOCK_PROSPECTS);
        setUseMock(true);
      }
    } catch (err) {
      console.error('Erro ao buscar prospects:', err);
      setError(err.message);
      setProspects(MOCK_PROSPECTS);
      setUseMock(true);
    } finally {
      setLoading(false);
    }
  };

  const createProspect = async (formData) => {
    try {
      if (useMock) {
        // Mock: adiciona localmente
        const newProspect = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString()
        };
        setProspects([newProspect, ...prospects]);
        return newProspect;
      } else {
        // Real: converte para formato da API e envia
        const apiData = {
          name: formData.nome,
          email: formData.email,
          cpf_cnpj: formData.cpfCnpj,
          phone: formData.telefone,
          company: formData.empresa,
          source: formData.origem,
          status: formData.status,
          notes: formData.observacoes
        };
        const { data } = await api.post('/prospects', apiData);
        const mappedData = {
          id: data.id,
          nome: data.name,
          email: data.email,
          cpfCnpj: data.cpf_cnpj,
          telefone: data.phone,
          empresa: data.company,
          origem: data.source,
          status: data.status,
          observacoes: data.notes,
          createdAt: data.created_at
        };
        setProspects([mappedData, ...prospects]);
        return mappedData;
      }
    } catch (err) {
      console.error('Erro ao criar prospect:', err);
      throw err;
    }
  };

  const updateProspect = async (id, formData) => {
    try {
      if (useMock) {
        // Mock: atualiza localmente
        const updated = prospects.map(p => 
          p.id === id ? { ...p, ...formData } : p
        );
        setProspects(updated);
        return updated.find(p => p.id === id);
      } else {
        // Real: converte para formato da API e envia
        const apiData = {
          id,
          name: formData.nome,
          email: formData.email,
          cpf_cnpj: formData.cpfCnpj,
          phone: formData.telefone,
          company: formData.empresa,
          source: formData.origem,
          status: formData.status,
          notes: formData.observacoes
        };
        await api.post('/prospects/update', apiData);
        await fetchProspects();
      }
    } catch (err) {
      console.error('Erro ao atualizar prospect:', err);
      throw err;
    }
  };

  const deleteProspect = async (id) => {
    try {
      if (useMock) {
        // Mock: remove localmente
        setProspects(prospects.filter(p => p.id !== id));
      } else {
        // Real: envia para API
        await api.post('/prospects/delete', { id });
        setProspects(prospects.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error('Erro ao deletar prospect:', err);
      throw err;
    }
  };

  return {
    prospects,
    loading,
    error,
    useMock,
    fetchProspects,
    createProspect,
    updateProspect,
    deleteProspect
  };
};

export default useProspects;
