import React, { useState } from 'react';
import ClientModal from '../components/ClientModal';
import ClientsList from '../components/ClientsList';
import '../styles/clients.css';

export default function ClientsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOpenModal = () => {
    setSelectedClient(null);
    setShowModal(true);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  const handleClientSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClient(null);
  };

  return (
    <main className="clients-page">
      <div className="container">
        <div className="page-header">
          <h1>CRM - Clientes</h1>
          <button 
            className="btn-primary"
            onClick={handleOpenModal}
          >
            + Novo Cliente
          </button>
        </div>

        <ClientsList 
          key={refreshKey} 
          refreshKey={refreshKey}
          onEdit={handleEditClient}
        />
      </div>

      <ClientModal 
        isOpen={showModal}
        onClose={handleCloseModal}
        onSuccess={handleClientSuccess}
        client={selectedClient}
      />
    </main>
  );
}
