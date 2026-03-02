# Kealabs - Website Corporativo

Website corporativo desenvolvido em React seguindo o manual de identidade visual da Kealabs.

## 🎨 Identidade Visual

O site segue rigorosamente as diretrizes do manual de identidade visual:

- **Cores:**
  - Azul Profundo (#0A2540) - Autoridade e Lógica
  - Verde Esmeralda (#10B981) - Validação e Progresso
  - Ciano Digital (#00B4D8) - Futurismo
  - Laranja Alerta (#FF6B00) - Ação e Decisão
  - Cinza Slate (#64748B) - Neutralidade Científica

- **Tipografia:** Inter (Google Fonts)
  - KEA: Black/800
  - LABS: Regular/400

## 📁 Estrutura do Projeto

```
SiteKeaLabs/
├── public/
│   └── index.html
├── src/
│   ├── assets/          # Imagens e logotipos
│   ├── components/      # Componentes React
│   │   ├── Header.js
│   │   ├── Header.css
│   │   ├── Hero.js
│   │   ├── Hero.css
│   │   ├── Solucoes.js
│   │   ├── Solucoes.css
│   │   ├── Sobre.js
│   │   ├── Sobre.css
│   │   ├── Contato.js
│   │   ├── Contato.css
│   │   ├── Footer.js
│   │   └── Footer.css
│   ├── styles/
│   │   └── global.css
│   ├── App.js
│   └── index.js
└── package.json
```

## 🚀 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Execute o projeto localmente:
```bash
npm start
```

O site estará disponível em `http://localhost:3000`

## 📦 Build para Produção

Para gerar os arquivos otimizados para produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `build/`

## 🌐 Deploy na Hostinger

### Opção 1: Upload Manual via FTP

1. Execute o build: `npm run build`
2. Acesse o painel da Hostinger
3. Vá em "Arquivos" > "Gerenciador de Arquivos"
4. Navegue até a pasta `public_html`
5. Faça upload de todos os arquivos da pasta `build/`

### Opção 2: Deploy via Git (Recomendado)

1. Configure o repositório Git no painel da Hostinger
2. Conecte seu repositório GitHub/GitLab
3. Configure o build command: `npm run build`
4. Configure o publish directory: `build`
5. Faça push para o repositório

### Configuração do .htaccess

Crie um arquivo `.htaccess` na pasta `public_html` com o seguinte conteúdo:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🎯 Seções do Site

1. **Header** - Navegação fixa com menu responsivo
2. **Hero** - Seção principal com CTA
3. **Soluções** - Cards com as principais soluções
4. **Sobre** - Informações sobre a empresa
5. **Contato** - Formulário e informações de contato
6. **Footer** - Links e informações corporativas

## 📝 Personalização

Para adicionar imagens e logotipos:
1. Coloque os arquivos na pasta `src/assets/`
2. Importe nos componentes: `import logo from '../assets/logo.png'`
3. Use no JSX: `<img src={logo} alt="Logo" />`

## 🔧 Tecnologias

- React 18.2.0
- CSS3 (sem frameworks externos)
- Google Fonts (Inter)

## 📄 Licença

© 2024 Kealabs. Todos os direitos reservados.
