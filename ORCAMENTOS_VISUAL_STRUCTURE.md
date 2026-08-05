# Estrutura Visual do Modal de Orçamentos

## Layout Geral

```
┌─────────────────────────────────────────────────────────────┐
│ Novo Orçamento                                          [✕] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Preview de Preço (Topo Fixo)                        │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ Setup Líquido: R$ 15.000,00                         │   │
│  │ MDR (2.9%): R$ 435,00                              │   │
│  │ Cobrar do Cliente: 3× R$ 5.145,00                  │   │
│  │ Comissão (10%): R$ 1.500,00                        │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ Total Cobrado: R$ 15.435,00                        │   │
│  │ Líquido Mês a Mês: R$ 5.000,00                     │   │
│  │ Líquido Antecipado: R$ 15.000,00                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─ CLIENTE ──────────────────────────────────────────┐   │
│  │ Selecionar Prospect: [Dropdown ▼]                  │   │
│  │ Nome *: [________________]                         │   │
│  │ E-mail: [________________] CPF/CNPJ: [________]   │   │
│  │ Telefone: [(11) 99999-9999]                        │   │
│  └────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─ TIPO DE SERVIÇO ──────────────────────────────────┐   │
│  │ ☑ Web                                              │   │
│  │   Menus/Seções (5): [═════════════════] +R$ 300   │   │
│  │   ☑ Integração Asaas (+R$ 500)                    │   │
│  │                                                     │   │
│  │ ☑ Mini Site                                        │   │
│  │   Páginas (3): [═════════════════] +R$ 200        │   │
│  │   ☑ Integração Instagram (+R$ 300)                │   │
│  │   ☑ Botão WhatsApp (+R$ 200)                      │   │
│  │                                                     │   │
│  │ ☑ Business Intelligence                            │   │
│  │   Fontes: ☑ Excel (+R$ 500)                       │   │
│  │           ☑ API (+R$ 800)                         │   │
│  │           ☐ Database (+R$ 1000)                   │   │
│  │   Complexidade: ○ Standard  ● Advanced (×1.3)     │   │
│  │                                                     │   │
│  │ ☑ AI Agent                                         │   │
│  │   Plano: ○ Free  ○ Starter  ● Pro  ○ Enterprise   │   │
│  │   Agentes (2): [═════════════════]                │   │
│  │   ☑ Base de Conhecimento (RAG) (+R$ 800)          │   │
│  │   ☑ Canal de Voz (+R$ 600)                        │   │
│  └────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─ MÓDULOS ADICIONAIS ───────────────────────────────┐   │
│  │ ☑ n8n Automation (R$ 500)                          │   │
│  │ ☑ WhatsApp Gateway (R$ 300)                        │   │
│  │ ☑ Agile Setup (R$ 1.200)                           │   │
│  │ ☑ Consultor/Área do Aluno (R$ 1.200)              │   │
│  │ ☑ Panda Videos (R$ 300)                            │   │
│  │ ☑ Bunny.net CDN (R$ 200)                           │   │
│  │                                                     │   │
│  │ Horas de Mentoria Ágil (20h): [═════════════════] │   │
│  │ R$ 150/hora                                        │   │
│  │                                                     │   │
│  │ Hospedagem:                                        │   │
│  │ ☑ Compartilhada Premium (R$ 100)                   │   │
│  │ ☑ VPS Pro (R$ 300)                                 │   │
│  │                                                     │   │
│  │ ┌─ Plano Panda Videos ──────────────────────────┐ │   │
│  │ │ ○ Starter (R$ 97)  ● Pro (R$ 197)  ○ Scale   │ │   │
│  │ └───────────────────────────────────────────────┘ │   │
│  │                                                     │   │
│  │ ┌─ Plano Bunny.net CDN ─────────────────────────┐ │   │
│  │ │ ○ Pay-as-you-go  ● Starter (R$ 79)  ○ Pro    │ │   │
│  │ └───────────────────────────────────────────────┘ │   │
│  └────────────────────────────────────────────────────┘   │
│                                                             │
│  Parcelas: [═════════════════] 3×                          │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [Cancelar]                    [⚡ Gerar Orçamento] │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Card de Resultado

```
┌─────────────────────────────────────────────────────────────┐
│ Orçamento Gerado com Sucesso!                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Setup Líquido:                                      │   │
│  │ R$ 15.000,00                                        │   │
│  │                                                     │   │
│  │ Cobrar do Cliente:                                  │   │
│  │ 3× R$ 5.145,00                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [📄 Baixar PDF]  [Ver Dashboard →]                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Fechar]                                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Tabela de Orçamentos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Orçamentos                                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Cliente      │ E-mail              │ Setup Líquido │ Total Cobrado │ ... │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │ Empresa XYZ  │ contato@empresa.com │ R$ 15.000,00  │ R$ 15.435,00  │ 3× │ │
│ │ Empresa ABC  │ info@abc.com        │ R$ 8.500,00   │ R$ 8.746,50   │ 6× │ │
│ │ Empresa 123  │ hello@123.com       │ R$ 12.000,00  │ R$ 12.348,00  │ 1× │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Fluxo de Interação

```
┌─────────────────────────────────────────────────────────────┐
│ Página de Orçamentos                                        │
│ [+ Criar Novo Orçamento]                                    │
└─────────────────────────────────────────────────────────────┘
                          ↓
                    Modal Abre
                          ↓
        ┌─────────────────────────────────────┐
        │ Preencher Dados do Cliente          │
        │ Selecionar Serviços                 │
        │ Adicionar Módulos                   │
        │ Ajustar Parcelas                    │
        └─────────────────────────────────────┘
                          ↓
                  Preview Atualiza
                  (Tempo Real)
                          ↓
        ┌─────────────────────────────────────┐
        │ Clique em "Gerar Orçamento"         │
        │ POST /quotes                        │
        └─────────────────────────────────────┘
                          ↓
        ┌─────────────────────────────────────┐
        │ Card de Resultado                   │
        │ [Baixar PDF] [Ver Dashboard]        │
        └─────────────────────────────────────┘
                          ↓
                    Modal Fecha
                          ↓
        ┌─────────────────────────────────────┐
        │ Tabela Atualiza                     │
        │ Novo Orçamento Exibido              │
        │ [✏️ Editar] [🗑️ Deletar]            │
        └─────────────────────────────────────┘
```

## Componentes Utilizados

```
NovoOrcamentoModal
├── PrecoPreview
├── SecaoCliente
├── SecaoTipoServico
│   ├── Web (Checkbox + Slider + Toggle)
│   ├── Mini Site (Checkbox + Slider + Toggles)
│   ├── BI (Checkbox + Checkboxes + Select)
│   └── AI Agent (Checkbox + Radio + Slider + Toggles)
├── SecaoModulos
│   ├── Checkboxes (Módulos)
│   ├── Slider (Mentoria)
│   ├── Checkboxes (Hospedagem)
│   ├── Plano Panda Videos (Condicional)
│   └── Plano Bunny.net CDN (Condicional)
└── Slider (Parcelas)

OrcamentosPage
├── OrcamentosTable
│   └── Linhas com Ações (Editar/Deletar)
└── NovoOrcamentoModal (Renderizado Condicionalmente)
```

## Estados do Modal

```
1. INICIAL
   - Formulário vazio
   - Preview com valores zerados
   - Botão "Gerar Orçamento" habilitado

2. PREENCHENDO
   - Campos sendo preenchidos
   - Preview atualizando em tempo real
   - Validações em tempo real

3. ENVIANDO
   - Botão "Gerando..." desabilitado
   - Spinner de carregamento
   - Requisição POST /quotes em andamento

4. RESULTADO
   - Card de resultado exibido
   - Botões: "Baixar PDF" e "Ver Dashboard"
   - Botão "Fechar" para voltar à tabela

5. ERRO
   - Mensagem de erro exibida
   - Opção de tentar novamente
```

## Validações

```
✓ Nome é obrigatório
✓ Máscara de telefone automática
✓ Pelo menos um serviço deve ser selecionado
✓ Planos condicionais aparecem apenas se módulo ativo
✓ Cálculos atualizados em tempo real
✓ Confirmação antes de deletar
```

## Responsividade

```
Desktop (1200px+)
├── Modal: max-width 900px
├── Grid: 2 colunas
└── Tabela: Completa

Tablet (768px - 1199px)
├── Modal: max-width 100%
├── Grid: 1 coluna
└── Tabela: Scroll horizontal

Mobile (< 768px)
├── Modal: Tela cheia
├── Grid: Stack vertical
└── Tabela: Scroll horizontal
```
