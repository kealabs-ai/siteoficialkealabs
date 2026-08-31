# Troubleshooting - Erro: Failed to fetch

## Problema

Você está recebendo o erro `net::ERR_CONNECTION_REFUSED` ao tentar acessar o módulo financeiro.

## Solução

### Passo 1: Instalar Dependências

```bash
npm install
```

### Passo 2: Configurar Variáveis de Ambiente

Edite o arquivo `.env` na raiz do projeto:

```env
VITE_ASAAS_API_KEY=seu_token_asaas_aqui
VITE_API_URL=http://localhost:3000
VITE_APP_ENV=development
```

**Importante:** Substitua `seu_token_asaas_aqui` pelo seu token real do Asaas.

### Passo 3: Rodar o Servidor

Em um terminal, execute:

```bash
npm run server
```

Você deve ver:
```
🚀 Servidor rodando na porta 3000
📍 Site: http://localhost:3000
📍 API Proxy: http://localhost:3000/api/asaas
📍 Health: http://localhost:3000/api/health
```

### Passo 4: Rodar o Frontend

Em outro terminal, execute:

```bash
npm start
```

Você deve ver:
```
VITE v5.0.6  ready in XXX ms

➜  Local:   http://localhost:5173/
```

### Passo 5: Testar a Conexão

Em um terceiro terminal, execute:

```bash
npm run test:server
```

Você deve ver:
```
🔍 Testando conexão com o servidor...

1️⃣  Testando health check...
✅ Servidor está respondendo

2️⃣  Testando proxy Asaas...
✅ Proxy Asaas está funcionando

🎉 Tudo está funcionando corretamente!
```

## Checklist

- [ ] Node.js instalado (`node --version` >= 18.0.0)
- [ ] npm instalado (`npm --version` >= 9.0.0)
- [ ] Dependências instaladas (`npm install`)
- [ ] `.env` configurado com token Asaas
- [ ] Servidor rodando (`npm run server`)
- [ ] Frontend rodando (`npm start`)
- [ ] Teste passou (`npm run test:server`)

## Erros Comuns

### ❌ "Token Asaas não configurado"

**Solução:** Edite o arquivo `.env` e adicione seu token:
```env
VITE_ASAAS_API_KEY=seu_token_aqui
```

### ❌ "Erro ao conectar ao servidor"

**Solução:** Certifique-se de que o servidor está rodando:
```bash
npm run server
```

### ❌ "EADDRINUSE: address already in use :::3000"

**Solução:** A porta 3000 já está em uso. Mate o processo:

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -i :3000
kill -9 <PID>
```

### ❌ "Cannot find module 'express'"

**Solução:** Instale as dependências:
```bash
npm install
```

## Estrutura de Portas

- **3000** - Backend (Express) + Proxy Asaas
- **5173** - Frontend (Vite)

Certifique-se de que ambas as portas estão disponíveis.

## Logs Úteis

### Backend (npm run server)
```
🚀 Servidor rodando na porta 3000
GET /api/asaas/payments?limit=50
Proxy request: GET https://api.asaas.com/v3/payments?limit=50
Response status: 200
```

### Frontend (npm start)
```
VITE v5.0.6  ready in 123 ms
➜  Local:   http://localhost:5173/
```

## Próximos Passos

1. Acesse `http://localhost:5173`
2. Faça login
3. Vá para o menu "Financeiro"
4. Você deve ver as cobranças, pagamentos e recebimentos

## Suporte

Se o problema persistir:

1. Verifique se o token Asaas é válido
2. Verifique a conexão com a internet
3. Verifique os logs do servidor
4. Tente limpar o cache do navegador (Ctrl+Shift+Delete)
5. Reinicie o servidor e o frontend
