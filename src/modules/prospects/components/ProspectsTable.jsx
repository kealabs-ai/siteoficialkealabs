import React from 'react';

const ProspectsTable = ({ prospects, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    const statusMap = {
      'NEW': { label: 'Novo', color: 'bg-blue-50 text-blue-800 border-blue-200' },
      'CONTACTED': { label: 'Contatado', color: 'bg-amber-50 text-amber-800 border-amber-200' },
      'NEGOTIATING': { label: 'Negociando', color: 'bg-purple-50 text-purple-800 border-purple-200' },
      'APPROVED': { label: 'Aprovado', color: 'bg-green-50 text-green-800 border-green-200' },
      'REJECTED': { label: 'Rejeitado', color: 'bg-red-50 text-red-800 border-red-200' }
    };
    
    const statusInfo = statusMap[status] || { label: status, color: 'bg-gray-50 text-gray-800 border-gray-200' };
    
    return (
      <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  if (prospects.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhum prospect cadastrado ainda</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="prospects-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Empresa</th>
            <th>Origem</th>
            <th>Status</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {prospects.map((prospect, index) => (
            <tr key={prospect.id}>
              <td>{prospect.nome || '-'}</td>
              <td>{prospect.email || '-'}</td>
              <td>{prospect.telefone || '-'}</td>
              <td>{prospect.empresa || '-'}</td>
              <td>{prospect.origem || '-'}</td>
              <td>{getStatusBadge(prospect.status)}</td>
              <td>{formatDate(prospect.createdAt)}</td>
              <td className="acoes">
                <button 
                  className="btn-icon edit"
                  title="Editar"
                  onClick={() => onEdit(prospect)}
                >
                  ✏️
                </button>
                <button 
                  className="btn-icon delete"
                  title="Deletar"
                  onClick={() => onDelete(prospect.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProspectsTable;
