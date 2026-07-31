import React from 'react';
import './Cases.css';

const cases = [
  {
    id: 1,
    tag: 'Automação',
    titulo: 'Redução de 70% no tempo de onboarding',
    cliente: 'Empresa do setor financeiro',
    descricao:
      'Automatizamos o processo de cadastro e validação de clientes, eliminando etapas manuais e integrando APIs de bureaus de crédito.',
    metricas: [
      { valor: '70%', label: 'menos tempo' },
      { valor: '3x', label: 'mais conversões' },
      { valor: '90 dias', label: 'de implementação' },
    ],
  },
];

const Cases = () => {
  return (
    <section id="cases" className="cases">
      <div className="container">
        <h2>Cases</h2>
        <p className="cases-subtitle">Conheça alguns dos trabalhos que realizamos.</p>
        <div className="cases-grid">
          {cases.length === 0 ? (
            <p className="cases-empty">Em breve novos cases serão publicados.</p>
          ) : (
            cases.map((c) => (
              <div key={c.id} className="case-card">
                <span className="case-tag">{c.tag}</span>
                <p className="case-cliente">{c.cliente}</p>
                <h3>{c.titulo}</h3>
                <p>{c.descricao}</p>
                {c.metricas && (
                  <div className="case-metricas">
                    {c.metricas.map((m, i) => (
                      <div key={i} className="case-metrica">
                        <strong>{m.valor}</strong>
                        <span>{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Cases;
