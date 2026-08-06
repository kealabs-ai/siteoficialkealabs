import React, { useState } from 'react';
import AgentSelector from './AgentSelector';
import '../agent.css';

const ChatHeader = ({ 
  onToggleSidebar, 
  agentProfile, 
  selectedModel, 
  onChangeModel,
  sidebarOpen 
}) => {
  const [modelOpen, setModelOpen] = useState(false);
  
  const models = {
    'Groq': [
      { value: 'mixtral-8x7b-32768', label: 'Mixtral 8x7B' },
      { value: 'llama2-70b-4096', label: 'LLaMA 2 70B' },
      { value: 'llama-3.3-70b-versatile', label: 'LLaMA 3.3 70B Versatile' },
      { value: 'llama-3.1-70b-versatile', label: 'LLaMA 3.1 70B Versatile' },
      { value: 'llama-3.1-8b-instant', label: 'LLaMA 3.1 8B Instant' },
      { value: 'llama-3-70b-8192', label: 'LLaMA 3 70B' },
      { value: 'llama-3-8b-8192', label: 'LLaMA 3 8B' },
      { value: 'gemma-7b-it', label: 'Gemma 7B' },
      { value: 'gemma-2-9b-it', label: 'Gemma 2 9B' }
    ],
    'Google Gemini': [
      { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
      { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
      { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
      { value: 'gemini-pro', label: 'Gemini Pro' },
      { value: 'gemini-pro-vision', label: 'Gemini Pro Vision' }
    ],
    'Anthropic': [
      { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
      { value: 'claude-3-opus', label: 'Claude 3 Opus' },
      { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
      { value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
      { value: 'claude-2.1', label: 'Claude 2.1' },
      { value: 'claude-2', label: 'Claude 2' }
    ],
    'OpenAI': [
      { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
      { value: 'gpt-4', label: 'GPT-4' },
      { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
      { value: 'gpt-3.5-turbo-16k', label: 'GPT-3.5 Turbo 16K' }
    ]
  };

  const handleModelSelect = (modelValue) => {
    onChangeModel(modelValue);
    setModelOpen(false);
  };

  const handleAgentSelect = (agent) => {
    console.log('Agent selecionado:', agent);
  };

  const currentModelLabel = Object.values(models)
    .flat()
    .find(m => m.value === selectedModel)?.label || selectedModel;

  return (
    <div className="chat-header">
      <div className="header-left">
        <button 
          className="btn-toggle-sidebar"
          onClick={onToggleSidebar}
          title={sidebarOpen ? 'Fechar sidebar' : 'Abrir sidebar'}
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>

        <div className="agent-info">
          <div className="agent-avatar">
            <span className="avatar-icon">🤖</span>
            <span className="online-badge"></span>
          </div>
          <div className="agent-details">
            <h2>{agentProfile?.name || 'Agent Kea'}</h2>
            <p className="agent-role">
              {agentProfile?.role || 'Assistente IA'} • {agentProfile?.company || 'Kealabs'}
            </p>
          </div>
        </div>
      </div>

      <div className="header-right">
        <AgentSelector 
          currentAgent={agentProfile}
          onSelectAgent={handleAgentSelect}
        />
        <div className="model-dropdown-wrapper">
          <button 
            className="model-selector-btn"
            onClick={() => setModelOpen(!modelOpen)}
          >
            {currentModelLabel}
            <span className="dropdown-arrow">▼</span>
          </button>
          
          {modelOpen && (
            <div className="model-dropdown-menu">
              {Object.entries(models).map(([provider, modelList]) => (
                <div key={provider} className="model-group">
                  <div className="model-group-label">{provider}</div>
                  {modelList.map(model => (
                    <button
                      key={model.value}
                      className={`model-option ${selectedModel === model.value ? 'active' : ''}`}
                      onClick={() => handleModelSelect(model.value)}
                    >
                      {model.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
