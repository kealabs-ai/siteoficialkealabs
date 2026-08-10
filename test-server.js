#!/usr/bin/env node

const http = require('http');

console.log('🔍 Testando conexão com o servidor...\n');

// Teste 1: Health check
console.log('1️⃣  Testando health check...');
http.get('http://localhost:3000/api/health', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Servidor está respondendo\n');
      testAsaasProxy();
    } else {
      console.log('❌ Servidor retornou status:', res.statusCode, '\n');
    }
  });
}).on('error', (err) => {
  console.log('❌ Erro ao conectar ao servidor:', err.message);
  console.log('\n⚠️  Certifique-se de que o servidor está rodando:');
  console.log('   npm run server\n');
  process.exit(1);
});

function testAsaasProxy() {
  console.log('2️⃣  Testando proxy Asaas...');
  
  const token = process.env.VITE_ASAAS_API_KEY;
  
  if (!token) {
    console.log('❌ Token Asaas não configurado');
    console.log('\n⚠️  Configure o token no arquivo .env:');
    console.log('   VITE_ASAAS_API_KEY=seu_token_aqui\n');
    process.exit(1);
  }

  http.get('http://localhost:3000/api/asaas/payments?limit=1', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (res.statusCode === 200) {
          console.log('✅ Proxy Asaas está funcionando');
          console.log('   Resposta:', JSON.stringify(json, null, 2).substring(0, 200) + '...\n');
          console.log('🎉 Tudo está funcionando corretamente!\n');
        } else if (json.error) {
          console.log('❌ Erro do Asaas:', json.error, '\n');
        } else {
          console.log('✅ Proxy respondeu com status:', res.statusCode, '\n');
        }
      } catch (e) {
        console.log('❌ Erro ao parsear resposta:', e.message, '\n');
      }
      process.exit(0);
    });
  }).on('error', (err) => {
    console.log('❌ Erro ao conectar ao proxy:', err.message, '\n');
    process.exit(1);
  });
}
