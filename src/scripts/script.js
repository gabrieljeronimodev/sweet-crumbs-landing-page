/* ─── Helpers ────────────────────────────────────────────────── */

/**
 * Returns a function that delays invoking `fn` until `wait` ms
 * have elapsed since the last call. Used to avoid rebuilding the
 * carousel dots on every single resize event.
 * @param {Function} fn
 * @param {number} wait
 */
function debounce(fn, wait) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

/**
 * Returns a function that invokes `fn` at most once per animation
 * frame. Used to throttle the carousel scroll listener so it
 * doesn't fire more often than the browser can paint.
 * @param {Function} fn
 */
function rafThrottle(fn) {
  let rafId = null;
  return function (...args) {
    if (rafId !== null) return;
    rafId = requestAnimationFrame(() => {
      fn.apply(this, args);
      rafId = null;
    });
  };
}

/* ─── Copyright year ─────────────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ─── Mobile navigation ──────────────────────────────────────── */
const menuToggle  = document.getElementById('menuToggle');
const mobileNav   = document.getElementById('mobileNav');
const menuCloseBtn = document.getElementById('menuClose');

function openNav() {
  mobileNav.hidden = false;
  menuToggle.setAttribute('aria-expanded', 'true');
  // Move focus into the dialog for keyboard / screen-reader users
  menuCloseBtn.focus();
}

function closeNav() {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.focus();
}

menuToggle.addEventListener('click', openNav);
menuCloseBtn.addEventListener('click', closeNav);

// Close when any in-nav link is clicked
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', closeNav);
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !mobileNav.hidden) closeNav();
});

/* ─── Scroll-reveal (IntersectionObserver) ───────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach((el) => {
  revealObserver.observe(el);
});

/* ─── FAQ accordion ──────────────────────────────────────────── */
document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item    = btn.closest('.faq-item');
    const isOpen  = item.classList.contains('open');

    // Close all items first
    document.querySelectorAll('.faq-item').forEach((i) => {
      i.classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Toggle the clicked item
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ─── Product carousel ───────────────────────────────────────── */
const carousel      = document.getElementById('productCarousel');
const dotsContainer = document.getElementById('carouselDots');
const cards         = Array.from(carousel.querySelectorAll('.product-card'));

/** Number of fully-visible cards at the current viewport width. */
function visibleCount() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640)  return 2;
  return 1;
}

/**
 * Reads the actual rendered gap between the first two cards instead
 * of hard-coding the pixel value. Falls back to 24 px (1.5 rem)
 * if there's only one card.
 */
function cardGap() {
  if (cards.length < 2) return 24;
  const r1 = cards[0].getBoundingClientRect();
  const r2 = cards[1].getBoundingClientRect();
  return r2.left - r1.right;
}

function scrollToCard(index) {
  const width = cards[0].offsetWidth + cardGap();
  carousel.scrollTo({ left: width * index, behavior: 'smooth' });
}

/** Rebuilds the dot buttons to match the current number of pages. */
function buildDots() {
  dotsContainer.innerHTML = '';
  const count = cards.length - visibleCount() + 1;

  for (let i = 0; i < count; i++) {
    const btn = document.createElement('button');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-label', `Go to product ${i + 1}`);
    if (i === 0) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    } else {
      btn.setAttribute('aria-selected', 'false');
    }
    btn.addEventListener('click', () => scrollToCard(i));
    dotsContainer.appendChild(btn);
  }
}

/** Syncs the active dot to the current scroll position. */
function syncDots() {
  const width   = cards[0].offsetWidth + cardGap();
  const index   = Math.round(carousel.scrollLeft / width);
  const buttons = dotsContainer.querySelectorAll('button');

  buttons.forEach((btn, i) => {
    const active = i === index;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });
}

// Throttle scroll handler to one update per animation frame
carousel.addEventListener('scroll', rafThrottle(syncDots));

// Debounce resize handler — rebuild dots 200 ms after resizing stops
window.addEventListener('resize', debounce(buildDots, 200));

// Initial build
buildDots();
