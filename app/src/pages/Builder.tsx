import React, { useState, useEffect } from 'react';
import {
  ServiceType,
  BISource,
  HostingPlan,
  AgentPlan,
  quotesApi,
  prospectsApi,
  Prospect,
  CreateQuoteDTO,
} from '../lib/api';
import { useSettings } from '../lib/useSettings';
import '../styles/builder.css';

const Builder: React.FC = () => {
  const { settings } = useSettings();
  const [loading, setLoading] = useState(false);
  const [prospects, setProspects] = useState<Prospect[]>([]);

  // Client info
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  // Service selection
  const [serviceType, setServiceType] = useState<ServiceType>('WEB');
  const [includeWeb, setIncludeWeb] = useState(true);
  const [menuCount, setMenuCount] = useState(6);
  const [includeAsaas, setIncludeAsaas] = useState(false);

  // Mini Site
  const [includeMiniSite, setIncludeMiniSite] = useState(false);
  const [pageCount, setPageCount] = useState(3);
  const [includeInstagram, setIncludeInstagram] = useState(false);
  const [includeWppButton, setIncludeWppButton] = useState(false);

  // BI
  const [sources, setSources] = useState<Set<BISource>>(new Set(['excel']));
  const [complexity, setComplexity] = useState<'standard' | 'advanced'>('standard');

  // AI Agent
  const [agentPlan, setAgentPlan] = useState<AgentPlan>('starter');
  const [agentCount, setAgentCount] = useState(1);
  const [includeRAG, setIncludeRAG] = useState(false);
  const [includeVoice, setIncludeVoice] = useState(false);

  // Modules
  const [n8n, setN8n] = useState(false);
  const [wpp, setWpp] = useState(false);
  const [agileSetup, setAgileSetup] = useState(false);
  const [mentoringHours, setMentoringHours] = useState(0);
  const [hostings, setHostings] = useState<Set<HostingPlan>>(new Set());

  // Installments
  const [installments, setInstallments] = useState(12);

  useEffect(() => {
    prospectsApi
      .list()
      .then((res) => setProspects(Array.isArray(res.data) ? res.data : []))
      .catch(() => {});
  }, []);

  const fmt = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const BI_PRICES: Record<BISource, number> = {
    excel: settings.biExcel,
    api: settings.biApi,
    database: settings.biDatabase,
  };

  const HOSTING_PRICES: Record<string, number> = {
    single: settings.hostingSingle,
    premium: settings.hostingPremium,
    business: settings.hostingBusiness,
    'vps-starter': settings.hostingVpsStarter,
    'vps-pro': settings.hostingVpsPro,
    'vps-ultra': settings.hostingVpsUltra,
  };

  const preview = (() => {
    let base = 0;

    if (includeWeb) {
      base += settings.webBase;
      if (menuCount > settings.webFreeMenus) {
        base += (menuCount - settings.webFreeMenus) * settings.webExtraMenuPrice;
      }
      if (includeAsaas) base += settings.webAsaasIntegration;
    }

    if (includeMiniSite) {
      base += settings.miniSiteBase;
      if (pageCount > settings.miniSiteFreePages) {
        base += (pageCount - settings.miniSiteFreePages) * settings.miniSiteExtraPagePrice;
      }
      if (includeInstagram) base += settings.miniSiteInstagram;
      if (includeWppButton) base += settings.miniSiteWhatsapp;
    }

    if (serviceType === 'BI') {
      base = Array.from(sources).reduce((sum, s) => sum + BI_PRICES[s], 0);
      if (complexity === 'advanced') base *= settings.biAdvancedMultiplier;
    }

    if (serviceType === 'AI_AGENT') {
      const agentSetup =
        agentPlan === 'free'
          ? settings.agentFreeSetup
          : agentPlan === 'starter'
          ? settings.agentStarterSetup
          : agentPlan === 'pro'
          ? settings.agentProSetup
          : settings.agentEnterpriseSetup;
      base = agentSetup + (agentCount - 1) * settings.agentExtraAgentPrice;
      if (includeRAG) base += settings.agentRAG;
      if (includeVoice) base += settings.agentVoice;
    }

    let setup = base;
    if (n8n) setup += settings.moduleN8n;
    if (wpp) setup += settings.moduleWhatsapp;
    if (agileSetup) setup += settings.moduleAgileSetup;
    if (mentoringHours > 0) setup += mentoringHours * settings.moduleMentoringHour;

    const hostingMonthly = Array.from(hostings).reduce(
      (sum, h) => sum + (HOSTING_PRICES[h] ?? 0),
      0
    );

    const agentMonthly =
      serviceType === 'AI_AGENT'
        ? agentPlan === 'free'
          ? settings.agentFreeMonthly
          : agentPlan === 'starter'
          ? settings.agentStarterMonthly
          : agentPlan === 'pro'
          ? settings.agentProMonthly
          : settings.agentEnterpriseMonthly
        : 0;

    const monthly = setup * settings.monthlySupportRate + hostingMonthly + agentMonthly;

    return { setup: parseFloat(setup.toFixed(2)), monthly: parseFloat(monthly.toFixed(2)) };
  })();

  const mdrRate = (n: number) => {
    if (n === 1) return settings.installmentMdr1x / 100;
    if (n <= 6) return settings.installmentMdr2_6x / 100;
    if (n <= 12) return settings.installmentMdr7_12x / 100;
    return settings.installmentMdr13x / 100;
  };

  const calcCobranca = (valorDesejado: number, n: number) => {
    const mdr = mdrRate(n);
    return parseFloat(((valorDesejado + settings.installmentTaxaFixa) / (1 - mdr)).toFixed(2));
  };

  const calcInstallment = (valorDesejado: number, n: number) => {
    const bruto = calcCobranca(valorDesejado, n);
    return parseFloat((bruto / n).toFixed(2));
  };

  const commissionValue = parseFloat((preview.setup * (settings.commissionRate / 100)).toFixed(2));
  const setupComCliente = parseFloat((preview.setup + commissionValue).toFixed(2));

  const submit = async () => {
    if (!clientName.trim()) {
      alert('Informe o nome do cliente');
      return;
    }

    setLoading(true);
    try {
      const dto: CreateQuoteDTO = {
        clientName,
        clientEmail: clientEmail || undefined,
        clientPhone: clientPhone || undefined,
        pricing: {
          serviceType,
          menuCount: includeWeb ? menuCount : undefined,
          includeAsaasIntegration: includeAsaas,
          pageCount: includeMiniSite ? pageCount : undefined,
          includeInstagram,
          includeWhatsappButton: includeWppButton,
          sources: serviceType === 'BI' ? Array.from(sources) : undefined,
          complexity: serviceType === 'BI' ? complexity : undefined,
          plan: serviceType === 'AI_AGENT' ? agentPlan : undefined,
          agentCount: serviceType === 'AI_AGENT' ? agentCount : undefined,
          includeRAG,
          includeVoice,
        },
        installments,
        interest_rate: mdrRate(installments),
        installment_value: calcInstallment(setupComCliente, installments),
      };

      await quotesApi.create(dto);
      alert('Orçamento criado com sucesso!');
      window.location.href = '/app/dashboard';
    } catch (error) {
      alert('Erro ao criar orçamento');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="builder">
      <div className="builder-header">
        <h1>Novo Orçamento</h1>
        <p>Configure o escopo do projeto</p>
      </div>

      <div className="builder-preview">
        <div className="preview-item">
          <span className="preview-label">Setup</span>
          <span className="preview-value">{fmt(preview.setup)}</span>
        </div>
        <div className="preview-item">
          <span className="preview-label">Cobrar</span>
          <span className="preview-value highlight">
            {installments}x {fmt(calcInstallment(setupComCliente, installments))}
          </span>
        </div>
      </div>

      <div className="builder-section">
        <h2>Cliente</h2>
        {prospects.length > 0 && (
          <div className="form-group">
            <label>Selecionar Prospect</label>
            <select
              onChange={(e) => {
                const p = prospects.find((x) => x.id === e.target.value);
                if (p) {
                  setClientName(p.name);
                  setClientEmail(p.email || '');
                  setClientPhone(p.phone || '');
                }
              }}
            >
              <option value="">— selecione um prospect —</option>
              {prospects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="form-row">
          <div className="form-group">
            <label>Nome *</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Empresa XYZ"
            />
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="contato@empresa.com"
            />
          </div>
          <div className="form-group">
            <label>Telefone</label>
            <input
              type="tel"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              placeholder="(00) 9 0000-0000"
            />
          </div>
        </div>
      </div>

      <div className="builder-section">
        <h2>Tipo de Serviço</h2>
        <div className="service-grid">
          <label className="service-card">
            <input
              type="checkbox"
              checked={includeWeb}
              onChange={(e) => setIncludeWeb(e.target.checked)}
            />
            <span className="service-name">Site Web</span>
            <span className="service-desc">Sites e plataformas web</span>
          </label>
          <label className="service-card">
            <input
              type="checkbox"
              checked={includeMiniSite}
              onChange={(e) => setIncludeMiniSite(e.target.checked)}
            />
            <span className="service-name">Mini Site</span>
            <span className="service-desc">Site + Instagram integrado</span>
          </label>
          <label className="service-card">
            <input
              type="radio"
              name="service"
              checked={serviceType === 'BI'}
              onChange={() => setServiceType('BI')}
            />
            <span className="service-name">Business Intelligence</span>
            <span className="service-desc">Dashboards e análise de dados</span>
          </label>
          <label className="service-card">
            <input
              type="radio"
              name="service"
              checked={serviceType === 'AI_AGENT'}
              onChange={() => setServiceType('AI_AGENT')}
            />
            <span className="service-name">AI Agent</span>
            <span className="service-desc">Agentes com IA</span>
          </label>
        </div>
      </div>

      {includeWeb && (
        <div className="builder-section">
          <h2>Site Web</h2>
          <div className="form-group">
            <label>Menus/Seções: {menuCount}</label>
            <input
              type="range"
              min="1"
              max="20"
              value={menuCount}
              onChange={(e) => setMenuCount(Number(e.target.value))}
            />
          </div>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={includeAsaas}
              onChange={(e) => setIncludeAsaas(e.target.checked)}
            />
            Integração Asaas (+{fmt(settings.webAsaasIntegration)})
          </label>
        </div>
      )}

      {includeMiniSite && (
        <div className="builder-section">
          <h2>Mini Site</h2>
          <div className="form-group">
            <label>Páginas: {pageCount}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={pageCount}
              onChange={(e) => setPageCount(Number(e.target.value))}
            />
          </div>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={includeInstagram}
              onChange={(e) => setIncludeInstagram(e.target.checked)}
            />
            Integração Instagram (+{fmt(settings.miniSiteInstagram)})
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={includeWppButton}
              onChange={(e) => setIncludeWppButton(e.target.checked)}
            />
            Botão WhatsApp (+{fmt(settings.miniSiteWhatsapp)})
          </label>
        </div>
      )}

      {serviceType === 'BI' && (
        <div className="builder-section">
          <h2>Business Intelligence</h2>
          <div className="form-group">
            <label>Fontes de Dados</label>
            <div className="checkbox-group">
              {(['excel', 'api', 'database'] as BISource[]).map((source) => (
                <label key={source} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={sources.has(source)}
                    onChange={(e) => {
                      const newSources = new Set(sources);
                      if (e.target.checked) {
                        newSources.add(source);
                      } else if (newSources.size > 1) {
                        newSources.delete(source);
                      }
                      setSources(newSources);
                    }}
                  />
                  {source.toUpperCase()} (+{fmt(BI_PRICES[source])})
                </label>
              ))}
            </div>
          </div>
          <label className="checkbox-label">
            <input
              type="radio"
              name="complexity"
              checked={complexity === 'standard'}
              onChange={() => setComplexity('standard')}
            />
            Standard
          </label>
          <label className="checkbox-label">
            <input
              type="radio"
              name="complexity"
              checked={complexity === 'advanced'}
              onChange={() => setComplexity('advanced')}
            />
            Advanced (×1.3)
          </label>
        </div>
      )}

      {serviceType === 'AI_AGENT' && (
        <div className="builder-section">
          <h2>AI Agent</h2>
          <div className="form-group">
            <label>Plano</label>
            <select value={agentPlan} onChange={(e) => setAgentPlan(e.target.value as AgentPlan)}>
              <option value="free">Free</option>
              <option value="starter">Starter</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
          <div className="form-group">
            <label>Agentes: {agentCount}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={agentCount}
              onChange={(e) => setAgentCount(Number(e.target.value))}
            />
          </div>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={includeRAG}
              onChange={(e) => setIncludeRAG(e.target.checked)}
            />
            Base de Conhecimento (RAG) (+{fmt(settings.agentRAG)})
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={includeVoice}
              onChange={(e) => setIncludeVoice(e.target.checked)}
            />
            Canal de Voz (+{fmt(settings.agentVoice)})
          </label>
        </div>
      )}

      <div className="builder-section">
        <h2>Módulos Adicionais</h2>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={n8n}
            onChange={(e) => setN8n(e.target.checked)}
          />
          n8n Automation (+{fmt(settings.moduleN8n)})
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={wpp}
            onChange={(e) => setWpp(e.target.checked)}
          />
          WhatsApp Gateway (+{fmt(settings.moduleWhatsapp)})
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={agileSetup}
            onChange={(e) => setAgileSetup(e.target.checked)}
          />
          Agile Setup (+{fmt(settings.moduleAgileSetup)})
        </label>
        <div className="form-group">
          <label>Horas de Mentoria: {mentoringHours}h</label>
          <input
            type="range"
            min="0"
            max="40"
            value={mentoringHours}
            onChange={(e) => setMentoringHours(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="builder-section">
        <h2>Hospedagem</h2>
        <div className="checkbox-group">
          {(['single', 'premium', 'business', 'vps-starter', 'vps-pro', 'vps-ultra'] as HostingPlan[]).map((plan) => (
            <label key={plan} className="checkbox-label">
              <input
                type="checkbox"
                checked={hostings.has(plan)}
                onChange={(e) => {
                  const newHostings = new Set(hostings);
                  if (e.target.checked) {
                    newHostings.add(plan);
                  } else {
                    newHostings.delete(plan);
                  }
                  setHostings(newHostings);
                }}
              />
              {plan} (+{fmt(HOSTING_PRICES[plan])}/mês)
            </label>
          ))}
        </div>
      </div>

      <div className="builder-section">
        <h2>Parcelamento</h2>
        <div className="form-group">
          <label>Parcelas: {installments}x</label>
          <input
            type="range"
            min="1"
            max={settings.installmentLimit}
            value={installments}
            onChange={(e) => setInstallments(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="builder-actions">
        <button onClick={submit} disabled={loading} className="btn-primary">
          {loading ? 'Salvando...' : '⚡ Gerar Orçamento'}
        </button>
      </div>
    </div>
  );
};

export default Builder;
