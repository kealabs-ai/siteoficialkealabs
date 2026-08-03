# Kealabs - Painel do Proprietário

Ambiente separado para o painel administrativo do proprietário, rodando em uma porta diferente do site principal.

## 🚀 Instalação

1. Navegue até a pasta owner:
```bash
cd owner
```

2. Instale as dependências:
```bash
npm install
```

## 🏃 Executar Localmente

Para iniciar o servidor de desenvolvimento na porta 3001:

```bash
npm start
```

O painel estará disponível em `http://localhost:3001`

## 📦 Build para Produção

Para gerar os arquivos otimizados:

```bash
npm run build
```

Os arquivos serão gerados na pasta `build/`

## 🌐 Portas

- **Site Principal**: `http://localhost:3000`
- **Painel do Proprietário**: `http://localhost:3001`
- **App (Cliente)**: `http://localhost:3002` (se configurado)

## 📁 Estrutura

```
owner/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── OwnerHeader.jsx
│   │   └── OwnerHeader.css
│   ├── pages/
│   │   └── Dashboard.jsx
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── index.jsx
├── package.json
└── README.md
```

## 🎨 Identidade Visual

O painel segue a mesma identidade visual da Kealabs:
- Cores corporativas
- Tipografia Inter
- Design responsivo

## 📝 Notas

- Este é um ambiente separado do site principal
- Cada ambiente tem seu próprio `node_modules` e `package.json`
- As dependências devem ser instaladas separadamente em cada pasta
