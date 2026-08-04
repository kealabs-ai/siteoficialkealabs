# Estrutura do Projeto Kealabs

## 📁 Organização

```
siteoficialkealabs/
├── app/                          # Aplicação principal (Vite + React)
│   ├── src/
│   ├── public/
│   ├── package.json             # Scripts: start, build, preview
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── tailwind.config.cjs
│
├── owner/                        # Painel do proprietário (React)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── src/                          # Código legado (não usado no build)
│   ├── modules/
│   ├── components/
│   ├── services/
│   └── ...
│
├── package.json                  # Raiz (aponta para app)
├── server.js                     # Servidor Node (legado)
└── ...
```

## 🚀 Build e Deploy

### Estrutura Atual

A aplicação principal está em `app/` usando **Vite** como build tool.

O `package.json` da raiz foi configurado para:
- Apontar para o diretório `app/`
- Executar scripts do `app/package.json`
- Instalar dependências do `app/`

### Scripts Disponíveis

```bash
# Desenvolvimento
npm start              # Inicia Vite dev server (app/)

# Build
npm run build          # Gera build otimizado (app/dist/)

# Preview
npm run preview        # Visualiza build localmente

# Instalação
npm install            # Instala dependências (app/)
```

### Processo de Build

1. **Instalação**
   ```bash
   npm install
   # Executa: cd app && npm install
   ```

2. **Build**
   ```bash
   npm run build
   # Executa: cd app && npm run build
   # Gera: app/dist/
   ```

3. **Deploy**
   - Upload de `app/dist/` para o servidor
   - Configurar `.htaccess` para SPA routing

## 📋 Configuração do Vite

O `app/vite.config.ts` está configurado para:
- Build otimizado
- Suporte a React
- Tailwind CSS
- TypeScript

## 🔧 Troubleshooting

### Erro: "Module not found"
- Verificar se está em `app/` directory
- Executar `npm install` na raiz

### Erro: "Cannot find module 'vite'"
- Executar `cd app && npm install`

### Build falha
- Verificar `app/package.json` scripts
- Verificar `app/vite.config.ts`
- Limpar `app/node_modules` e reinstalar

## 📝 Notas Importantes

1. **Aplicação Principal**: `app/` (Vite + React + TypeScript)
2. **Build Tool**: Vite (não Create React App)
3. **Saída Build**: `app/dist/`
4. **Dependências**: Instaladas em `app/node_modules`

## 🌐 Deploy na Hostinger

1. Fazer build localmente:
   ```bash
   npm run build
   ```

2. Upload de `app/dist/` para `public_html/`

3. Configurar `.htaccess`:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## 📚 Referências

- [Vite Documentation](https://vitejs.dev/)
- [React + Vite](https://vitejs.dev/guide/ssr.html#setting-up-the-dev-server)
- [Tailwind CSS](https://tailwindcss.com/)
