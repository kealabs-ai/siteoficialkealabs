import { useState, useEffect } from 'react';
import asaasService from '../services/asaasService';

export const useCobrancas = () => {
  const [cobrancas, setCobrancas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({ status: '', limit: 50, offset: 0 });

  const carregarCobrancas = async () => {
    setLoading(true);
    setError(null);
    try {
      const dados = await asaasService.listarCobrancas(filtros);
      setCobrancas(dados.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const criarCobranca = async (dados) => {
    setLoading(true);
    setError(null);
    try {
      const novaCobranca = await asaasService.criarCobranca(dados);
      setCobrancas([novaCobranca, ...cobrancas]);
      return novaCobranca;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const atualizarCobranca = async (id, dados) => {
    setLoading(true);
    setError(null);
    try {
      const cobrancaAtualizada = await asaasService.atualizarCobranca(id, dados);
      setCobrancas(cobrancas.map(c => c.id === id ? cobrancaAtualizada : c));
      return cobrancaAtualizada;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletarCobranca = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await asaasService.deletarCobranca(id);
      setCobrancas(cobrancas.filter(c => c.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCobrancas();
  }, [filtros]);

  return {
    cobrancas,
    loading,
    error,
    filtros,
    setFiltros,
    criarCobranca,
    atualizarCobranca,
    deletarCobranca,
    carregarCobrancas,
  };
};
