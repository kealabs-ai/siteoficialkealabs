import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, Clock, DollarSign, Plus, Check, X, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { authenticatedFetch } from '../../../services/authService';

const DashboardPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterServiceType, setFilterServiceType] = useState('ALL');

  const itemsPerPage = 5;

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const data = await authenticatedFetch('/quotes');
      setQuotes(Array.isArray(data) ? data : data.data || []);
      setError(null);
      setCurrentPage(1);
    } catch (err) {
      console.error('Erro ao buscar orçamentos:', err);
      setError('Erro ao carregar orçamentos');
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      await authenticatedFetch('/quotes/update-status', {
        method: 'POST',
        body: JSON.stringify({ id, status: newStatus }),
      });

      setQuotes(quotes.map(quote =>
        quote.id === id ? { ...quote, status: newStatus } : quote
      ));
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      alert('Erro ao atualizar orçamento');
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtrar dados
  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = 
      (quote.client_name || quote.client_id || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || quote.status === filterStatus;
    const matchesServiceType = filterServiceType === 'ALL' || quote.service_type === filterServiceType;
    
    return matchesSearch && matchesStatus && matchesServiceType;
  });

  // Paginação
  const totalPages = Math.ceil(filteredQuotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedQuotes = filteredQuotes.slice(startIndex, endIndex);

  // Cálculos de estatísticas
  const stats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === 'PENDING').length,
    approved: quotes.filter(q => q.status === 'APPROVED').length,
    setupTotal: quotes.reduce((sum, q) => sum + (q.setup_value || 0), 0),
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value || 0);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(date));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return { bg: '#10B98120', text: '#10B981', label: 'Aprovado' };
      case 'PENDING':
        return { bg: '#FF6B0020', text: '#FF6B00', label: 'Pendente' };
      case 'REJECTED':
        return { bg: '#EF444420', text: '#EF4444', label: 'Rejeitado' };
      default:
        return { bg: '#64748B20', text: '#64748B', label: status };
    }
  };

  const getServiceTypeColor = (type) => {
    switch (type) {
      case 'WEB':
        return { bg: '#00B4D820', text: '#00B4D8' };
      case 'BI':
        return { bg: '#10B98120', text: '#10B981' };
      case 'MINI_SITE':
        return { bg: '#FF6B0020', text: '#FF6B00' };
      case 'AI_AGENT':
        return { bg: '#0A254020', text: '#0A2540' };
      default:
        return { bg: '#64748B20', text: '#64748B' };
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0A2540', margin: 0 }}>Dashboard</h1>
        <p style={{ color: '#64748B', marginTop: '0.5rem', margin: 0 }}>Visão geral de seus orçamentos</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <StatCard
          icon={FileText}
          label="Total de Orçamentos"
          value={stats.total}
          color="#00B4D8"
        />
        <StatCard
          icon={Clock}
          label="Pendentes"
          value={stats.pending}
          color="#FF6B00"
        />
        <StatCard
          icon={CheckCircle}
          label="Aprovados"
          value={stats.approved}
          color="#10B981"
        />
        <StatCard
          icon={DollarSign}
          label="Setup Total"
          value={formatCurrency(stats.setupTotal)}
          isValue={true}
          color="#0A2540"
        />
      </div>

      {/* Quotes List */}
      <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0A2540', margin: 0, marginBottom: '1rem' }}>Orçamentos</h2>
          
          {/* Filtros */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {/* Busca */}
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#64748B' }} />
              <input
                type="text"
                placeholder="Buscar cliente..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  width: '100%',
                  paddingLeft: '2.5rem',
                  paddingRight: '0.75rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #e5e7eb',
                  fontSize: '0.875rem',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#10B981'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* Filtro Status */}
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid #e5e7eb',
                fontSize: '0.875rem',
                backgroundColor: 'white',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#10B981'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            >
              <option value="ALL">Todos os Status</option>
              <option value="PENDING">Pendente</option>
              <option value="APPROVED">Aprovado</option>
              <option value="REJECTED">Rejeitado</option>
            </select>

            {/* Filtro Tipo de Serviço */}
            <select
              value={filterServiceType}
              onChange={(e) => {
                setFilterServiceType(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid #e5e7eb',
                fontSize: '0.875rem',
                backgroundColor: 'white',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#10B981'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            >
              <option value="ALL">Todos os Tipos</option>
              <option value="WEB">WEB</option>
              <option value="BI">BI</option>
              <option value="MINI_SITE">MINI_SITE</option>
              <option value="AI_AGENT">AI_AGENT</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
            <p>Carregando...</p>
          </div>
        ) : error ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#EF4444' }}>
            <p>{error}</p>
          </div>
        ) : quotes.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <FileText size={48} style={{ margin: '0 auto 1rem', color: '#d1d5db' }} />
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Nenhum orçamento criado ainda</p>
            <a
              href="/builder"
              style={{
                display: 'inline-block',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                borderRadius: '0.5rem',
                backgroundColor: '#10B981',
                color: 'white',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              <Plus size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Criar Primeiro Orçamento
            </a>
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
            <p>Nenhum orçamento encontrado com os filtros aplicados</p>
          </div>
        ) : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#64748B' }}>Cliente</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#64748B' }}>Tipo</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#64748B' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: '#64748B' }}>Setup</th>
                    <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: '#64748B' }}>Mensal</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#64748B' }}>Data</th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#64748B' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedQuotes.map((quote) => {
                    const statusColor = getStatusColor(quote.status);
                    const serviceColor = getServiceTypeColor(quote.service_type);
                    const isPending = quote.status === 'PENDING';

                    return (
                      <tr key={quote.id} style={{ borderBottom: '1px solid #e5e7eb', transition: 'background-color 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#0A2540', fontWeight: '500' }}>
                          {quote.client_name || quote.client_id || 'N/A'}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            display: 'inline-block',
                            paddingLeft: '0.75rem',
                            paddingRight: '0.75rem',
                            paddingTop: '0.25rem',
                            paddingBottom: '0.25rem',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            backgroundColor: serviceColor.bg,
                            color: serviceColor.text,
                          }}>
                            {quote.service_type || 'N/A'}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            display: 'inline-block',
                            paddingLeft: '0.75rem',
                            paddingRight: '0.75rem',
                            paddingTop: '0.25rem',
                            paddingBottom: '0.25rem',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            backgroundColor: statusColor.bg,
                            color: statusColor.text,
                          }}>
                            {statusColor.label}
                          </span>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', color: '#0A2540', fontWeight: '500' }}>
                          {formatCurrency(quote.setup_value)}
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', color: '#0A2540', fontWeight: '500' }}>
                          {formatCurrency(quote.monthly_value)}
                        </td>
                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#64748B' }}>
                          {formatDate(quote.created_at)}
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                          {isPending && (
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                              <button
                                onClick={() => handleUpdateStatus(quote.id, 'APPROVED')}
                                disabled={updatingId === quote.id}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '2rem',
                                  height: '2rem',
                                  borderRadius: '0.375rem',
                                  backgroundColor: '#10B981',
                                  color: 'white',
                                  border: 'none',
                                  cursor: updatingId === quote.id ? 'not-allowed' : 'pointer',
                                  transition: 'all 0.2s',
                                  opacity: updatingId === quote.id ? 0.6 : 1,
                                }}
                                onMouseEnter={(e) => {
                                  if (updatingId !== quote.id) {
                                    e.target.style.backgroundColor = '#059669';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = '#10B981';
                                }}
                                title="Aprovar"
                              >
                                <Check size={16} />
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(quote.id, 'REJECTED')}
                                disabled={updatingId === quote.id}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '2rem',
                                  height: '2rem',
                                  borderRadius: '0.375rem',
                                  backgroundColor: '#EF4444',
                                  color: 'white',
                                  border: 'none',
                                  cursor: updatingId === quote.id ? 'not-allowed' : 'pointer',
                                  transition: 'all 0.2s',
                                  opacity: updatingId === quote.id ? 0.6 : 1,
                                }}
                                onMouseEnter={(e) => {
                                  if (updatingId !== quote.id) {
                                    e.target.style.backgroundColor = '#DC2626';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = '#EF4444';
                                }}
                                title="Rejeitar"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Paginação */}
            <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '0.875rem', color: '#64748B', margin: 0 }}>
                Mostrando {startIndex + 1} a {Math.min(endIndex, filteredQuotes.length)} de {filteredQuotes.length} orçamentos
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '0.375rem',
                    backgroundColor: currentPage === 1 ? '#F3F4F6' : 'white',
                    color: currentPage === 1 ? '#D1D5DB' : '#0A2540',
                    border: '1px solid #E5E7EB',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== 1) {
                      e.target.style.backgroundColor = '#F3F4F6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'white';
                  }}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={`page-${page}`}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '0.375rem',
                      backgroundColor: currentPage === page ? '#10B981' : 'white',
                      color: currentPage === page ? 'white' : '#0A2540',
                      border: `1px solid ${currentPage === page ? '#10B981' : '#E5E7EB'}`,
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (currentPage !== page) {
                        e.target.style.backgroundColor = '#F3F4F6';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentPage !== page) {
                        e.target.style.backgroundColor = 'white';
                      }
                    }}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '0.375rem',
                    backgroundColor: currentPage === totalPages ? '#F3F4F6' : 'white',
                    color: currentPage === totalPages ? '#D1D5DB' : '#0A2540',
                    border: '1px solid #E5E7EB',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== totalPages) {
                      e.target.style.backgroundColor = '#F3F4F6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'white';
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color, isValue }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    borderLeft: `4px solid ${color}`,
    transition: 'all 0.2s ease',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    e.currentTarget.style.transform = 'translateY(-2px)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    e.currentTarget.style.transform = 'translateY(0)';
  }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <p style={{ color: '#64748B', fontSize: '0.875rem', fontWeight: '500', margin: 0 }}>{label}</p>
        <p style={{
          fontSize: isValue ? '1.25rem' : '2rem',
          fontWeight: 'bold',
          marginTop: '0.5rem',
          color: '#0A2540',
          margin: 0
        }}>
          {value}
        </p>
      </div>
      <div style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: `${color}20` }}>
        <Icon size={24} style={{ color }} />
      </div>
    </div>
  </div>
);

export default DashboardPage;
