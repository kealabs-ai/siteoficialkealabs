import React from 'react';

const StatisticsCard = ({ label, count, status }) => {
  const getStatusColor = (status) => {
    const colors = {
      NEW: '#3B82F6',
      CONTACTED: '#F59E0B',
      NEGOTIATING: '#A855F7',
      APPROVED: '#10B981',
      REJECTED: '#EF4444'
    };
    return colors[status] || '#64748B';
  };

  return (
    <div className="statistics-card">
      <div 
        className="statistics-icon"
        style={{ backgroundColor: getStatusColor(status) }}
      >
        <span>{count}</span>
      </div>
      <div className="statistics-content">
        <p className="statistics-label">{label}</p>
        <p className="statistics-count">{count}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;
