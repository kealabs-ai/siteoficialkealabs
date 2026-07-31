import React, { useState, useEffect } from 'react';
import { Quote, quotesApi } from '../lib/api';
import '../styles/dashboard.css';

const Dashboard: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    quotesApi
      .list()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setQuotes(data);
      })
      .catch(() => setQuotes([]))
      .finally(() => setLoading(false));
  }, []);

  const fmt = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const changeStatus = async (id: string, status: 'PENDING' | 'APPROVED' | 'REJECTED') => {
    await quotesApi.updateStatus(id, status);
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );
  };

  const stats = [
    { label: 'Total', value: quotes.length },
    { label: 'Pendentes', value: quotes.filter((q) => q.status === 'PENDING').length },
    { label: 'Aprovados', value: quotes.filter((q) => q.status === 'APPROVED').length },
    {
      label: 'Setup Total',
      value: fmt(quotes.reduce((s, q) => s + (q.setup_value ?? 0), 0)),
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Seus orçamentos e propostas</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value">{stat.value}</span>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : quotes.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum orçamento ainda.</p>
          <a href="/app/builder" className="btn-primary">
            Criar o primeiro →
          </a>
        </div>
      ) : (
        <div className="quotes-list">
          {quotes.map((q) => (
            <div key={q.id} className="quote-card">
              <div className="quote-info">
                <h3>{q.clientName || q.client_name || 'Cliente'}</h3>
                <div className="quote-details">
                  <span className={`status status-${q.status.toLowerCase()}`}>
                    {q.status}
                  </span>
                  <span className="service-type">{q.service_type}</span>
                </div>
                <div className="quote-values">
                  <span>Setup: <strong>{fmt(q.setup_value)}</strong></span>
                  <span>Mensal: <strong>{fmt(q.monthly_value)}</strong></span>
                </div>
              </div>
              <div className="quote-actions">
                {q.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => changeStatus(q.id, 'APPROVED')}
                      className="btn-approve"
                    >
                      Aprovar
                    </button>
                    <button
                      onClick={() => changeStatus(q.id, 'REJECTED')}
                      className="btn-reject"
                    >
                      Rejeitar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
