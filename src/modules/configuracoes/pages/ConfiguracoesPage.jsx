import React, { useState } from 'react';
import SettingsSection from '../components/SettingsSection';
import '../styles/configuracoes.css';

const ConfiguracoesPage = () => {
  const [settings, setSettings] = useState({
    companyName: 'Kealabs',
    email: 'contato@kealabs.com.br',
    phone: '(11) 99999-9999',
    notifications: true,
    darkMode: false,
    twoFactor: true
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log('Configurações salvas:', settings);
    alert('Configurações salvas com sucesso!');
  };

  return (
    <main className="configuracoes-page">
      <div className="container">
        <div className="page-header">
          <h1>Configurações</h1>
          <p>Gerenciar configurações do sistema</p>
        </div>

        <div className="settings-container">
          <SettingsSection
            title="Informações da Empresa"
            settings={[
              {
                label: 'Nome da Empresa',
                key: 'companyName',
                type: 'text',
                value: settings.companyName
              },
              {
                label: 'Email',
                key: 'email',
                type: 'email',
                value: settings.email
              },
              {
                label: 'Telefone',
                key: 'phone',
                type: 'tel',
                value: settings.phone
              }
            ]}
            onChange={handleChange}
          />

          <SettingsSection
            title="Preferências"
            settings={[
              {
                label: 'Notificações',
                key: 'notifications',
                type: 'checkbox',
                value: settings.notifications
              },
              {
                label: 'Modo Escuro',
                key: 'darkMode',
                type: 'checkbox',
                value: settings.darkMode
              },
              {
                label: 'Autenticação de Dois Fatores',
                key: 'twoFactor',
                type: 'checkbox',
                value: settings.twoFactor
              }
            ]}
            onChange={handleChange}
          />

          <div className="settings-actions">
            <button className="btn-primary" onClick={handleSave}>Salvar Configurações</button>
            <button className="btn-secondary">Cancelar</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ConfiguracoesPage;
