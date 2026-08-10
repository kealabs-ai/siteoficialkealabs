import React from 'react';
import '../styles/financeiro.css';

const CobrancasTable = ({ cobrancas, loading, onEditar, onDeletar }) => {
  const statusMap = {
    PENDING: 'Pendente',
    CONFIRMED: 'Confirmado',
    RECEIVED: 'Recebido',
    OVERDUE: 'Vencido',
    CANCELLED: 'Cancelado',
    REFUNDED: 'Reembolsado',
  };

  const statusColor = {
    PENDING: '#FF6B00',
    CONFIRMED: '#00B4D8',
    RECEIVED: '#10B981',
    OVERDUE: '#DC2626',
    CANCELLED: '#9CA3AF',
    REFUNDED: '#8B5CF6',
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  if (loading) {
    return <div className="loading">Carregando cobranças...</div>;
  }

  if (cobrancas.length === 0) {
    return <div className="empty-state">Nenhuma cobrança encontrada</div>;
  }

  return (
    <div className="table-container">
      <table className="cobrancas-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Valor</th>
            <th>Data de Vencimento</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cobrancas.map((cobranca) => (
            <tr key={cobranca.id}>
              <td>{cobranca.customer?.name || 'N/A'}</td>
              <td>{formatarValor(cobranca.value)}</td>
              <td>{formatarData(cobranca.dueDate)}</td>
              <td>
                <span
                  className="status-badge"
                  style={{ backgroundColor: statusColor[cobranca.status] }}
                >
                  {statusMap[cobranca.status] || cobranca.status}
                </span>
              </td>
              <td>
                <button
                  className="btn-action btn-editar"
                  onClick={() => onEditar(cobranca)}
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  className="btn-action btn-deletar"
                  onClick={() => onDeletar(cobranca.id)}
                  title="Deletar"
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

export default CobrancasTable;
