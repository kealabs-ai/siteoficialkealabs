import React from 'react';

const OrcamentosTable = ({ orcamentos, onDelete, onRefresh }) => {
  if (orcamentos.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhum orçamento cadastrado ainda.</p>
        <p>Clique em "Criar Novo Orçamento" para começar.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="orcamentos-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>E-mail</th>
            <th>Setup Líquido</th>
            <th>Total Cobrado</th>
            <th>Parcelas</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orcamentos.map(orcamento => (
            <tr key={orcamento.id}>
              <td>{orcamento.nome}</td>
              <td>{orcamento.email || '-'}</td>
              <td>R$ {orcamento.setupLiquido?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
              <td>R$ {orcamento.totalCobrado?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
              <td>{orcamento.parcelas}×</td>
              <td>{new Date(orcamento.createdAt).toLocaleDateString('pt-BR')}</td>
              <td className="acoes">
                <button 
                  className="btn-icon edit"
                  title="Editar"
                  onClick={() => console.log('Editar:', orcamento.id)}
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
    </div>
  );
};

export default OrcamentosTable;
