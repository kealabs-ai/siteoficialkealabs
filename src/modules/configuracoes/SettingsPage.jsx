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
    agent,
    loading,
    saving,
    saveMessage,
    updateSetting,
    updateAgent,
    saveLLMKeys,
    resetDefaults
  } = useSettings();

  const handleSaveLLMKeys = () => {
    saveLLMKeys(llmKeys);
  };

  if (loading) {
    return <div className="settings-page"><p>Carregando...</p></div>;
  }

  return (
    <div className="settings-page">
      <div className="settings-container">
        {/* Header */}
        <div className="settings-header">
          <div>
            <h1>Configurações</h1>
            <p>Gerencie precificação, perfil do agente e modelos de IA</p>
          </div>
          <button 
            className="btn-reset"
            onClick={resetDefaults}
            title="Restaurar valores padrão"
          >
            🔄 Restaurar padrões
          </button>
        </div>

        {/* Tabs */}
        <div className="settings-tabs">
          <button
            className={`tab-button ${activeTab === 'pricing' ? 'active' : ''}`}
            onClick={() => setActiveTab('pricing')}
          >
            💰 Precificação
          </button>
          <button
            className={`tab-button ${activeTab === 'agent' ? 'active' : ''}`}
            onClick={() => setActiveTab('agent')}
          >
            🤖 Perfil do Agente
          </button>
          <button
            className={`tab-button ${activeTab === 'llm' ? 'active' : ''}`}
            onClick={() => setActiveTab('llm')}
          >
            🧠 Modelo de IA
          </button>
        </div>

        {/* Tab Content */}
        <div className="settings-content">
          {activeTab === 'pricing' && (
            <PricingTab settings={settings} onUpdateSetting={updateSetting} />
          )}
          {activeTab === 'agent' && (
            <AgentProfileTab agent={agent} onUpdateAgent={updateAgent} />
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

        {/* Save Button */}
        {activeTab === 'llm' && (
          <div className="settings-footer">
            <button
              className="btn-save"
              onClick={handleSaveLLMKeys}
              disabled={saving}
            >
              {saving ? 'Salvando...' : '💾 Salvar configurações'}
            </button>
            {saveMessage && <span className="save-message">{saveMessage}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
