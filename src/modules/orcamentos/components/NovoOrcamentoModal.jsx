import React, { useState, useEffect } from 'react';
import { useSettings } from '../../../hooks/useSettings';
import api from '../../../services/api';
import PrecoPreview from './PrecoPreview';
import SecaoCliente from './SecaoCliente';
import SecaoTipoServico from './SecaoTipoServico';
import SecaoModulos from './SecaoModulos';
import '../styles/modal.css';

const NovoOrcamentoModal = ({ onClose, onSuccess }) => {
  const { settings } = useSettings();
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [formData, setFormData] = useState({
    prospectId: '',
    nome: '',
    email: '',
    cpfCnpj: '',
    telefone: '',
    parcelas: 1,
    servicos: {
      web: { ativo: false, menus: 1, asaas: false },
      miniSite: { ativo: false, paginas: 1, instagram: false, whatsapp: false },
      bi: { ativo: false, fontes: [], complexidade: 'standard' },
      aiAgent: { ativo: false, plano: 'free', agentes: 1, rag: false, voz: false }
    },
    modulos: {
      n8n: false,
      whatsapp: false,
      agileSetup: false,
      consultor: false,
      pandaVideos: false,
      bunnycdn: false,
      mentoringHoras: 0,
      hospedagem: []
    },
    pandaPlano: null,
    bunnyPlano: null
  });

  const calcularPreco = () => {
    let total = 0;
    const { servicos, modulos } = formData;

    // Serviços
    if (servicos.web.ativo) total += 2000 + (servicos.web.menus - 1) * 300;
    if (servicos.web.asaas) total += 500;
    
    if (servicos.miniSite.ativo) total += 1500 + (servicos.miniSite.paginas - 1) * 200;
    if (servicos.miniSite.instagram) total += 300;
    if (servicos.miniSite.whatsapp) total += 200;
    
    if (servicos.bi.ativo) {
      let biPrice = 3000;
      servicos.bi.fontes.forEach(fonte => {
        if (fonte === 'excel') biPrice += 500;
        if (fonte === 'api') biPrice += 800;
        if (fonte === 'database') biPrice += 1000;
      });
      if (servicos.bi.complexidade === 'advanced') biPrice *= 1.3;
      total += biPrice;
    }
    
    if (servicos.aiAgent.ativo) {
      const planos = { free: 0, starter: 500, pro: 1500, enterprise: 3000 };
      total += planos[servicos.aiAgent.plano];
      if (servicos.aiAgent.rag) total += 800;
      if (servicos.aiAgent.voz) total += 600;
    }

    // Módulos
    if (modulos.n8n) total += settings.moduleN8n || 500;
    if (modulos.whatsapp) total += settings.moduleWhatsapp || 300;
    if (modulos.agileSetup) total += settings.moduleAgileSetup || 1200;
    if (modulos.consultor) total += 1200;
    if (modulos.pandaVideos) total += 300;
    if (modulos.bunnycdn) total += 200;
    total += modulos.mentoringHoras * (settings.moduleMentoringHour || 150);

    // Hospedagem
    const hospedagemPrecos = {
      'compartilhada-single': 50,
      'compartilhada-premium': 100,
      'compartilhada-business': 200,
      'vps-starter': 150,
      'vps-pro': 300,
      'vps-ultra': 600
    };
    modulos.hospedagem.forEach(h => {
      total += hospedagemPrecos[h] || 0;
    });

    // Planos condicionais
    if (modulos.pandaVideos && formData.pandaPlano) {
      const pandaPrecos = { starter: 97, pro: 197, scale: 397 };
      total += pandaPrecos[formData.pandaPlano] || 0;
    }
    if (modulos.bunnycdn && formData.bunnyPlano) {
      const bunnyPrecos = { starter: 79, pro: 179 };
      total += bunnyPrecos[formData.bunnyPlano] || 0;
    }

    return total;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome) {
      alert('Nome do cliente é obrigatório');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        setupLiquido: calcularPreco(),
        mdrPercentage: settings.mdrPercentage,
        installmentLimit: settings.installmentLimit,
        commissionRate: settings.commissionRate
      };

      const { data } = await api.post('/quotes', payload);
      setResultado(data);
    } catch (err) {
      console.error('Erro ao criar orçamento:', err);
      alert('Erro ao criar orçamento');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await api.post('/quotes/pdf', {
        ...formData,
        setupLiquido: calcularPreco()
      }, { responseType: 'blob' });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `orcamento-${formData.nome}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error('Erro ao baixar PDF:', err);
    }
  };

  if (resultado) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content resultado" onClick={e => e.stopPropagation()}>
          <h2>Orçamento Gerado com Sucesso!</h2>
          <div className="resultado-info">
            <div className="info-item">
              <span>Setup Líquido:</span>
              <strong>R$ {resultado.setupLiquido?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
            </div>
            <div className="info-item">
              <span>Cobrar do Cliente:</span>
              <strong>
                {formData.parcelas}× R$ {(resultado.totalCobrado / formData.parcelas).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </strong>
            </div>
          </div>
          <div className="resultado-buttons">
            <button className="btn-secondary" onClick={handleDownloadPDF}>
              📄 Baixar PDF
            </button>
            <button className="btn-primary" onClick={() => window.location.href = '/'}>
              Ver Dashboard →
            </button>
          </div>
          <button className="btn-close" onClick={onClose}>Fechar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Novo Orçamento</h2>
          <button className="btn-close-icon" onClick={onClose}>✕</button>
        </div>

        <PrecoPreview 
          preco={calcularPreco()} 
          parcelas={formData.parcelas}
          mdrPercentage={settings.mdrPercentage}
          commissionRate={settings.commissionRate}
        />

        <form onSubmit={handleSubmit} className="modal-form">
          <SecaoCliente formData={formData} setFormData={setFormData} />
          <SecaoTipoServico formData={formData} setFormData={setFormData} />
          <SecaoModulos formData={formData} setFormData={setFormData} settings={settings} />

          <div className="form-group">
            <label>Parcelas</label>
            <input
              type="range"
              min="1"
              max={settings.installmentLimit || 12}
              value={formData.parcelas}
              onChange={(e) => setFormData({ ...formData, parcelas: parseInt(e.target.value) })}
            />
            <span>{formData.parcelas}×</span>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Gerando...' : '⚡ Gerar Orçamento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovoOrcamentoModal;
