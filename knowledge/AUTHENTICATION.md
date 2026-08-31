# Sistema de Autenticação - Kealabs

Documentação completa do sistema de autenticação integrado com a API.

## 🔐 Endpoints da API

**Base URL**: `https://srv1023256.hstgr.cloud/k1/api`

### 1. Login
```
POST /auth/login
```

**Request**:
```json
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Response** (200):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### 2. Obter Usuário Logado
```
GET /auth/me
```

**Headers**:
```
Authorization: Bearer {access_token}
```

**Response** (200):
```json
{
  "id": "user_123",
  "email": "usuario@example.com",
  "name": "João Silva",
  "role": "admin",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### 3. Validar Token JWT
```
POST /auth/validate
```

**Headers**:
```
Authorization: Bearer {access_token}
```

**Request**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response** (200):
```json
{
  "valid": true,
  "expires_at": "2024-02-15T10:30:00Z"
}
```

### 4. Renovar Token
```
POST /auth/refresh
```

**Request**:
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response** (200):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

## 📁 Estrutura de Arquivos

```
src/
├── services/
│   └── authService.js          # Serviço de autenticação
├── hooks/
│   └── useAuth.js              # Hook customizado
├── components/
│   └── ProtectedRoute.jsx      # Componente para rotas protegidas
└── modules/
    └── login/
        ├── components/
        │   ├── LoginForm.jsx
        │   └── LoginBenefits.jsx
        ├── pages/
        │   └── LoginPage.jsx
        └── styles/
            └── login.css
```

## 🔑 Serviço de Autenticação (authService.js)

### Funções Disponíveis

#### `login(email, password)`
Faz login com email e senha.

```javascript
import { login } from '@/services/authService';

try {
  const response = await login('user@example.com', 'password123');
  console.log('Login bem-sucedido:', response);
} catch (error) {
  console.error('Erro no login:', error);
}
```

#### `getCurrentUser()`
Obtém dados do usuário logado.

```javascript
import { getCurrentUser } from '@/services/authService';

try {
  const user = await getCurrentUser();
  console.log('Usuário:', user);
} catch (error) {
  console.error('Erro ao obter usuário:', error);
}
```

#### `validateToken(token?)`
Valida um token JWT.

```javascript
import { validateToken } from '@/services/authService';

try {
  const result = await validateToken();
  console.log('Token válido:', result.valid);
} catch (error) {
  console.error('Token inválido:', error);
}
```

#### `refreshToken()`
Renova o token de acesso.

```javascript
import { refreshToken } from '@/services/authService';

try {
  const response = await refreshToken();
  console.log('Token renovado:', response);
} catch (error) {
  console.error('Erro ao renovar token:', error);
}
```

#### `logout()`
Faz logout e limpa os dados armazenados.

```javascript
import { logout } from '@/services/authService';

logout();
```

#### `isAuthenticated()`
Verifica se o usuário está autenticado.

```javascript
import { isAuthenticated } from '@/services/authService';

if (isAuthenticated()) {
  console.log('Usuário autenticado');
}
```

#### `getToken()`
Obtém o token armazenado.

```javascript
import { getToken } from '@/services/authService';

const token = getToken();
```

#### `authenticatedFetch(endpoint, options)`
Faz requisição autenticada genérica.

```javascript
import { authenticatedFetch } from '@/services/authService';

try {
  const data = await authenticatedFetch('/users', {
    method: 'GET'
  });
  console.log('Dados:', data);
} catch (error) {
  console.error('Erro:', error);
}
```

## 🎣 Hook useAuth

Hook customizado para gerenciar autenticação em componentes.

```javascript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, isLoading, error, login, logout } = useAuth();

  if (isLoading) return <div>Carregando...</div>;

  if (!isAuthenticated) {
    return <div>Não autenticado</div>;
  }

  return (
    <div>
      <p>Bem-vindo, {user.name}!</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

### Propriedades

- `user` - Dados do usuário logado
- `isAuthenticated` - Booleano indicando se está autenticado
- `isLoading` - Booleano indicando se está carregando
- `error` - Mensagem de erro (se houver)
- `login(email, password)` - Função para fazer login
- `logout()` - Função para fazer logout
- `refreshUserData()` - Função para atualizar dados do usuário

## 🛡️ ProtectedRoute

Componente para proteger rotas que requerem autenticação.

```javascript
import ProtectedRoute from '@/components/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## 💾 Armazenamento Local

Os dados são armazenados em `localStorage`:

- `auth_token` - Token de acesso JWT
- `refresh_token` - Token para renovação
- `user_data` - Dados do usuário
- `remembered_email` - Email lembrado (opcional)

## 🔄 Fluxo de Autenticação

1. Usuário acessa `/login`
2. Preenche email e senha
3. Clica em "Entrar"
4. `LoginForm` valida os dados
5. Chama `authService.login()`
6. API retorna `access_token` e `refresh_token`
7. Tokens são armazenados em `localStorage`
8. `LoginPage` chama `getCurrentUser()`
9. Dados do usuário são armazenados
10. Redireciona para `/dashboard`

## 🔐 Renovação Automática de Token

Quando um token expira (401):

1. `authenticatedFetch` detecta o erro 401
2. Chama `refreshToken()` automaticamente
3. Obtém novo `access_token`
4. Tenta a requisição novamente
5. Se refresh falhar, faz logout

## ⚠️ Tratamento de Erros

### Erros Comuns

| Erro | Causa | Solução |
|------|-------|--------|
| "Token não encontrado" | Usuário não autenticado | Fazer login |
| "Token inválido" | Token expirado ou corrompido | Renovar token |
| "Sessão expirada" | Refresh token expirado | Fazer login novamente |
| "Email ou senha inválidos" | Credenciais incorretas | Verificar dados |

## 🧪 Testando a Autenticação

### Teste de Login
```javascript
// Abrir console do navegador (F12)
// Ir para /login
// Preencher email e senha
// Verificar localStorage
localStorage.getItem('auth_token')
localStorage.getItem('user_data')
```

### Teste de Token Expirado
```javascript
// Remover token
localStorage.removeItem('auth_token')
// Tentar acessar rota protegida
// Deve redirecionar para /login
```

## 📚 Referências

- [JWT (JSON Web Tokens)](https://jwt.io/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [React Hooks](https://react.dev/reference/react)
