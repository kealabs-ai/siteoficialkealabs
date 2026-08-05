# 🚀 Guia Rápido - Módulo de Orçamentos

## ⚡ Inicialização Rápida

### 1. Verificar Instalação
```bash
npm install
```

### 2. Iniciar Desenvolvimento
```bash
npm start
```

### 3. Acessar o Módulo
```
http://localhost:3000/home/orcamentos
```

## 📋 Checklist Rápido

- [ ] Projeto compila sem erros
- [ ] Pode fazer login
- [ ] Menu lateral exibe "Orçamentos"
- [ ] Clique em "Orçamentos" abre a página
- [ ] Botão "+ Criar Novo Orçamento" abre modal
- [ ] Modal exibe preview de preço
- [ ] Pode preencher dados do cliente
- [ ] Pode selecionar serviços
- [ ] Pode adicionar módulos
- [ ] Pode ajustar parcelas
- [ ] Pode gerar orçamento
- [ ] Tabela exibe orçamentos

## 🔧 Configuração de Endpoints

Certifique-se de que os seguintes endpoints estão disponíveis:

```
GET  /settings              - Retorna configurações
GET  /prospects             - Retorna lista de prospects
POST /quotes                - Cria novo orçamento
POST /quotes/pdf            - Gera PDF do orçamento
GET  /quotes                - Lista orçamentos
DELETE /quotes/:id          - Deleta orçamento
```

## 📝 Exemplo de Resposta de Settings

```json
{
  "mdrPercentage": 0.029,
  "installmentLimit": 12,
  "commissionRate": 0.1,
  "moduleN8n": 500,
  "moduleWhatsapp": 300,
  "moduleAgileSetup": 1200,
  "moduleMentoringHour": 150
}
```

## 📝 Exemplo de Resposta de Prospects

```json
[
  {
    "id": "1",
    "nome": "Empresa XYZ",
    "email": "contato@empresa.com",
    "cpfCnpj": "12.345.678/0001-90",
    "telefone": "(11) 99999-9999"
  }
]
```

## 📝 Exemplo de Payload POST /quotes

```json
{
  "prospectId": "123",
  "nome": "Empresa XYZ",
  "email": "contato@empresa.com",
  "cpfCnpj": "12.345.678/0001-90",
  "telefone": "(11) 99999-9999",
  "parcelas": 3,
  "setupLiquido": 15000,
  "mdrPercentage": 0.029,
  "installmentLimit": 12,
  "commissionRate": 0.1,
  "servicos": {
    "web": { "ativo": true, "menus": 5, "asaas": true },
    "miniSite": { "ativo": false, "paginas": 1, "instagram": false, "whatsapp": false },
    "bi": { "ativo": false, "fontes": [], "complexidade": "standard" },
    "aiAgent": { "ativo": false, "plano": "free", "agentes": 1, "rag": false, "voz": false }
  },
  "modulos": {
    "n8n": true,
    "whatsapp": false,
    "agileSetup": true,
    "consultor": false,
    "pandaVideos": false,
    "bunnycdn": false,
    "mentoringHoras": 0,
    "hospedagem": []
  },
  "pandaPlano": null,
  "bunnyPlano": null
}
```

## 📝 Exemplo de Resposta POST /quotes

```json
{
  "id": "quote-123",
  "setupLiquido": 15000,
  "totalCobrado": 15435,
  "parcelas": 3,
  "mdrPercentage": 0.029,
  "commissionRate": 0.1,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

## 🐛 Troubleshooting Rápido

### Modal não abre
```
✓ Verifique se há erros no console (F12)
✓ Confirme se está autenticado
✓ Verifique se a rota está correta
```

### Preço não atualiza
```
✓ Verifique se useSettings() retorna dados
✓ Confirme se os valores de settings foram carregados
✓ Verifique se a função calcularPreco() está sendo chamada
```

### Tabela vazia
```
✓ Verifique se GET /quotes retorna dados
✓ Confirme se o endpoint está correto
✓ Verifique se há orçamentos cadastrados
```

### PDF não baixa
```
✓ Verifique se POST /quotes/pdf retorna blob
✓ Confirme se o header Content-Type é application/pdf
✓ Verifique se há erros no console
```

## 📚 Documentação Completa

Para informações detalhadas, consulte:

- `ORCAMENTOS_SUMMARY.md` - Sumário executivo
- `ORCAMENTOS_IMPLEMENTATION.md` - Detalhes de implementação
- `ORCAMENTOS_TESTING.md` - Guia de testes
- `ORCAMENTOS_VISUAL_STRUCTURE.md` - Estrutura visual
- `ORCAMENTOS_CHECKLIST.md` - Checklist de integração
- `src/modules/orcamentos/README.md` - Documentação técnica

## 🎯 Fluxo Principal

```
1. Acesse /home/orcamentos
2. Clique em "+ Criar Novo Orçamento"
3. Preencha os dados do cliente
4. Selecione os serviços desejados
5. Adicione módulos e hospedagem
6. Ajuste o número de parcelas
7. Clique em "⚡ Gerar Orçamento"
8. Verifique o resultado
9. Baixe o PDF ou veja o dashboard
10. Visualize a tabela de orçamentos
```

## 🔗 Links Úteis

- Página de Orçamentos: `/home/orcamentos`
- Dashboard: `/home/dashboard`
- Login: `/login`
- Documentação: `ORCAMENTOS_SUMMARY.md`

## 💡 Dicas

1. **Cálculos em Tempo Real**: O preview de preço atualiza automaticamente
2. **Máscara de Telefone**: Digite apenas números, a máscara é aplicada automaticamente
3. **Planos Condicionais**: Aparecem apenas quando o módulo correspondente está ativo
4. **Confirmação de Deleção**: Sempre pede confirmação antes de deletar
5. **Responsividade**: Funciona em desktop, tablet e mobile

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte a documentação fornecida
2. Verifique o guia de testes
3. Analise os exemplos de payload
4. Verifique o console do navegador (F12)

---

**Versão**: 1.0.0
**Status**: Pronto para Uso
**Última Atualização**: 2024
