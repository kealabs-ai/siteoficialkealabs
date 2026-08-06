import React, { useState, useEffect } from 'react';

const LLMModelTab = ({ settings, onUpdateSetting, llmKeys, onUpdateKeys }) => {
  const [showKeys, setShowKeys] = useState({
    gemini: false,
    openai: false,
    anthropic: false,
    groq: false
  });

  useEffect(() => {
    onUpdateKeys({
      gemini: settings.llm_key_gemini || '',
      openai: settings.llm_key_openai || '',
      anthropic: settings.llm_key_anthropic || '',
      groq: settings.llm_key_groq || ''
    });
  }, [settings.llm_key_gemini, settings.llm_key_openai, settings.llm_key_anthropic, settings.llm_key_groq, onUpdateKeys]);

  const providers = {
    gemini: {
      name: 'Google Gemini',
      models: [
        { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
        { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' },
        { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' },
        { id: 'gemini-pro', name: 'Gemini Pro' },
        { id: 'gemini-pro-vision', name: 'Gemini Pro Vision' }
      ]
    },
    openai: {
      name: 'OpenAI',
      models: [
        { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
        { id: 'gpt-4', name: 'GPT-4' },
        { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
        { id: 'gpt-3.5-turbo-16k', name: 'GPT-3.5 Turbo 16K' }
      ]
    },
    anthropic: {
      name: 'Anthropic',
      models: [
        { id: 'claude-3-opus', name: 'Claude 3 Opus' },
        { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet' },
        { id: 'claude-3-haiku', name: 'Claude 3 Haiku' }
      ]
    },
    groq: {
      name: 'Groq',
      models: [
        { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B' },
        { id: 'llama2-70b-4096', name: 'Llama 2 70B' },
        { id: 'gemma-7b-it', name: 'Gemma 7B' }
      ]
    }
  };

  const handleProviderChange = (provider) => {
    const firstModel = providers[provider].models[0].id;
    onUpdateSetting('llm_provider', provider);
    onUpdateSetting('llm_model', firstModel);
  };

  const handleModelChange = (model) => {
    onUpdateSetting('llm_model', model);
  };

  const toggleKeyVisibility = (provider) => {
    setShowKeys(prev => ({ ...prev, [provider]: !prev[provider] }));
  };

  const handleKeyChange = (provider, value) => {
    onUpdateKeys({ ...llmKeys, [provider]: value });
  };

  const currentProvider = settings.llm_provider;
  const currentModels = providers[currentProvider]?.models || [];

  return (
    <div className="llm-model-tab">
      {/* Provider Selection */}
      <section className="settings-section">
        <h3>🔌 Seleção de Provider</h3>
        <div className="provider-grid">
          {Object.entries(providers).map(([key, provider]) => (
            <button
              key={key}
              className={`provider-card ${currentProvider === key ? 'active' : ''}`}
              onClick={() => handleProviderChange(key)}
            >
              {provider.name}
            </button>
          ))}
        </div>
      </section>

      {/* Model Selection */}
      <section className="settings-section">
        <h3>🧠 Seleção de Modelo</h3>
        <div className="model-grid">
          {currentModels.map(model => (
            <button
              key={model.id}
              className={`model-card ${settings.llm_model === model.id ? 'active' : ''}`}
              onClick={() => handleModelChange(model.id)}
            >
              <div className="model-name">{model.name}</div>
              <div className="model-id">{model.id}</div>
            </button>
          ))}
        </div>
      </section>

      {/* API Keys */}
      <section className="settings-section">
        <h3>🔑 API Keys</h3>
        <div className="api-keys-grid">
          {Object.entries(providers).map(([provider, config]) => (
            <div key={provider} className="api-key-field">
              <label>{config.name}</label>
              <div className="key-input-wrapper">
                <input
                  type={showKeys[provider] ? 'text' : 'password'}
                  value={llmKeys[provider]}
                  onChange={(e) => handleKeyChange(provider, e.target.value)}
                  placeholder={`Chave ${config.name}`}
                />
                <button
                  className="btn-toggle-visibility"
                  onClick={() => toggleKeyVisibility(provider)}
                  title={showKeys[provider] ? 'Ocultar' : 'Mostrar'}
                >
                  {showKeys[provider] ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {llmKeys[provider] && (
                <span className="key-status">✓ Configurada</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="llm-info">
        <p>💡 As chaves de API são salvas apenas ao clicar em "Salvar configurações"</p>
      </div>
    </div>
  );
};

export default LLMModelTab;
