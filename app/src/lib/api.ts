import axios from 'axios';

const API_BASE = 'https://srv1023256.hstgr.cloud/k1/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types
export type ServiceType = 'WEB' | 'BI' | 'MINI_SITE' | 'AI_AGENT';
export type QuoteStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type BISource = 'excel' | 'api' | 'database';
export type HostingPlan = 'single' | 'premium' | 'business' | 'vps-starter' | 'vps-pro' | 'vps-ultra';
export type AgentPlan = 'free' | 'starter' | 'pro' | 'enterprise';

export interface Quote {
  id: string;
  client_id: string;
  clientName?: string;
  client_name?: string;
  service_type: ServiceType;
  status: QuoteStatus;
  setup_value: number;
  monthly_value: number;
  installments?: number;
  interest_rate?: number;
  installment_value?: number;
  created_at: string;
  updated_at: string;
}

export interface SystemSetting {
  setting_key: string;
  setting_value: string;
}

export interface Prospect {
  id: string;
  name: string;
  email?: string;
  cpf_cnpj?: string;
  phone?: string;
  company?: string;
  status: string;
  created_at: string;
}

export interface Modules {
  n8nAutomation?: boolean;
  whatsappGateway?: boolean;
  agileSetup?: boolean;
  agileMentoringHours?: number;
  hosting?: HostingPlan;
  consultorArea?: boolean;
  pandaVideos?: boolean;
  bunneyNet?: boolean;
}

export interface CreateQuoteDTO {
  clientName: string;
  clientEmail?: string;
  clientCpfCnpj?: string;
  clientPhone?: string;
  pricing: any;
  installments: number;
  interest_rate: number;
  installment_value: number;
}

// API Endpoints
export const quotesApi = {
  list: () => api.get<Quote[]>('/quotes'),
  create: (body: CreateQuoteDTO) => api.post<Quote>('/quotes', body),
  updateStatus: (id: string, status: QuoteStatus) =>
    api.post('/quotes/update-status', { id, status }),
};

export const settingsApi = {
  list: () => api.get<SystemSetting[]>('/settings'),
};

export const prospectsApi = {
  list: () => api.get<Prospect[]>('/prospects'),
};
