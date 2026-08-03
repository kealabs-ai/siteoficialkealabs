import React from 'react';

const Dashboard = () => {
  return (
    <main className="owner-main">
      <div className="container">
        <div className="dashboard-header">
          <h1>Painel do Proprietário</h1>
          <p>Bem-vindo ao painel administrativo Kealabs</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Usuários Ativos</h3>
            <p className="card-value">24</p>
            <p className="card-description">Clientes cadastrados</p>
          </div>

          <div className="dashboard-card">
            <h3>Projetos</h3>
            <p className="card-value">12</p>
            <p className="card-description">Projetos em andamento</p>
          </div>

          <div className="dashboard-card">
            <h3>Receita</h3>
            <p className="card-value">R$ 45.230</p>
            <p className="card-description">Este mês</p>
          </div>

          <div className="dashboard-card">
            <h3>Suporte</h3>
            <p className="card-value">8</p>
            <p className="card-description">Tickets abertos</p>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Atividades Recentes</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-date">Hoje</span>
              <p>Novo usuário cadastrado: João Silva</p>
            </div>
            <div className="activity-item">
              <span className="activity-date">Ontem</span>
              <p>Projeto "Website Redesign" finalizado</p>
            </div>
            <div className="activity-item">
              <span className="activity-date">2 dias atrás</span>
              <p>Relatório mensal gerado</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
