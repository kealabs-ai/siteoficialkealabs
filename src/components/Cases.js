import React from 'react';
import './Cases.css';

const cases = [
  // { id: 1, titulo: 'Nome do Projeto', descricao: 'Descrição do trabalho realizado.', tag: 'Web' },
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
                <h3>{c.titulo}</h3>
                <p>{c.descricao}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Cases;
