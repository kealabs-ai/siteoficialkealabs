import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Solucoes from './components/Solucoes';
import Sobre from './components/Sobre';
import Contato from './components/Contato';
import Footer from './components/Footer';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Solucoes />
      <Sobre />
      <Contato />
      <Footer />
    </div>
  );
}

export default App;
