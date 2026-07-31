# Kealabs - Área do Cliente (App)

Módulo React com TypeScript para a Área do Cliente Kealabs com autenticação e dashboard.

## 🎨 Tecnologias

- **React 18.2.0** - Framework principal
- **TypeScript 4.9.5** - Tipagem estática
- **CSS3** - Estilos sem dependências externas
- **Google Fonts (Inter)** - Tipografia

## 📁 Estrutura

```
app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.tsx
│   │   ├── Login.css
│   │   ├── ClientHeader.tsx
│   │   └── ClientHeader.css
│   ├── styles/
│   │   └── global.css
│   ├── App.tsx
│   ├── index.tsx
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── package.json
```

## 🚀 Instalação

```bash
cd app
npm install
npm start
```

O app estará disponível em `http://localhost:3000`

## 📦 Build para Produção

```bash
npm run build
```

## 🔐 Autenticação

O módulo inclui:
- Tela de login com validação tipada
- Gerenciamento de estado de autenticação
- Logout com redirecionamento
- Exibição de dados do usuário

## 🎯 Componentes

- **Login** - Tela de autenticação com tipos TypeScript
- **ClientHeader** - Header com navegação e logout
- **App** - Componente principal com gerenciamento de estado

## 📱 Responsividade

Totalmente responsivo para:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🎨 Identidade Visual

Segue as cores da Kealabs:
- Azul Profundo (#0A2540)
- Verde Esmeralda (#10B981)
- Ciano Digital (#00B4D8)
- Laranja Alerta (#FF6B00)
- Cinza Slate (#64748B)

## 📝 Tipagem

Todos os componentes possuem tipos TypeScript definidos:
- `LoginProps` - Props do componente Login
- `UserData` - Dados do usuário autenticado
- `ClientHeaderProps` - Props do ClientHeader
- `UserInfo` - Informações do usuário

## 📄 Licença

© 2024 Kealabs. Todos os direitos reservados.
