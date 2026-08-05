import React, { useState, useEffect } from 'react';
import NovoOrcamentoModal from '../components/NovoOrcamentoModal';
import OrcamentosTable from '../components/OrcamentosTable';
import '../styles/orcamentos.css';
import api from '../../../services/api';

const OrcamentosPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [orcamentos, setOrcamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrcamentos();
  }, []);

  const fetchOrcamentos = async () => {
    try {
      const { data } = await api.get('/quotes');
      setOrcamentos(data || []);
    } catch (err) {
      console.error('Erro ao buscar orçamentos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOrcamentoCreated = (novoOrcamento) => {
    setOrcamentos([novoOrcamento, ...orcamentos]);
    setShowModal(false);
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
            onClick={() => setShowModal(true)}
          >
            + Criar Novo Orçamento
          </button>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <OrcamentosTable 
            orcamentos={orcamentos} 
            onDelete={handleDelete}
            onRefresh={fetchOrcamentos}
          />
        )}
      </div>

      {showModal && (
        <NovoOrcamentoModal
          onClose={() => setShowModal(false)}
          onSuccess={handleOrcamentoCreated}
        />
      )}
    </main>
  );
};

export default OrcamentosPage;
