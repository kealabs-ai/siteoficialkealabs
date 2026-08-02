# 🔐 Guia de Autenticação - Módulo App Kealabs

## ✅ Endpoint de Login Atualizado

### Configuração

```
Base URL: https://srv1023256.hstgr.cloud/k1/api
Endpoint: POST /auth/login
```

---

## 📝 Credenciais de Teste

### Usuário Padrão

```json
{
  "email": "admin@kealabs.cloud",
  "password": "123456"
}
```

**Informações do Usuário**:
- Nome: Administrador
- Email: admin@kealabs.cloud
- Role: admin
- ID: uuid

---

## 🔄 Fluxo de Autenticação

### 1. Login

**Request**:
```bash
POST https://srv1023256.hstgr.cloud/k1/api/auth/login
Content-Type: application/json

{
  "email": "admin@kealabs.cloud",
  "password": "123456"
}
```

**Response (200 OK)**:
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "expires_in": 28800,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Administrador",
    "email": "admin@kealabs.cloud",
    "role": "admin"
  }
}
```

---

## 💾 Armazenamento de Tokens

Após login bem-sucedido, os seguintes dados são armazenados em `localStorage`:

```javascript
localStorage.setItem('access_token', 'eyJ0eXAiOiJKV1QiLCJhbGc...');
localStorage.setItem('refresh_token', 'eyJ0eXAiOiJKV1QiLCJhbGc...');
localStorage.setItem('token_type', 'bearer');
localStorage.setItem('token_expires_in', '28800');
localStorage.setItem('user', JSON.stringify({
  id: '550e8400-e29b-41d4-a716-446655440000',
  name: 'Administrador',
  email: 'admin@kealabs.cloud',
  role: 'admin'
}));
```

---

## 🔑 Uso do Token

### Em Requisições

Todos os endpoints protegidos requerem o token no header:

```bash
GET https://srv1023256.hstgr.cloud/k1/api/quotes
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

### No Código

O interceptador do axios adiciona automaticamente:

```typescript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## ✅ Validação de Token

### Endpoint de Validação

```bash
GET https://srv1023256.hstgr.cloud/k1/api/auth/validate
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

**Response (200 OK)**:
```json
{
  "valid": true,
  "user": { ... }
}
```

**Response (401 Unauthorized)**:
```json
{
  "error": "Token inválido ou expirado"
}
```

---

## 🚪 Logout

### Endpoint de Logout

```bash
POST https://srv1023256.hstgr.cloud/k1/api/auth/logout
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

### No Código

```typescript
const handleLogout = (): void => {
  // Limpar localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  localStorage.removeItem('token_expires_in');
  localStorage.removeItem('token_type');
  
  // Redirecionar para login
  setIsAuthenticated(false);
};
```

---

## 🔄 Refresh Token

### Quando Usar

Quando o `access_token` expirar (após `expires_in` segundos):

```bash
POST https://srv1023256.hstgr.cloud/k1/api/auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Response (200 OK)**:
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "expires_in": 28800
}
```

---

## 🧪 Testar Login

### 1. Localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor
npm run dev

# Acessar
http://localhost:5173/app

# Credenciais
Email: admin@kealabs.cloud
Senha: 123456
```

### 2. Via cURL

```bash
curl -X POST https://srv1023256.hstgr.cloud/k1/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@kealabs.cloud",
    "password": "123456"
  }'
```

### 3. Via Postman

1. Criar nova requisição POST
2. URL: `https://srv1023256.hstgr.cloud/k1/api/auth/login`
3. Body (JSON):
```json
{
  "email": "admin@kealabs.cloud",
  "password": "123456"
}
```
4. Enviar

---

## ⚠️ Tratamento de Erros

### Erro 401 - Unauthorized

```json
{
  "error": "Credenciais inválidas",
  "message": "Email ou senha incorretos"
}
```

**Solução**: Verificar email e senha

### Erro 400 - Bad Request

```json
{
  "error": "Campos obrigatórios faltando",
  "message": "Email e password são obrigatórios"
}
```

**Solução**: Preencher todos os campos

### Erro 500 - Server Error

```json
{
  "error": "Erro interno do servidor",
  "message": "Tente novamente mais tarde"
}
```

**Solução**: Verificar se a API está disponível

---

## 🔒 Segurança

### Boas Práticas Implementadas

✅ **Token em localStorage**
- Armazenado de forma segura
- Removido ao fazer logout

✅ **Interceptador de Requisições**
- Token adicionado automaticamente
- Tratamento de 401 automático

✅ **Validação de Token**
- Verificado ao carregar a aplicação
- Removido se inválido

✅ **Refresh Token**
- Permite renovar acesso sem fazer login novamente
- Armazenado separadamente

---

## 📊 Fluxo Completo

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUXO DE AUTENTICAÇÃO                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Usuário acessa /app                                    │
│     ↓                                                       │
│  2. App verifica localStorage                              │
│     ↓                                                       │
│  3. Se não há token → Exibe Login                          │
│     ↓                                                       │
│  4. Usuário preenche email e senha                         │
│     ↓                                                       │
│  5. POST /auth/login                                       │
│     ↓                                                       │
│  6. Recebe access_token e refresh_token                    │
│     ↓                                                       │
│  7. Armazena em localStorage                               │
│     ↓                                                       │
│  8. Redireciona para Dashboard                             │
│     ↓                                                       │
│  9. Todas as requisições incluem token                     │
│     ↓                                                       │
│  10. Se token expirar → Usa refresh_token                  │
│     ↓                                                       │
│  11. Se refresh falhar → Redireciona para Login            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 Checklist de Implementação

- [x] Endpoint de login configurado
- [x] Tipos TypeScript atualizados
- [x] Armazenamento de tokens
- [x] Interceptador de requisições
- [x] Validação de token
- [x] Tratamento de erros
- [x] Logout implementado
- [x] Refresh token suportado
- [x] UI atualizada com dados do usuário
- [x] Documentação completa

---

## 🚀 Próximos Passos

1. **Testar Login**
   - Usar credenciais: admin@kealabs.cloud / 123456
   - Verificar se token é armazenado
   - Verificar se Dashboard carrega

2. **Testar Logout**
   - Clicar em "Sair"
   - Verificar se localStorage é limpo
   - Verificar se redireciona para login

3. **Testar Validação**
   - Remover token de localStorage
   - Recarregar página
   - Verificar se redireciona para login

4. **Testar Refresh**
   - Aguardar token expirar
   - Fazer requisição
   - Verificar se usa refresh_token

---

## 📞 Suporte

Se encontrar problemas:

1. **Verifique o console** (F12)
   - Procure por erros de autenticação
   - Verifique requisições de rede

2. **Verifique localStorage** (F12 → Application)
   - Confirme se tokens estão armazenados
   - Verifique se dados do usuário estão corretos

3. **Verifique a API**
   - Confirme se endpoint está acessível
   - Verifique se credenciais estão corretas

4. **Entre em contato**
   - Equipe Kealabs
   - Email: suporte@kealabs.com

---

**Status**: ✅ Autenticação Implementada
**Versão**: 1.0.0
**Data**: 2024

Boa sorte! 🚀
