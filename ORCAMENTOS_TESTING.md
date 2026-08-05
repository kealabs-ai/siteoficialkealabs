# Guia de Teste - Módulo de Orçamentos

## Acessar o Módulo

1. Faça login em `/login`
2. Navegue para `/home/orcamentos` ou clique em "Orçamentos" no menu lateral

## Teste 1: Criar Novo Orçamento

### Passo 1: Abrir Modal
- Clique em "+ Criar Novo Orçamento"
- Verifique se o modal abre com o preview de preço no topo

### Passo 2: Preencher Dados do Cliente
- Selecione um prospect (se disponível) ou preencha manualmente
- Verifique se os campos são preenchidos automaticamente ao selecionar prospect
- Preencha: Nome*, E-mail, CPF/CNPJ, Telefone
- Verifique a máscara de telefone: (11) 99999-9999

### Passo 3: Selecionar Serviços

#### Web
- Ative o checkbox "Web"
- Ajuste o slider de menus (1-20)
- Verifique se o preço atualiza (+R$ 300 por menu extra)
- Ative "Integração Asaas" (+R$ 500)

#### Mini Site
- Ative o checkbox "Mini Site"
- Ajuste o slider de páginas (1-10)
- Ative "Integração Instagram" (+R$ 300)
- Ative "Botão WhatsApp" (+R$ 200)

#### Business Intelligence
- Ative o checkbox "Business Intelligence"
- Selecione múltiplas fontes: Excel, API, Database
- Mude complexidade para "Advanced" (×1.3)

#### AI Agent
- Ative o checkbox "AI Agent"
- Selecione plano "Pro" (+R$ 1500)
- Ajuste slider de agentes
- Ative "Base de Conhecimento" (+R$ 800)
- Ative "Canal de Voz" (+R$ 600)

### Passo 4: Adicionar Módulos
- Ative: n8n Automation, Agile Setup, Panda Videos
- Ajuste "Horas de Mentoria Ágil" para 10h
- Selecione hospedagem: "VPS Pro" e "Compartilhada Premium"

### Passo 5: Verificar Preview de Preço
- Verifique se o preview atualiza em tempo real
- Confirme cálculos:
  - Setup Líquido = soma de todos os serviços e módulos
  - MDR = Setup Líquido × mdrPercentage
  - Total Cobrado = Setup Líquido + MDR
  - Parcela = Total Cobrado / parcelas

### Passo 6: Ajustar Parcelas
- Mude o slider de parcelas (1-12)
- Verifique se o preview atualiza

### Passo 7: Gerar Orçamento
- Clique em "⚡ Gerar Orçamento"
- Verifique se a requisição POST /quotes é enviada
- Aguarde o resultado

### Passo 8: Resultado
- Verifique se o card de resultado é exibido
- Confirme: Setup Líquido e Cobrar do Cliente
- Clique em "📄 Baixar PDF" (deve fazer download)
- Clique em "Ver Dashboard →" (deve navegar para /)

## Teste 2: Tabela de Orçamentos

### Passo 1: Visualizar Tabela
- Feche o modal após criar orçamento
- Verifique se a tabela é exibida com os orçamentos cadastrados
- Colunas: Cliente, E-mail, Setup Líquido, Total Cobrado, Parcelas, Data, Ações

### Passo 2: Ações
- Clique em ✏️ (editar) - deve abrir modal de edição
- Clique em 🗑️ (deletar) - deve pedir confirmação e deletar

### Passo 3: Estado Vazio
- Após deletar todos os orçamentos
- Verifique se a mensagem "Nenhum orçamento cadastrado ainda" é exibida

## Teste 3: Validações

### Teste 3.1: Campo Obrigatório
- Tente gerar orçamento sem preencher "Nome"
- Verifique se alerta é exibido

### Teste 3.2: Máscara de Telefone
- Digite "11999999999" no campo de telefone
- Verifique se é formatado para "(11) 99999-9999"

### Teste 3.3: Planos Condicionais
- Ative "Panda Videos" e verifique se a seção de planos aparece
- Desative "Panda Videos" e verifique se a seção desaparece
- Repita para "Bunny.net CDN"

## Teste 4: Responsividade

### Desktop (1200px+)
- Verifique layout completo
- Grid de módulos em 3 colunas
- Modal com largura máxima

### Tablet (768px - 1199px)
- Verifique ajustes de grid
- Modal responsivo

### Mobile (< 768px)
- Modal em tela cheia
- Stack vertical de campos
- Botões em coluna

## Teste 5: Integração com Settings

### Verificar Valores
- Abra o DevTools (F12)
- Vá para Network
- Verifique se GET /settings é chamado
- Confirme se os valores são aplicados:
  - MDR percentage
  - Installment limit
  - Commission rate
  - Preços de módulos

## Teste 6: Integração com Prospects

### Verificar Carregamento
- Abra DevTools
- Verifique se GET /prospects é chamado
- Selecione um prospect
- Confirme se os campos são preenchidos automaticamente

## Checklist de Testes

- [ ] Modal abre e fecha corretamente
- [ ] Preview de preço atualiza em tempo real
- [ ] Cálculos estão corretos
- [ ] Máscara de telefone funciona
- [ ] Planos condicionais aparecem/desaparecem
- [ ] Orçamento é criado com sucesso
- [ ] PDF é baixado
- [ ] Tabela exibe orçamentos
- [ ] Editar orçamento funciona
- [ ] Deletar orçamento funciona
- [ ] Validações funcionam
- [ ] Responsividade está OK
- [ ] Integração com API funciona

## Dados de Teste Recomendados

```json
{
  "nome": "Empresa Teste",
  "email": "teste@empresa.com",
  "cpfCnpj": "12.345.678/0001-90",
  "telefone": "11999999999",
  "servicos": {
    "web": { "ativo": true, "menus": 5, "asaas": true },
    "miniSite": { "ativo": true, "paginas": 3, "instagram": true, "whatsapp": true },
    "bi": { "ativo": true, "fontes": ["excel", "api"], "complexidade": "advanced" },
    "aiAgent": { "ativo": true, "plano": "pro", "agentes": 2, "rag": true, "voz": true }
  },
  "modulos": {
    "n8n": true,
    "whatsapp": true,
    "agileSetup": true,
    "consultor": true,
    "pandaVideos": true,
    "bunnycdn": true,
    "mentoringHoras": 20,
    "hospedagem": ["vps-pro", "compartilhada-premium"]
  },
  "pandaPlano": "pro",
  "bunnyPlano": "pro",
  "parcelas": 6
}
```

## Troubleshooting

### Modal não abre
- Verifique se há erros no console (F12)
- Confirme se o componente NovoOrcamentoModal está importado

### Preço não atualiza
- Verifique se a função calcularPreco() está sendo chamada
- Confirme se os valores de settings foram carregados

### Tabela vazia
- Verifique se GET /quotes retorna dados
- Confirme se o endpoint está correto

### PDF não baixa
- Verifique se POST /quotes/pdf retorna blob
- Confirme se o header Content-Type é application/pdf

### Prospect não preenche
- Verifique se GET /prospects retorna dados
- Confirme se os campos do prospect têm os nomes corretos
