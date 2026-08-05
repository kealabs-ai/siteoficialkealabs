import React, { useState, useEffect } from 'react';
import { LogOut, Settings, User, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../../../services/authService';

const Topbar = ({ userName: initialUserName, isCollapsed }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState(initialUserName || 'Usuário');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser();
        if (user && user.name) {
          setUserName(user.name);
          localStorage.setItem('userName', user.name);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSettings = () => {
    navigate('/configuracoes');
    setIsMenuOpen(false);
  };

  const handleProfile = () => {
    navigate('/usuarios');
    setIsMenuOpen(false);
  };

  return (
    <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', position: 'sticky', top: 0, zIndex: 40, transition: 'all 0.3s ease' }}>
      <div style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '1rem', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: isCollapsed ? '1rem' : '1.25rem', fontWeight: 'bold', color: '#0A2540', transition: 'font-size 0.3s ease' }}>{userName}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'none' }} className="hidden sm:block">
            <p style={{ fontSize: '0.875rem', color: '#64748B', margin: 0 }}>Bem-vindo,</p>
            <p style={{ fontSize: '1rem', fontWeight: '600', color: '#0A2540', margin: 0 }}>{userName}</p>
          </div>
          
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', borderRadius: '0.5rem', transition: 'background-color 0.2s', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '0.875rem', background: 'linear-gradient(135deg, #0A2540 0%, #10B981 100%)' }}>
                {userName?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div style={{ display: 'none' }} className="hidden sm:block">
                <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#0A2540', margin: 0 }}>{userName || 'Usuário'}</p>
                <p style={{ fontSize: '0.75rem', color: '#64748B', margin: 0 }}>Administrador</p>
              </div>
              <ChevronDown size={16} style={{ color: '#64748B', display: 'none' }} className="hidden sm:block" />
            </button>

            {isMenuOpen && (
              <div style={{ position: 'absolute', right: 0, marginTop: '0.5rem', width: '224px', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6', zIndex: 50, overflow: 'hidden' }}>
                <div style={{ paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#0A2540', margin: 0 }}>{userName || 'Usuário'}</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748B', margin: 0 }}>Administrador</p>
                </div>
                <button
                  onClick={handleProfile}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', color: '#374151', textDecoration: 'none', border: 'none', backgroundColor: 'transparent', textAlign: 'left', fontSize: '0.875rem', cursor: 'pointer', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <User size={18} style={{ color: '#0A2540' }} />
                  <span>Meu Perfil</span>
                </button>
                <button
                  onClick={handleSettings}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', color: '#374151', textDecoration: 'none', border: 'none', backgroundColor: 'transparent', textAlign: 'left', fontSize: '0.875rem', cursor: 'pointer', transition: 'background-color 0.2s', borderTop: '1px solid #f3f4f6' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <Settings size={18} style={{ color: '#0A2540' }} />
                  <span>Configurações</span>
                </button>
                <button
                  onClick={handleLogout}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', transition: 'background-color 0.2s', border: 'none', backgroundColor: 'transparent', textAlign: 'left', fontSize: '0.875rem', cursor: 'pointer', color: '#FF6B00', borderTop: '1px solid #f3f4f6' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#fef2f2'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <LogOut size={18} />
                  <span>Sair da Plataforma</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
