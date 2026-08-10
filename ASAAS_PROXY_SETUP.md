# Configuração do Proxy Asaas

## Problema Resolvido

O erro de CORS foi resolvido criando um proxy no backend (Express) que faz as requisições à API Asaas.

## Arquitetura

```
Frontend (Vite)
    ↓
http://localhost:3000/api/asaas/*
    ↓
Backend (Express)
    ↓
https://api.asaas.com/v3/*
```

## Instalação

### 1. Instalar Dependências

```bash
npm install
```

Novas dependências adicionadas:
- `express` - Servidor web
- `cors` - Suporte a CORS
- `node-fetch` - Requisições HTTP
- `concurrently` - Rodar múltiplos processos

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais:

```env
# Token da API Asaas (obrigatório)
VITE_ASAAS_API_KEY=seu_token_asaas_aqui

# URL da API (padrão: http://localhost:3000)
VITE_API_URL=http://localhost:3000

# Ambiente
VITE_APP_ENV=development
```

### 3. Obter Token Asaas

1. Acesse [https://www.asaas.com](https://www.asaas.com)
2. Faça login na sua conta
3. Vá em **Configurações** > **Integrações** > **API**
4. Copie seu **Token de Acesso**
5. Cole no arquivo `.env`

## Executar

### Desenvolvimento (Frontend + Backend)

```bash
npm run dev
```

Isso vai rodar:
- Backend na porta 3000
- Frontend na porta 5173

### Apenas Backend

```bash
npm run server
```

### Apenas Frontend

```bash
npm start
```

## Endpoints do Proxy

Todos os endpoints da API Asaas estão disponíveis através do proxy:

```
GET    /api/asaas/payments
POST   /api/asaas/payments
GET    /api/asaas/payments/{id}
PUT    /api/asaas/payments/{id}
DELETE /api/asaas/payments/{id}
GET    /api/asaas/payments/{id}/billingInfo
GET    /api/asaas/customers
POST   /api/asaas/customers
```

## Exemplo de Uso

```javascript
// Frontend
const response = await fetch('http://localhost:3000/api/asaas/payments?limit=50', {
  headers: {
    'Content-Type': 'application/json',
  },
});
const data = await response.json();
```

## Segurança

⚠️ **Importante:**

- O token Asaas é armazenado no servidor (não é exposto ao frontend)
- Nunca exponha o token no código do frontend
- Use variáveis de ambiente
- Em produção, use HTTPS

## Troubleshooting

### Erro: "Token Asaas não configurado"

Verifique se a variável `VITE_ASAAS_API_KEY` está definida no `.env`

### Erro: "Failed to fetch"

1. Verifique se o servidor está rodando na porta 3000
2. Verifique se o token Asaas é válido
3. Verifique a conexão com a internet

### Erro: "CORS policy"

O proxy deve resolver esse problema. Se persistir:
1. Reinicie o servidor
2. Limpe o cache do navegador
3. Verifique se o CORS está habilitado no servidor

## Documentação

- [API Asaas](https://docs.asaas.com)
- [Express.js](https://expressjs.com)
- [Vite](https://vitejs.dev)
