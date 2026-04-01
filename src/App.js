import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Solucoes from './components/Solucoes';
import Sobre from './components/Sobre';
import Contato from './components/Contato';
import Footer from './components/Footer';
import Login from './components/Login';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <div className="App">
              <Header />
              <Hero />
              <Solucoes />
              <Sobre />
              <Contato />
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
