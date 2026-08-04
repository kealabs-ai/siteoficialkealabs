import React from 'react';

const ReportCard = ({ report }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Disponível':
        return 'status-available';
      case 'Processando':
        return 'status-processing';
      default:
        return '';
    }
  };

  return (
    <div className="report-card">
      <div className="report-header">
        <h3>{report.title}</h3>
        <span className={`status-badge ${getStatusColor(report.status)}`}>
          {report.status}
        </span>
      </div>
      <p className="report-description">{report.description}</p>
      <p className="report-date">{new Date(report.date).toLocaleDateString('pt-BR')}</p>
      <div className="report-actions">
        <button className="btn-small">Visualizar</button>
        <button className="btn-small btn-secondary">Baixar</button>
      </div>
    </div>
  );
};

export default ReportCard;
