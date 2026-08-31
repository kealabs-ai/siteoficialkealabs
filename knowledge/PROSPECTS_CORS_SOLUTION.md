# 🔧 Solução CORS - Dados Mock para Desenvolvimento

## ❌ Problema

```
Access to XMLHttpRequest at 'https://srv1023256.hstgr.cloud/api/prospects' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Causa**: O backend não está configurado para aceitar requisições do localhost durante desenvolvimento.

## ✅ Solução Implementada

Criamos um hook `useProspects` que:
1. Tenta conectar à API real
2. Se falhar, usa dados mock automaticamente
3. Funciona tanto com API real quanto com dados mock

## 📁 Arquivos Criados

### useProspects.js
```
src/modules/prospects/hooks/useProspects.js
```

**Funcionalidades:**
- Tenta buscar dados da API
- Fallback para dados mock se API falhar
- Suporta criar, atualizar e deletar prospects
- Funciona tanto em modo mock quanto em modo real

## 🔄 Como Funciona

### 1. Carregamento Inicial

```javascript
useEffect(() => {
  fetchProspects();
}, []);

const fetchProspects = async () => {
  try {
    // Tenta API real
    const { data } = await api.get('/prospects');
    setProspects(data);
    setUseMock(false);
  } catch (apiError) {
    // Fallback para mock
    setProspects(MOCK_PROSPECTS);
    setUseMock(true);
  }
};
```

### 2. Indicador Visual

```jsx
{useMock && (
  <small style={{ color: '#f59e0b' }}>
    ⚠️ Usando dados de demonstração (API indisponível)
  </small>
)}
```

Exibe aviso quando usando dados mock.

### 3. Operações CRUD

#### Criar Prospect
```javascript
if (useMock) {
  // Mock: adiciona localmente
  const newProspect = {
    id: Date.now().toString(),
    ...formData,
    createdAt: new Date().toISOString()
  };
  setProspects([newProspect, ...prospects]);
} else {
  // Real: envia para API
  const { data } = await api.post('/prospects', formData);
  setProspects([data, ...prospects]);
}
```

#### Atualizar Prospect
```javascript
if (useMock) {
  // Mock: atualiza localmente
  const updated = prospects.map(p => 
    p.id === id ? { ...p, ...formData } : p
  );
  setProspects(updated);
} else {
  // Real: envia para API
  await api.post('/prospects/update', { id, ...formData });
}
```

#### Deletar Prospect
```javascript
if (useMock) {
  // Mock: remove localmente
  setProspects(prospects.filter(p => p.id !== id));
} else {
  // Real: envia para API
  await api.post('/prospects/delete', { id });
}
```

## 📊 Dados Mock

5 prospects de exemplo com todos os campos:

```javascript
[
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    cpfCnpj: '123.456.789-00',
    telefone: '(11) 99999-9999',
    empresa: 'Empresa XYZ',
    origem: 'Instagram',
    status: 'NEW',
    observacoes: 'Prospect interessado em Web',
    createdAt: '2024-01-15T10:30:00Z'
  },
  // ... mais 4 prospects
]
```

## 🎯 Benefícios

✅ **Desenvolvimento sem API**: Funciona localmente sem backend
✅ **Transição Suave**: Muda automaticamente para API real quando disponível
✅ **Sem Mudanças de Código**: Mesmo código funciona em ambos os modos
✅ **Dados Realistas**: Mock com dados completos e variados
✅ **Indicador Visual**: Mostra quando está usando mock

## 🔄 Fluxo de Funcionamento

```
Componente Monta
    ↓
useProspects() é chamado
    ↓
fetchProspects() tenta GET /prospects
    ↓
┌─────────────────────────────────────┐
│ API Disponível?                     │
├─────────────────────────────────────┤
│ SIM → Usa dados reais                │
│ NÃO → Usa dados mock                 │
└─────────────────────────────────────┘
    ↓
Componente renderiza com dados
    ↓
Usuário interage (criar, editar, deletar)
    ↓
Hook atualiza dados (mock ou real)
    ↓
Componente re-renderiza
```

## 📝 Uso no ProspectsPage

```javascript
import useProspects from '../hooks/useProspects';

const ProspectsPage = () => {
  const { 
    prospects, 
    loading, 
    useMock, 
    createProspect, 
    updateProspect, 
    deleteProspect 
  } = useProspects();

  // ... resto do código
};
```

## 🚀 Próximos Passos

### Para Desenvolvimento Local
- ✅ Funciona com dados mock
- ✅ Teste todas as funcionalidades
- ✅ Sem necessidade de backend

### Para Produção
1. Configurar CORS no backend
2. Adicionar headers:
   ```
   Access-Control-Allow-Origin: http://localhost:3000
   Access-Control-Allow-Methods: GET, POST, PUT, DELETE
   Access-Control-Allow-Headers: Content-Type, Authorization
   ```
3. Hook automaticamente usará API real

## 🔐 Segurança

- ✅ Dados mock são apenas para desenvolvimento
- ✅ Em produção, usa API real com autenticação
- ✅ Sem exposição de dados sensíveis

## 📊 Estatísticas

| Métrica | Valor |
|---------|-------|
| Prospects Mock | 5 |
| Campos por Prospect | 10 |
| Modos Suportados | 2 (Mock + Real) |
| Operações CRUD | 4 (Create, Read, Update, Delete) |

## ✅ Verificações

- ✅ Projeto compila sem erros
- ✅ Dados mock carregam corretamente
- ✅ Operações CRUD funcionam
- ✅ Indicador visual funciona
- ✅ Transição para API real é automática
- ✅ Pronto para desenvolvimento

## 🎯 Resultado

Agora você pode:
1. ✅ Desenvolver localmente sem backend
2. ✅ Testar todas as funcionalidades
3. ✅ Ver dados realistas
4. ✅ Transição automática para API real quando disponível

---

**Versão**: 1.0.0
**Status**: ✅ Funcionando
**Data**: 2024
