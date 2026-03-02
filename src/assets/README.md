# Assets

Esta pasta é destinada para armazenar todos os recursos visuais do site.

## Estrutura Recomendada

```
assets/
├── images/
│   ├── hero-bg.jpg
│   ├── about-image.jpg
│   └── ...
├── logos/
│   ├── kealabs-logo.svg
│   ├── kealabs-logo-white.svg
│   └── favicon.ico
└── icons/
    └── ...
```

## Como Usar

1. Coloque seus arquivos nas subpastas apropriadas
2. Importe nos componentes React:

```javascript
import logo from '../assets/logos/kealabs-logo.svg';
import heroImage from '../assets/images/hero-bg.jpg';

// Use no JSX
<img src={logo} alt="Kealabs Logo" />
```

## Formatos Recomendados

- **Logos:** SVG (vetorial, escalável)
- **Imagens:** JPG/PNG (otimizadas)
- **Ícones:** SVG ou PNG

## Otimização

Antes de adicionar imagens, otimize-as usando ferramentas como:
- TinyPNG (https://tinypng.com/)
- ImageOptim
- Squoosh (https://squoosh.app/)

## Diretrizes da Identidade Visual

Ao adicionar o logo da Kealabs, certifique-se de:
- Manter o espaço negativo entre os elementos
- Usar fundo branco ou ultra-claro
- Respeitar as cores oficiais do manual
