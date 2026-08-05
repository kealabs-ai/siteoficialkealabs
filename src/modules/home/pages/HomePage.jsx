import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FileText, TrendingUp, Zap, Bot, Users } from 'lucide-react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import DashboardPage from './DashboardPage';
import OrcamentosPage from '../../orcamentos/pages/OrcamentosPage';
import ProspectsPage from '../../prospects/pages/ProspectsPage';
import '../styles/home.css';

const HomePage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const userName = localStorage.getItem('userName') || 'Usuário';

  return (
    <div className="home-container">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="home-main" style={{ marginLeft: isCollapsed ? '80px' : '256px', transition: 'margin-left 0.3s ease' }}>
        <Topbar userName={userName} isCollapsed={isCollapsed} />
        <main className="home-content">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/orcamentos" element={<OrcamentosPage />} />
            <Route path="/prospect" element={<ProspectsPage />} />
            <Route path="/crm" element={<CRMContent />} />
            <Route path="/agent" element={<AgentContent />} />
            <Route path="/" element={<DashboardPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const CRMContent = () => (
  <div>
    <PageHeader
      title="CRM"
      description="Gerencie seus relacionamentos com clientes"
      icon={Users}
      color="#10B981"
    />
    
    <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
      <div style={{ textAlign: 'center', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <Users size={48} style={{ margin: '0 auto 1rem', color: '#d1d5db' }} />
        <p style={{ color: '#6b7280' }}>Nenhum cliente registrado ainda</p>
        <button style={{ marginTop: '1rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', borderRadius: '0.5rem', color: 'white', fontWeight: '500', transition: 'opacity 0.2s', backgroundColor: '#10B981', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.opacity = '0.9'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
          Adicionar Cliente
        </button>
      </div>
    </div>
  </div>
);

const AgentContent = () => (
  <div>
    <PageHeader
      title="Agent Kea"
      description="Interaja com o Agent Kea para automação inteligente"
      icon={Bot}
      color="#0A2540"
    />
    
    <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
      <div style={{ textAlign: 'center', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <Bot size={48} style={{ margin: '0 auto 1rem', color: '#d1d5db' }} />
        <p style={{ color: '#6b7280' }}>Agent Kea em breve</p>
        <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.5rem' }}>Automação inteligente para seu negócio</p>
      </div>
    </div>
  </div>
);

const PageHeader = ({ title, description, icon: Icon, color }) => (
  <div style={{ marginBottom: '2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
      <div style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: color, color: 'white' }}>
        <Icon size={28} />
      </div>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#0A2540', margin: 0 }}>{title}</h1>
        <p style={{ color: '#6b7280', marginTop: '0.25rem', margin: 0 }}>{description}</p>
      </div>
    </div>
  </div>
);

export default HomePage;
