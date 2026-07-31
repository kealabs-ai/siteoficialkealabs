import { useState, useEffect } from 'react';
import { settingsApi, SystemSetting } from './api';

interface Settings {
  webBase: number;
  webFreeMenus: number;
  webExtraMenuPrice: number;
  webAsaasIntegration: number;
  miniSiteBase: number;
  miniSiteFreePages: number;
  miniSiteExtraPagePrice: number;
  miniSiteInstagram: number;
  miniSiteWhatsapp: number;
  biExcel: number;
  biApi: number;
  biDatabase: number;
  biAdvancedMultiplier: number;
  agentFreeSetup: number;
  agentFreeMonthly: number;
  agentStarterSetup: number;
  agentStarterMonthly: number;
  agentProSetup: number;
  agentProMonthly: number;
  agentEnterpriseSetup: number;
  agentEnterpriseMonthly: number;
  agentExtraAgentPrice: number;
  agentRAG: number;
  agentVoice: number;
  moduleN8n: number;
  moduleWhatsapp: number;
  moduleAgileSetup: number;
  moduleMentoringHour: number;
  hostingSingle: number;
  hostingPremium: number;
  hostingBusiness: number;
  hostingVpsStarter: number;
  hostingVpsPro: number;
  hostingVpsUltra: number;
  monthlySupportRate: number;
  commissionRate: number;
  installmentTaxaFixa: number;
  installmentAntecipacaoMensal: number;
  installmentCicloDias: number;
  installmentMdr1x: number;
  installmentMdr2_6x: number;
  installmentMdr7_12x: number;
  installmentMdr13x: number;
  installmentLimit: number;
}

const DEFAULT_SETTINGS: Settings = {
  webBase: 2500,
  webFreeMenus: 6,
  webExtraMenuPrice: 300,
  webAsaasIntegration: 500,
  miniSiteBase: 1500,
  miniSiteFreePages: 3,
  miniSiteExtraPagePrice: 200,
  miniSiteInstagram: 300,
  miniSiteWhatsapp: 150,
  biExcel: 1500,
  biApi: 2500,
  biDatabase: 3500,
  biAdvancedMultiplier: 1.3,
  agentFreeSetup: 0,
  agentFreeMonthly: 0,
  agentStarterSetup: 500,
  agentStarterMonthly: 200,
  agentProSetup: 1500,
  agentProMonthly: 500,
  agentEnterpriseSetup: 5000,
  agentEnterpriseMonthly: 2000,
  agentExtraAgentPrice: 400,
  agentRAG: 800,
  agentVoice: 600,
  moduleN8n: 1000,
  moduleWhatsapp: 800,
  moduleAgileSetup: 1200,
  moduleMentoringHour: 200,
  hostingSingle: 50,
  hostingPremium: 100,
  hostingBusiness: 150,
  hostingVpsStarter: 200,
  hostingVpsPro: 400,
  hostingVpsUltra: 800,
  monthlySupportRate: 0.1,
  commissionRate: 10,
  installmentTaxaFixa: 0.99,
  installmentAntecipacaoMensal: 2.99,
  installmentCicloDias: 30,
  installmentMdr1x: 2.99,
  installmentMdr2_6x: 3.99,
  installmentMdr7_12x: 4.99,
  installmentMdr13x: 5.99,
  installmentLimit: 12,
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    settingsApi
      .list()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        const merged = { ...DEFAULT_SETTINGS };
        data.forEach((s: SystemSetting) => {
          const key = s.setting_key as keyof Settings;
          const value = parseFloat(s.setting_value);
          if (!isNaN(value)) {
            merged[key] = value;
          }
        });
        setSettings(merged);
      })
      .catch(() => setSettings(DEFAULT_SETTINGS))
      .finally(() => setLoading(false));
  }, []);

  return { settings, loading };
}
