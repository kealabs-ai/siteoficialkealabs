const API_BASE_URL = import.meta.env.DEV ? '/api/asaas' : '/api/asaas';

const normalizeToken = (value) => {
  if (!value) return '';

  let normalized = String(value).trim();

  if (normalized.startsWith('$')) {
    normalized = normalized.substring(1);
  }

  return normalized;
};

const getApiKey = () => {
  const apiKey = normalizeToken(import.meta.env.VITE_ASAAS_API_KEY || import.meta.env.ASAAS_API_KEY || '');

  if (!apiKey) {
    throw new Error('API Key não configurada no .env');
  }

  return apiKey;
};

const getHeaders = (contentType = 'application/json') => {
  const apiKey = getApiKey();

  return {
    'accept': 'application/json',
    'content-type': contentType,
    'access_token': apiKey,
    'Authorization': `Bearer ${apiKey}`
  };
};

export const crmApi = {
  // GET - Listar clientes
  getClients: async () => {
    try {
      const url = `${API_BASE_URL}/v3/customers`;
      const headers = getHeaders();
      
      console.log('Requisição para:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });

      console.log('Status:', response.status);

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        
        if (contentType?.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.errors?.[0]?.detail || `Erro ao buscar clientes: ${response.status}`);
        } else {
          const text = await response.text();
          console.error('Resposta não-JSON:', text.substring(0, 200));
          throw new Error(`Erro ${response.status}: Resposta inválida do servidor`);
        }
      }

      const data = await response.json();
      console.log('Dados recebidos:', data);
      return {
        success: true,
        data: data.data || []
      };
    } catch (error) {
      console.error('Erro em getClients:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // POST - Criar cliente
  createClient: async (clientData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/v3/customers`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(clientData)
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        
        if (contentType?.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.errors?.[0]?.detail || `Erro ao criar cliente: ${response.status}`);
        } else {
          throw new Error(`Erro ${response.status}: Resposta inválida do servidor`);
        }
      }

      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('Erro em createClient:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // DELETE - Deletar cliente
  deleteClient: async (clientId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/v3/customers/${clientId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        
        if (contentType?.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.errors?.[0]?.detail || `Erro ao deletar cliente: ${response.status}`);
        } else {
          throw new Error(`Erro ${response.status}: Resposta inválida do servidor`);
        }
      }

      return {
        success: true
      };
    } catch (error) {
      console.error('Erro em deleteClient:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};
