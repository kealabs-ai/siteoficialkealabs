import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OwnerHeader from './components/OwnerHeader';
import Dashboard from './pages/Dashboard';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <OwnerHeader />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
