import React from 'react';
import './styles/global.css';
import ClientHeader from './components/ClientHeader';

function ClientArea() {
  return (
    <div className="ClientArea">
      <ClientHeader />
      <main className="client-main">
        <div className="container">
          <h1>Área do Cliente</h1>
          <p>Bem-vindo à sua área de cliente Kealabs</p>
        </div>
      </main>
    </div>
  );
}

export default ClientArea;
