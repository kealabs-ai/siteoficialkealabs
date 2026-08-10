# Módulo Financeiro

Módulo para gerenciar cobranças, pagamentos e recebimentos integrado com o Asaas.

## 📋 Funcionalidades

- **Cobranças**: Criar, listar, editar e deletar cobranças
- **Pagamentos**: Gerenciar pagamentos (em desenvolvimento)
- **Recebimentos**: Visualizar recebimentos
- **Estatísticas**: Dashboard com resumo financeiro
- **Integração Asaas**: Sincronização com API do Asaas

## 🔧 Configuração

### Variáveis de Ambiente

Adicione as seguintes variáveis ao arquivo `.env` (copie de `.env.example`):

```env
VITE_ASAAS_API_URL=https://api.asaas.com/v3
VITE_ASAAS_API_KEY=seu_token_asaas_aqui
```

**Nota:** O projeto usa Vite, então as variáveis devem começar com `VITE_`

### Obter Token Asaas

1. Acesse [https://www.asaas.com](https://www.asaas.com)
2. Faça login na sua conta
3. Vá em Configurações > Integrações > API
4. Copie seu token de acesso

## 📁 Estrutura

```
financeiro/
├── components/
│   ├── CobrancasTable.jsx      # Tabela de cobranças
│   ├── RecebimentosTable.jsx   # Tabela de recebimentos
│   ├── CobrancaModal.jsx       # Modal para criar/editar
│   └── FinanceiroCard.jsx      # Card de estatísticas
├── hooks/
│   ├── useCobrancas.js         # Hook para cobranças
│   └── useRecebimentos.js      # Hook para recebimentos
├── pages/
│   └── FinanceiroPage.jsx      # Página principal
├── services/
│   └── asaasService.js         # Serviço de integração Asaas
├── styles/
│   └── financeiro.css          # Estilos
└── README.md
```

## 🚀 Uso

### Importar a Página

```jsx
import FinanceiroPage from './modules/financeiro/pages/FinanceiroPage';
```

### Adicionar Rota

```jsx
<Route path="/financeiro" element={<FinanceiroPage />} />
```

## 📊 API Asaas

### Endpoints Utilizados

- `POST /payments` - Criar cobrança
- `GET /payments` - Listar cobranças
- `GET /payments/{id}` - Obter cobrança
- `PUT /payments/{id}` - Atualizar cobrança
- `DELETE /payments/{id}` - Deletar cobrança
- `GET /customers` - Listar clientes
- `POST /customers` - Criar cliente

## 🎨 Customização

### Cores

As cores podem ser customizadas no arquivo `financeiro.css`:

- Primária: `#10B981` (Verde)
- Secundária: `#EA580C` (Laranja)
- Alerta: `#FF6B00` (Laranja Alerta)
- Sucesso: `#10B981` (Verde)
- Erro: `#DC2626` (Vermelho)

## 📝 Notas

- O módulo utiliza a API v3 do Asaas
- Todos os valores são em BRL
- As datas seguem o formato ISO 8601
- O token Asaas deve ser mantido seguro

## 🔐 Segurança

- Nunca exponha o token Asaas no código
- Use variáveis de ambiente
- Valide todos os dados no backend
- Implemente autenticação e autorização

## 📞 Suporte

Para mais informações sobre a API Asaas, visite:
[https://docs.asaas.com](https://docs.asaas.com)
