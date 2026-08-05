# Módulo de Orçamentos

## Visão Geral

O módulo de Orçamentos permite criar, gerenciar e acompanhar orçamentos de serviços com cálculo automático de preços, MDR e parcelamento.

## Estrutura

```
src/modules/orcamentos/
├── pages/
│   └── OrcamentosPage.jsx          # Página principal
├── components/
│   ├── NovoOrcamentoModal.jsx       # Modal de novo orçamento
│   ├── PrecoPreview.jsx             # Preview de preço (topo fixo)
│   ├── SecaoCliente.jsx             # Seção de dados do cliente
│   ├── SecaoTipoServico.jsx         # Seção de tipos de serviço
│   ├── SecaoModulos.jsx             # Seção de módulos adicionais
│   └── OrcamentosTable.jsx          # Tabela de orçamentos
└── styles/
    ├── modal.css                    # Estilos do modal
    └── orcamentos.css               # Estilos da página
```

## Funcionalidades

### 1. Preview de Preço (Topo Fixo)
- Cálculo em tempo real sem chamada de API
- Exibe: Setup Líquido, MDR, Total Cobrado, Comissão (se aplicável)
- Detalhes: Total cobrado, líquido mês a mês, líquido antecipado

### 2. Seção Cliente
- Seleção de prospect com preenchimento automático
- Campos: Nome*, E-mail, CPF/CNPJ, Telefone/WhatsApp (com máscara)
- Integração com GET /prospects

### 3. Tipos de Serviço

#### Web
- Slider: 1-20 menus/seções (+R$ 300 por menu extra)
- Toggle: Integração Asaas (+R$ 500)

#### Mini Site
- Slider: 1-10 páginas (+R$ 200 por página extra)
- Toggle: Integração Instagram (+R$ 300)
- Toggle: Botão WhatsApp (+R$ 200)

#### Business Intelligence
- Seleção múltipla: Excel (+R$ 500), API (+R$ 800), Database (+R$ 1000)
- Complexidade: Standard ou Advanced (×1.3)

#### AI Agent
- Planos: Free, Starter (+R$ 500), Pro (+R$ 1500), Enterprise (+R$ 3000)
- Slider: Quantidade de agentes (1-10)
- Toggle: Base de Conhecimento/RAG (+R$ 800)
- Toggle: Canal de Voz (+R$ 600)

### 4. Módulos Adicionais
- n8n Automation (settings.moduleN8n)
- WhatsApp Gateway (settings.moduleWhatsapp)
- Agile Setup (settings.moduleAgileSetup)
- Consultor/Área do Aluno (R$ 1.200 fixo)
- Panda Videos (R$ 300 fixo)
- Bunny.net CDN (R$ 200 fixo)
- Horas de Mentoria Ágil (settings.moduleMentoringHour × horas, 0-40h)

### 5. Hospedagem
- Compartilhada: Single (R$ 50), Premium (R$ 100), Business (R$ 200)
- VPS: Starter (R$ 150), Pro (R$ 300), Ultra (R$ 600)

### 6. Planos Condicionais
- **Panda Videos** (aparece se módulo ativo):
  - Starter: R$ 97/mês
  - Pro: R$ 197/mês
  - Scale: R$ 397/mês

- **Bunny.net CDN** (aparece se módulo ativo):
  - Pay-as-you-go
  - Starter: R$ 79/mês
  - Pro: R$ 179/mês

### 7. Slider de Parcelas
- 1× até installmentLimit (das settings)
- Cálculo automático com MDR aplicado

### 8. Ações
- **⚡ Gerar Orçamento**: POST /quotes
  - Envia um request por tipo de serviço ativo em paralelo (Promise.all)
  - Retorna resultado com setup líquido e total cobrado
  
- **📄 Baixar PDF**: POST /quotes/pdf
  - Retorna application/pdf para download

### 9. Tabela de Orçamentos
- Exibida após fechar o modal
- Colunas: Cliente, E-mail, Setup Líquido, Total Cobrado, Parcelas, Data, Ações
- Ações: Editar (✏️), Deletar (🗑️)

## Integração com Settings

O módulo utiliza o hook `useSettings()` para obter:
- `mdrPercentage`: Percentual de MDR
- `installmentLimit`: Limite de parcelas
- `commissionRate`: Taxa de comissão
- `moduleN8n`: Preço do módulo n8n
- `moduleWhatsapp`: Preço do módulo WhatsApp
- `moduleAgileSetup`: Preço do módulo Agile Setup
- `moduleMentoringHour`: Preço por hora de mentoria

## Endpoints Utilizados

- `GET /settings` - Obter configurações
- `GET /prospects` - Listar prospects
- `POST /quotes` - Criar orçamento
- `POST /quotes/pdf` - Gerar PDF
- `GET /quotes` - Listar orçamentos
- `DELETE /quotes/:id` - Deletar orçamento

## Uso

### Acessar o módulo
```
/home/orcamentos
```

### Criar novo orçamento
1. Clique em "+ Criar Novo Orçamento"
2. Preencha os dados do cliente
3. Selecione os serviços desejados
4. Adicione módulos e hospedagem
5. Ajuste o número de parcelas
6. Clique em "⚡ Gerar Orçamento"

### Gerenciar orçamentos
- Visualize a tabela de orçamentos cadastrados
- Clique em ✏️ para editar
- Clique em 🗑️ para deletar

## Cálculo de Preços

O cálculo é feito localmente em tempo real:

```javascript
Total = Serviços + Módulos + Hospedagem + Planos Condicionais
MDR = Total × mdrPercentage
Total Cobrado = Total + MDR
Parcela = Total Cobrado / parcelas
```

## Responsividade

- Desktop (1200px+): Layout completo
- Tablet (768px - 1199px): Ajustes de grid
- Mobile (< 768px): Stack vertical, modal em tela cheia
