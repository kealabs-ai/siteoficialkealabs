# 🧪 Guia de Testes - Módulo App Kealabs

## Pré-requisitos

- Node.js 16+
- npm ou yarn
- Acesso à API keaflow
- Credenciais de teste

---

## 🚀 Iniciar o Projeto

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Acessar
http://localhost:5173/app
```

---

## 🧪 Testes Manuais

### 1. Teste de Login

**Cenário**: Autenticação com credenciais válidas

```
1. Acesse http://localhost:5173/app
2. Você será redirecionado para /app/login
3. Preencha:
   - Email: seu@email.com
   - Senha: sua_senha
4. Clique em "Entrar"
5. Esperado: Redirecionamento para Dashboard
```

**Validações**:
- ✅ Erro com email inválido
- ✅ Erro com senha incorreta
- ✅ Token armazenado em localStorage
- ✅ Header exibe email do usuário

---

### 2. Teste de Dashboard

**Cenário**: Visualização de orçamentos

```
1. Após login, você está no Dashboard
2. Verifique:
   - Estatísticas carregadas
   - Lista de orçamentos
   - Status de cada orçamento
3. Teste ações:
   - Clique em "Aprovar"
   - Clique em "Rejeitar"
4. Esperado: Status atualizado em tempo real
```

**Validações**:
- ✅ Dados carregam corretamente
- ✅ Estatísticas calculadas
- ✅ Ações funcionam
- ✅ Valores formatados em BRL

---

### 3. Teste de Builder

**Cenário**: Criar novo orçamento

```
1. Clique em "Novo Orçamento" no header
2. Preencha dados do cliente:
   - Nome: Empresa Teste
   - Email: teste@empresa.com
   - Telefone: (11) 99999-9999
3. Selecione serviços:
   - ✅ Site Web
   - Menus: 8
   - Asaas: Sim
4. Clique em "Gerar Orçamento"
5. Esperado: Orçamento criado e redirecionado para Dashboard
```

**Validações**:
- ✅ Valores calculados corretamente
- ✅ Preview atualiza em tempo real
- ✅ Parcelamento funciona
- ✅ Orçamento salvo na API

---

### 4. Teste de Responsividade

**Desktop (1200px+)**
```
1. Abra DevTools (F12)
2. Desative modo responsivo
3. Verifique:
   - Layout em grid
   - Navegação horizontal
   - Cards lado a lado
```

**Tablet (768px - 1199px)**
```
1. DevTools → Responsive → iPad
2. Verifique:
   - Layout adaptado
   - Menu responsivo
   - Cards em 2 colunas
```

**Mobile (< 768px)**
```
1. DevTools → Responsive → iPhone 12
2. Verifique:
   - Layout em coluna única
   - Menu colapsável
   - Botões acessíveis
```

---

### 5. Teste de Cores Kealabs

**Verificar Paleta**:
```
1. Abra DevTools → Elements
2. Inspecione elementos
3. Verifique cores:
   - Primário: #0A2540 (Azul)
   - Alerta: #FF6B00 (Laranja)
   - Sucesso: #10B981 (Verde)
   - Neutro: #64748B (Cinza)
```

---

### 6. Teste de Formulários

**Validações**:
```
1. Tente enviar sem preencher nome
   → Esperado: Alerta "Informe o nome do cliente"

2. Tente enviar sem selecionar serviço
   → Esperado: Alerta "Selecione ao menos um tipo de serviço"

3. Preencha email inválido
   → Esperado: Input com borda vermelha

4. Teste range sliders
   → Esperado: Valores atualizam em tempo real
```

---

### 7. Teste de Cálculos

**Cenário**: Verificar cálculos de preço

```
1. Configure:
   - Site Web: 6 menus (base)
   - Sem extras
   - Sem módulos
   
2. Esperado:
   - Setup: R$ 2.500,00
   - Mensal: R$ 250,00 (10% de suporte)

3. Adicione:
   - 2 menus extras (300 cada)
   - Asaas (500)
   
4. Esperado:
   - Setup: R$ 3.600,00
   - Mensal: R$ 360,00
```

---

### 8. Teste de Parcelamento

**Cenário**: Verificar cálculo de parcelas

```
1. Setup: R$ 2.500,00
2. Comissão (10%): R$ 250,00
3. Total: R$ 2.750,00

4. Teste diferentes parcelamentos:
   - 1x: R$ 2.750,00
   - 3x: ~R$ 916,67
   - 12x: ~R$ 229,17

5. Esperado: Valores calculados com MDR correto
```

---

### 9. Teste de Autenticação

**Token JWT**:
```
1. Após login, abra DevTools → Application
2. Verifique localStorage:
   - access_token: [token_jwt]

3. Teste logout:
   - Clique em "Sair"
   - Esperado: Token removido
   - Redirecionado para login
```

---

### 10. Teste de Integração com API

**Endpoints**:
```
1. Abra DevTools → Network
2. Faça login
   → Esperado: POST /auth/login (200)

3. Acesse Dashboard
   → Esperado: GET /quotes (200)

4. Crie orçamento
   → Esperado: POST /quotes (201)

5. Atualize status
   → Esperado: POST /quotes/update-status (200)
```

---

## 🐛 Testes de Erro

### Erro de Conexão
```
1. Desconecte a internet
2. Tente fazer login
3. Esperado: Mensagem de erro clara
```

### Token Expirado
```
1. Remova token de localStorage
2. Tente acessar /app/dashboard
3. Esperado: Redirecionado para login
```

### API Indisponível
```
1. Altere VITE_API_URL para URL inválida
2. Tente fazer login
3. Esperado: Erro tratado graciosamente
```

---

## ✅ Checklist de Testes

- [ ] Login funciona
- [ ] Dashboard carrega dados
- [ ] Builder calcula valores
- [ ] Orçamento é criado
- [ ] Status é atualizado
- [ ] Responsividade funciona
- [ ] Cores Kealabs aplicadas
- [ ] Formulários validam
- [ ] Cálculos estão corretos
- [ ] Parcelamento funciona
- [ ] Token é armazenado
- [ ] Logout funciona
- [ ] Erros são tratados
- [ ] API integrada
- [ ] Performance aceitável

---

## 📊 Testes de Performance

### Lighthouse
```
1. DevTools → Lighthouse
2. Rode auditoria
3. Esperado:
   - Performance: > 80
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 90
```

### Tempo de Carregamento
```
1. DevTools → Network
2. Recarregue página
3. Esperado:
   - First Contentful Paint: < 1s
   - Largest Contentful Paint: < 2.5s
   - Cumulative Layout Shift: < 0.1
```

---

## 🔍 Testes de Acessibilidade

### Navegação por Teclado
```
1. Pressione Tab
2. Esperado: Foco visível em todos os elementos
3. Pressione Enter em botões
4. Esperado: Ação executada
```

### Leitores de Tela
```
1. Use NVDA ou JAWS
2. Navegue pela página
3. Esperado: Todos os elementos são lidos
```

### Contraste de Cores
```
1. Use ferramenta de contraste
2. Verifique todos os textos
3. Esperado: Contraste WCAG AA mínimo
```

---

## 📝 Relatório de Testes

Após completar os testes, preencha:

```markdown
# Relatório de Testes - Módulo App

**Data**: [data]
**Testador**: [nome]
**Versão**: 1.0.0

## Resultados

- [ ] Todos os testes passaram
- [ ] Alguns testes falharam
- [ ] Testes não executados

## Problemas Encontrados

1. [Problema 1]
   - Severidade: Alta/Média/Baixa
   - Descrição: [descrição]
   - Passos para reproduzir: [passos]

## Observações

[Observações gerais]

## Assinatura

Testador: ________________
Data: ________________
```

---

## 🚀 Próximos Passos

1. Executar testes automatizados (Jest, Cypress)
2. Testes de carga (k6, JMeter)
3. Testes de segurança (OWASP)
4. Testes de usabilidade com usuários reais

---

**Última atualização**: 2024
**Status**: ✅ Pronto para testes
