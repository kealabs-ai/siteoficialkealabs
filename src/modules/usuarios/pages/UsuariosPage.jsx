import React, { useState } from 'react';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import '../styles/usuarios.css';

const UsuariosPage = () => {
  const [showForm, setShowForm] = useState(false);

  const users = [
    { id: 1, name: 'João Silva', email: 'joao@example.com', status: 'Ativo', joinDate: '2024-01-15' },
    { id: 2, name: 'Maria Santos', email: 'maria@example.com', status: 'Ativo', joinDate: '2024-01-20' },
    { id: 3, name: 'Pedro Costa', email: 'pedro@example.com', status: 'Inativo', joinDate: '2024-02-01' },
  ];

  return (
    <main className="usuarios-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>Usuários</h1>
            <p>Gerenciar usuários do sistema</p>
          </div>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : '+ Novo Usuário'}
          </button>
        </div>

        {showForm && <UserForm onClose={() => setShowForm(false)} />}

        <UserTable users={users} />
      </div>
    </main>
  );
};

export default UsuariosPage;
