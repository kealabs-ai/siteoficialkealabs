// Suprimir erros de MetaMask quando a extensão não está disponível
if (typeof window !== 'undefined') {
  // Capturar erros não tratados de extensões
  window.addEventListener('error', (event) => {
    if (
      event.message?.includes('MetaMask') ||
      event.message?.includes('Could not establish connection') ||
      event.message?.includes('Receiving end does not exist')
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
      event.reason?.message?.includes('listener indicated an asynchronous response')
    ) {
      event.preventDefault();
    }
  });
}
