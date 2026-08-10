import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

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
    <div className="relative">
      <button 
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0 transition-all"
        onClick={() => setAgentOpen(!agentOpen)}
        title="Selecionar Agent"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM9 12a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-emerald-600 rounded-full">{agents.length}</span>
      </button>
      
      {agentOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-max max-h-80 overflow-y-auto">
          {loading ? (
            <div className="px-4 py-3 text-center text-gray-500 text-sm">Carregando...</div>
          ) : agents.length === 0 ? (
            <div className="px-4 py-3 text-center text-gray-500 text-sm">Nenhum agent disponível</div>
          ) : (
            agents.map(agent => (
              <button
                key={agent.id}
                className={`block w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0 ${
                  currentAgent?.id === agent.id 
                    ? 'bg-emerald-50 text-emerald-700 font-semibold border-l-4 border-emerald-600' 
                    : 'text-gray-900'
                }`}
                onClick={() => handleAgentSelect(agent)}
              >
                <div className="font-medium">{agent.name}</div>
                <div className="text-xs text-gray-500">{agent.role}</div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AgentSelector;
