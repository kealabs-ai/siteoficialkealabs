import { useState, useEffect } from 'react';
import asaasService from '../services/asaasService';

export const useRecebimentos = () => {
  const [recebimentos, setRecebimentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({ status: '', limit: 50, offset: 0 });

  const carregarRecebimentos = async () => {
    setLoading(true);
    setError(null);
    try {
      const dados = await asaasService.listarRecebimentos(filtros);
      setRecebimentos(dados.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const obterRecebimento = async (id) => {
    setLoading(true);
    setError(null);
    try {
      return await asaasService.obterRecebimento(id);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const obterInfoPagamento = async (id) => {
    setLoading(true);
    setError(null);
    try {
      return await asaasService.obterInfoPagamento(id);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarRecebimentos();
  }, [filtros]);

  return {
    recebimentos,
    loading,
    error,
    filtros,
    setFiltros,
    obterRecebimento,
    obterInfoPagamento,
    carregarRecebimentos,
  };
};
