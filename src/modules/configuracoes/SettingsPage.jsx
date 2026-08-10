import React, { useState } from 'react';
import useSettings from './useSettings';
import PricingTab from './components/PricingTab';
import AgentProfileTab from './components/AgentProfileTab';
import LLMModelTab from './components/LLMModelTab';
import './styles/settings.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('pricing');
  const [llmKeys, setLlmKeys] = useState({
    gemini: '',
    openai: '',
    anthropic: '',
    groq: ''
  });

  const {
    settings,
    settingsChanges,
    agent,
    agentChanges,
    agents,
    loading,
    saving,
    saveMessage,
    updateSetting,
    updateAgent,
    saveAgent,
    cancelAgentChanges,
    savePricingSettings,
    cancelPricingChanges,
    saveLLMKeys,
    resetDefaults,
    selectAgent,
    createNewAgent
  } = useSettings();

  const handleSaveLLMKeys = () => {
    saveLLMKeys(llmKeys);
  };

  const hasChanges = {
    pricing: Object.keys(settingsChanges).length > 0,
    agent: Object.keys(agentChanges).length > 0,
    llm: false
  };

  if (loading) {
    return (
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <p className="text-gray-600">Carregando...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
            <p className="text-gray-600 mt-1">Gerencie precificação, perfil do agente e modelos de IA</p>
          </div>
          <button 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
            onClick={resetDefaults}
            title="Restaurar valores padrão"
          >
            <span>🔄</span>
            Restaurar padrões
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            <button
              className={`pb-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'pricing'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('pricing')}
            >
              💰 Precificação
            </button>
            <button
              className={`pb-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'agent'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('agent')}
            >
              🤖 Perfil do Agente
            </button>
            <button
              className={`pb-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'llm'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('llm')}
            >
              🧠 Modelo de IA
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'pricing' && (
            <PricingTab 
              settings={{ ...settings, ...settingsChanges }} 
              onUpdateSetting={updateSetting} 
            />
          )}
          {activeTab === 'agent' && (
            <AgentProfileTab 
              agent={{ ...agent, ...agentChanges }} 
              agents={agents}
              onUpdateAgent={updateAgent}
              onSelectAgent={selectAgent}
              onCreateNewAgent={createNewAgent}
            />
          )}
          {activeTab === 'llm' && (
            <LLMModelTab 
              settings={settings} 
              onUpdateSetting={updateSetting}
              llmKeys={llmKeys}
              onUpdateKeys={setLlmKeys}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center gap-4">
          {activeTab === 'pricing' && (
            <>
              <button
                className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={savePricingSettings}
                disabled={saving || !hasChanges.pricing}
              >
                <span>💾</span>
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
              {hasChanges.pricing && (
                <button
                  className="inline-flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                  onClick={cancelPricingChanges}
                >
                  Cancelar
                </button>
              )}
            </>
          )}
          
          {activeTab === 'agent' && (
            <>
              <button
                className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={saveAgent}
                disabled={saving || !hasChanges.agent}
              >
                <span>💾</span>
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
              {hasChanges.agent && (
                <button
                  className="inline-flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                  onClick={cancelAgentChanges}
                >
                  Cancelar
                </button>
              )}
            </>
          )}
          
          {activeTab === 'llm' && (
            <button
              className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={handleSaveLLMKeys}
              disabled={saving}
            >
              <span>💾</span>
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          )}
          
          {saveMessage && (
            <span className="text-sm text-emerald-600 font-medium">{saveMessage}</span>
          )}
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
