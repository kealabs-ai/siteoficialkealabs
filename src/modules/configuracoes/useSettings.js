import { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';

const DEFAULT_SETTINGS = {
  web_base_setup: 2000,
  web_menus_included: 1,
  web_menu_extra_price: 300,
  web_asaas_integration: 500,
  minisite_base_setup: 1500,
  minisite_pages_included: 1,
  minisite_page_extra_price: 200,
  minisite_instagram: 300,
  minisite_whatsapp: 200,
  bi_excel_source: 500,
  bi_api_source: 800,
  bi_database_source: 1000,
  bi_advanced_multiplier: 1.3,
  ai_free_setup: 0,
  ai_free_monthly: 0,
  ai_starter_setup: 500,
  ai_starter_monthly: 100,
  ai_pro_setup: 1500,
  ai_pro_monthly: 300,
  ai_enterprise_setup: 3000,
  ai_enterprise_monthly: 1000,
  ai_extra_agent: 500,
  ai_rag_addon: 800,
  ai_voice_addon: 600,
  module_n8n: 500,
  module_whatsapp: 300,
  module_agile_setup: 1200,
  module_mentoring_hour: 150,
  module_support_percentage: 10,
  installment_limit: 12,
  mdr_1x: 0,
  mdr_2_6x: 2.99,
  mdr_7_12x: 3.99,
  mdr_13plus: 4.99,
  fixed_fee: 0.30,
  anticipation_fee: 1.5,
  cycle_days: 30,
  commission_rate: 15,
  hosting_single: 50,
  hosting_premium: 100,
  hosting_business: 200,
  hosting_vps_starter: 150,
  hosting_vps_pro: 300,
  hosting_vps_ultra: 600,
  llm_provider: 'gemini',
  llm_model: 'gemini-2.0-flash',
  llm_key_gemini: '',
  llm_key_openai: '',
  llm_key_anthropic: '',
  llm_key_groq: ''
};

const DEFAULT_AGENT = {
  name: 'Agent Kea',
  company: 'Kealabs',
  role: 'Assistente IA',
  tone: 'friendly',
  services: 'Desenvolvimento Web, BI, AI Agents, Consultoria',
  objections: 'Responda com dados e cases de sucesso',
  closing_style: 'Agende uma conversa para entender melhor',
  system_prompt: '',
  llm_model: 'gemini-2.0-flash',
  is_active: 1
};

export const useSettings = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [settingsChanges, setSettingsChanges] = useState({});
  const [agent, setAgent] = useState(DEFAULT_AGENT);
  const [agentChanges, setAgentChanges] = useState({});
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [agentId, setAgentId] = useState(null);

  useEffect(() => {
    loadSettings();
    loadAgent();
    loadAgents();
  }, []);

  const loadSettings = async () => {
    try {
      const cached = localStorage.getItem('keaflow-settings');
      if (cached) {
        setSettings(JSON.parse(cached));
      }

      try {
        const { data } = await api.get('/settings');
        const settingsList = Array.isArray(data) ? data : data?.data || [];
        
        const merged = { ...DEFAULT_SETTINGS };
        settingsList.forEach(item => {
          merged[item.setting_key] = item.setting_value;
        });
        
        setSettings(merged);
        localStorage.setItem('keaflow-settings', JSON.stringify(merged));
      } catch (err) {
        if (err.response?.status === 404) {
          console.log('Endpoint /settings não disponível, usando valores padrão');
        } else {
          throw err;
        }
      }
    } catch (err) {
      console.error('Erro ao carregar settings:', err);
    }
  };

  const loadAgent = async () => {
    try {
      const cached = localStorage.getItem('keaflow-agent-profile');
      if (cached) {
        const cachedAgent = JSON.parse(cached);
        setAgent(cachedAgent);
        setAgentId(cachedAgent.id);
      }

      try {
        const { data } = await api.get('/agents/active');
        if (data) {
          setAgent(data);
          setAgentId(data.id);
          localStorage.setItem('keaflow-agent-profile', JSON.stringify(data));
        }
      } catch (err) {
        if (err.response?.status === 404) {
          console.log('Endpoint /agents/active não disponível, usando valores padrão');
        } else {
          throw err;
        }
      }
    } catch (err) {
      console.error('Erro ao carregar agente:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadAgents = useCallback(async () => {
    try {
      const { data } = await api.get('/agents');
      const agentsList = Array.isArray(data) ? data : data?.data || [];
      setAgents(agentsList);
    } catch (err) {
      if (err.response?.status === 404) {
        console.log('Endpoint /agents não disponível');
      } else {
        console.error('Erro ao carregar agents:', err);
      }
    }
  }, []);

  const updateSetting = useCallback((key, value) => {
    setSettingsChanges(prev => ({ ...prev, [key]: value }));
  }, []);

  const savePricingSettings = useCallback(async () => {
    try {
      setSaving(true);
      const newSettings = { ...settings, ...settingsChanges };
      
      await Promise.all(
        Object.entries(settingsChanges).map(([key, value]) =>
          api.post('/settings/upsert', {
            setting_key: key,
            setting_value: value
          })
        )
      );
      
      setSettings(newSettings);
      setSettingsChanges({});
      localStorage.setItem('keaflow-settings', JSON.stringify(newSettings));
      setSaveMessage('✅ Salvo!');
      setTimeout(() => setSaveMessage(''), 2000);
    } catch (err) {
      console.error('Erro ao salvar settings:', err);
      setSaveMessage('❌ Erro ao salvar');
    } finally {
      setSaving(false);
    }
  }, [settings, settingsChanges]);

  const cancelPricingChanges = useCallback(() => {
    setSettingsChanges({});
  }, []);

  const updateAgent = useCallback((updates) => {
    setAgentChanges(prev => ({ ...prev, ...updates }));
  }, []);

  const saveAgent = useCallback(async () => {
    try {
      setSaving(true);
      const newAgent = { ...agent, ...agentChanges };
      
      if (agentId) {
        await api.post('/agents/update', {
          id: agentId,
          ...agentChanges,
          is_active: 1
        });
      } else {
        const { data } = await api.post('/agents', {
          ...agentChanges,
          is_active: 1
        });
        setAgentId(data.id);
      }
      
      setAgent(newAgent);
      setAgentChanges({});
      localStorage.setItem('keaflow-agent-profile', JSON.stringify(newAgent));
      setSaveMessage('✅ Salvo!');
      setTimeout(() => setSaveMessage(''), 2000);
    } catch (err) {
      console.error('Erro ao salvar agente:', err);
      setSaveMessage('❌ Erro ao salvar');
    } finally {
      setSaving(false);
    }
  }, [agent, agentChanges, agentId]);

  const cancelAgentChanges = useCallback(() => {
    setAgentChanges({});
  }, []);

  const selectAgent = useCallback((selectedAgent) => {
    setAgent(selectedAgent);
    setAgentId(selectedAgent.id);
    setAgentChanges({});
    localStorage.setItem('keaflow-agent-profile', JSON.stringify(selectedAgent));
  }, []);

  const createNewAgent = useCallback(() => {
    setAgent(DEFAULT_AGENT);
    setAgentId(null);
    setAgentChanges({});
  }, []);

  const saveLLMKeys = useCallback(async (keys) => {
    try {
      setSaving(true);
      
      await Promise.all([
        api.post('/settings/upsert', { setting_key: 'llm_key_gemini', setting_value: keys.gemini || null }),
        api.post('/settings/upsert', { setting_key: 'llm_key_openai', setting_value: keys.openai || null }),
        api.post('/settings/upsert', { setting_key: 'llm_key_anthropic', setting_value: keys.anthropic || null }),
        api.post('/settings/upsert', { setting_key: 'llm_key_groq', setting_value: keys.groq || null })
      ]);
      
      const newSettings = {
        ...settings,
        llm_key_gemini: keys.gemini,
        llm_key_openai: keys.openai,
        llm_key_anthropic: keys.anthropic,
        llm_key_groq: keys.groq
      };
      setSettings(newSettings);
      localStorage.setItem('keaflow-settings', JSON.stringify(newSettings));
      
      if (agentId) {
        await api.post('/agents/update', {
          id: agentId,
          llm_model: settings.llm_model,
          is_active: 1
        });
      }
      
      setSaveMessage('✅ Salvo!');
      setTimeout(() => setSaveMessage(''), 2000);
    } catch (err) {
      console.error('Erro ao salvar chaves LLM:', err);
      setSaveMessage('❌ Erro ao salvar');
    } finally {
      setSaving(false);
    }
  }, [agentId, settings]);

  const resetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    setAgent(DEFAULT_AGENT);
    setAgentId(null);
    setSettingsChanges({});
    setAgentChanges({});
    localStorage.removeItem('keaflow-settings');
    localStorage.removeItem('keaflow-agent-profile');
  };

  return {
    settings,
    settingsChanges,
    agent,
    agentChanges,
    agents,
    agentId,
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
    loadSettings,
    loadAgent,
    loadAgents,
    selectAgent,
    createNewAgent
  };
};

export default useSettings;
