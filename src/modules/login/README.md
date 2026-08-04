# Módulo de Login - Kealabs

Módulo de autenticação com design responsivo seguindo a identidade visual Kealabs.

## 📁 Estrutura

```
src/modules/login/
├── components/
│   └── LoginForm.jsx       # Componente do formulário
├── pages/
│   └── LoginPage.jsx       # Página principal
└── styles/
    └── login.css           # Estilos
```

## 🎨 Design

### Cores Utilizadas
- **Azul Profundo**: `#0A2540` - Fundo do header
- **Verde Esmeralda**: `#10B981` - Botão principal
- **Ciano Digital**: `#00B4D8` - Tagline
- **Laranja Alerta**: `#FF6B00` - Mensagens de erro
- **Cinza Slate**: `#64748B` - Textos secundários

### Características
- Gradiente de fundo (Azul → Verde)
- Animação de entrada suave
- Validação de email em tempo real
- Toggle de visibilidade de senha
- Spinner de carregamento
- Responsivo para mobile

## 🔗 Integração

### Rota
```
/login
```

### Botão no Header
O botão "Área do Cliente" no header redireciona para `/login`

```jsx
<Link to="/login" className="btn-area-cliente">
  Área do Cliente
</Link>
```

## 📝 Funcionalidades

### LoginForm
- Validação de email
- Validação de senha obrigatória
- Toggle de visibilidade de senha
- Mensagens de erro personalizadas
- Estado de carregamento
- Links para "Esqueceu a senha?" e "Voltar ao site"

### LoginPage
- Gerencia o estado de autenticação
- Simula chamada à API (1.5s)
- Armazena dados do usuário em localStorage
- Redireciona para `/dashboard` após login bem-sucedido

## 🚀 Como Usar

### Acessar a página de login
```
https://www.kealabs.com.br/login
```

### Ou clicar no botão "Área do Cliente" no header

## 🔐 Segurança

- Validação de email no cliente
- Senha não é exibida por padrão
- Token simulado armazenado em localStorage
- Redirecionamento automático após login

## 📱 Responsividade

- Desktop: Layout completo com gradiente
- Tablet: Ajustes de padding e font-size
- Mobile: Otimizado para telas pequenas

## 🎯 Fluxo de Autenticação

1. Usuário clica em "Área do Cliente"
2. Redireciona para `/login`
3. Usuário preenche email e senha
4. Clica em "Entrar"
5. Validação no cliente
6. Simula chamada à API
7. Armazena dados em localStorage
8. Redireciona para `/dashboard`

## 🔄 Próximas Melhorias

- [ ] Integração com API real
- [ ] Recuperação de senha
- [ ] Autenticação com redes sociais
- [ ] Two-factor authentication
- [ ] Persistência de sessão
- [ ] Logout

## 📚 Referências

- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Kealabs Brand Guidelines](../../../README.md)
