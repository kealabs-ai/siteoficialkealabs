import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './utils/extensionErrorHandler';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Suprimir erros de console de extensões
const originalError = console.error;
console.error = function(...args) {
  if (
    args[0]?.toString?.().includes('MetaMask') ||
    args[0]?.toString?.().includes('Could not establish connection') ||
    args[0]?.toString?.().includes('Receiving end does not exist')
  ) {
    return;
  }
  originalError.apply(console, args);
};

const originalWarn = console.warn;
console.warn = function(...args) {
  if (
    args[0]?.toString?.().includes('MetaMask') ||
    args[0]?.toString?.().includes('Could not establish connection')
  ) {
    return;
  }
  originalWarn.apply(console, args);
};
