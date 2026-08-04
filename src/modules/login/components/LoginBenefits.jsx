import React from 'react';

const LoginBenefits = () => {
  const benefits = [
    {
      icon: '📊',
      title: 'Dashboard Inteligente',
      description: 'Visualize todos os seus dados em tempo real com gráficos e relatórios'
    },
    {
      icon: '👥',
      title: 'Gerenciamento de Usuários',
      description: 'Controle total sobre permissões e acesso de sua equipe'
    },
    {
      icon: '📈',
      title: 'Relatórios Avançados',
      description: 'Gere relatórios personalizados e exporte em múltiplos formatos'
    },
    {
      icon: '⚙️',
      title: 'Configurações Flexíveis',
      description: 'Customize a plataforma de acordo com suas necessidades'
    }
  ];

  return (
    <div className="login-benefits">
      <div className="benefits-header">
        <h1 className="benefits-title">Kealabs</h1>
        <p className="benefits-subtitle">Plataforma de Gestão Inteligente</p>
      </div>

      <div className="benefits-content">
        <p className="benefits-intro">
          Acesse sua área de cliente e gerencie seus projetos com eficiência
        </p>

        <div className="benefits-list">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-item">
              <div className="benefit-icon">{benefit.icon}</div>
              <div className="benefit-text">
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="benefits-footer">
        <p>Segurança de nível empresarial com criptografia end-to-end</p>
        <div className="security-badges">
          <span className="badge">🔒 SSL</span>
          <span className="badge">✓ GDPR</span>
          <span className="badge">🛡️ Seguro</span>
        </div>
      </div>
    </div>
  );
};

export default LoginBenefits;
