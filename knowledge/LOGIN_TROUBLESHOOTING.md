# 🔐 Guia de Troubleshooting - Login Kealabs

## ✅ Correções Implementadas

```
┌─────────────────────────────────────────────────────────────┐
│                    LOGIN CORRIGIDO                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ✅ Interceptador não adiciona token em /auth/login        │
│  ✅ Validação de email e senha melhorada                   │
│  ✅ Tratamento de erros completo                           │
│  ✅ Logging detalhado no console                           │
│  ✅ Informações de teste exibidas                          │
│  ✅ Mensagens de erro específicas                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧪 Como Testar

### 1. Credenciais de Teste

```
Email: admin@kealabs.cloud
Senha: 123456
```

Estas credenciais estão pré-preenchidas no formulário.

### 2. Passos para Testar

```
1. Acesse http://localhost:5173/app
2. Você verá a tela de login
3. As credenciais já estão preenchidas
4. Clique em "Entrar"
5. Verifique o console (F12) para logs
```

### 3. Verificar Console

```javascript
// Abra DevTools (F12) → Console
// Você deve ver:
// "Iniciando login com: { email: 'admin@kealabs.cloud' }"
// "Resposta do login: { ... }"
// "Login bem-sucedido para: admin@kealabs.cloud"
```

---

## 🐛 Troubleshooting

### Problema 1: "Email ou senha incorretos"

**Causa**: Credenciais inválidas

**Solução**:
```
1. Verifique se está usando:
   Email: admin@kealabs.cloud
   Senha: 123456

2. Verifique se não há espaços extras
3. Verifique se a API está acessível
```

### Problema 2: "Erro de conexão"

**Causa**: API não está acessível

**Solução**:
```
1. Verifique se a API está rodando:
   https://srv1023256.hstgr.cloud/k1/api

2. Verifique sua conexão de internet

3. Verifique se há CORS habilitado

4. Tente em outro navegador
```

### Problema 3: "Erro no servidor"

**Causa**: Erro 500 na API

**Solução**:
```
1. Verifique os logs da API
2. Tente novamente em alguns minutos
3. Entre em contato com suporte
```

### Problema 4: "Resposta inválida do servidor"

**Causa**: API retornou resposta sem access_token

**Solução**:
```
1. Verifique a resposta no console (F12 → Network)
2. Confirme que a resposta contém:
   - access_token
   - refresh_token
   - user
   - expires_in

3. Se faltar algo, entre em contato com suporte
```

---

## 🔍 Verificar Resposta da API

### Via Console

```javascript
// Abra DevTools (F12) → Network
// 1. Faça login
// 2. Procure por requisição POST /auth/login
// 3. Clique em "Response"
// 4. Verifique se contém:

{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer",
  "expires_in": 28800,
  "user": {
    "id": "uuid",
    "name": "Administrador",
    "email": "admin@kealabs.cloud",
    "role": "admin"
  }
}
```

### Via cURL

```bash
curl -X POST https://srv1023256.hstgr.cloud/k1/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@kealabs.cloud",
    "password": "123456"
  }'
```

---

## 📊 Fluxo de Login Corrigido

```
1. Usuário preenche email e senha
   ↓
2. Clica em "Entrar"
   ↓
3. Validação básica (email, senha não vazios)
   ↓
4. POST /auth/login (SEM token no header)
   ↓
5. API valida credenciais
   ↓
6. Se válido → Retorna access_token + refresh_token
   Se inválido → Retorna erro 401
   ↓
7. App armazena tokens em localStorage
   ↓
8. App redireciona para Dashboard
   ↓
9. Todas as requisições posteriores incluem token
```

---

## ✅ Checklist de Validação

- [x] Interceptador não adiciona token em /auth/login
- [x] Validação de email e senha
- [x] Tratamento de erros 401, 400, 500
- [x] Logging detalhado
- [x] Informações de teste exibidas
- [x] Mensagens de erro específicas
- [x] localStorage atualizado corretamente
- [x] Redirecionamento para Dashboard

---

## 🚀 Próximos Passos

### 1. Testar Imediatamente

```bash
npm run dev
# Acessar http://localhost:5173/app
# Usar credenciais: admin@kealabs.cloud / 123456
```

### 2. Verificar Console

```
F12 → Console
Procure por "Login bem-sucedido para: admin@kealabs.cloud"
```

### 3. Verificar localStorage

```javascript
// F12 → Application → localStorage
// Deve conter:
// - access_token
// - refresh_token
// - user
// - token_expires_in
// - token_type
```

### 4. Verificar Dashboard

```
Se login bem-sucedido:
1. Você será redirecionado para /dashboard
2. Verá "Dashboard" no header
3. Verá seu nome no header
```

---

## 📝 Mudanças Implementadas

### api.ts
- ✅ Interceptador não adiciona token em /auth/login
- ✅ Melhor tratamento de erros

### Login.tsx
- ✅ Validação de email e senha
- ✅ Logging detalhado
- ✅ Tratamento de erros específicos
- ✅ Informações de teste exibidas

### Login.css
- ✅ Estilos para informações de teste
- ✅ Melhor apresentação de erros

---

## 🎯 Resultado Esperado

```
Antes:
❌ Login não validava
❌ Sem mensagens de erro
❌ Sem logging

Depois:
✅ Login valida corretamente
✅ Mensagens de erro específicas
✅ Logging detalhado no console
✅ Informações de teste exibidas
```

---

## 📞 Se Ainda Tiver Problemas

### 1. Verifique o Console

```javascript
// F12 → Console
// Procure por erros
// Copie a mensagem de erro completa
```

### 2. Verifique a Network

```
// F12 → Network
// Faça login
// Procure por POST /auth/login
// Verifique:
// - Status (deve ser 200)
// - Response (deve conter access_token)
// - Headers (deve conter Content-Type: application/json)
```

### 3. Verifique localStorage

```javascript
// F12 → Application → localStorage
// Verifique se tokens foram armazenados
```

### 4. Entre em Contato

Se o problema persistir:
- Copie a mensagem de erro do console
- Copie a resposta da API (Network tab)
- Entre em contato com suporte

---

**Status**: ✅ Login Corrigido
**Data**: 2024
**Versão**: 1.0.1

Boa sorte! 🚀
