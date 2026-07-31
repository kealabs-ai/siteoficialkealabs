# Módulo App - Kealabs

Módulo de aplicação cliente integrado ao projeto SiteKealabs com funcionalidades de Dashboard e Builder de Orçamentos.

## 🎯 Funcionalidades

- **Dashboard**: Visualização de orçamentos e propostas
- **Builder**: Criador de orçamentos com cálculo automático
- **Integração com API**: Conectado ao backend keaflow
- **Autenticação**: Login integrado com JWT
- **Visual Kealabs**: Cores e design seguindo identidade visual

## 🎨 Cores Utilizadas

- **Azul Profundo**: #0A2540 (Primário)
- **Verde Esmeralda**: #10B981 (Sucesso)
- **Ciano Digital**: #00B4D8 (Informação)
- **Laranja Alerta**: #FF6B00 (Ação)
- **Cinza Slate**: #64748B (Neutro)

## 📁 Estrutura

```
app/src/
├── components/
│   ├── Login.tsx
│   ├── Login.css
│   ├── ClientHeader.tsx
│   └── ClientHeader.css
├── pages/
│   ├── Dashboard.tsx
│   └── Builder.tsx
├── lib/
│   ├── api.ts
│   └── useSettings.ts
├── styles/
│   ├── global.css
│   ├── dashboard.css
│   └── builder.css
├── App.tsx
└── index.tsx
```

## 🚀 Instalação

1. Instale as dependências necessárias:

```bash
npm install axios react-router-dom
```

2. Configure as variáveis de ambiente no `.env.local`:

```env
VITE_API_URL=https://srv1023256.hstgr.cloud
```

## 🔌 Integração com API

O módulo utiliza as seguintes endpoints do keaflow:

### Autenticação
- `POST /auth/login` - Login de usuário

### Orçamentos
- `GET /quotes` - Listar orçamentos
- `POST /quotes` - Criar novo orçamento
- `POST /quotes/update-status` - Atualizar status

### Configurações
- `GET /settings` - Listar configurações de preços

### Prospects
- `GET /prospects` - Listar prospects

## 📝 Uso

### Login

O usuário acessa `/app` e é redirecionado para login. Após autenticação, recebe um token JWT armazenado em `localStorage`.

### Dashboard

Exibe:
- Estatísticas de orçamentos
- Lista de orçamentos com status
- Ações para aprovar/rejeitar

### Builder

Permite criar orçamentos com:
- Seleção de serviços (Web, Mini Site, BI, AI Agent)
- Configuração de módulos adicionais
- Cálculo automático de valores
- Parcelamento configurável

## 🔐 Autenticação

O token JWT é armazenado em `localStorage` e enviado automaticamente em todas as requisições via interceptor do axios.

## 🎯 Próximos Passos

1. Implementar geração de PDF de propostas
2. Adicionar histórico de alterações
3. Integrar com sistema de pagamento (Asaas)
4. Adicionar relatórios e analytics
5. Implementar notificações em tempo real

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com a equipe Kealabs.
