// Suprime erros de extensões do navegador que não afetam a aplicação

export const setupErrorHandler = () => {
  // Suprimir erros de extensões do navegador
  window.addEventListener('error', (event) => {
    // Ignorar erros de extensões
    if (
      event.message?.includes('No Listener') ||
      event.message?.includes('Could not establish connection') ||
      event.message?.includes('Receiving end does not exist') ||
      event.message?.includes('tabs:outgoing.message.ready')
    ) {
      event.preventDefault();
      return false;
    }
  });

  // Suprimir erros de promise rejection de extensões
  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason?.message?.includes('No Listener') ||
      event.reason?.message?.includes('Could not establish connection') ||
      event.reason?.message?.includes('Receiving end does not exist') ||
      event.reason?.message?.includes('tabs:outgoing.message.ready')
    ) {
      event.preventDefault();
      return false;
    }
  });
};
