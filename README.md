<div align="right">
  <a href="./README.md">🇺🇸 English</a>
  &nbsp;|&nbsp;
  <a href="./README.pt-BR.md">🇧🇷 Português</a>
</div>

# 🍞 Sweet Crumbs

A static landing page for a fictional artisan bakery. No frameworks, no build tools, no dependencies just HTML, CSS, and vanilla JavaScript. Open `index.html` and it works.

---

## What's on the page

The page covers a full local business funnel in eight sections:

| Section | Description |
|---|---|
| **Hero** | Brand intro with two CTAs — order via WhatsApp or scroll to the menu |
| **Our Story** | Three-generation backstory and brand values |
| **Problem** | A gentle nudge about what mass-produced bread lacks |
| **Process** | Step-by-step: how the bread actually gets made |
| **Ingredients** | Sourcing and quality differentiators |
| **Reviews** | Testimonials from fictional locals |
| **Menu** | 8 signature products in a scrollable carousel |
| **FAQ** | Accordion with common questions |
| **Contact / CTA** | Final order push, also via WhatsApp |

---

## Tech stack

- **HTML5** — semantic elements throughout (`<header>`, `<nav>`, `<section>`, `<footer>`)
- **CSS** — custom properties for the design system, `reset.css` for baseline normalization
- **JavaScript** — vanilla ES6+, no libraries
- **Fonts** — Playfair Display + DM Sans via Google Fonts
- **Images** — Unsplash
- **Icons** — inline SVG

---

## Project structure

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

## Running locally

No setup required.

```bash
git clone https://github.com/your-username/sweet-crumbs.git
```

Then open `src/index.html` in your browser. That's it.

---

## Deploying

It's a static page, so any host works:

**GitHub Pages** — push the repo, go to Settings → Pages, set source to `main` / `src` folder.

**Netlify** — drag and drop the `src/` folder at netlify.com/drop.

**Anywhere else** — upload the `src/` folder. No server config needed.

---

## JavaScript features

`script.js` handles four things, all without external libraries:

- **Mobile navigation** — hamburger toggle with `aria-expanded` kept in sync; closes on overlay click, nav link click, and `Escape` key
- **Scroll reveal** — entrance animations via `IntersectionObserver` (threshold: 12%), unobserved after triggering so they don't re-run
- **FAQ accordion** — one item open at a time, `aria-expanded` synced on each toggle
- **Product carousel** — dot navigation built dynamically, scroll position synced with `rafThrottle` (one update per animation frame), dots rebuilt on resize with `debounce` (200 ms)

---

## Accessibility & performance notes

- All images have explicit `width` and `height` to prevent layout shift
- Hero image uses `loading="eager"` and `fetchpriority="high"` for LCP
- Navigation uses `<ul>/<li>` as expected by screen readers
- `aria-expanded` is kept in sync on the mobile menu and every FAQ item
- Fonts are preconnected via `<link rel="preconnect">` to cut DNS time

---

## License

MIT
