import React, { useState } from 'react';
import useProspects from '../hooks/useProspects';
import ProspectModal from '../components/ProspectModal';
import ProspectCard from '../components/ProspectCard';
import StatisticsCard from '../components/StatisticsCard';
import Pagination from '../components/Pagination';
import '../styles/prospects.css';

const ITEMS_PER_PAGE = 6;

const ProspectsPage = () => {
  const { prospects, loading, useMock, createProspect, updateProspect, deleteProspect } = useProspects();
  const [showModal, setShowModal] = useState(false);
  const [editingProspect, setEditingProspect] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const calculateStats = () => {
    const stats = {
      NEW: 0,
      CONTACTED: 0,
      NEGOTIATING: 0,
      APPROVED: 0,
      REJECTED: 0
    };

    prospects.forEach(prospect => {
      const status = prospect.status || 'NEW';
      if (stats.hasOwnProperty(status)) {
        stats[status]++;
      }
    });

    return stats;
  };

  const getPaginatedProspects = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return prospects.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    return Math.ceil(prospects.length / ITEMS_PER_PAGE);
  };

  const handlePageChange = (page) => {
    const totalPages = getTotalPages();
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll para o topo da lista
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenModal = (prospect = null) => {
    setEditingProspect(prospect);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProspect(null);
  };

  const handleSaveProspect = async (formData) => {
    try {
      if (editingProspect) {
        await updateProspect(editingProspect.id, formData);
      } else {
        await createProspect(formData);
      }
      setCurrentPage(1); // Volta para primeira página
      handleCloseModal();
    } catch (err) {
      console.error('Erro ao salvar prospect:', err);
      alert('Erro ao salvar prospect');
    }
  };

  const handleDeleteProspect = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este prospect?')) {
      try {
        await deleteProspect(id);
        // Se ficou vazio na página atual, volta para página anterior
        const totalPages = getTotalPages();
        if (currentPage > totalPages && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (err) {
        console.error('Erro ao deletar prospect:', err);
        alert('Erro ao deletar prospect');
      }
    }
  };

  const stats = calculateStats();
  const paginatedProspects = getPaginatedProspects();
  const totalPages = getTotalPages();

  return (
    <main className="prospects-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Prospects</h1>
            <p>Gerencie seus leads e oportunidades</p>
            {useMock && (
              <small style={{ color: '#f59e0b', marginTop: '4px', display: 'block' }}>
                ⚠️ Usando dados de demonstração (API indisponível)
              </small>
            )}
          </div>
          <button 
            className="btn-primary"
            onClick={() => handleOpenModal()}
          >
            + Novo Prospect
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="statistics-grid">
          <StatisticsCard 
            label="Novo" 
            count={stats.NEW} 
            status="NEW"
          />
          <StatisticsCard 
            label="Contatado" 
            count={stats.CONTACTED} 
            status="CONTACTED"
          />
          <StatisticsCard 
            label="Negociando" 
            count={stats.NEGOTIATING} 
            status="NEGOTIATING"
          />
          <StatisticsCard 
            label="Aprovado" 
            count={stats.APPROVED} 
            status="APPROVED"
          />
          <StatisticsCard 
            label="Rejeitado" 
            count={stats.REJECTED} 
            status="REJECTED"
          />
        </div>

        {/* Prospects List */}
        {loading ? (
          <div className="loading-state">
            <p>Carregando...</p>
          </div>
        ) : prospects.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum prospect cadastrado ainda</p>
            <button 
              className="btn-secondary"
              onClick={() => handleOpenModal()}
            >
              Adicionar o primeiro →
            </button>
          </div>
        ) : (
          <>
            <div className="prospects-grid">
              {paginatedProspects.map(prospect => (
                <ProspectCard
                  key={prospect.id}
                  prospect={prospect}
                  onEdit={() => handleOpenModal(prospect)}
                  onDelete={() => handleDeleteProspect(prospect.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}

            {/* Info de Paginação */}
            <div className="pagination-info">
              <p>
                Exibindo {(currentPage - 1) * ITEMS_PER_PAGE + 1} a {Math.min(currentPage * ITEMS_PER_PAGE, prospects.length)} de {prospects.length} prospects
              </p>
            </div>
          </>
        )}
      </div>

      {showModal && (
        <ProspectModal
          prospect={editingProspect}
          onClose={handleCloseModal}
          onSave={handleSaveProspect}
        />
      )}
    </main>
  );
};

export default ProspectsPage;
