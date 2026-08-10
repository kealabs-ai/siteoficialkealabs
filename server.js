const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para logs
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Proxy para API Asaas
app.all('/api/asaas/*', async (req, res) => {
  try {
    const asaasPath = req.path.replace('/api/asaas', '');
    const asaasUrl = `https://api-sandbox.asaas.com/v3${asaasPath}`;
    const asaasToken = process.env.VITE_ASAAS_API_KEY || process.env.ASAAS_API_KEY;

    console.log(`Proxy request: ${req.method} ${asaasUrl}`);

    if (!asaasToken) {
      console.error('Token Asaas não configurado');
      return res.status(400).json({ error: 'Token Asaas não configurado' });
    }

    const options = {
      method: req.method,
      headers: {
        'User-Agent': 'Kealabs/1.0.0',
        'accept': 'application/json',
        'access_token': asaasToken,
      },
    };

    // Passar query string
    const queryString = new URLSearchParams(req.query).toString();
    const finalUrl = queryString ? `${asaasUrl}?${queryString}` : asaasUrl;

    // Passar body para POST/PUT
    if (req.method !== 'GET' && req.method !== 'DELETE') {
      options.body = JSON.stringify(req.body);
      options.headers['Content-Type'] = 'application/json';
    }

    console.log(`Fetching: ${finalUrl}`);

    const response = await fetch(finalUrl, options);
    const data = await response.json();

    console.log(`Response status: ${response.status}`);

    res.status(response.status).json(data);
  } catch (error) {
    console.error('Erro no proxy Asaas:', error.message);
    res.status(500).json({ error: error.message });
  }
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
  console.log(`📍 API Proxy: http://localhost:${PORT}/api/asaas`);
  console.log(`📍 Health: http://localhost:${PORT}/api/health`);
});
