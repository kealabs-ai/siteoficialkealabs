import React from 'react';
import StatisticsCard from '../components/StatisticsCard';
import ActivityList from '../components/ActivityList';
import '../styles/dashboard.css';

const DashboardPage = () => {
  return (
    <main className="dashboard-page">
      <div className="container">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Visão geral do seu negócio</p>
        </div>

        <div className="statistics-grid">
          <StatisticsCard
            title="Usuários Ativos"
            value="24"
            description="Clientes cadastrados"
            color="green"
          />
          <StatisticsCard
            title="Projetos"
            value="12"
            description="Projetos em andamento"
            color="blue"
          />
          <StatisticsCard
            title="Receita"
            value="R$ 45.230"
            description="Este mês"
            color="emerald"
          />
          <StatisticsCard
            title="Suporte"
            value="8"
            description="Tickets abertos"
            color="orange"
          />
        </div>

        <ActivityList />
      </div>
    </main>
  );
};

export default DashboardPage;
