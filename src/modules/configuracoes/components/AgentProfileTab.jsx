import React from 'react';

const AgentProfileTab = ({ agent, agents, onUpdateAgent, onSelectAgent, onCreateNewAgent }) => {
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
      {/* Agent Selection */}
      <section className="settings-section">
        <h3>📋 Meus Agentes</h3>
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Selecionar Agente</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              onChange={(e) => {
                if (e.target.value) {
                  const selected = agents.find(a => a.id === parseInt(e.target.value));
                  if (selected) onSelectAgent(selected);
                }
              }}
              defaultValue=""
            >
              <option value="">-- Selecione um agente --</option>
              {agents.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
              onClick={onCreateNewAgent}
            >
              + Novo Agente
            </button>
          </div>
        </div>
      </section>

      {/* Identidade */}
      <section className="settings-section">
        <h3>👤 Identidade</h3>
        <div className="form-grid-3">
          <div className="form-group">
            <label>Nome do Agente</label>
            <input
              type="text"
              value={agent.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ex: Agent Kea"
            />
          </div>
          <div className="form-group">
            <label>Empresa</label>
            <input
              type="text"
              value={agent.company || ''}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="Ex: Kealabs"
            />
          </div>
          <div className="form-group">
            <label>Cargo / Função</label>
            <input
              type="text"
              value={agent.role || ''}
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
            value={agent.services || ''}
            onChange={(e) => handleChange('services', e.target.value)}
            placeholder="Ex: Desenvolvimento Web, BI, AI Agents, Consultoria"
            rows="3"
          />
        </div>
        <div className="form-group">
          <label>Como lidar com objeções</label>
          <textarea
            value={agent.objections || ''}
            onChange={(e) => handleChange('objections', e.target.value)}
            placeholder="Ex: Responda com dados e cases de sucesso"
            rows="3"
          />
        </div>
        <div className="form-group">
          <label>Estilo de fechamento</label>
          <textarea
            value={agent.closing_style || ''}
            onChange={(e) => handleChange('closing_style', e.target.value)}
            placeholder="Ex: Agende uma conversa para entender melhor"
            rows="3"
          />
        </div>
        <div className="form-group">
          <label>Instruções adicionais (opcional)</label>
          <textarea
            value={agent.system_prompt || ''}
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
