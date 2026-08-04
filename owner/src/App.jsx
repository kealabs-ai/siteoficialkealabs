import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OwnerHeader from './components/OwnerHeader';
import DashboardPage from './modules/dashboard/pages/DashboardPage';
import UsuariosPage from './modules/usuarios/pages/UsuariosPage';
import RelatoriosPage from './modules/relatorios/pages/RelatoriosPage';
import ConfiguracoesPage from './modules/configuracoes/pages/ConfiguracoesPage';
import './styles/global.css';

function App() {
  return (
    <Router basename="/owner">
      <div className="App">
        <OwnerHeader />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/relatorios" element={<RelatoriosPage />} />
          <Route path="/configuracoes" element={<ConfiguracoesPage />} />
          <Route path="*" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
