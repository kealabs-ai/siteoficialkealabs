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
  const [agent, setAgent] = useState(DEFAULT_AGENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [agentId, setAgentId] = useState(null);

  useEffect(() => {
    loadSettings();
    loadAgent();
  }, []);

  const loadSettings = async () => {
    try {
      const cached = localStorage.getItem('keaflow-settings');
      if (cached) {
        setSettings(JSON.parse(cached));
      }

      const { data } = await api.get('/settings');
      const settingsList = Array.isArray(data) ? data : data?.data || [];
      
      const merged = { ...DEFAULT_SETTINGS };
      settingsList.forEach(item => {
        merged[item.setting_key] = item.setting_value;
      });
      
      setSettings(merged);
      localStorage.setItem('keaflow-settings', JSON.stringify(merged));
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

      const { data } = await api.get('/agents/active');
      if (data) {
        setAgent(data);
        setAgentId(data.id);
        localStorage.setItem('keaflow-agent-profile', JSON.stringify(data));
      }
    } catch (err) {
      console.error('Erro ao carregar agente:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = useCallback(async (key, value) => {
    try {
      setSettings(prev => ({ ...prev, [key]: value }));
      localStorage.setItem('keaflow-settings', JSON.stringify({ ...settings, [key]: value }));
      
      await api.post('/settings/upsert', {
        setting_key: key,
        setting_value: value
      });
    } catch (err) {
      console.error('Erro ao atualizar setting:', err);
    }
  }, [settings]);

  const updateAgent = useCallback(async (updates) => {
    try {
      const newAgent = { ...agent, ...updates };
      setAgent(newAgent);
      localStorage.setItem('keaflow-agent-profile', JSON.stringify(newAgent));

      if (agentId) {
        await api.post('/agents/update', {
          id: agentId,
          ...updates,
          is_active: 1
        });
      } else {
        const { data } = await api.post('/agents', {
          ...updates,
          is_active: 1
        });
        setAgentId(data.id);
      }
    } catch (err) {
      console.error('Erro ao atualizar agente:', err);
    }
  }, [agent, agentId]);

  const saveLLMKeys = useCallback(async (keys) => {
    try {
      setSaving(true);
      
      // Salvar cada chave como setting individual
      await Promise.all([
        api.post('/settings/upsert', { setting_key: 'llm_key_gemini', setting_value: keys.gemini || null }),
        api.post('/settings/upsert', { setting_key: 'llm_key_openai', setting_value: keys.openai || null }),
        api.post('/settings/upsert', { setting_key: 'llm_key_anthropic', setting_value: keys.anthropic || null }),
        api.post('/settings/upsert', { setting_key: 'llm_key_groq', setting_value: keys.groq || null })
      ]);
      
      // Atualizar settings locais com as chaves
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
    localStorage.removeItem('keaflow-settings');
    localStorage.removeItem('keaflow-agent-profile');
  };

  return {
    settings,
    agent,
    agentId,
    loading,
    saving,
    saveMessage,
    updateSetting,
    updateAgent,
    saveLLMKeys,
    resetDefaults,
    loadSettings,
    loadAgent
  };
};

export default useSettings;
