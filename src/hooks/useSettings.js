import { useState, useEffect } from 'react';
import { authenticatedFetch } from '../services/authService';

export const useSettings = () => {
  const [settings, setSettings] = useState({
    mdrPercentage: 0.029,
    installmentLimit: 12,
    commissionRate: 0.1,
    moduleN8n: 500,
    moduleWhatsapp: 300,
    moduleAgileSetup: 1200,
    moduleMentoringHour: 150,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await authenticatedFetch('/settings');
        setSettings(data || settings);
      } catch (err) {
        if (err.response?.status === 404) {
          console.log('Endpoint /settings não disponível, usando valores padrão');
        } else {
          console.error('Erro ao buscar settings:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error, agent };
};

export default useSettings;
