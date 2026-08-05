import React, { useState } from 'react';
import { BarChart3, FileCheck, Users, Cog, Sparkles, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../../assets/kealabs_logo_strategic.png';
import '../styles/home.css';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/home/dashboard', color: '#10B981' },
    { id: 'orcamentos', label: 'Orçamentos', icon: FileCheck, path: '/home/orcamentos', color: '#00B4D8' },
    { id: 'prospect', label: 'Prospect', icon: Users, path: '/home/prospect', color: '#FF6B00' },
    { id: 'crm', label: 'CRM', icon: Cog, path: '/home/crm', color: '#0A2540' },
    { id: 'agent', label: 'Agent Kea', icon: Sparkles, path: '/home/agent', color: '#10B981' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 50, padding: '0.75rem', borderRadius: '9999px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', color: 'white', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'none', background: 'linear-gradient(135deg, #0A2540 0%, #10B981 100%)' }}
        className="lg:hidden"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        transition: 'all 0.3s ease',
        zIndex: 40,
        width: isCollapsed ? '80px' : '256px',
        transform: isMobileOpen ? 'translateX(0)' : '-translateX(100%)',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        borderRight: '1px solid #E2E8F0'
      }}
      className="lg:static lg:translate-x-0"
      >
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '1rem', paddingRight: '0.5rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
          {!isCollapsed && (
            <img src={logo} alt="Kealabs" style={{ width: '124px', height: '40px', objectFit: 'contain' }} />
          )}
          {isCollapsed && (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <img src={logo} alt="Kealabs" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ padding: '0.5rem', borderRadius: '0.375rem', transition: 'all 0.2s ease', color: '#0A2540', backgroundColor: '#F1F5F9', border: '1px solid #E2E8F0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            className="hidden lg:flex"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#E2E8F0';
              e.target.style.color = '#10B981';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#F1F5F9';
              e.target.style.color = '#0A2540';
            }}
            title={isCollapsed ? 'Expandir' : 'Recolher'}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, paddingLeft: '0.75rem', paddingRight: '0.75rem', paddingTop: '2rem', paddingBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.path)}
                className={`menu-item ${active ? 'active' : ''}`}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  gap: '0.75rem',
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  paddingTop: '0.75rem',
                  paddingBottom: '0.75rem',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s ease',
                  color: active ? 'white' : '#64748B',
                  backgroundColor: active ? item.color : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  boxShadow: active ? '0 2px 8px rgba(0, 0, 0, 0.12)' : 'none'
                }}
                title={item.label}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.target.style.backgroundColor = '#F1F5F9';
                    e.target.style.color = '#0A2540';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#64748B';
                  }
                }}
              >
                <Icon size={20} style={{ flexShrink: 0, color: active ? 'white' : item.color, strokeWidth: 2 }} />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '1rem', paddingBottom: '1rem', borderTop: '1px solid #E2E8F0' }}>
          {!isCollapsed && (
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center', margin: 0 }}>© 2024 Kealabs</p>
          )}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 30, display: 'none' }}
          className="lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
