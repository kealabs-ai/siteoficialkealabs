const API_PROXY_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const ASAAS_PROXY_URL = `${API_PROXY_URL}/api/asaas`;

const asaasService = {
  // Cobranças
  async criarCobranca(dados) {
    try {
      const response = await fetch(`${ASAAS_PROXY_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });
      if (!response.ok) throw new Error('Erro ao criar cobrança');
      return await response.json();
    } catch (error) {
      console.error('Erro ao criar cobrança:', error);
      throw error;
    }
  },

  async listarCobrancas(filtros = {}) {
    try {
      const params = new URLSearchParams();
      if (filtros.status) params.append('status', filtros.status);
      if (filtros.limit) params.append('limit', filtros.limit);
      if (filtros.offset) params.append('offset', filtros.offset);

      const response = await fetch(`${ASAAS_PROXY_URL}/payments?${params}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Erro ao listar cobranças');
      return await response.json();
    } catch (error) {
      console.error('Erro ao listar cobranças:', error);
      throw error;
    }
  },

  async obterCobranca(id) {
    try {
      const response = await fetch(`${ASAAS_PROXY_URL}/payments/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Erro ao obter cobrança');
      return await response.json();
    } catch (error) {
      console.error('Erro ao obter cobrança:', error);
      throw error;
    }
  },

  async atualizarCobranca(id, dados) {
    try {
      const response = await fetch(`${ASAAS_PROXY_URL}/payments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });
      if (!response.ok) throw new Error('Erro ao atualizar cobrança');
      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar cobrança:', error);
      throw error;
    }
  },

  async deletarCobranca(id) {
    try {
      const response = await fetch(`${ASAAS_PROXY_URL}/payments/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Erro ao deletar cobrança');
      return await response.json();
    } catch (error) {
      console.error('Erro ao deletar cobrança:', error);
      throw error;
    }
  },

  // Pagamentos
  async criarPagamento(dados) {
    try {
      const response = await fetch(`${ASAAS_PROXY_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...dados,
          billingType: 'BOLETO',
        }),
      });
      if (!response.ok) throw new Error('Erro ao criar pagamento');
      return await response.json();
    } catch (error) {
      console.error('Erro ao criar pagamento:', error);
      throw error;
    }
  },

  async listarPagamentos(filtros = {}) {
    try {
      const params = new URLSearchParams();
      if (filtros.status) params.append('status', filtros.status);
      if (filtros.limit) params.append('limit', filtros.limit);
      if (filtros.offset) params.append('offset', filtros.offset);

      const response = await fetch(`${ASAAS_PROXY_URL}/payments?${params}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Erro ao listar pagamentos');
      return await response.json();
    } catch (error) {
      console.error('Erro ao listar pagamentos:', error);
      throw error;
    }
  },

  // Recebimentos
  async listarRecebimentos(filtros = {}) {
    try {
      const params = new URLSearchParams();
      if (filtros.status) params.append('status', filtros.status);
      if (filtros.limit) params.append('limit', filtros.limit);
      if (filtros.offset) params.append('offset', filtros.offset);

      const response = await fetch(`${ASAAS_PROXY_URL}/payments?${params}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Erro ao listar recebimentos');
      return await response.json();
    } catch (error) {
      console.error('Erro ao listar recebimentos:', error);
      throw error;
    }
  },

  async obterRecebimento(id) {
    try {
      const response = await fetch(`${ASAAS_PROXY_URL}/payments/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Erro ao obter recebimento');
      return await response.json();
    } catch (error) {
      console.error('Erro ao obter recebimento:', error);
      throw error;
    }
  },

  async obterInfoPagamento(id) {
    try {
      const response = await fetch(`${ASAAS_PROXY_URL}/payments/${id}/billingInfo`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Erro ao obter informações de pagamento');
      return await response.json();
    } catch (error) {
      console.error('Erro ao obter informações de pagamento:', error);
      throw error;
    }
  },

  // Clientes
  async criarCliente(dados) {
    try {
      const response = await fetch(`${ASAAS_PROXY_URL}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });
      if (!response.ok) throw new Error('Erro ao criar cliente');
      return await response.json();
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }
  },

  async listarClientes(filtros = {}) {
    try {
      const params = new URLSearchParams();
      if (filtros.limit) params.append('limit', filtros.limit);
      if (filtros.offset) params.append('offset', filtros.offset);

      const response = await fetch(`${ASAAS_PROXY_URL}/customers?${params}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Erro ao listar clientes');
      return await response.json();
    } catch (error) {
      console.error('Erro ao listar clientes:', error);
      throw error;
    }
  },
};

export default asaasService;
