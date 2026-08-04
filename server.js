const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
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

// Proxy para /owner - roteia para a aplicação owner
app.use(
  '/owner',
  createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: {
      '^/owner': '', // Remove /owner do path antes de enviar para owner
    },
    onError: (err, req, res) => {
      console.error('Erro ao rotear /owner:', err);
      res.status(503).json({ error: 'Serviço indisponível' });
    },
  })
);

// Rota catch-all para SPA (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor proxy rodando na porta ${PORT}`);
  console.log(`📍 Site: http://localhost:${PORT}`);
  console.log(`📍 Owner: http://localhost:${PORT}/owner`);
});
