/**
 * Oak & Lily Authentic Judge.me Testimonials Carousel Script
 * Five-second rotation, hover pause, prev/next arrows.
 */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('.jdgm-testimonials-carousel');
  if (!root) return;
  const cards = Array.from(root.querySelectorAll('.jdgm-card'));
  if (cards.length === 0) return;

  let index = 0;
  const show = (n) => {
    index = (n + cards.length) % cards.length;
    cards.forEach((c, i) => {
      c.classList.toggle('active', i === index);
      c.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
  };

  window.jdgmPreviousCard = () => show(index - 1);
  window.jdgmNextCard = () => show(index + 1);

  let timer = setInterval(window.jdgmNextCard, 5000);

  root.addEventListener('mouseenter', () => clearInterval(timer));
  root.addEventListener('mouseleave', () => {
    clearInterval(timer);
    timer = setInterval(window.jdgmNextCard, 5000);
  });

  show(0);
});
