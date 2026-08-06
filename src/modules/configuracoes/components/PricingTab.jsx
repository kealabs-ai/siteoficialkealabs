import React from 'react';

const PricingTab = ({ settings, onUpdateSetting }) => {
  const handleChange = (key, value) => {
    onUpdateSetting(key, isNaN(value) ? value : parseFloat(value));
  };

  const InputField = ({ label, value, onChange, suffix = '' }) => (
    <div className="form-group">
      <label>{label}</label>
      <div className="input-wrapper">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          step="0.01"
        />
        {suffix && <span className="input-suffix">{suffix}</span>}
      </div>
    </div>
  );

  return (
    <div className="pricing-tab">
      {/* Site Web */}
      <section className="pricing-section">
        <h3>🌐 Site Web</h3>
        <div className="form-grid">
          <InputField
            label="Setup Base"
            value={settings.web_base_setup}
            onChange={(v) => handleChange('web_base_setup', v)}
            suffix="R$"
          />
          <InputField
            label="Menus Incluídos"
            value={settings.web_menus_included}
            onChange={(v) => handleChange('web_menus_included', v)}
          />
          <InputField
            label="Preço por Menu Extra"
            value={settings.web_menu_extra_price}
            onChange={(v) => handleChange('web_menu_extra_price', v)}
            suffix="R$"
          />
          <InputField
            label="Integração Asaas"
            value={settings.web_asaas_integration}
            onChange={(v) => handleChange('web_asaas_integration', v)}
            suffix="R$"
          />
        </div>
      </section>

      {/* Mini Site */}
      <section className="pricing-section">
        <h3>📱 Mini Site</h3>
        <div className="form-grid">
          <InputField
            label="Setup Base"
            value={settings.minisite_base_setup}
            onChange={(v) => handleChange('minisite_base_setup', v)}
            suffix="R$"
          />
          <InputField
            label="Páginas Incluídas"
            value={settings.minisite_pages_included}
            onChange={(v) => handleChange('minisite_pages_included', v)}
          />
          <InputField
            label="Preço por Página Extra"
            value={settings.minisite_page_extra_price}
            onChange={(v) => handleChange('minisite_page_extra_price', v)}
            suffix="R$"
          />
          <InputField
            label="Integração Instagram"
            value={settings.minisite_instagram}
            onChange={(v) => handleChange('minisite_instagram', v)}
            suffix="R$"
          />
          <InputField
            label="Botão WhatsApp"
            value={settings.minisite_whatsapp}
            onChange={(v) => handleChange('minisite_whatsapp', v)}
            suffix="R$"
          />
        </div>
      </section>

      {/* Business Intelligence */}
      <section className="pricing-section">
        <h3>📊 Business Intelligence</h3>
        <div className="form-grid">
          <InputField
            label="Fonte Excel"
            value={settings.bi_excel_source}
            onChange={(v) => handleChange('bi_excel_source', v)}
            suffix="R$"
          />
          <InputField
            label="Fonte API"
            value={settings.bi_api_source}
            onChange={(v) => handleChange('bi_api_source', v)}
            suffix="R$"
          />
          <InputField
            label="Fonte Database"
            value={settings.bi_database_source}
            onChange={(v) => handleChange('bi_database_source', v)}
            suffix="R$"
          />
          <InputField
            label="Multiplicador Advanced"
            value={settings.bi_advanced_multiplier}
            onChange={(v) => handleChange('bi_advanced_multiplier', v)}
            suffix="x"
          />
        </div>
      </section>

      {/* AI Agent */}
      <section className="pricing-section">
        <h3>🤖 AI Agent - Planos</h3>
        <div className="form-grid">
          <InputField
            label="Free - Setup"
            value={settings.ai_free_setup}
            onChange={(v) => handleChange('ai_free_setup', v)}
            suffix="R$"
          />
          <InputField
            label="Free - Mensalidade"
            value={settings.ai_free_monthly}
            onChange={(v) => handleChange('ai_free_monthly', v)}
            suffix="R$/mês"
          />
          <InputField
            label="Starter - Setup"
            value={settings.ai_starter_setup}
            onChange={(v) => handleChange('ai_starter_setup', v)}
            suffix="R$"
          />
          <InputField
            label="Starter - Mensalidade"
            value={settings.ai_starter_monthly}
            onChange={(v) => handleChange('ai_starter_monthly', v)}
            suffix="R$/mês"
          />
          <InputField
            label="Pro - Setup"
            value={settings.ai_pro_setup}
            onChange={(v) => handleChange('ai_pro_setup', v)}
            suffix="R$"
          />
          <InputField
            label="Pro - Mensalidade"
            value={settings.ai_pro_monthly}
            onChange={(v) => handleChange('ai_pro_monthly', v)}
            suffix="R$/mês"
          />
          <InputField
            label="Enterprise - Setup"
            value={settings.ai_enterprise_setup}
            onChange={(v) => handleChange('ai_enterprise_setup', v)}
            suffix="R$"
          />
          <InputField
            label="Enterprise - Mensalidade"
            value={settings.ai_enterprise_monthly}
            onChange={(v) => handleChange('ai_enterprise_monthly', v)}
            suffix="R$/mês"
          />
          <InputField
            label="Agente Extra"
            value={settings.ai_extra_agent}
            onChange={(v) => handleChange('ai_extra_agent', v)}
            suffix="R$"
          />
          <InputField
            label="Add-on RAG"
            value={settings.ai_rag_addon}
            onChange={(v) => handleChange('ai_rag_addon', v)}
            suffix="R$"
          />
          <InputField
            label="Add-on Voz"
            value={settings.ai_voice_addon}
            onChange={(v) => handleChange('ai_voice_addon', v)}
            suffix="R$"
          />
        </div>
      </section>

      {/* Módulos */}
      <section className="pricing-section">
        <h3>🔧 Módulos Adicionais</h3>
        <div className="form-grid">
          <InputField
            label="n8n Automation"
            value={settings.module_n8n}
            onChange={(v) => handleChange('module_n8n', v)}
            suffix="R$"
          />
          <InputField
            label="WhatsApp Gateway"
            value={settings.module_whatsapp}
            onChange={(v) => handleChange('module_whatsapp', v)}
            suffix="R$"
          />
          <InputField
            label="Agile Setup"
            value={settings.module_agile_setup}
            onChange={(v) => handleChange('module_agile_setup', v)}
            suffix="R$"
          />
          <InputField
            label="Mentoria Ágil (por hora)"
            value={settings.module_mentoring_hour}
            onChange={(v) => handleChange('module_mentoring_hour', v)}
            suffix="R$/h"
          />
          <InputField
            label="Suporte Mensal (%)"
            value={settings.module_support_percentage}
            onChange={(v) => handleChange('module_support_percentage', v)}
            suffix="%"
          />
        </div>
      </section>

      {/* Parcelamento */}
      <section className="pricing-section">
        <h3>💳 Parcelamento</h3>
        <div className="form-grid">
          <InputField
            label="Limite de Parcelas"
            value={settings.installment_limit}
            onChange={(v) => handleChange('installment_limit', v)}
          />
          <InputField
            label="MDR 1x"
            value={settings.mdr_1x}
            onChange={(v) => handleChange('mdr_1x', v)}
            suffix="%"
          />
          <InputField
            label="MDR 2-6x"
            value={settings.mdr_2_6x}
            onChange={(v) => handleChange('mdr_2_6x', v)}
            suffix="%"
          />
          <InputField
            label="MDR 7-12x"
            value={settings.mdr_7_12x}
            onChange={(v) => handleChange('mdr_7_12x', v)}
            suffix="%"
          />
          <InputField
            label="MDR 13x+"
            value={settings.mdr_13plus}
            onChange={(v) => handleChange('mdr_13plus', v)}
            suffix="%"
          />
          <InputField
            label="Taxa Fixa por Transação"
            value={settings.fixed_fee}
            onChange={(v) => handleChange('fixed_fee', v)}
            suffix="R$"
          />
          <InputField
            label="Taxa Antecipação Mensal"
            value={settings.anticipation_fee}
            onChange={(v) => handleChange('anticipation_fee', v)}
            suffix="%"
          />
          <InputField
            label="Ciclo de Dias"
            value={settings.cycle_days}
            onChange={(v) => handleChange('cycle_days', v)}
          />
        </div>
      </section>

      {/* Comissão */}
      <section className="pricing-section">
        <h3>💰 Comissão</h3>
        <div className="form-grid">
          <InputField
            label="Taxa de Comissão"
            value={settings.commission_rate}
            onChange={(v) => handleChange('commission_rate', v)}
            suffix="%"
          />
        </div>
      </section>

      {/* Hospedagem */}
      <section className="pricing-section">
        <h3>🖥️ Hospedagem - Mensalidade</h3>
        <div className="form-grid">
          <InputField
            label="Single"
            value={settings.hosting_single}
            onChange={(v) => handleChange('hosting_single', v)}
            suffix="R$/mês"
          />
          <InputField
            label="Premium"
            value={settings.hosting_premium}
            onChange={(v) => handleChange('hosting_premium', v)}
            suffix="R$/mês"
          />
          <InputField
            label="Business"
            value={settings.hosting_business}
            onChange={(v) => handleChange('hosting_business', v)}
            suffix="R$/mês"
          />
          <InputField
            label="VPS Starter"
            value={settings.hosting_vps_starter}
            onChange={(v) => handleChange('hosting_vps_starter', v)}
            suffix="R$/mês"
          />
          <InputField
            label="VPS Pro"
            value={settings.hosting_vps_pro}
            onChange={(v) => handleChange('hosting_vps_pro', v)}
            suffix="R$/mês"
          />
          <InputField
            label="VPS Ultra"
            value={settings.hosting_vps_ultra}
            onChange={(v) => handleChange('hosting_vps_ultra', v)}
            suffix="R$/mês"
          />
        </div>
      </section>
    </div>
  );
};

export default PricingTab;
