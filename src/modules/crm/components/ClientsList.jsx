import React, { useState, useEffect } from 'react';
import { crmApi } from '../services/crmApi';
import '../styles/list.css';

export default function ClientsList({ refreshKey, onEdit }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClients();
  }, [refreshKey]);

  const fetchClients = async () => {
    setLoading(true);
    setError(null);

    const result = await crmApi.getClients();
    
    if (result.success) {
      setClients(result.data);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este cliente?')) {
      return;
    }

    const result = await crmApi.deleteClient(id);
    
    if (result.success) {
      setClients(clients.filter(c => c.id !== id));
    } else {
      alert('Erro ao deletar cliente: ' + result.error);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="table-container">
      {clients.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum cliente cadastrado</p>
          <p>Clique em "Novo Cliente" para começar</p>
        </div>
      ) : (
        <table className="clients-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>CPF/CNPJ</th>
              <th>Cidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email || '-'}</td>
                <td>{client.mobilePhone || client.phone || '-'}</td>
                <td>{client.cpfCnpj}</td>
                <td>{client.cityName || '-'}</td>
                <td className="acoes">
                  <button 
                    className="btn-icon edit" 
                    title="Editar"
                    onClick={() => onEdit(client)}
                  >
                    ✎
                  </button>
                  <button 
                    className="btn-icon delete" 
                    title="Deletar"
                    onClick={() => handleDelete(client.id)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
