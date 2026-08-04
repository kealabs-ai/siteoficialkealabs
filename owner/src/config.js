// Configuração do basename para o owner
export const getBasename = () => {
  // Em produção, o owner está em /owner
  // Em desenvolvimento, está em /
  if (process.env.NODE_ENV === 'production') {
    return '/owner';
  }
  return '/';
};
