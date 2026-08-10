import React from 'react';
import { crmApi } from '../services/crmApi';
import '../styles/modal.css';

export default function ClientModal({ isOpen, onClose, onSuccess, client = null }) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    mobilePhone: '',
    cpfCnpj: '',
    personType: 'FISICA',
    address: '',
    addressNumber: '',
    complement: '',
    province: '',
    city: '',
    cityName: '',
    state: '',
    country: 'Brasil',
    postalCode: '',
    externalReference: '',
    observations: '',
    additionalEmails: '',
    notificationDisabled: false,
    foreignCustomer: false,
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (client) {
      setFormData(client);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        mobilePhone: '',
        cpfCnpj: '',
        personType: 'FISICA',
        address: '',
        addressNumber: '',
        complement: '',
        province: '',
        city: '',
        cityName: '',
        state: '',
        country: 'Brasil',
        postalCode: '',
        externalReference: '',
        observations: '',
        additionalEmails: '',
        notificationDisabled: false,
        foreignCustomer: false,
      });
    }
    setErrors({});
    setError(null);
  }, [client, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.cpfCnpj.trim()) newErrors.cpfCnpj = 'CPF/CNPJ é obrigatório';
    if (!formData.address.trim()) newErrors.address = 'Endereço é obrigatório';
    if (!formData.addressNumber.trim()) newErrors.addressNumber = 'Número é obrigatório';
    if (!formData.city.trim()) newErrors.city = 'Cidade é obrigatória';
    if (!formData.state.trim()) newErrors.state = 'Estado é obrigatório';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'CEP é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    const payload = {
      name: formData.name,
      email: formData.email || undefined,
      phone: formData.phone || undefined,
      mobilePhone: formData.mobilePhone || undefined,
      cpfCnpj: formData.cpfCnpj,
      personType: formData.personType,
      address: formData.address,
      addressNumber: formData.addressNumber,
      complement: formData.complement || undefined,
      province: formData.province || undefined,
      city: formData.city,
      cityName: formData.cityName || undefined,
      state: formData.state,
      country: formData.country,
      postalCode: formData.postalCode,
      externalReference: formData.externalReference || undefined,
      observations: formData.observations || undefined,
      additionalEmails: formData.additionalEmails || undefined,
      notificationDisabled: formData.notificationDisabled,
      foreignCustomer: formData.foreignCustomer,
    };

    const result = await crmApi.createClient(payload);
    
    if (result.success) {
      onSuccess(result.data);
      onClose();
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{client ? 'Editar Cliente' : 'Novo Cliente'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Informações Pessoais</h3>
              
              <div className="form-group">
                <label>Nome *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tipo de Pessoa *</label>
                  <select
                    name="personType"
                    value={formData.personType}
                    onChange={handleChange}
                  >
                    <option value="FISICA">Pessoa Física</option>
                    <option value="JURIDICA">Pessoa Jurídica</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>CPF/CNPJ *</label>
                  <input
                    type="text"
                    name="cpfCnpj"
                    value={formData.cpfCnpj}
                    onChange={handleChange}
                    placeholder="00000000000"
                    className={errors.cpfCnpj ? 'error' : ''}
                  />
                  {errors.cpfCnpj && <span className="error-text">{errors.cpfCnpj}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Telefone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(00) 0000-0000"
                  />
                </div>

                <div className="form-group">
                  <label>Celular</label>
                  <input
                    type="tel"
                    name="mobilePhone"
                    value={formData.mobilePhone}
                    onChange={handleChange}
                    placeholder="(00) 99999-9999"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Endereço</h3>

              <div className="form-group">
                <label>Endereço *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Número *</label>
                  <input
                    type="text"
                    name="addressNumber"
                    value={formData.addressNumber}
                    onChange={handleChange}
                    className={errors.addressNumber ? 'error' : ''}
                  />
                  {errors.addressNumber && <span className="error-text">{errors.addressNumber}</span>}
                </div>

                <div className="form-group">
                  <label>Complemento</label>
                  <input
                    type="text"
                    name="complement"
                    value={formData.complement}
                    onChange={handleChange}
                    placeholder="Apto, sala, etc"
                  />
                </div>

                <div className="form-group">
                  <label>Bairro</label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Cidade *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label>Estado *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    maxLength="2"
                    className={errors.state ? 'error' : ''}
                  />
                  {errors.state && <span className="error-text">{errors.state}</span>}
                </div>

                <div className="form-group">
                  <label>CEP *</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="00000000"
                    className={errors.postalCode ? 'error' : ''}
                  />
                  {errors.postalCode && <span className="error-text">{errors.postalCode}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>País</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Informações Adicionais</h3>

              <div className="form-group">
                <label>Referência Externa</label>
                <input
                  type="text"
                  name="externalReference"
                  value={formData.externalReference}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Emails Adicionais</label>
                <input
                  type="text"
                  name="additionalEmails"
                  value={formData.additionalEmails}
                  onChange={handleChange}
                  placeholder="email1@example.com, email2@example.com"
                />
              </div>

              <div className="form-group">
                <label>Observações</label>
                <textarea
                  name="observations"
                  value={formData.observations}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="notificationDisabled"
                  name="notificationDisabled"
                  checked={formData.notificationDisabled}
                  onChange={handleChange}
                />
                <label htmlFor="notificationDisabled">Desabilitar notificações</label>
              </div>

              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="foreignCustomer"
                  name="foreignCustomer"
                  checked={formData.foreignCustomer}
                  onChange={handleChange}
                />
                <label htmlFor="foreignCustomer">Cliente estrangeiro</label>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar Cliente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
