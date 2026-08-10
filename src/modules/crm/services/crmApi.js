const API_BASE_URL = '/k1/api/v3';

const getApiKey = () => {
  const apiKey = import.meta.env.VITE_ASAAS_API_KEY;
  
  if (!apiKey) {
    throw new Error('API Key não configurada no .env');
  }

  return apiKey;
};

const getHeaders = (contentType = 'application/json') => {
  const apiKey = getApiKey();
  
  return {
    'User-Agent': 'Kealabs/1.0.0',
    'accept': 'application/json',
    'content-type': contentType,
    'access_token': apiKey
  };
};

export const crmApi = {
  // GET - Listar clientes
  getClients: async () => {
    try {
      const url = `${API_BASE_URL}/customers`;
      const headers = getHeaders();
      
      const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.detail || `Erro ao buscar clientes: ${response.status}`);
      }

      const data = await response.json();
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
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(clientData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.detail || `Erro ao criar cliente: ${response.status}`);
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
      const response = await fetch(`${API_BASE_URL}/customers/${clientId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.detail || `Erro ao deletar cliente: ${response.status}`);
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
