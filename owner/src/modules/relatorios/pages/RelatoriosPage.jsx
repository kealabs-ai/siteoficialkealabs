import React, { useState } from 'react';
import ReportCard from '../components/ReportCard';
import '../styles/relatorios.css';

const RelatoriosPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const reports = [
    {
      id: 1,
      title: 'Relatório de Vendas',
      description: 'Análise de vendas e receita',
      date: '2024-02-15',
      status: 'Disponível'
    },
    {
      id: 2,
      title: 'Relatório de Usuários',
      description: 'Estatísticas de usuários ativos',
      date: '2024-02-14',
      status: 'Disponível'
    },
    {
      id: 3,
      title: 'Relatório de Performance',
      description: 'Desempenho do sistema',
      date: '2024-02-13',
      status: 'Processando'
    },
  ];

  return (
    <main className="relatorios-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>Relatórios</h1>
            <p>Gerar e visualizar relatórios</p>
          </div>
          <button className="btn-primary">+ Gerar Relatório</button>
        </div>

        <div className="filters">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="filter-select"
          >
            <option value="week">Última Semana</option>
            <option value="month">Último Mês</option>
            <option value="quarter">Último Trimestre</option>
            <option value="year">Último Ano</option>
          </select>
        </div>

        <div className="reports-grid">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default RelatoriosPage;
