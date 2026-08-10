import React, { useState } from 'react';
import { useCobrancas } from '../hooks/useCobrancas';
import { useRecebimentos } from '../hooks/useRecebimentos';
import CobrancasTable from '../components/CobrancasTable';
import RecebimentosTable from '../components/RecebimentosTable';
import CobrancaModal from '../components/CobrancaModal';
import FinanceiroCard from '../components/FinanceiroCard';
import '../styles/financeiro.css';

const FinanceiroPage = () => {
  const [activeTab, setActiveTab] = useState('cobrancas');
  const [modalOpen, setModalOpen] = useState(false);
  const [cobrancaSelecionada, setCobrancaSelecionada] = useState(null);

  const {
    cobrancas,
    loading: loadingCobrancas,
    error: errorCobrancas,
    filtros: filtrosCobrancas,
    setFiltros: setFiltrosCobrancas,
    criarCobranca,
    atualizarCobranca,
    deletarCobranca,
  } = useCobrancas();

  const {
    recebimentos,
    loading: loadingRecebimentos,
    error: errorRecebimentos,
    filtros: filtrosRecebimentos,
    setFiltros: setFiltrosRecebimentos,
  } = useRecebimentos();

  // Calcular estatísticas
  const calcularEstatisticas = () => {
    const totalCobrancas = cobrancas.reduce((acc, c) => acc + (c.value || 0), 0);
    const totalRecebido = cobrancas
      .filter(c => c.status === 'RECEIVED')
      .reduce((acc, c) => acc + (c.value || 0), 0);
    const totalPendente = cobrancas
      .filter(c => c.status === 'PENDING')
      .reduce((acc, c) => acc + (c.value || 0), 0);

    return { totalCobrancas, totalRecebido, totalPendente };
  };

  const { totalCobrancas, totalRecebido, totalPendente } = calcularEstatisticas();

  const handleNovaCobranca = () => {
    setCobrancaSelecionada(null);
    setModalOpen(true);
  };

  const handleEditarCobranca = (cobranca) => {
    setCobrancaSelecionada(cobranca);
    setModalOpen(true);
  };

  const handleSalvarCobranca = async (dados) => {
    try {
      if (cobrancaSelecionada) {
        await atualizarCobranca(cobrancaSelecionada.id, dados);
      } else {
        await criarCobranca(dados);
      }
      setModalOpen(false);
      setCobrancaSelecionada(null);
    } catch (error) {
      console.error('Erro ao salvar cobrança:', error);
    }
  };

  const handleDeletarCobranca = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta cobrança?')) {
      try {
        await deletarCobranca(id);
      } catch (error) {
        console.error('Erro ao deletar cobrança:', error);
      }
    }
  };

  return (
    <div className="financeiro-container">
      <div className="container">
        <div className="financeiro-header">
          <h1>Financeiro</h1>
          {activeTab === 'cobrancas' && (
            <button className="btn-novo" onClick={handleNovaCobranca}>
              + Nova Cobrança
            </button>
          )}
        </div>

        {/* Estatísticas */}
        <div className="cards-grid">
          <FinanceiroCard
            titulo="Total de Cobranças"
            valor={totalCobrancas}
            icon="💰"
            cor="#EA580C"
          />
          <FinanceiroCard
            titulo="Total Recebido"
            valor={totalRecebido}
            icon="✅"
            cor="#10B981"
          />
          <FinanceiroCard
            titulo="Total Pendente"
            valor={totalPendente}
            icon="⏳"
            cor="#FF6B00"
          />
        </div>

        {/* Abas */}
        <div className="tabs-container">
          <button
            className={`tab-button ${activeTab === 'cobrancas' ? 'active' : ''}`}
            onClick={() => setActiveTab('cobrancas')}
          >
            <span>💳</span>
            Cobranças
          </button>
          <button
            className={`tab-button ${activeTab === 'pagamentos' ? 'active' : ''}`}
            onClick={() => setActiveTab('pagamentos')}
          >
            <span>💳</span>
            Pagamentos
          </button>
          <button
            className={`tab-button ${activeTab === 'recebimentos' ? 'active' : ''}`}
            onClick={() => setActiveTab('recebimentos')}
          >
            <span>✅</span>
            Recebimentos
          </button>
        </div>

        {/* Filtros */}
        <div className="filtros-container">
          <div className="filtro-group">
            <label>Status:</label>
            <select
              value={filtrosCobrancas.status}
              onChange={(e) =>
                setFiltrosCobrancas({ ...filtrosCobrancas, status: e.target.value })
              }
            >
              <option value="">Todos</option>
              <option value="PENDING">Pendente</option>
              <option value="CONFIRMED">Confirmado</option>
              <option value="RECEIVED">Recebido</option>
              <option value="OVERDUE">Vencido</option>
              <option value="CANCELLED">Cancelado</option>
            </select>
          </div>
        </div>

        {/* Conteúdo das Abas */}
        {activeTab === 'cobrancas' && (
          <CobrancasTable
            cobrancas={cobrancas}
            loading={loadingCobrancas}
            onEditar={handleEditarCobranca}
            onDeletar={handleDeletarCobranca}
          />
        )}

        {activeTab === 'pagamentos' && (
          <div className="empty-state">
            Funcionalidade de pagamentos em desenvolvimento
          </div>
        )}

        {activeTab === 'recebimentos' && (
          <RecebimentosTable
            recebimentos={recebimentos}
            loading={loadingRecebimentos}
          />
        )}

        {/* Mensagens de Erro */}
        {errorCobrancas && (
          <div style={{ color: 'red', padding: '1rem' }}>
            Erro: {errorCobrancas}
          </div>
        )}
        {errorRecebimentos && (
          <div style={{ color: 'red', padding: '1rem' }}>
            Erro: {errorRecebimentos}
          </div>
        )}
      </div>

      {/* Modal de Cobrança */}
      <CobrancaModal
        isOpen={modalOpen}
        cobranca={cobrancaSelecionada}
        onClose={() => {
          setModalOpen(false);
          setCobrancaSelecionada(null);
        }}
        onSave={handleSalvarCobranca}
        loading={loadingCobrancas}
      />
    </div>
  );
};

export default FinanceiroPage;
