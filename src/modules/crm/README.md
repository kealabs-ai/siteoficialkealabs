# Módulo CRM - Gestão de Clientes

Módulo para gerenciamento de clientes integrado com a API Asaas.

## 📁 Estrutura

```
crm/
├── pages/
│   └── ClientsPage.jsx          # Página principal
├── components/
│   ├── ClientForm.jsx           # Formulário de cadastro
│   └── ClientsList.jsx          # Listagem de clientes
├── hooks/
│   └── useAsaasAPI.js           # Hook para integração com Asaas
├── styles/
│   ├── clients.css              # Estilos da página
│   ├── form.css                 # Estilos do formulário
│   └── list.css                 # Estilos da listagem
└── README.md
```

## 🚀 Uso

### Importar a página no roteador

```jsx
import ClientsPage from './modules/crm/pages/ClientsPage';

// No seu roteador
<Route path="/crm/clientes" element={<ClientsPage />} />
```

## 📋 Campos do Formulário

### Informações Pessoais
- **Nome** (obrigatório)
- **Tipo de Pessoa** (Física/Jurídica)
- **CPF/CNPJ** (obrigatório)
- **Email**
- **Telefone**
- **Celular**

### Endereço
- **Endereço** (obrigatório)
- **Número** (obrigatório)
- **Complemento**
- **Bairro**
- **Cidade** (obrigatório)
- **Estado** (obrigatório)
- **CEP** (obrigatório)
- **País**

### Informações Adicionais
- **Referência Externa**
- **Emails Adicionais**
- **Observações**
- **Desabilitar Notificações** (checkbox)
- **Cliente Estrangeiro** (checkbox)

## 🔑 Configuração da API

Certifique-se de que a variável de ambiente está configurada no `.env`:

```
VITE_ASAAS_API_KEY=seu_token_aqui
```

## 🎨 Cores Utilizadas

- Azul Profundo (#0A2540) - Títulos e elementos principais
- Verde Esmeralda (#10B981) - Botão primário
- Ciano Digital (#00B4D8) - Botões secundários
- Cinza (#d1d5db, #e5e7eb) - Bordas e backgrounds

## 📱 Responsividade

O módulo é totalmente responsivo:
- Desktop: Layout em grid
- Tablet: Ajustes de espaçamento
- Mobile: Stack vertical, tabela com scroll horizontal
