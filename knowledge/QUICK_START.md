# ⚡ Quick Start - Módulo App Kealabs

## 🚀 5 Minutos para Começar

### 1️⃣ Instalar Dependências (1 min)

```bash
npm install axios react-router-dom
```

### 2️⃣ Configurar Ambiente (1 min)

Crie ou edite `.env.local`:

```env
VITE_API_URL=https://srv1023256.hstgr.cloud
```

### 3️⃣ Iniciar Servidor (1 min)

```bash
npm run dev
```

### 4️⃣ Acessar App (1 min)

Abra no navegador:
```
http://localhost:5173/app
```

### 5️⃣ Fazer Login (1 min)

```
Email: seu@email.com
Senha: sua_senha
```

---

## 📍 Rotas Disponíveis

| Rota | Descrição |
|------|-----------|
| `/app` | Redireciona para login ou dashboard |
| `/app/login` | Tela de login |
| `/app/dashboard` | Dashboard de orçamentos |
| `/app/builder` | Criador de orçamentos |

---

## 🎯 Fluxo Principal

```
1. Acesse /app
   ↓
2. Faça login
   ↓
3. Veja Dashboard
   ↓
4. Clique em "Novo Orçamento"
   ↓
5. Configure o orçamento
   ↓
6. Clique em "Gerar Orçamento"
   ↓
7. Orçamento criado!
```

---

## 🔧 Configurações Rápidas

### Alterar Cores

Edite `app/src/styles/global.css`:

```css
:root {
  --kea-primary: #0A2540;    /* Azul */
  --kea-alert: #FF6B00;      /* Laranja */
  --kea-success: #10B981;    /* Verde */
  --kea-cyan: #00B4D8;       /* Ciano */
  --kea-neutral: #64748B;    /* Cinza */
}
```

### Alterar Preços

Edite `app/src/config.ts`:

```typescript
PRICING_DEFAULTS: {
  WEB: {
    BASE: 2500,              // Altere aqui
    FREE_MENUS: 6,
    EXTRA_MENU_PRICE: 300,
  },
  // ...
}
```

### Alterar API

Edite `.env.local`:

```env
VITE_API_URL=https://sua-api.com
```

---

## 🧪 Testar Funcionalidades

### Dashboard
```
1. Após login, você está no Dashboard
2. Veja estatísticas
3. Clique em "Aprovar" ou "Rejeitar"
```

### Builder
```
1. Clique em "Novo Orçamento"
2. Preencha dados do cliente
3. Selecione serviços
4. Veja valores atualizarem
5. Clique em "Gerar Orçamento"
```

### Logout
```
1. Clique em "Sair" no header
2. Você será redirecionado para login
```

---

## 🐛 Troubleshooting Rápido

### Erro: "Cannot find module 'axios'"
```bash
npm install axios
```

### Erro: "API não responde"
- Verifique `.env.local`
- Confirme URL da API
- Verifique conexão de internet

### Erro: "Não consigo fazer login"
- Verifique credenciais
- Confirme API está rodando
- Limpe localStorage: `localStorage.clear()`

### Estilos não aparecem
- Limpe cache: `Ctrl+Shift+Delete`
- Recarregue página: `Ctrl+F5`
- Verifique importação de CSS

---

## 📱 Testar Responsividade

### DevTools (F12)
```
1. Abra DevTools
2. Clique em "Toggle device toolbar"
3. Selecione dispositivo
4. Teste navegação
```

### Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

---

## 🔐 Verificar Autenticação

### localStorage
```javascript
// Abra Console (F12)
localStorage.getItem('access_token')
// Deve retornar um token JWT
```

### Logout
```javascript
localStorage.removeItem('access_token')
// Você será redirecionado para login
```

---

## 📊 Verificar Dados

### Network Tab (F12)
```
1. Abra DevTools → Network
2. Faça login
3. Veja requisições:
   - POST /auth/login
   - GET /quotes
   - GET /settings
```

### Console (F12)
```
1. Abra DevTools → Console
2. Veja logs de requisições
3. Procure por erros
```

---

## 🎨 Customizar Rápido

### Mudar Logo
Edite `app/src/components/ClientHeader.tsx`:

```tsx
<h1>Seu Logo Aqui</h1>
```

### Mudar Título
Edite `app/src/pages/Dashboard.tsx`:

```tsx
<h1>Seu Título Aqui</h1>
```

### Mudar Mensagens
Edite `app/src/config.ts`:

```typescript
MESSAGES: {
  LOGIN_ERROR: 'Sua mensagem aqui',
  // ...
}
```

---

## 📚 Documentação Completa

Para mais detalhes, consulte:

- `README_APP.md` - Documentação técnica
- `INTEGRATION_GUIDE.md` - Guia de integração
- `IMPLEMENTATION_SUMMARY.md` - Sumário
- `TESTING_GUIDE.md` - Guia de testes
- `EXECUTIVE_SUMMARY.md` - Resumo executivo

---

## ✅ Checklist Rápido

- [ ] Dependências instaladas
- [ ] `.env.local` configurado
- [ ] Servidor rodando
- [ ] App acessível em `/app`
- [ ] Login funcionando
- [ ] Dashboard carregando
- [ ] Builder criando orçamentos
- [ ] Responsividade testada

---

## 🚀 Próximos Passos

1. **Customizar**: Adapte cores, textos e preços
2. **Testar**: Execute testes manuais
3. **Deploy**: Faça deploy para produção
4. **Monitorar**: Acompanhe performance
5. **Melhorar**: Implemente feedback

---

## 💡 Dicas Úteis

### Desenvolvimento Rápido
```bash
# Hot reload automático
npm run dev

# Abra DevTools
F12

# Inspecione elementos
Ctrl+Shift+C
```

### Debugging
```javascript
// Console
console.log('Debug:', variavel)

// Network
DevTools → Network → Veja requisições

// Storage
DevTools → Application → localStorage
```

### Performance
```bash
# Build otimizado
npm run build

# Analise bundle
npm run build -- --analyze
```

---

## 📞 Suporte Rápido

**Problema**: Não consigo fazer login
**Solução**: Verifique credenciais e API

**Problema**: Valores não calculam
**Solução**: Verifique `config.ts` e API

**Problema**: Estilos estranhos
**Solução**: Limpe cache e recarregue

**Problema**: Erro na API
**Solução**: Verifique `.env.local` e conexão

---

## 🎉 Pronto!

Você está pronto para usar o módulo App Kealabs!

```
✅ Instalado
✅ Configurado
✅ Rodando
✅ Testado
✅ Pronto para usar
```

---

**Tempo total**: ~5 minutos ⏱️
**Dificuldade**: Fácil 😊
**Status**: ✅ Pronto para produção

Boa sorte! 🚀
