import React from 'react';

const UserTable = ({ users }) => {
  return (
    <div className="table-container">
      <table className="users-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Status</th>
            <th>Data de Cadastro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`status-badge status-${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
              </td>
              <td>{new Date(user.joinDate).toLocaleDateString('pt-BR')}</td>
              <td>
                <div className="actions">
                  <button className="btn-icon" title="Editar">✏️</button>
                  <button className="btn-icon" title="Deletar">🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
