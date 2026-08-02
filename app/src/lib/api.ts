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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se receber 401, limpar tokens
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      localStorage.removeItem('token_expires_in');
      localStorage.removeItem('token_type');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Types
export type ServiceType = 'WEB' | 'BI' | 'MINI_SITE' | 'AI_AGENT';
export type QuoteStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type BISource = 'excel' | 'api' | 'database';
export type HostingPlan = 'single' | 'premium' | 'business' | 'vps-starter' | 'vps-pro' | 'vps-ultra';
export type AgentPlan = 'free' | 'starter' | 'pro' | 'enterprise';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

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

// API Endpoints - Auth
export const authApi = {
  login: (email: string, password: string) =>
    api.post<LoginResponse>('/auth/login', { email, password }),
  validate: () =>
    api.get('/auth/validate'),
  logout: () =>
    api.post('/auth/logout'),
};

// API Endpoints - Quotes
export const quotesApi = {
  list: () => api.get<Quote[]>('/quotes'),
  get: (id: string) => api.get<Quote>(`/quotes/${id}`),
  create: (body: CreateQuoteDTO) => api.post<Quote>('/quotes', body),
  updateStatus: (id: string, status: QuoteStatus) =>
    api.post('/quotes/update-status', { id, status }),
  delete: (id: string) => api.post('/quotes/delete', { id }),
};

// API Endpoints - Settings
export const settingsApi = {
  list: () => api.get<SystemSetting[]>('/settings'),
  get: (key: string) => api.get<SystemSetting>(`/settings/${key}`),
};

// API Endpoints - Prospects
export const prospectsApi = {
  list: () => api.get<Prospect[]>('/prospects'),
  get: (id: string) => api.get<Prospect>(`/prospects/${id}`),
  create: (body: Omit<Prospect, 'id' | 'created_at'>) =>
    api.post<Prospect>('/prospects', body),
  update: (id: string, body: Partial<Prospect>) =>
    api.post<Prospect>(`/prospects/${id}`, body),
  delete: (id: string) => api.post('/prospects/delete', { id }),
};
