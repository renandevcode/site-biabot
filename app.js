const hero = document.getElementById('topo');
const glow = document.getElementById('bia-glow');
const product = document.getElementById('produto');
const header = document.getElementById('bia-header');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (hero && glow && product && !reducedMotion) {
  const layers = hero.querySelectorAll('[data-depth]');
  let frame;

  function updateHero(x, y) {
    layers.forEach((layer) => {
      const depth = Number(layer.dataset.depth);
      layer.style.transform = `translate(${(x * depth).toFixed(1)}px, ${(y * depth).toFixed(1)}px)`;
    });

    product.style.transform = `perspective(1800px) rotateX(${(-y * 3.5).toFixed(2)}deg) rotateY(${(x * 4.5).toFixed(2)}deg)`;
    glow.style.background = `radial-gradient(600px circle at ${((x + 1) * 50).toFixed(1)}% ${((y + 1) * 50).toFixed(1)}%, rgba(42,174,138,0.16), transparent 70%)`;
  }

  hero.addEventListener('mousemove', (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1));
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => updateHero(x, y));
  });

  hero.addEventListener('mouseleave', () => {
    cancelAnimationFrame(frame);
    updateHero(0, 0);
  });
}

if (header) {
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"], button:not([type])');
    if (!button) return;

    const originalLabel = button.textContent;
    button.textContent = 'Recebemos seu contato!';
    setTimeout(() => { button.textContent = originalLabel; }, 2500);
  });
});
