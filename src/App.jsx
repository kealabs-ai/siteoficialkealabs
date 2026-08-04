import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Solucoes from './components/Solucoes';
import Cases from './components/Cases';
import Sobre from './components/Sobre';
import Contato from './components/Contato';
import Footer from './components/Footer';
import ClientApp from './pages/ClientApp';
import LoginPage from './modules/login/pages/LoginPage';
import DashboardPage from './modules/dashboard/pages/DashboardPage';
import UsuariosPage from './modules/usuarios/pages/UsuariosPage';
import RelatoriosPage from './modules/relatorios/pages/RelatoriosPage';
import ConfiguracoesPage from './modules/configuracoes/pages/ConfiguracoesPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas de Login e Módulos */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/relatorios" element={<RelatoriosPage />} />
        <Route path="/configuracoes" element={<ConfiguracoesPage />} />
        
        {/* Rotas legadas */}
        <Route path="/app/login" element={<ClientApp />} />
        <Route path="/app/dashboard" element={<ClientApp />} />
        
        {/* Rota principal do site */}
        <Route
          path="/"
          element={
            <div className="App">
              <Header />
              <Hero />
              <Solucoes />
              <Cases />
              <Sobre />
              <Contato />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
