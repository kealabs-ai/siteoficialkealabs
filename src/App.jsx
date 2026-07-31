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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/app/login" element={<ClientApp />} />
        <Route path="/app/dashboard" element={<ClientApp />} />
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
