# Deployment em Hospedagem Node (Hostinger, Bluehost, etc.)

## 📋 Pré-requisitos

- Hospedagem com suporte a Node.js
- Acesso ao painel de controle (cPanel, Plesk, etc.)
- Git instalado no servidor (opcional)

## 🚀 Instalação e Configuração

### 1. Preparar o Projeto Localmente

```bash
# Instalar dependências
npm install

# Fazer build de ambas as aplicações
npm run build:all
```

Isso criará:
- `build/` - Site principal compilado
- `owner/build/` - Owner compilado

### 2. Upload para Hospedagem

#### Opção A: Via FTP/SFTP

1. Conecte via FTP ao seu servidor
2. Navegue até a pasta `public_html` ou raiz do projeto
3. Faça upload de:
   - `build/` (conteúdo do site)
   - `owner/build/` (conteúdo do owner)
   - `server.js` (servidor Node.js)
   - `package.json` (dependências)
   - `package-lock.json`
   - `.htaccess` (roteamento)

#### Opção B: Via Git

```bash
# No servidor, via SSH
cd ~/public_html
git clone seu-repositorio.git .
npm install
npm run build:all
```

### 3. Configurar Node.js na Hospedagem

**No cPanel (Hostinger, Bluehost)**:

1. Vá em "Setup Node.js App"
2. Clique em "Create Application"
3. Configure:
   - **Node.js Version**: 18.x ou superior
   - **Application Root**: `/home/usuario/public_html`
   - **Application URL**: `seudominio.com`
   - **Application Startup File**: `server.js`
   - **Port**: 3000 (ou a porta disponível)

4. Clique em "Create"

**No Plesk**:

1. Vá em "Node.js"
2. Clique em "Add Application"
3. Configure:
   - **Application**: `seudominio.com`
   - **Document Root**: `/home/usuario/public_html`
   - **Startup File**: `server.js`
   - **Node.js Version**: 18.x

### 4. Instalar Dependências no Servidor

```bash
# Via SSH
cd ~/public_html
npm install
```

### 5. Iniciar a Aplicação

No painel de controle:
- Clique em "Start" ou "Restart" na aplicação Node.js

## 🌐 URLs de Acesso

Após configuração:

- **Site Principal**: `https://seudominio.com`
- **Painel Owner**: `https://seudominio.com/owner`

## 📁 Estrutura de Arquivos

```
public_html/
├── build/                 # Site compilado
│   ├── index.html
│   ├── static/
│   └── ...
├── owner/
│   └── build/            # Owner compilado
│       ├── index.html
│       ├── static/
│       ├── .htaccess
│       └── ...
├── server.js             # Servidor Node.js
├── package.json
├── package-lock.json
└── .htaccess             # Configuração Apache
```

## 🔧 Arquivos .htaccess

### Raiz (public_html/.htaccess)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Não reescrever arquivos e diretórios reais
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Rotear /owner para owner/build/index.html para SPA routing
  RewriteRule ^owner/(.*)$ owner/build/index.html [L]
  RewriteRule ^owner/?$ owner/build/index.html [L]
  
  # Rotear para index.html para SPA (exceto /owner)
  RewriteRule ^(?!owner/).*$ index.html [L]
</IfModule>
```

### Owner (public_html/owner/build/.htaccess)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /owner/
  
  # Não reescrever arquivos e diretórios reais
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Rotear para index.html para SPA routing
  RewriteRule ^.*$ index.html [L]
</IfModule>
```

## 🔄 Atualizar Código

Para atualizar o código em produção:

```bash
# Via SSH
cd ~/public_html

# Atualizar código
git pull

# Fazer novo build
npm run build:all

# Reiniciar aplicação (via painel ou SSH)
# No cPanel: clique em "Restart"
```

## 📊 Monitoramento

### Ver Logs

No cPanel:
1. Vá em "Node.js"
2. Clique em "Logs" da aplicação

Via SSH:
```bash
tail -f ~/.pm2/logs/app-error.log
tail -f ~/.pm2/logs/app-out.log
```

### Verificar Status

```bash
# Via SSH
pm2 status
pm2 logs
```

## 🐛 Troubleshooting

### Aplicação não inicia

```bash
# Verificar erros
npm run build:all

# Testar localmente
npm run start:production
```

### /owner retorna 404

1. Verifique se `owner/build/` existe
2. Verifique se `owner/build/.htaccess` existe
3. Verifique se `owner/build/index.html` existe
4. Reinicie a aplicação Node.js

### Porta já está em uso

No cPanel, escolha uma porta diferente (3001, 3002, etc.)

### Certificado SSL

A maioria das hospedagens oferece SSL gratuito:
1. No cPanel, vá em "AutoSSL"
2. Clique em "Issue"
3. Aguarde a geração

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```
NODE_ENV=production
PORT=3000
```

No cPanel, você pode definir variáveis de ambiente na configuração da aplicação Node.js.

## 🚀 Performance

### Otimizações

1. **Gzip**: Ative compressão no `.htaccess`
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

2. **Cache**: Configure headers de cache
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 1 hour"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/* "access plus 1 year"
</IfModule>
```

3. **CDN**: Use CDN para arquivos estáticos

## 📚 Referências

- [Hostinger Node.js Setup](https://support.hostinger.com/en/articles/4291348-how-to-set-up-a-node-js-application)
- [Express.js Documentation](https://expressjs.com/)
- [Apache mod_rewrite](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)
