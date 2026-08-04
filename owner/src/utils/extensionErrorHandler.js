// Suprimir erros de MetaMask e outras extensões
if (typeof window !== 'undefined') {
  // Capturar erros não tratados de extensões
  window.addEventListener('error', (event) => {
    if (
      event.message?.includes('MetaMask') ||
      event.message?.includes('Could not establish connection') ||
      event.message?.includes('Receiving end does not exist') ||
      event.message?.includes('asynchronous response')
    ) {
      event.preventDefault();
    }
  });

  // Capturar promessas rejeitadas de extensões
  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason?.message?.includes('MetaMask') ||
      event.reason?.message?.includes('Could not establish connection') ||
      event.reason?.message?.includes('Receiving end does not exist') ||
      event.reason?.message?.includes('listener indicated an asynchronous response') ||
      event.reason?.message?.includes('message channel closed')
    ) {
      event.preventDefault();
    }
  });

  // Suprimir erros de console específicos
  const originalError = console.error;
  console.error = function(...args) {
    const message = args[0]?.toString?.() || '';
    if (
      message.includes('MetaMask') ||
      message.includes('Could not establish connection') ||
      message.includes('Receiving end does not exist') ||
      message.includes('asynchronous response') ||
      message.includes('message channel closed')
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
}
