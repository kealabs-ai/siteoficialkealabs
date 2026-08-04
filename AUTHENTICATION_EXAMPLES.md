# Exemplos de Uso - Sistema de Autenticação

## 1. Usando o Hook useAuth em um Componente

```javascript
import React from 'react';
import { useAuth } from '@/hooks/useAuth';

function UserProfile() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return <div>Carregando perfil...</div>;
  }

  if (!isAuthenticated) {
    return <div>Você não está autenticado</div>;
  }

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      <p>Nome: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Função: {user.role}</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}

export default UserProfile;
```

## 2. Usando authService Diretamente

```javascript
import React, { useState, useEffect } from 'react';
import * as authService from '@/services/authService';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Erro ao obter usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo, {user?.name}!</p>
    </div>
  );
}

export default Dashboard;
```

## 3. Fazendo Requisições Autenticadas

```javascript
import React, { useState, useEffect } from 'react';
import { authenticatedFetch } from '@/services/authService';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await authenticatedFetch('/users', {
          method: 'GET'
        });
        setUsers(data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Usuários</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
```

## 4. Criando um Componente de Logout

```javascript
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/services/authService';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>
      Sair
    </button>
  );
}

export default LogoutButton;
```

## 5. Verificando Autenticação Antes de Renderizar

```javascript
import React from 'react';
import { isAuthenticated } from '@/services/authService';
import { Navigate } from 'react-router-dom';

function AdminPanel() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h1>Painel Administrativo</h1>
      {/* Conteúdo do painel */}
    </div>
  );
}

export default AdminPanel;
```

## 6. Renovando Token Manualmente

```javascript
import React from 'react';
import { refreshToken } from '@/services/authService';

function RefreshTokenButton() {
  const handleRefresh = async () => {
    try {
      const response = await refreshToken();
      console.log('Token renovado:', response);
      alert('Token renovado com sucesso!');
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      alert('Erro ao renovar token. Faça login novamente.');
    }
  };

  return (
    <button onClick={handleRefresh}>
      Renovar Token
    </button>
  );
}

export default RefreshTokenButton;
```

## 7. Validando Token

```javascript
import React, { useState } from 'react';
import { validateToken } from '@/services/authService';

function TokenValidator() {
  const [isValid, setIsValid] = useState(null);

  const handleValidate = async () => {
    try {
      const result = await validateToken();
      setIsValid(result.valid);
    } catch (error) {
      setIsValid(false);
      console.error('Erro ao validar token:', error);
    }
  };

  return (
    <div>
      <button onClick={handleValidate}>
        Validar Token
      </button>
      {isValid !== null && (
        <p>
          Token é {isValid ? 'válido' : 'inválido'}
        </p>
      )}
    </div>
  );
}

export default TokenValidator;
```

## 8. Componente de Login Customizado

```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/services/authService';

function CustomLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}

export default CustomLogin;
```

## 9. Interceptador de Requisições (Middleware)

```javascript
import { authenticatedFetch } from '@/services/authService';

// Usar em qualquer lugar do app
async function fetchUserData() {
  try {
    // Automaticamente adiciona Authorization header
    // Automaticamente renova token se expirado
    const data = await authenticatedFetch('/user/profile');
    return data;
  } catch (error) {
    console.error('Erro:', error);
  }
}
```

## 10. Verificando Dados do Usuário Armazenados

```javascript
import React from 'react';
import { getStoredUser, getToken } from '@/services/authService';

function DebugAuth() {
  const user = getStoredUser();
  const token = getToken();

  return (
    <div>
      <h2>Debug - Dados de Autenticação</h2>
      <p>Token: {token ? token.substring(0, 20) + '...' : 'Não encontrado'}</p>
      <p>Usuário: {user ? JSON.stringify(user, null, 2) : 'Não encontrado'}</p>
    </div>
  );
}

export default DebugAuth;
```

## Dicas Importantes

1. **Sempre use ProtectedRoute** para rotas que requerem autenticação
2. **Use o hook useAuth** em componentes que precisam de dados do usuário
3. **Trate erros adequadamente** em todas as chamadas de autenticação
4. **Não armazene senhas** em localStorage
5. **Limpe dados** ao fazer logout
6. **Valide tokens** periodicamente
7. **Use HTTPS** em produção
8. **Implemente refresh automático** de tokens
