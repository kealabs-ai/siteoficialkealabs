import React from 'react';

const ActivityList = () => {
  const activities = [
    {
      id: 1,
      date: 'Hoje',
      description: 'Novo usuário cadastrado: João Silva'
    },
    {
      id: 2,
      date: 'Ontem',
      description: 'Projeto "Website Redesign" finalizado'
    },
    {
      id: 3,
      date: '2 dias atrás',
      description: 'Relatório mensal gerado'
    }
  ];

  return (
    <section className="activity-section">
      <h2>Atividades Recentes</h2>
      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <span className="activity-date">{activity.date}</span>
            <p>{activity.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivityList;
