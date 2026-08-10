import React, { useState, useEffect } from 'react';
import NovoOrcamentoModal from '../components/NovoOrcamentoModal';
import OrcamentosTable from '../components/OrcamentosTable';
import '../styles/orcamentos.css';
import api from '../../../services/api';

const OrcamentosPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [orcamentos, setOrcamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOrcamento, setEditingOrcamento] = useState(null);

  useEffect(() => {
    fetchOrcamentos();
  }, []);

  const fetchOrcamentos = async () => {
    try {
      const { data } = await api.get('/quotes');
      let orcamentosList = data?.data || data || [];
      
      if (!Array.isArray(orcamentosList)) {
        orcamentosList = orcamentosList ? [orcamentosList] : [];
      }
      
      const mappedOrcamentos = orcamentosList
        .filter(o => o && o.quote_id)
        .map(o => ({
          id: String(o.quote_id),
          nome: o.client_name || '',
          email: o.client_email || '',
          cpfCnpj: o.client_cpf_cnpj || '',
          telefone: o.client_phone || '',
          serviceType: o.service_type || '',
          status: o.status || 'PENDING',
          setupLiquido: o.setup_value || 0,
          totalCobrado: (o.setup_value || 0) + (o.monthly_value || 0),
          parcelas: 1,
          createdAt: o.created_at || new Date().toISOString()
        }));
      
      setOrcamentos(mappedOrcamentos);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 404) {
        setOrcamentos([]);
      } else {
        console.error('Erro ao buscar orçamentos:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (orcamento) => {
    setEditingOrcamento(orcamento);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingOrcamento(null);
  };

  const handleOrcamentoCreated = (novoOrcamento) => {
    if (editingOrcamento) {
      // Atualizar orçamento existente
      setOrcamentos(orcamentos.map(o => o.id === editingOrcamento.id ? novoOrcamento : o));
    } else {
      // Adicionar novo orçamento
      setOrcamentos([novoOrcamento, ...orcamentos]);
    }
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este orçamento?')) {
      try {
        await api.delete(`/quotes/${id}`);
        setOrcamentos(orcamentos.filter(o => o.id !== id));
      } catch (err) {
        console.error('Erro ao deletar orçamento:', err);
      }
    }
  };

  return (
    <main className="orcamentos-page">
      <div className="container">
        <div className="page-header">
          <h1>Orçamentos</h1>
          <button 
            className="btn-primary"
            onClick={() => {
              setEditingOrcamento(null);
              setShowModal(true);
            }}
          >
            + Criar Novo Orçamento
          </button>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <OrcamentosTable 
            orcamentos={orcamentos} 
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRefresh={fetchOrcamentos}
          />
        )}
      </div>

      {showModal && (
        <NovoOrcamentoModal
          orcamento={editingOrcamento}
          onClose={handleCloseModal}
          onSuccess={handleOrcamentoCreated}
        />
      )}
    </main>
  );
};

export default OrcamentosPage;
