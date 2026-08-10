import React, { useState } from 'react';
import InfoPagamentoModal from './InfoPagamentoModal';
import '../styles/financeiro.css';

const RecebimentosTable = ({ recebimentos, loading }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentIdSelecionado, setPaymentIdSelecionado] = useState(null);

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

  const handleVerInfoPagamento = (id) => {
    setPaymentIdSelecionado(id);
    setModalOpen(true);
  };

  if (loading) {
    return <div className="loading">Carregando recebimentos...</div>;
  }

  if (recebimentos.length === 0) {
    return <div className="empty-state">Nenhum recebimento encontrado</div>;
  }

  return (
    <div className="table-container">
      <table className="recebimentos-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Valor</th>
            <th>Data de Recebimento</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recebimentos.map((recebimento) => (
            <tr key={recebimento.id}>
              <td>{recebimento.customer?.name || 'N/A'}</td>
              <td>{formatarValor(recebimento.value)}</td>
              <td>{formatarData(recebimento.confirmedDate || recebimento.dueDate)}</td>
              <td>
                <span
                  className="status-badge"
                  style={{ backgroundColor: statusColor[recebimento.status] }}
                >
                  {statusMap[recebimento.status] || recebimento.status}
                </span>
              </td>
              <td>
                <button
                  className="btn-action btn-info"
                  onClick={() => handleVerInfoPagamento(recebimento.id)}
                  title="Ver informações de pagamento"
                >
                  💳
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <InfoPagamentoModal
        isOpen={modalOpen}
        paymentId={paymentIdSelecionado}
        onClose={() => {
          setModalOpen(false);
          setPaymentIdSelecionado(null);
        }}
      />
    </div>
  );
};

export default RecebimentosTable;
