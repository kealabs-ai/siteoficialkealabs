import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './utils/extensionErrorHandler';
import './styles/global.css';

// Suprimir erros de extensões antes de renderizar
window.addEventListener('error', (event) => {
  if (
    event.message?.includes('asynchronous response') ||
    event.message?.includes('message channel closed') ||
    event.message?.includes('MetaMask')
  ) {
    event.preventDefault();
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (
    event.reason?.message?.includes('asynchronous response') ||
    event.reason?.message?.includes('message channel closed') ||
    event.reason?.message?.includes('MetaMask')
  ) {
    event.preventDefault();
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Suprimir erros de console de extensões
const originalError = console.error;
console.error = function(...args) {
  const message = args[0]?.toString?.() || '';
  if (
    message.includes('asynchronous response') ||
    message.includes('message channel closed') ||
    message.includes('MetaMask') ||
    message.includes('Could not establish connection') ||
    message.includes('Receiving end does not exist')
  ) {
    return;
  }
  originalError.apply(console, args);
};

const originalWarn = console.warn;
console.warn = function(...args) {
  const message = args[0]?.toString?.() || '';
  if (
    message.includes('MetaMask') ||
    message.includes('Could not establish connection')
  ) {
    return;
  }
  originalWarn.apply(console, args);
};
