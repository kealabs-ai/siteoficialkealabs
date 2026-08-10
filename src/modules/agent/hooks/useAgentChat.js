import { useState, useEffect, useCallback } from 'react';
import api from '../../../services/api';
import useSettings from '../../configuracoes/useSettings';

export const useAgentChat = () => {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedModel, setSelectedModel] = useState('gemini-2.0-flash');
  const { settings, agent } = useSettings();

  useEffect(() => {
    loadSessions();
    restoreOrCreateSession();
  }, [agent]);

  const loadSessions = async () => {
    try {
      const { data } = await api.get('/chat/sessions');
      const sessionsList = Array.isArray(data) ? data : data?.data || [];
      setSessions(sessionsList);
    } catch (err) {
      if (err.response?.status === 404) {
        console.log('Endpoint /chat/sessions não disponível');
        setSessions([]);
      } else {
        console.error('Erro ao carregar sessões:', err);
      }
    }
  };

  const restoreOrCreateSession = async () => {
    const savedSessionId = localStorage.getItem('keaflow-chat-session-id');
    
    if (savedSessionId) {
      try {
        await api.get(`/chat/sessions/${savedSessionId}`);
        setActiveSessionId(savedSessionId);
        await loadMessages(savedSessionId);
      } catch (err) {
        if (err.response?.status === 404) {
          await createNewSession();
        }
      }
    } else {
      await createNewSession();
    }
  };

  const getApiKeyForModel = (model) => {
    if (!model || typeof model !== 'string') return '';
    if (model.startsWith('gemini')) return settings.llm_key_gemini || '';
    if (model.startsWith('gpt')) return settings.llm_key_openai || '';
    if (model.startsWith('claude')) return settings.llm_key_anthropic || '';
    if (model.startsWith('mixtral') || model.startsWith('llama') || model.startsWith('gemma')) return settings.llm_key_groq || '';
    return '';
  };

  const buildSystemPrompt = () => {
    if (!agent) return '';
    return `Você é ${agent.name}, ${agent.role} da ${agent.company}. Seu tom é ${agent.tone}. Você oferece: ${agent.services}. Quando enfrentar objeções, ${agent.objections}. Para fechar, ${agent.closing_style}.`;
  };

  const createNewSession = async (model = selectedModel) => {
    try {
      const apiKey = getApiKeyForModel(model);
      const systemPrompt = buildSystemPrompt();
      
      console.log('Criando sessão:', { modelo: model, temChave: !!apiKey });
      
      try {
        const { data } = await api.post('/chat/sessions', {
          agent_name: agent?.name || 'Agent Kea',
          agent_role: agent?.role || 'Assistente IA',
          agent_tone: agent?.tone || 'friendly',
          llm_model: model,
          api_key: apiKey,
          system_prompt: systemPrompt
        });
        
        const newSessionId = data.id || data.session_id;
        setActiveSessionId(newSessionId);
        localStorage.setItem('keaflow-chat-session-id', newSessionId);
        setMessages([]);
        await loadSessions();
      } catch (err) {
        if (err.response?.status === 404) {
          console.log('Endpoint /chat/sessions não disponível, usando sessão local');
          const localSessionId = 'local-' + Date.now();
          setActiveSessionId(localSessionId);
          localStorage.setItem('keaflow-chat-session-id', localSessionId);
          setMessages([]);
        } else {
          throw err;
        }
      }
    } catch (err) {
      console.error('Erro ao criar sessão:', err);
      setError('Erro ao criar nova sessão');
    }
  };

  const loadMessages = async (sessionId) => {
    try {
      const { data } = await api.get(`/chat/sessions/${sessionId}/messages`);
      const messagesList = Array.isArray(data) ? data : data?.messages || [];
      setMessages(messagesList);
    } catch (err) {
      console.error('Erro ao carregar mensagens:', err);
    }
  };

  const switchSession = async (sessionId) => {
    setActiveSessionId(sessionId);
    localStorage.setItem('keaflow-chat-session-id', sessionId);
    await loadMessages(sessionId);
  };

  const deleteSession = async (sessionId) => {
    try {
      await api.post('/chat/sessions/delete', { id: sessionId });
      setSessions(sessions.filter(s => s.id !== sessionId));
      
      if (activeSessionId === sessionId) {
        await createNewSession();
      }
    } catch (err) {
      console.error('Erro ao deletar sessão:', err);
      setError('Erro ao deletar sessão');
    }
  };

  const sendMessage = useCallback(async (content) => {
    if (!activeSessionId || !content.trim()) return;

    setLoading(true);
    setError(null);

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const { data } = await api.post('/chat/messages', {
        session_id: activeSessionId,
        role: 'user',
        content
      });

      const responseMessages = Array.isArray(data) ? data : data?.messages || [];
      setMessages(responseMessages);
      await loadSessions();
    } catch (err) {
      if (err.response?.status === 404) {
        localStorage.removeItem('keaflow-chat-session-id');
        await createNewSession();
        setError('Sessão expirada. Nova sessão criada.');
      } else {
        setError({
          status: err.response?.status,
          message: err.response?.data?.message || err.message,
          data: err.response?.data
        });
      }
      setMessages(prev => prev.filter(m => m.id !== userMessage.id));
    } finally {
      setLoading(false);
    }
  }, [activeSessionId]);

  const changeModel = async (model) => {
    console.log('Mudando modelo para:', model);
    setSelectedModel(model);
    await createNewSession(model);
  };

  return {
    sessions,
    activeSessionId,
    messages,
    loading,
    error,
    selectedModel,
    loadSessions,
    createNewSession,
    switchSession,
    deleteSession,
    sendMessage,
    changeModel,
    setError,
    getApiKeyForModel
  };
};

export default useAgentChat;
