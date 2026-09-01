# 🚀 Guia de Deploy - Módulo App Kealabs

## 📋 Pré-requisitos

- Node.js 16+
- npm ou yarn
- Acesso ao servidor de produção
- Domínio configurado
- SSL/TLS ativo

---

## 🔧 Preparação para Produção

### 1. Verificar Variáveis de Ambiente

Crie `.env.production`:

```env
VITE_API_URL=https://srv1023256.hstgr.cloud
NODE_ENV=production
```

### 2. Otimizar Build

```bash
# Instalar dependências
npm install

# Executar build
npm run build

# Verificar tamanho
npm run build -- --analyze
```

### 3. Testar Build Localmente

```bash
# Instalar servidor estático
npm install -g serve

# Servir build
serve -s dist

# Acessar
http://localhost:3000
```

---

## 📦 Build para Produção

### Comando

```bash
npm run build
```

### Saída

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── ...
```

### Tamanho Esperado

- Bundle JS: ~150KB (gzipped)
- CSS: ~50KB (gzipped)
- Total: ~200KB (gzipped)

---

## 🌐 Deploy em Hostinger

### Opção 1: Upload Manual via FTP

```
1. Execute: npm run build
2. Acesse painel Hostinger
3. Vá em "Arquivos" > "Gerenciador de Arquivos"
4. Navegue até public_html/app
5. Faça upload de todos os arquivos de dist/
```

### Opção 2: Deploy via Git (Recomendado)

```
1. Configure repositório Git no painel
2. Conecte seu repositório GitHub/GitLab
3. Configure build command: npm run build
4. Configure publish directory: dist
5. Faça push para o repositório
```

### Opção 3: Deploy via SSH

```bash
# Conectar ao servidor
ssh usuario@seu-servidor.com

# Navegar para diretório
cd /home/usuario/public_html/app

# Clonar repositório
git clone seu-repositorio.git .

# Instalar dependências
npm install

# Build
npm run build

# Copiar arquivos
cp -r dist/* ./
```

---

## 🔐 Configuração de Segurança

### 1. HTTPS

Certifique-se de que:
- ✅ SSL/TLS está ativo
- ✅ Certificado é válido
- ✅ Redirecionamento HTTP → HTTPS

### 2. Headers de Segurança

Adicione ao `.htaccess`:

```apache
# Segurança
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "strict-origin-when-cross-origin"

# CORS
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
```

### 3. Proteção de Rota

Adicione ao `.htaccess`:

```apache
# Proteger arquivos sensíveis
<FilesMatch "\.env|\.git|package\.json">
    Order allow,deny
    Deny from all
</FilesMatch>
```

---

## 🔄 Roteamento SPA

### Configurar .htaccess

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /app/
  
  # Não reescrever arquivos reais
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Redirecionar para index.html
  RewriteRule . index.html [L]
</IfModule>
```

### Nginx (se aplicável)

```nginx
location /app {
    try_files $uri $uri/ /app/index.html;
}
```

---

## 📊 Monitoramento

### 1. Verificar Performance

```bash
# Lighthouse
npm run build
npm install -g lighthouse
lighthouse https://seu-site.com/app
```

### 2. Verificar Erros

```bash
# Acessar console do navegador
F12 → Console

# Verificar Network
F12 → Network
```

### 3. Logs do Servidor

```bash
# SSH para servidor
ssh usuario@seu-servidor.com

# Ver logs
tail -f /var/log/apache2/error.log
tail -f /var/log/apache2/access.log
```

---

## 🔍 Testes Pós-Deploy

### 1. Teste de Acesso

```
1. Acesse https://seu-site.com/app
2. Você deve ser redirecionado para login
3. Faça login com credenciais
4. Verifique Dashboard
```

### 2. Teste de Funcionalidades

```
1. Dashboard
   - Carrega orçamentos
   - Estatísticas corretas
   
2. Builder
   - Cria novo orçamento
   - Calcula valores
   - Salva na API
   
3. Logout
   - Remove token
   - Redireciona para login
```

### 3. Teste de Responsividade

```
1. Desktop (1200px+)
   - Layout correto
   - Navegação horizontal
   
2. Tablet (768px - 1199px)
   - Layout adaptado
   - Menu responsivo
   
3. Mobile (< 768px)
   - Layout em coluna
   - Botões acessíveis
```

### 4. Teste de Performance

```
1. Abra DevTools → Network
2. Recarregue página
3. Verifique:
   - First Contentful Paint < 1s
   - Largest Contentful Paint < 2.5s
   - Total size < 500KB
```

---

## 🐛 Troubleshooting

### Erro: "Cannot GET /app"

**Solução**: Verifique `.htaccess`

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /app/
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . index.html [L]
</IfModule>
```

### Erro: "API não responde"

**Solução**: Verifique `.env.production`

```env
VITE_API_URL=https://srv1023256.hstgr.cloud
```

### Erro: "Token inválido"

**Solução**: Limpe localStorage

```javascript
localStorage.clear()
```

### Erro: "Estilos não carregam"

**Solução**: Verifique caminhos relativos

```html
<!-- Correto -->
<link rel="stylesheet" href="/app/assets/index.css">

<!-- Incorreto -->
<link rel="stylesheet" href="assets/index.css">
```

---

## 📈 Otimizações

### 1. Compressão

Adicione ao `.htaccess`:

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/json
</IfModule>
```

### 2. Cache

Adicione ao `.htaccess`:

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  
  # HTML
  ExpiresByType text/html "access plus 1 hour"
  
  # CSS/JS
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  
  # Imagens
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
</IfModule>
```

### 3. CDN

Para melhor performance, considere usar CDN:
- Cloudflare
- AWS CloudFront
- Bunny CDN

---

## 🔄 Atualização

### Atualizar Código

```bash
# Fazer pull
git pull origin main

# Instalar dependências
npm install

# Build
npm run build

# Copiar arquivos
cp -r dist/* /caminho/para/public_html/app/
```

### Atualizar Configurações

```bash
# Editar .env.production
nano .env.production

# Rebuild
npm run build
```

---

## 📊 Checklist de Deploy

- [ ] Build executado com sucesso
- [ ] Variáveis de ambiente configuradas
- [ ] .htaccess criado
- [ ] Arquivos enviados para servidor
- [ ] HTTPS ativo
- [ ] Headers de segurança configurados
- [ ] Roteamento SPA funcionando
- [ ] Login funciona
- [ ] Dashboard carrega
- [ ] Builder cria orçamentos
- [ ] Performance aceitável
- [ ] Sem erros no console
- [ ] Responsividade testada
- [ ] Backup realizado

---

## 🚨 Rollback

Se algo der errado:

```bash
# Restaurar versão anterior
git revert HEAD

# Rebuild
npm run build

# Reenviar arquivos
cp -r dist/* /caminho/para/public_html/app/
```

---

## 📞 Suporte

Para problemas:
1. Verifique logs do servidor
2. Consulte console do navegador
3. Verifique Network tab
4. Entre em contato com suporte

---

## 📚 Referências

- [Vite Deploy Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router Deployment](https://reactrouter.com/en/main/guides/deployment)
- [Hostinger Documentation](https://www.hostinger.com/help)

---

**Status**: ✅ Pronto para Deploy
**Versão**: 1.0.0
**Data**: 2024

Boa sorte com o deploy! 🚀
