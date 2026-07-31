# 🚀 Guia de Integração - Módulo App Kealabs

## Resumo da Implementação

O módulo `/app` foi criado com sucesso, integrando a ideia do **keaflow** (builder de orçamentos) ao projeto **SiteKealabs** com o visual corporativo da Kealabs.

## ✅ O que foi implementado

### 1. **Estrutura de Componentes**
- ✅ `Login.tsx` - Autenticação integrada com API keaflow
- ✅ `ClientHeader.tsx` - Navegação do app com menu
- ✅ `Dashboard.tsx` - Visualização de orçamentos
- ✅ `Builder.tsx` - Criador de orçamentos com cálculo automático

### 2. **Integração com APIs**
- ✅ `api.ts` - Cliente HTTP com interceptadores
- ✅ `useSettings.ts` - Hook para carregar configurações de preços
- ✅ Endpoints integrados:
  - `/auth/login` - Autenticação
  - `/quotes` - CRUD de orçamentos
  - `/settings` - Configurações de preços
  - `/prospects` - Lista de prospects

### 3. **Visual Kealabs**
- ✅ Cores corporativas aplicadas:
  - Azul Profundo (#0A2540) - Primário
  - Verde Esmeralda (#10B981) - Sucesso
  - Ciano Digital (#00B4D8) - Informação
  - Laranja Alerta (#FF6B00) - Ação
  - Cinza Slate (#64748B) - Neutro

### 4. **Funcionalidades**
- ✅ Dashboard com estatísticas
- ✅ Builder com múltiplos serviços:
  - Site Web
  - Mini Site
  - Business Intelligence
  - AI Agent
- ✅ Módulos adicionais (n8n, WhatsApp, Agile, etc.)
- ✅ Cálculo automático de valores
- ✅ Parcelamento configurável
- ✅ Integração com prospects

## 📦 Arquivos Criados

```
app/src/
├── lib/
│   ├── api.ts                 # Cliente HTTP e tipos
│   └── useSettings.ts         # Hook de configurações
├── pages/
│   ├── Dashboard.tsx          # Dashboard de orçamentos
│   └── Builder.tsx            # Builder de orçamentos
├── components/
│   ├── Login.tsx              # Tela de login
│   ├── Login.css              # Estilos do login
│   ├── ClientHeader.tsx       # Header do app
│   └── ClientHeader.css       # Estilos do header
├── styles/
│   ├── global.css             # Estilos globais
│   ├── dashboard.css          # Estilos do dashboard
│   └── builder.css            # Estilos do builder
├── App.tsx                    # Componente principal (atualizado)
├── config.ts                  # Configurações centralizadas
└── README_APP.md              # Documentação do módulo
```

## 🔧 Configuração Necessária

### 1. Instalar Dependências

```bash
npm install axios react-router-dom
```

### 2. Variáveis de Ambiente

Adicione ao `.env.local`:

```env
VITE_API_URL=https://srv1023256.hstgr.cloud
```

### 3. Atualizar Roteamento Principal

Se o projeto usa React Router, adicione ao App.tsx principal:

```tsx
<Route path="/app/*" element={<AppModule />} />
```

## 🎯 Fluxo de Uso

1. **Acesso**: Usuário acessa `/app`
2. **Login**: Autentica com email/senha
3. **Dashboard**: Visualiza orçamentos existentes
4. **Builder**: Cria novo orçamento
5. **Configuração**: Seleciona serviços e módulos
6. **Cálculo**: Sistema calcula valores automaticamente
7. **Salvamento**: Orçamento é salvo na API

## 🔐 Autenticação

- Token JWT armazenado em `localStorage`
- Interceptador automático em todas as requisições
- Logout limpa o token

## 💡 Recursos Principais

### Dashboard
- Estatísticas de orçamentos
- Filtro por status
- Ações de aprovação/rejeição
- Valores em tempo real

### Builder
- Seleção múltipla de serviços
- Configuração granular de opções
- Preview de valores em tempo real
- Cálculo de parcelamento
- Integração com prospects

## 🎨 Customização

### Cores
Edite `:root` em `styles/global.css`:

```css
:root {
  --kea-primary: #0A2540;
  --kea-alert: #FF6B00;
  /* ... */
}
```

### Preços
Edite `config.ts` ou carregue da API via `useSettings()`

### Textos
Centralizados em `config.ts` > `MESSAGES`

## 📱 Responsividade

Todos os componentes são responsivos:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🚀 Próximas Melhorias

1. Geração de PDF de propostas
2. Histórico de alterações
3. Integração com Asaas (pagamentos)
4. Relatórios e analytics
5. Notificações em tempo real
6. Exportação de dados
7. Integração com CRM

## 🐛 Troubleshooting

### Erro de autenticação
- Verifique se a API está acessível
- Confirme credenciais
- Limpe localStorage

### Valores não carregam
- Verifique endpoint `/settings`
- Confirme token de autenticação
- Verifique console para erros

### Estilos não aplicam
- Limpe cache do navegador
- Verifique importação de CSS
- Confirme caminhos dos arquivos

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação em `README_APP.md`
2. Consulte `config.ts` para configurações
3. Verifique console do navegador para erros
4. Entre em contato com a equipe Kealabs

---

**Status**: ✅ Implementação Completa
**Versão**: 1.0.0
**Data**: 2024
