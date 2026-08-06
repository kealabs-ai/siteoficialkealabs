import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import '../agent.css';

const AgentSelector = ({ currentAgent, onSelectAgent }) => {
  const [agentOpen, setAgentOpen] = useState(false);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/agents');
      const agentsList = Array.isArray(data) ? data : data?.data || [];
      setAgents(agentsList);
    } catch (err) {
      console.error('Erro ao carregar agents:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAgentSelect = (agent) => {
    onSelectAgent(agent);
    setAgentOpen(false);
  };

  return (
    <div className="agent-selector-wrapper">
      <button 
        className="agent-selector-btn"
        onClick={() => setAgentOpen(!agentOpen)}
        title="Selecionar Agent"
      >
        👥
        <span className="agent-count">{agents.length}</span>
      </button>
      
      {agentOpen && (
        <div className="agent-dropdown-menu">
          {loading ? (
            <div className="agent-loading">Carregando...</div>
          ) : agents.length === 0 ? (
            <div className="agent-empty">Nenhum agent disponível</div>
          ) : (
            agents.map(agent => (
              <button
                key={agent.id}
                className={`agent-option ${currentAgent?.id === agent.id ? 'active' : ''}`}
                onClick={() => handleAgentSelect(agent)}
              >
                <div className="agent-option-name">{agent.name}</div>
                <div className="agent-option-role">{agent.role}</div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AgentSelector;
