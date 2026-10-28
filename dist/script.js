const phone = '5518996849570';
const waUrl = message => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

document.querySelectorAll('[data-wa]').forEach(link => {
  link.href = waUrl(link.dataset.wa);
  link.target = '_blank';
  link.rel = 'noopener';
});

const header = document.querySelector('.site-header');
const progress = document.querySelector('.scroll-progress span');
const updateScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  header.classList.toggle('scrolled', window.scrollY > 12);
};
window.addEventListener('scroll', updateScroll, { passive: true });
updateScroll();

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#menu-principal');
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');
if (!('IntersectionObserver' in window)) {
  revealItems.forEach(item => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .13 });
  revealItems.forEach(item => observer.observe(item));

  if (!reduced) {
    const heroPhoto = document.querySelector('.parallax-card');
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight * 1.2) heroPhoto.style.transform = `translateY(${window.scrollY * .06}px)`;
    }, { passive: true });
  }
}

document.querySelector('#order-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const details = String(data.get('detalhes') || '').trim();
  const message = [
    'Olá! Vim pelo site da Originalle e gostaria de fazer um pedido.',
    '',
    `Nome: ${data.get('nome')}`,
    `Ocasião: ${data.get('ocasiao')}`,
    `Produto: ${data.get('produto')}`,
    details ? `Detalhes: ${details}` : null
  ].filter(Boolean).join('\n');
  window.open(waUrl(message), '_blank', 'noopener');
});

document.querySelector('#year').textContent = new Date().getFullYear();
