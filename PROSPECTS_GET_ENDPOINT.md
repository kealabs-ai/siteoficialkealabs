# 📋 Listagem de Prospects - GET /prospects

## ✅ Como Funciona

### 1. Carregamento de Dados

```javascript
useEffect(() => {
  fetchProspects();
}, []);

const fetchProspects = async () => {
  try {
    setLoading(true);
    const { data } = await api.get('/prospects');
    setProspects(data || []);
  } catch (err) {
    console.error('Erro ao buscar prospects:', err);
  } finally {
    setLoading(false);
  }
};
```

**O que acontece:**
1. Ao montar o componente, `useEffect` chama `fetchProspects()`
2. `fetchProspects()` faz uma requisição GET para `/prospects`
3. Os dados retornados são armazenados em `prospects` (state)
4. O loading é atualizado para `false`

### 2. Cálculo de Estatísticas

```javascript
const calculateStats = () => {
  const stats = {
    NEW: 0,
    CONTACTED: 0,
    NEGOTIATING: 0,
    APPROVED: 0,
    REJECTED: 0
  };

  prospects.forEach(prospect => {
    const status = prospect.status || 'NEW';
    if (stats.hasOwnProperty(status)) {
      stats[status]++;
    }
  });

  return stats;
};
```

**O que acontece:**
1. Itera sobre todos os prospects
2. Conta quantos prospects têm cada status
3. Retorna um objeto com as contagens

### 3. Renderização

#### Estado de Loading
```jsx
{loading ? (
  <div className="loading-state">
    <p>Carregando...</p>
  </div>
```

**Exibido enquanto os dados estão sendo carregados**

#### Estado Vazio
```jsx
) : prospects.length === 0 ? (
  <div className="empty-state">
    <p>Nenhum prospect cadastrado ainda</p>
    <button 
      className="btn-secondary"
      onClick={() => handleOpenModal()}
    >
      Adicionar o primeiro →
    </button>
  </div>
```

**Exibido quando não há prospects**

#### Lista de Prospects
```jsx
) : (
  <div className="prospects-grid">
    {prospects.map(prospect => (
      <ProspectCard
        key={prospect.id}
        prospect={prospect}
        onEdit={() => handleOpenModal(prospect)}
        onDelete={() => handleDeleteProspect(prospect.id)}
      />
    ))}
  </div>
)}
```

**Exibido quando há prospects**
- Cada prospect é renderizado em um `ProspectCard`
- Passa os dados do prospect como prop
- Passa funções de editar e deletar

## 📊 Fluxo de Dados

```
1. Componente Monta
   ↓
2. useEffect chama fetchProspects()
   ↓
3. GET /prospects é chamado
   ↓
4. Dados retornados são armazenados em prospects
   ↓
5. calculateStats() calcula estatísticas
   ↓
6. Componente renderiza:
   ├─ StatisticsCards (com contagens)
   └─ ProspectCards (com dados de cada prospect)
```

## 🔄 Atualização de Dados

### Após Criar Prospect
```javascript
const handleSaveProspect = async (formData) => {
  try {
    if (editingProspect) {
      await api.post('/prospects/update', { id: editingProspect.id, ...formData });
    } else {
      await api.post('/prospects', formData);
    }
    await fetchProspects();  // ← Recarrega a lista
    handleCloseModal();
  } catch (err) {
    console.error('Erro ao salvar prospect:', err);
  }
};
```

**O que acontece:**
1. Salva o prospect via POST
2. Chama `fetchProspects()` para recarregar a lista
3. Fecha o modal

### Após Deletar Prospect
```javascript
const handleDeleteProspect = async (id) => {
  if (window.confirm('Tem certeza que deseja remover este prospect?')) {
    try {
      await api.post('/prospects/delete', { id });
      setProspects(prospects.filter(p => p.id !== id));  // ← Atualiza localmente
    } catch (err) {
      console.error('Erro ao deletar prospect:', err);
    }
  }
};
```

**O que acontece:**
1. Pede confirmação ao usuário
2. Deleta o prospect via POST
3. Remove o prospect do state localmente (sem recarregar)

## 📝 Estrutura de Dados Esperada

### GET /prospects Response
```json
[
  {
    "id": "prospect-1",
    "nome": "João Silva",
    "email": "joao@exemplo.com",
    "cpfCnpj": "123.456.789-00",
    "telefone": "(11) 99999-9999",
    "empresa": "Empresa XYZ",
    "origem": "Instagram",
    "status": "NEW",
    "observacoes": "Prospect interessado em Web",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "id": "prospect-2",
    "nome": "Maria Santos",
    "email": "maria@exemplo.com",
    "cpfCnpj": "987.654.321-00",
    "telefone": "(11) 88888-8888",
    "empresa": "Empresa ABC",
    "origem": "WhatsApp",
    "status": "CONTACTED",
    "observacoes": "Aguardando retorno",
    "createdAt": "2024-01-14T15:45:00Z"
  }
]
```

## 🎯 Campos Utilizados

| Campo | Tipo | Obrigatório | Uso |
|-------|------|-------------|-----|
| id | string | ✅ | Identificador único |
| nome | string | ✅ | Exibido no card |
| email | string | ❌ | Exibido com ícone 📧 |
| cpfCnpj | string | ❌ | Armazenado (não exibido) |
| telefone | string | ❌ | Exibido com ícone 📱 |
| empresa | string | ❌ | Exibido com ícone 🏢 |
| origem | string | ❌ | Badge laranja |
| status | string | ❌ | Badge com cor |
| observacoes | string | ❌ | Exibido em destaque |
| createdAt | string | ❌ | Data (desktop only) |

## 🔌 Endpoints Utilizados

```
GET  /prospects              - Listar prospects
POST /prospects              - Criar novo prospect
POST /prospects/update       - Atualizar prospect
POST /prospects/delete       - Deletar prospect
```

## 📱 Estados da Página

### 1. Loading
```
┌─────────────────────────────┐
│ Carregando...               │
└─────────────────────────────┘
```

### 2. Vazio
```
┌─────────────────────────────┐
│ Nenhum prospect cadastrado  │
│ [Adicionar o primeiro →]    │
└─────────────────────────────┘
```

### 3. Com Dados
```
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ Novo │ │Contad│ │Negoc │ │Aprov │ │Rejei │
│  5   │ │  3   │ │  2   │ │  1   │ │  0   │
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘

┌─────────────────────────────┐
│ João Silva          [✏️][🗑️]│
│ [Novo] [Instagram]          │
│ 📧 joao@exemplo.com         │
│ 📱 (11) 99999-9999          │
│ 🏢 Empresa XYZ              │
│ Prospect interessado em Web │
│ 15/01/2024                  │
└─────────────────────────────┘
```

## ✅ Verificações

- ✅ GET /prospects é chamado ao montar
- ✅ Dados são armazenados em state
- ✅ Estatísticas são calculadas localmente
- ✅ Cards são renderizados com dados
- ✅ Lista é atualizada após criar/editar/deletar
- ✅ Estados de loading e vazio funcionam
- ✅ Pronto para produção

## 🚀 Como Testar

### 1. Verificar Carregamento
1. Abra DevTools (F12)
2. Vá para Network
3. Acesse `/home/prospect`
4. Verifique se GET /prospects é chamado

### 2. Verificar Dados
1. Abra DevTools (F12)
2. Vá para Console
3. Verifique se os dados são exibidos corretamente

### 3. Verificar Estatísticas
1. Conte os prospects por status
2. Verifique se as estatísticas estão corretas

### 4. Verificar Ações
1. Clique em ✏️ para editar
2. Clique em 🗑️ para deletar
3. Verifique se a lista é atualizada

---

**Versão**: 1.0.0
**Status**: ✅ Funcionando
**Data**: 2024
