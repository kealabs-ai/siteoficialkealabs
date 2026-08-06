import React from 'react';

const AgentProfileTab = ({ agent, onUpdateAgent }) => {
  const tones = [
    { value: 'formal', label: 'Formal', description: 'Linguagem corporativa e objetiva' },
    { value: 'friendly', label: 'Friendly', description: 'Próximo, descontraído e empático' },
    { value: 'technical', label: 'Técnico', description: 'Foco em detalhes e especificações' },
    { value: 'consultive', label: 'Consultivo', description: 'Faz perguntas, entende a dor' }
  ];

  const handleChange = (field, value) => {
    onUpdateAgent({ [field]: value });
  };

  return (
    <div className="agent-profile-tab">
      {/* Identidade */}
      <section className="settings-section">
        <h3>👤 Identidade</h3>
        <div className="form-grid-3">
          <div className="form-group">
            <label>Nome do Agente</label>
            <input
              type="text"
              value={agent.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ex: Agent Kea"
            />
          </div>
          <div className="form-group">
            <label>Empresa</label>
            <input
              type="text"
              value={agent.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="Ex: Kealabs"
            />
          </div>
          <div className="form-group">
            <label>Cargo / Função</label>
            <input
              type="text"
              value={agent.role}
              onChange={(e) => handleChange('role', e.target.value)}
              placeholder="Ex: Assistente IA"
            />
          </div>
        </div>
      </section>

      {/* Tom de Comunicação */}
      <section className="settings-section">
        <h3>🎤 Tom de Comunicação</h3>
        <div className="tone-grid">
          {tones.map(tone => (
            <button
              key={tone.value}
              className={`tone-card ${agent.tone === tone.value ? 'active' : ''}`}
              onClick={() => handleChange('tone', tone.value)}
            >
              <div className="tone-label">{tone.label}</div>
              <div className="tone-description">{tone.description}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Comportamento */}
      <section className="settings-section">
        <h3>⚙️ Comportamento</h3>
        <div className="form-group">
          <label>Serviços que o agente pode oferecer</label>
          <textarea
            value={agent.services}
            onChange={(e) => handleChange('services', e.target.value)}
            placeholder="Ex: Desenvolvimento Web, BI, AI Agents, Consultoria"
            rows="3"
          />
        </div>
        <div className="form-group">
          <label>Como lidar com objeções</label>
          <textarea
            value={agent.objections}
            onChange={(e) => handleChange('objections', e.target.value)}
            placeholder="Ex: Responda com dados e cases de sucesso"
            rows="3"
          />
        </div>
        <div className="form-group">
          <label>Estilo de fechamento</label>
          <textarea
            value={agent.closing_style}
            onChange={(e) => handleChange('closing_style', e.target.value)}
            placeholder="Ex: Agende uma conversa para entender melhor"
            rows="3"
          />
        </div>
        <div className="form-group">
          <label>Instruções adicionais (opcional)</label>
          <textarea
            value={agent.system_prompt}
            onChange={(e) => handleChange('system_prompt', e.target.value)}
            placeholder="Instruções que alimentarão o system_prompt"
            rows="4"
          />
        </div>
      </section>
    </div>
  );
};

export default AgentProfileTab;
