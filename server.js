const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para logs
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Servir arquivos estáticos do site principal
app.use(express.static(path.join(__dirname, 'build')));

// Servir arquivos estáticos do owner em /owner
app.use('/owner', express.static(path.join(__dirname, 'owner', 'build')));

// Rota para /owner/* - retorna index.html do owner para SPA routing
app.get('/owner/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'owner', 'build', 'index.html'));
});

// Rota catch-all para SPA (React Router) do site principal
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Site: http://localhost:${PORT}`);
  console.log(`📍 Owner: http://localhost:${PORT}/owner`);
});
