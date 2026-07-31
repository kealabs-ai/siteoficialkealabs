/**
 * Configuração do Módulo App - Kealabs
 * 
 * Este arquivo centraliza as configurações do módulo app
 */

export const APP_CONFIG = {
  // API
  API_BASE_URL: import.meta.env.VITE_API_URL || 'https://srv1023256.hstgr.cloud',
  API_ENDPOINT: '/k1/api',

  // Autenticação
  AUTH: {
    TOKEN_KEY: 'access_token',
    LOGIN_ENDPOINT: '/auth/login',
  },

  // Rotas
  ROUTES: {
    LOGIN: '/app/login',
    DASHBOARD: '/app/dashboard',
    BUILDER: '/app/builder',
  },

  // Cores Kealabs
  COLORS: {
    PRIMARY: '#0A2540',      // Azul Profundo
    SUCCESS: '#10B981',      // Verde Esmeralda
    CYAN: '#00B4D8',         // Ciano Digital
    ALERT: '#FF6B00',        // Laranja Alerta
    NEUTRAL: '#64748B',      // Cinza Slate
    LIGHT: '#F8FAFC',        // Fundo claro
    BORDER: '#E2E8F0',       // Borda
  },

  // Configurações de Preços Padrão
  PRICING_DEFAULTS: {
    WEB: {
      BASE: 2500,
      FREE_MENUS: 6,
      EXTRA_MENU_PRICE: 300,
      ASAAS_INTEGRATION: 500,
    },
    MINI_SITE: {
      BASE: 1500,
      FREE_PAGES: 3,
      EXTRA_PAGE_PRICE: 200,
      INSTAGRAM: 300,
      WHATSAPP: 150,
    },
    BI: {
      EXCEL: 1500,
      API: 2500,
      DATABASE: 3500,
      ADVANCED_MULTIPLIER: 1.3,
    },
    AI_AGENT: {
      FREE: { SETUP: 0, MONTHLY: 0 },
      STARTER: { SETUP: 500, MONTHLY: 200 },
      PRO: { SETUP: 1500, MONTHLY: 500 },
      ENTERPRISE: { SETUP: 5000, MONTHLY: 2000 },
      EXTRA_AGENT: 400,
      RAG: 800,
      VOICE: 600,
    },
    MODULES: {
      N8N: 1000,
      WHATSAPP: 800,
      AGILE_SETUP: 1200,
      MENTORING_HOUR: 200,
    },
    HOSTING: {
      SINGLE: 50,
      PREMIUM: 100,
      BUSINESS: 150,
      VPS_STARTER: 200,
      VPS_PRO: 400,
      VPS_ULTRA: 800,
    },
    INSTALLMENTS: {
      TAXA_FIXA: 0.99,
      ANTECIPACAO_MENSAL: 2.99,
      CICLO_DIAS: 30,
      MDR_1X: 2.99,
      MDR_2_6X: 3.99,
      MDR_7_12X: 4.99,
      MDR_13X: 5.99,
      LIMIT: 12,
    },
    SUPPORT_RATE: 0.1,
    COMMISSION_RATE: 10,
  },

  // Mensagens
  MESSAGES: {
    LOGIN_ERROR: 'Erro ao fazer login. Verifique suas credenciais.',
    QUOTE_CREATED: 'Orçamento criado com sucesso!',
    QUOTE_ERROR: 'Erro ao criar orçamento.',
    LOADING: 'Carregando...',
    EMPTY_QUOTES: 'Nenhum orçamento ainda.',
  },
};

export default APP_CONFIG;
