import React from 'react';

const SecaoModulos = ({ formData, setFormData, settings }) => {
  const updateModulo = (campo, valor) => {
    setFormData({
      ...formData,
      modulos: {
        ...formData.modulos,
        [campo]: valor
      }
    });
  };

  const hospedagemOpcoes = [
    { id: 'compartilhada-single', label: 'Compartilhada Single', preco: 50 },
    { id: 'compartilhada-premium', label: 'Compartilhada Premium', preco: 100 },
    { id: 'compartilhada-business', label: 'Compartilhada Business', preco: 200 },
    { id: 'vps-starter', label: 'VPS Starter', preco: 150 },
    { id: 'vps-pro', label: 'VPS Pro', preco: 300 },
    { id: 'vps-ultra', label: 'VPS Ultra', preco: 600 }
  ];

  return (
    <fieldset className="form-section">
      <legend>Módulos Adicionais</legend>

      <div className="modulos-grid">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.modulos.n8n}
            onChange={(e) => updateModulo('n8n', e.target.checked)}
          />
          <span>n8n Automation (R$ {settings.moduleN8n || 500})</span>
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.modulos.whatsapp}
            onChange={(e) => updateModulo('whatsapp', e.target.checked)}
          />
          <span>WhatsApp Gateway (R$ {settings.moduleWhatsapp || 300})</span>
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.modulos.agileSetup}
            onChange={(e) => updateModulo('agileSetup', e.target.checked)}
          />
          <span>Agile Setup (R$ {settings.moduleAgileSetup || 1200})</span>
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.modulos.consultor}
            onChange={(e) => updateModulo('consultor', e.target.checked)}
          />
          <span>Consultor / Área do Aluno (R$ 1.200)</span>
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.modulos.pandaVideos}
            onChange={(e) => updateModulo('pandaVideos', e.target.checked)}
          />
          <span>Panda Videos (R$ 300)</span>
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.modulos.bunnycdn}
            onChange={(e) => updateModulo('bunnycdn', e.target.checked)}
          />
          <span>Bunny.net CDN (R$ 200)</span>
        </label>
      </div>

      <div className="form-group">
        <label>Horas de Mentoria Ágil ({formData.modulos.mentoringHoras}h)</label>
        <input
          type="range"
          min="0"
          max="40"
          value={formData.modulos.mentoringHoras}
          onChange={(e) => updateModulo('mentoringHoras', parseInt(e.target.value))}
        />
        <small>R$ {settings.moduleMentoringHour || 150}/hora</small>
      </div>

      <div className="form-group">
        <label>Hospedagem</label>
        <div className="hospedagem-grid">
          {hospedagemOpcoes.map(opcao => (
            <label key={opcao.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.modulos.hospedagem.includes(opcao.id)}
                onChange={(e) => {
                  const hospedagem = e.target.checked
                    ? [...formData.modulos.hospedagem, opcao.id]
                    : formData.modulos.hospedagem.filter(h => h !== opcao.id);
                  updateModulo('hospedagem', hospedagem);
                }}
              />
              <span>{opcao.label} (R$ {opcao.preco})</span>
            </label>
          ))}
        </div>
      </div>

      {formData.modulos.pandaVideos && (
        <div className="form-group">
          <label>Plano Panda Videos</label>
          <div className="planos-grid">
            {[
              { id: 'starter', label: 'Starter', preco: 97 },
              { id: 'pro', label: 'Pro', preco: 197 },
              { id: 'scale', label: 'Scale', preco: 397 }
            ].map(plano => (
              <label key={plano.id} className="radio-label">
                <input
                  type="radio"
                  name="pandaPlano"
                  value={plano.id}
                  checked={formData.pandaPlano === plano.id}
                  onChange={(e) => setFormData({ ...formData, pandaPlano: e.target.value })}
                />
                <span>{plano.label} (R$ {plano.preco})</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {formData.modulos.bunnycdn && (
        <div className="form-group">
          <label>Plano Bunny.net CDN</label>
          <div className="planos-grid">
            {[
              { id: 'paygo', label: 'Pay-as-you-go', preco: 0 },
              { id: 'starter', label: 'Starter', preco: 79 },
              { id: 'pro', label: 'Pro', preco: 179 }
            ].map(plano => (
              <label key={plano.id} className="radio-label">
                <input
                  type="radio"
                  name="bunnyPlano"
                  value={plano.id}
                  checked={formData.bunnyPlano === plano.id}
                  onChange={(e) => setFormData({ ...formData, bunnyPlano: e.target.value })}
                />
                <span>{plano.label} {plano.preco > 0 ? `(R$ ${plano.preco})` : ''}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </fieldset>
  );
};

export default SecaoModulos;
