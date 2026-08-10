import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/agents');
      const agentsList = Array.isArray(data) ? data : data?.data || [];
      setAgents(agentsList);
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar agents:', err);
      setError('Erro ao carregar agents');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Carregando agents...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Agents Criados ({agents.length})
        </h3>
      </div>

      {agents.length === 0 ? (
        <div className="px-6 py-8 text-center text-gray-500">
          Nenhum agent criado ainda
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {agents.map(agent => (
            <div key={agent.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{agent.role}</p>
                  {agent.description && (
                    <p className="text-sm text-gray-500 mt-2">{agent.description}</p>
                  )}
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    Ativo
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentList;
