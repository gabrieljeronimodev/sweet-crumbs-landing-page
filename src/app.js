 document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav
const toggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const close = document.getElementById('menuClose');
toggle.addEventListener('click', () => mobileNav.classList.add('open'));
close.addEventListener('click', () => mobileNav.classList.remove('open'));
document.querySelectorAll('.mobile-link').forEach(l => {
l.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal, .reveal-l, .reveal-r');
const io = new IntersectionObserver((entries) => {
entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
});
});

// Carousel dots
const carousel = document.getElementById('productCarousel');
const dotsContainer = document.getElementById('carouselDots');
const cards = carousel.querySelectorAll('.product-card');
const visibleCount = () => window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
let numDots = 0;

function buildDots() {
dotsContainer.innerHTML = '';
numDots = cards.length - visibleCount() + 1;
for (let i = 0; i < numDots; i++) {
    const btn = document.createElement('button');
    if (i === 0) btn.classList.add('active');
    btn.addEventListener('click', () => scrollToCard(i));
    dotsContainer.appendChild(btn);
}
}

function scrollToCard(index) {
const cardWidth = cards[0].offsetWidth + 24; // gap 1.5rem = 24px
carousel.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
}

carousel.addEventListener('scroll', () => {
const cardWidth = cards[0].offsetWidth + 24;
const idx = Math.round(carousel.scrollLeft / cardWidth);
dotsContainer.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === idx));
});

buildDots();
window.addEventListener('resize', buildDots);