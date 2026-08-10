import React, { useState } from 'react';

const OrcamentosTable = ({ orcamentos, onEdit, onDelete, onRefresh }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getStatusBadge = (status) => {
    const statusMap = {
      'PENDING': { label: 'Pendente', color: 'bg-yellow-50 text-yellow-800 border-yellow-200' },
      'APPROVED': { label: 'Aprovado', color: 'bg-green-50 text-green-800 border-green-200' },
      'REJECTED': { label: 'Rejeitado', color: 'bg-red-50 text-red-800 border-red-200' },
      'COMPLETED': { label: 'Concluído', color: 'bg-blue-50 text-blue-800 border-blue-200' }
    };
    
    const statusInfo = statusMap[status] || { label: status, color: 'bg-gray-50 text-gray-800 border-gray-200' };
    
    return (
      <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  // Calcular paginação
  const totalPages = Math.ceil(orcamentos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrcamentos = orcamentos.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  if (orcamentos.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhum orçamento cadastrado ainda.</p>
        <p>Clique em "Criar Novo Orçamento" para começar.</p>
      </div>
    );
  }

  return (
    <>
      <table className="orcamentos-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>E-mail</th>
            <th>Setup Líquido</th>
            <th>Total Cobrado</th>
            <th>Parcelas</th>
            <th>Status</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentOrcamentos.map(orcamento => (
            <tr key={orcamento.id}>
              <td>{orcamento.nome}</td>
              <td>{orcamento.email || '-'}</td>
              <td>R$ {orcamento.setupLiquido?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
              <td>R$ {orcamento.totalCobrado?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
              <td>{orcamento.parcelas}×</td>
              <td>{getStatusBadge(orcamento.status)}</td>
              <td>{new Date(orcamento.createdAt).toLocaleDateString('pt-BR')}</td>
              <td className="acoes">
                <button 
                  className="btn-icon edit"
                  title="Editar"
                  onClick={() => onEdit(orcamento)}
                >
                  ✏️
                </button>
                <button 
                  className="btn-icon delete"
                  title="Deletar"
                  onClick={() => onDelete(orcamento.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="pagination">
        <div className="pagination-info">
          Mostrando {startIndex + 1} a {Math.min(endIndex, orcamentos.length)} de {orcamentos.length} orçamentos
        </div>
        
        <div className="pagination-controls">
          <button 
            className="pagination-btn"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            ← Anterior
          </button>

          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`pagination-page ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button 
            className="pagination-btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Próxima →
          </button>
        </div>
      </div>
    </>
  );
};

export default OrcamentosTable;
