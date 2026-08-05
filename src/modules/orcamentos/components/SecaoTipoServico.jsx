import React from 'react';

const SecaoTipoServico = ({ formData, setFormData }) => {
  const updateServico = (tipo, campo, valor) => {
    setFormData({
      ...formData,
      servicos: {
        ...formData.servicos,
        [tipo]: {
          ...formData.servicos[tipo],
          [campo]: valor
        }
      }
    });
  };

  return (
    <fieldset className="form-section">
      <legend>Tipo de Serviço</legend>

      {/* WEB */}
      <div className="servico-card">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.servicos.web.ativo}
            onChange={(e) => updateServico('web', 'ativo', e.target.checked)}
          />
          <span>Web</span>
        </label>
        {formData.servicos.web.ativo && (
          <div className="servico-options">
            <div className="form-group">
              <label>Menus/Seções ({formData.servicos.web.menus})</label>
              <input
                type="range"
                min="1"
                max="20"
                value={formData.servicos.web.menus}
                onChange={(e) => updateServico('web', 'menus', parseInt(e.target.value))}
              />
              <small>+R$ 300 por menu extra</small>
            </div>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.servicos.web.asaas}
                onChange={(e) => updateServico('web', 'asaas', e.target.checked)}
              />
              <span>Integração Asaas (+R$ 500)</span>
            </label>
          </div>
        )}
      </div>

      {/* MINI SITE */}
      <div className="servico-card">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.servicos.miniSite.ativo}
            onChange={(e) => updateServico('miniSite', 'ativo', e.target.checked)}
          />
          <span>Mini Site</span>
        </label>
        {formData.servicos.miniSite.ativo && (
          <div className="servico-options">
            <div className="form-group">
              <label>Páginas ({formData.servicos.miniSite.paginas})</label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.servicos.miniSite.paginas}
                onChange={(e) => updateServico('miniSite', 'paginas', parseInt(e.target.value))}
              />
              <small>+R$ 200 por página extra</small>
            </div>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.servicos.miniSite.instagram}
                onChange={(e) => updateServico('miniSite', 'instagram', e.target.checked)}
              />
              <span>Integração Instagram (+R$ 300)</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.servicos.miniSite.whatsapp}
                onChange={(e) => updateServico('miniSite', 'whatsapp', e.target.checked)}
              />
              <span>Botão WhatsApp (+R$ 200)</span>
            </label>
          </div>
        )}
      </div>

      {/* BI */}
      <div className="servico-card">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.servicos.bi.ativo}
            onChange={(e) => updateServico('bi', 'ativo', e.target.checked)}
          />
          <span>Business Intelligence</span>
        </label>
        {formData.servicos.bi.ativo && (
          <div className="servico-options">
            <div className="form-group">
              <label>Fontes de Dados</label>
              {['excel', 'api', 'database'].map(fonte => (
                <label key={fonte} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.servicos.bi.fontes.includes(fonte)}
                    onChange={(e) => {
                      const fontes = e.target.checked
                        ? [...formData.servicos.bi.fontes, fonte]
                        : formData.servicos.bi.fontes.filter(f => f !== fonte);
                      updateServico('bi', 'fontes', fontes);
                    }}
                  />
                  <span>{fonte.toUpperCase()} {fonte === 'excel' ? '(+R$ 500)' : fonte === 'api' ? '(+R$ 800)' : '(+R$ 1000)'}</span>
                </label>
              ))}
            </div>
            <div className="form-group">
              <label>Complexidade</label>
              <select
                value={formData.servicos.bi.complexidade}
                onChange={(e) => updateServico('bi', 'complexidade', e.target.value)}
              >
                <option value="standard">Standard</option>
                <option value="advanced">Advanced (×1.3)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* AI AGENT */}
      <div className="servico-card">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.servicos.aiAgent.ativo}
            onChange={(e) => updateServico('aiAgent', 'ativo', e.target.checked)}
          />
          <span>AI Agent</span>
        </label>
        {formData.servicos.aiAgent.ativo && (
          <div className="servico-options">
            <div className="form-group">
              <label>Plano</label>
              <div className="planos-grid">
                {['free', 'starter', 'pro', 'enterprise'].map(plano => (
                  <label key={plano} className="radio-label">
                    <input
                      type="radio"
                      name="aiPlano"
                      value={plano}
                      checked={formData.servicos.aiAgent.plano === plano}
                      onChange={(e) => updateServico('aiAgent', 'plano', e.target.value)}
                    />
                    <span>{plano.charAt(0).toUpperCase() + plano.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Agentes ({formData.servicos.aiAgent.agentes})</label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.servicos.aiAgent.agentes}
                onChange={(e) => updateServico('aiAgent', 'agentes', parseInt(e.target.value))}
              />
            </div>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.servicos.aiAgent.rag}
                onChange={(e) => updateServico('aiAgent', 'rag', e.target.checked)}
              />
              <span>Base de Conhecimento (RAG) (+R$ 800)</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.servicos.aiAgent.voz}
                onChange={(e) => updateServico('aiAgent', 'voz', e.target.checked)}
              />
              <span>Canal de Voz (+R$ 600)</span>
            </label>
          </div>
        )}
      </div>
    </fieldset>
  );
};

export default SecaoTipoServico;
