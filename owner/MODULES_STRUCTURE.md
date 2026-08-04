# Estrutura de Módulos - Painel Owner

Documentação da estrutura de módulos do painel administrativo Kealabs.

## 📁 Estrutura de Diretórios

```
owner/src/
├── modules/                    # Módulos do sistema
│   ├── dashboard/             # Módulo Dashboard
│   │   ├── components/        # Componentes reutilizáveis
│   │   │   ├── StatisticsCard.jsx
│   │   │   └── ActivityList.jsx
│   │   ├── pages/             # Páginas do módulo
│   │   │   └── DashboardPage.jsx
│   │   └── styles/            # Estilos do módulo
│   │       └── dashboard.css
│   │
│   ├── usuarios/              # Módulo Usuários
│   │   ├── components/
│   │   │   ├── UserTable.jsx
│   │   │   └── UserForm.jsx
│   │   ├── pages/
│   │   │   └── UsuariosPage.jsx
│   │   └── styles/
│   │       └── usuarios.css
│   │
│   ├── relatorios/            # Módulo Relatórios
│   │   ├── components/
│   │   │   └── ReportCard.jsx
│   │   ├── pages/
│   │   │   └── RelatoriosPage.jsx
│   │   └── styles/
│   │       └── relatorios.css
│   │
│   └── configuracoes/         # Módulo Configurações
│       ├── components/
│       │   └── SettingsSection.jsx
│       ├── pages/
│       │   └── ConfiguracoesPage.jsx
│       └── styles/
│           └── configuracoes.css
│
├── components/                # Componentes globais
│   ├── OwnerHeader.jsx
│   └── OwnerHeader.css
│
├── styles/                    # Estilos globais
│   └── global.css
│
├── utils/                     # Utilitários
│   └── extensionErrorHandler.js
│
├── App.jsx                    # Componente principal com rotas
└── index.jsx                  # Ponto de entrada
```

## 🎯 Módulos Disponíveis

### 1. Dashboard
**Rota**: `/owner/` ou `/owner/dashboard`

Página inicial com:
- Cards de estatísticas
- Lista de atividades recentes
- Visão geral do negócio

**Componentes**:
- `StatisticsCard` - Card com estatísticas
- `ActivityList` - Lista de atividades

### 2. Usuários
**Rota**: `/owner/usuarios`

Gerenciamento de usuários com:
- Tabela de usuários
- Formulário para adicionar novo usuário
- Ações (editar, deletar)

**Componentes**:
- `UserTable` - Tabela de usuários
- `UserForm` - Formulário de cadastro

### 3. Relatórios
**Rota**: `/owner/relatorios`

Visualização e geração de relatórios com:
- Cards de relatórios disponíveis
- Filtros por período
- Ações (visualizar, baixar)

**Componentes**:
- `ReportCard` - Card de relatório

### 4. Configurações
**Rota**: `/owner/configuracoes`

Gerenciamento de configurações com:
- Informações da empresa
- Preferências do sistema
- Autenticação

**Componentes**:
- `SettingsSection` - Seção de configurações

## 🎨 Identidade Visual

Todos os módulos seguem a identidade visual Kealabs:

**Cores**:
- Azul Profundo: `#0A2540`
- Verde Esmeralda: `#10B981`
- Ciano Digital: `#00B4D8`
- Laranja Alerta: `#FF6B00`
- Cinza Slate: `#64748B`

**Tipografia**: Inter (Google Fonts)

## 🚀 Como Adicionar um Novo Módulo

1. Crie a pasta do módulo em `src/modules/novo-modulo/`

2. Crie a estrutura:
```bash
mkdir -p src/modules/novo-modulo/{components,pages,styles}
```

3. Crie os arquivos:
   - `pages/NovoModuloPage.jsx` - Página principal
   - `components/ComponenteX.jsx` - Componentes
   - `styles/novo-modulo.css` - Estilos

4. Importe a página em `App.jsx`:
```jsx
import NovoModuloPage from './modules/novo-modulo/pages/NovoModuloPage';
```

5. Adicione a rota em `App.jsx`:
```jsx
<Route path="/novo-modulo" element={<NovoModuloPage />} />
```

6. Adicione o link no `OwnerHeader.jsx`:
```jsx
<li><Link to="/novo-modulo" onClick={() => setMenuOpen(false)}>Novo Módulo</Link></li>
```

## 📝 Convenções de Código

### Nomes de Arquivos
- Componentes: `PascalCase.jsx` (ex: `UserTable.jsx`)
- Páginas: `PascalCase.jsx` (ex: `UsuariosPage.jsx`)
- Estilos: `kebab-case.css` (ex: `usuarios.css`)

### Estrutura de Componentes
```jsx
import React from 'react';

const ComponentName = ({ prop1, prop2 }) => {
  return (
    <div className="component-name">
      {/* Conteúdo */}
    </div>
  );
};

export default ComponentName;
```

### Estilos
- Use classes com prefixo do módulo
- Siga a estrutura BEM (Block Element Modifier)
- Exemplo: `.usuarios-page`, `.user-table`, `.user-table__row`

## 🔄 Fluxo de Dados

1. **App.jsx** - Define as rotas
2. **OwnerHeader.jsx** - Navegação entre módulos
3. **Módulo/pages/Page.jsx** - Página principal do módulo
4. **Módulo/components/Component.jsx** - Componentes reutilizáveis
5. **Módulo/styles/modulo.css** - Estilos específicos

## 🧪 Testando Localmente

```bash
# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run start:owner

# Acessar
http://localhost:3001
```

## 📦 Build para Produção

```bash
# Build do owner
npm run build:owner

# Build de ambos (site + owner)
npm run build:all
```

## 🐛 Troubleshooting

### Módulo não aparece no menu
- Verifique se a rota foi adicionada em `App.jsx`
- Verifique se o link foi adicionado em `OwnerHeader.jsx`

### Estilos não carregam
- Verifique se o arquivo CSS foi importado na página
- Verifique o caminho relativo do import

### Componente não renderiza
- Verifique se o componente foi importado corretamente
- Verifique se há erros no console do navegador

## 📚 Referências

- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [CSS Best Practices](https://developer.mozilla.org/en-US/docs/Web/CSS)
