import React from 'react';

const ProspectCard = ({ prospect, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    const colors = {
      NEW: '#3B82F6',
      CONTACTED: '#F59E0B',
      NEGOTIATING: '#A855F7',
      APPROVED: '#10B981',
      REJECTED: '#EF4444'
    };
    return colors[status] || '#64748B';
  };

  const getStatusLabel = (status) => {
    const labels = {
      NEW: 'Novo',
      CONTACTED: 'Contatado',
      NEGOTIATING: 'Negociando',
      APPROVED: 'Aprovado',
      REJECTED: 'Rejeitado'
    };
    return labels[status] || status;
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <div className="prospect-card">
      {/* Header com Nome e Ações */}
      <div className="card-header">
        <h3 className="prospect-name">{prospect.nome}</h3>
        <div className="card-actions">
          <button 
            className="btn-icon edit"
            onClick={onEdit}
            title="Editar"
          >
            ✏️
          </button>
          <button 
            className="btn-icon delete"
            onClick={onDelete}
            title="Remover"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Badges de Status e Origem */}
      <div className="card-badges">
        <span 
          className="badge status"
          style={{ backgroundColor: getStatusColor(prospect.status) }}
        >
          {getStatusLabel(prospect.status)}
        </span>
        {prospect.origem && (
          <span className="badge origem">
            {prospect.origem}
          </span>
        )}
      </div>

      {/* Conteúdo Principal */}
      <div className="card-content">
        {prospect.email && (
          <div className="info-item">
            <span className="icon">📧</span>
            <span className="value">{prospect.email}</span>
          </div>
        )}
        {prospect.telefone && (
          <div className="info-item">
            <span className="icon">📱</span>
            <span className="value">{prospect.telefone}</span>
          </div>
        )}
        {prospect.empresa && (
          <div className="info-item">
            <span className="icon">🏢</span>
            <span className="value">{prospect.empresa}</span>
          </div>
        )}
      </div>

      {/* Observações (quando preenchidas) */}
      {prospect.observacoes && (
        <div className="card-observations">
          <p className="observations-text">{prospect.observacoes}</p>
        </div>
      )}

      {/* Footer com Data (apenas desktop) */}
      {prospect.createdAt && (
        <div className="card-footer">
          <small className="creation-date">{formatDate(prospect.createdAt)}</small>
        </div>
      )}
    </div>
  );
};

export default ProspectCard;
