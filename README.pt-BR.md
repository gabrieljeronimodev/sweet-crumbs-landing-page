# 🍞 Sweet Crumbs

Uma landing page estática para uma padaria artesanal fictícia. Sem frameworks, sem ferramentas de build, sem dependências — só HTML, CSS e JavaScript puro. Abra o `index.html` e funciona.

---

## O que tem na página

A página cobre o funil completo de um negócio local em oito seções:

| Seção | Descrição |
|---|---|
| **Hero** | Apresentação da marca com dois CTAs — pedir via WhatsApp ou ir ao cardápio |
| **Nossa História** | Backstory de três gerações e valores da marca |
| **Problema** | Uma reflexão sutil sobre o que falta no pão industrializado |
| **Processo** | Passo a passo de como o pão é feito |
| **Ingredientes** | Origem e diferenciais de qualidade |
| **Depoimentos** | Avaliações de clientes fictícios |
| **Cardápio** | 8 produtos assinados em um carrossel navegável |
| **FAQ** | Acordeão com perguntas frequentes |
| **Contato / CTA** | Último convite para pedir, também via WhatsApp |

---

## Tecnologias

- **HTML5** — elementos semânticos em toda a página (`<header>`, `<nav>`, `<section>`, `<footer>`)
- **CSS** — custom properties para o sistema de design, `reset.css` para normalização base
- **JavaScript** — vanilla ES6+, sem bibliotecas
- **Fontes** — Playfair Display + DM Sans via Google Fonts
- **Imagens** — Unsplash
- **Ícones** — SVG inline

---

## Estrutura do projeto

```
sweet-crumbs/
└── src/
    ├── index.html
    ├── styles/
    │   ├── reset.css
    │   └── style.css
    ├── scripts/
    │   └── script.js
    └── assets/
        └── icons/          # Favicons + web manifest
```

---

## Rodando localmente

Não precisa de nenhuma configuração.

```bash
git clone https://github.com/seu-usuario/sweet-crumbs.git
```

Depois é só abrir o arquivo `src/index.html` no navegador. Só isso.

---

## Deploy

É uma página estática, então qualquer host funciona:

**GitHub Pages** — suba o repositório, vá em Settings → Pages e defina a origem como a pasta `main` / `src`.

**Netlify** — arraste a pasta `src/` em netlify.com/drop.

**Qualquer outro lugar** — faça upload da pasta `src/`. Sem configuração de servidor necessária.

---

## Funcionalidades do JavaScript

O `script.js` cuida de quatro coisas, tudo sem bibliotecas externas:

- **Navegação mobile** — toggle do hambúrguer com `aria-expanded` sincronizado; fecha ao clicar no overlay, em um link do menu ou ao pressionar `Escape`
- **Scroll reveal** — animações de entrada via `IntersectionObserver` (threshold: 12%), com `unobserve` após disparar para não repetir
- **Acordeão do FAQ** — apenas um item aberto por vez, `aria-expanded` sincronizado em cada toggle
- **Carrossel de produtos** — dots de navegação construídos dinamicamente, posição de scroll sincronizada com `rafThrottle` (uma atualização por frame), dots reconstruídos no resize com `debounce` (200 ms)

---

## Acessibilidade e performance

- Todas as imagens têm `width` e `height` explícitos para evitar layout shift
- A imagem do hero usa `loading="eager"` e `fetchpriority="high"` para melhorar o LCP
- A navegação usa `<ul>/<li>` como esperado por leitores de tela
- `aria-expanded` é mantido sincronizado no menu mobile e em cada item do FAQ
- Fontes são pré-conectadas via `<link rel="preconnect">` para reduzir o tempo de DNS

---

## Licença

MIT
