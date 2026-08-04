import React from 'react';

const StatisticsCard = ({ title, value, description, color = 'green' }) => {
  return (
    <div className={`statistics-card statistics-card--${color}`}>
      <h3>{title}</h3>
      <p className="card-value">{value}</p>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default StatisticsCard;
