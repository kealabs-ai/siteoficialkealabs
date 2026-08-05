# Módulo de Prospects

## 📋 Visão Geral

Módulo completo para gerenciamento de prospects (leads) com estatísticas por status, criação/edição de prospects e ações de gerenciamento.

## 📁 Estrutura

```
src/modules/prospects/
├── pages/
│   └── ProspectsPage.jsx          # Página principal
├── components/
│   ├── ProspectModal.jsx          # Modal de criação/edição
│   ├── ProspectCard.jsx           # Card de prospect
│   └── StatisticsCard.jsx         # Card de estatísticas
├── styles/
│   ├── prospects.css              # Estilos da página
│   └── modal.css                  # Estilos do modal
└── README.md                      # Este arquivo
```

## ✨ Funcionalidades

### 1. Header
- Título "Prospects"
- Subtítulo "Gerencie seus leads e oportunidades"
- Botão "Novo Prospect" que abre o modal

### 2. Cards de Estatísticas
- 5 cards calculados localmente por status:
  - **Novo** (NEW) - Azul
  - **Contatado** (CONTACTED) - Amarelo
  - **Negociando** (NEGOTIATING) - Roxo
  - **Aprovado** (APPROVED) - Verde
  - **Rejeitado** (REJECTED) - Vermelho

### 3. Modal de Criação/Edição
Campos do formulário:
- **Nome** * (obrigatório)
- **E-mail** (opcional)
- **CPF/CNPJ** (opcional)
- **Telefone** (opcional)
- **Empresa** (opcional)
- **Origem** (select: Instagram, WhatsApp, Site, Indicação, Outro)
- **Status** (select: Novo, Contatado, Negociando, Aprovado, Rejeitado)
- **Observações** (textarea)

Ações:
- **Salvar (novo)**: POST /prospects
- **Salvar (edição)**: POST /prospects/update
- **Cancelar**: Fecha o modal

### 4. Lista de Prospects
Cada card exibe:
- Nome em destaque
- Badge de status (cor por status)
- Badge de origem (laranja)
- E-mail, telefone, empresa (quando preenchidos)
- Data de criação (formato pt-BR, desktop apenas)
- Observações (quando preenchidas)

Ações por card:
- **✏️ Editar**: Abre modal preenchido
- **🗑️ Remover**: Confirma e remove (POST /prospects/delete)

### 5. Estados
- **Loading**: "Carregando..."
- **Vazio**: Mensagem com botão "Adicionar o primeiro →"

## 🔌 Endpoints Utilizados

```
GET  /prospects              - Listar prospects
POST /prospects              - Criar novo prospect
POST /prospects/update       - Atualizar prospect
POST /prospects/delete       - Deletar prospect
```

## 🎨 Cores por Status

| Status | Cor | Código |
|--------|-----|--------|
| Novo | Azul | #3B82F6 |
| Contatado | Amarelo | #F59E0B |
| Negociando | Roxo | #A855F7 |
| Aprovado | Verde | #10B981 |
| Rejeitado | Vermelho | #EF4444 |

## 📱 Responsividade

- **Desktop (1200px+)**: Layout completo com grid
- **Tablet (768px - 1199px)**: Ajustes de grid
- **Mobile (< 768px)**: Stack vertical, modal em tela cheia

## 🚀 Como Usar

### Acessar o módulo
```
/home/prospect
```

### Criar novo prospect
1. Clique em "+ Novo Prospect"
2. Preencha os dados (Nome é obrigatório)
3. Clique em "Salvar"

### Editar prospect
1. Clique no ícone ✏️ no card
2. Modifique os dados
3. Clique em "Salvar"

### Remover prospect
1. Clique no ícone 🗑️ no card
2. Confirme a remoção

## 📊 Cálculo de Estatísticas

As estatísticas são calculadas localmente a partir dos dados carregados:

```javascript
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
```

## 🔄 Fluxo de Dados

```
ProspectsPage (carrega dados)
  ├── GET /prospects
  ├── Calcula estatísticas localmente
  ├── Renderiza StatisticsCards
  └── Renderiza ProspectCards
      ├── Editar → ProspectModal (preenchido)
      └── Deletar → POST /prospects/delete
```

## 📝 Exemplo de Payload

### POST /prospects (Criar)
```json
{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "cpfCnpj": "123.456.789-00",
  "telefone": "(11) 99999-9999",
  "empresa": "Empresa XYZ",
  "origem": "Instagram",
  "status": "NEW",
  "observacoes": "Prospect interessado em Web"
}
```

### POST /prospects/update (Editar)
```json
{
  "id": "prospect-123",
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "cpfCnpj": "123.456.789-00",
  "telefone": "(11) 99999-9999",
  "empresa": "Empresa XYZ",
  "origem": "Instagram",
  "status": "CONTACTED",
  "observacoes": "Prospect interessado em Web"
}
```

### POST /prospects/delete (Deletar)
```json
{
  "id": "prospect-123"
}
```

## 🎯 Componentes

### ProspectsPage.jsx
- Gerencia estado geral
- Carrega dados via GET /prospects
- Calcula estatísticas
- Renderiza header, cards e lista

### ProspectModal.jsx
- Formulário de criação/edição
- Validação de campos obrigatórios
- Envia dados para API

### ProspectCard.jsx
- Exibe informações do prospect
- Botões de editar e deletar
- Formatação de datas

### StatisticsCard.jsx
- Card de estatísticas
- Cor por status
- Contagem de prospects

## 🔐 Segurança

- ✅ Validação de campos obrigatórios
- ✅ Confirmação antes de deletar
- ✅ Tratamento de erros
- ✅ Autenticação via token (API)

## 📱 Responsividade

- ✅ Desktop: Layout completo
- ✅ Tablet: Ajustes de grid
- ✅ Mobile: Stack vertical

## 🎨 Design

- Cores: Seguem identidade visual Kealabs
- Tipografia: Inter (Google Fonts)
- Componentes: Cards, modais, badges
- Ícones: Emojis (✏️, 🗑️)

## 🚀 Próximos Passos (Opcional)

1. Adicionar filtros por status/origem
2. Implementar busca por nome
3. Adicionar paginação
4. Exportar dados em CSV
5. Adicionar histórico de alterações
6. Implementar notificações
