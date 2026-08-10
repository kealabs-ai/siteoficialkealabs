import React, { useState } from 'react';
import AgentSelector from './AgentSelector';

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
    <div className="flex justify-between items-center px-2 sm:px-4 py-2 sm:py-3 bg-white border-b border-gray-200 shadow-sm gap-2 sm:gap-4 flex-shrink-0 z-20 transition-all duration-300">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <button 
          className="inline-flex items-center justify-center p-1 sm:p-2 text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={onToggleSidebar}
          title={sidebarOpen ? 'Fechar sidebar' : 'Abrir sidebar'}
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>

        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
            <span className="text-sm sm:text-lg">🤖</span>
            <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
          </div>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{agentProfile?.name || 'Agent Kea'}</h2>
            <p className="text-xs text-gray-500 truncate">
              {agentProfile?.role || 'Assistente IA'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-1 sm:gap-2 items-center flex-wrap justify-end">
        <AgentSelector 
          currentAgent={agentProfile}
          onSelectAgent={handleAgentSelect}
        />
        <div className="relative">
          <button 
            className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0 transition-all"
            onClick={() => setModelOpen(!modelOpen)}
          >
            <span className="truncate max-w-xs hidden sm:inline">{currentModelLabel}</span>
            <span className="truncate max-w-xs sm:hidden">{currentModelLabel.split(' ')[0]}</span>
            <svg className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform flex-shrink-0 ${modelOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          
          {modelOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-max max-h-96 overflow-y-auto">
              {Object.entries(models).map(([provider, modelList]) => (
                <div key={provider}>
                  <div className="px-3 sm:px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-200 sticky top-0">{provider}</div>
                  {modelList.map(model => (
                    <button
                      key={model.value}
                      className={`block w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-gray-100 transition-colors ${
                        selectedModel === model.value 
                          ? 'bg-emerald-50 text-emerald-700 font-semibold border-l-4 border-emerald-600' 
                          : 'text-gray-900'
                      }`}
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
