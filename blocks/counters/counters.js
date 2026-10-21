const icons = [
  `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><path d="M23.7 8.4c4.5 2.9 8.7 6.7 12.3 11.4l-.2-7.3c0-1.2.9-2.1 2.1-2.1h1.7c1.3 0 2.4 1 2.4 2.3v11.6c0 1.3-1.1 2.4-2.4 2.4H35c-1.3 0-2.4-1.1-2.4-2.4v-7.2l-8.1 8.1c-5.2 5.1-7.8 12.2-7.8 19.4 0 1.3 1.1 2.4 2.4 2.4s2.4-1.1 2.4-2.4c0-5.4 2.1-10.5 5.9-14.3l8.8-8.8c.8-.8 1.9-1.2 3.1-1.2h1.7c1.3 0 2.4 1.1 2.4 2.4v6.9c0 1.3-1.1 2.4-2.4 2.4h-1.3c-1.5 0-2.9.6-4 1.7l-9.8 9.8c-5.3 5.3-12.4 8.3-19.9 8.3-1.6 0-2.8-1.3-2.8-2.8s1.2-2.8 2.8-2.8c6.1 0 12-2.3 16.4-6.7L38.3 35c1.2-1.2 2.7-1.9 4.4-1.9h3.4c1.5 0 2.8 1.2 2.8 2.8v5.5c0 7.4-6 13.4-13.4 13.4h-4.4c-6.4 0-12.4-4.2-14.5-10.4l-2.2-6.5c-.5-1.6-.7-3.2-.7-4.9 0-9 7.2-16.3 16.3-16.3h7.1zm-2 15.3c-4.1 0-7.4 3.3-7.4 7.4 0 4.1 3.3 7.4 7.4 7.4s7.4-3.3 7.4-7.4-3.3-7.4-7.4-7.4z" fill="currentColor"/></svg>`,
  `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><path d="M32 12.8c-6.4 0-11.6 5.2-11.6 11.6s5.2 11.6 11.6 11.6 11.6-5.2 11.6-11.6S38.4 12.8 32 12.8zm0 20.1c-4.7 0-8.5-3.8-8.5-8.5S27.3 15.9 32 15.9s8.5 3.8 8.5 8.5-3.8 8.5-8.5 8.5zm-13.7 18.1c1.5-6.9 7.7-12 14.9-12s13.4 5.1 14.9 12H18.3zm-2.5 0c-.3-1.8-.5-3.7-.5-5.6 0-9.5 7.7-17.2 17.2-17.2s17.2 7.7 17.2 17.2c0 1.9-.2 3.8-.5 5.6h-5.8c.7-1.8 1.1-3.9 1.1-6 0-7.5-6.1-13.6-13.6-13.6S25.5 38.3 25.5 45.8c0 2.1.4 4.2 1.1 6H15.8z" fill="currentColor"/></svg>`,
  `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><path d="M22.7 18.7c0-3.5 2.9-6.4 6.4-6.4h5.8c3.5 0 6.4 2.9 6.4 6.4v7.1c0 3.5-2.9 6.4-6.4 6.4h-5.8c-3.5 0-6.4-2.9-6.4-6.4v-7.1zm11.6 3.7h-4.8v3.7h4.8v-3.7zm-12.8 17.1h25.1c2.1 0 3.8 1.7 3.8 3.8v3.2c0 1.3-1.1 2.4-2.4 2.4h-27.9c-1.3 0-2.4-1.1-2.4-2.4v-3.2c0-2.1 1.7-3.8 3.8-3.8zm-5.2-3.9h35.4c2.7 0 5 2.3 5 5v5.2c0 3.5-2.8 6.3-6.3 6.3H12.9c-3.5 0-6.3-2.8-6.3-6.3v-5.2c0-2.7 2.2-5 5-5zm7.1-16.7c1.8 0 3.2 1.5 3.2 3.2s-1.4 3.2-3.2 3.2-3.2-1.5-3.2-3.2 1.4-3.2 3.2-3.2zm22.4 0c1.8 0 3.2 1.5 3.2 3.2s-1.4 3.2-3.2 3.2-3.2-1.5-3.2-3.2 1.4-3.2 3.2-3.2zm-11.2 0c1.8 0 3.2 1.5 3.2 3.2s-1.4 3.2-3.2 3.2-3.2-1.5-3.2-3.2 1.4-3.2 3.2-3.2z" fill="currentColor"/></svg>`,
  `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><path d="M20.2 18.9c0-2.8 2.3-5.1 5.1-5.1h13.4c2.8 0 5.1 2.3 5.1 5.1v1.9c0 2.8-2.3 5.1-5.1 5.1H25.3c-2.8 0-5.1-2.3-5.1-5.1v-1.9zm6.8 15.4c-2.1 0-3.7 1.7-3.7 3.8v2.9c0 2.1 1.7 3.8 3.7 3.8h9.9c2.1 0 3.7-1.7 3.7-3.8v-2.9c0-2.1-1.7-3.8-3.7-3.8h-9.9zm-9.2-9.8c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5zm-6.8 9.2c1.1 0 2 1 2 2.2v2c0 2.3 1.8 4.1 4.1 4.1h3.2v2.3c0 1.1.9 2.1 2 2.1h21.9c1.1 0 2-.9 2-2.1v-2.3h3.2c2.3 0 4.1-1.8 4.1-4.1v-2c0-1.2.9-2.2 2-2.2s2 .9 2 2.2v2c0 4.5-3.7 8.1-8.1 8.1H18.9c-4.5 0-8.1-3.6-8.1-8.1v-2c0-1.2.9-2.2 2-2.2zm3.6-13.6c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z" fill="currentColor"/></svg>`
];

function buildCounterIcon(index) {
  const wrapper = document.createElement('div');
  wrapper.className = 'counter-icon';
  wrapper.innerHTML = icons[index % icons.length];
  return wrapper;
}

function parse(text) {
  const m = text.trim().match(/^([^\d]*)([\d][\d,.]*)(.*)$/);
  if (!m) return null;
  return { prefix: m[1], value: Number(m[2].replace(/,/g, '')), suffix: m[3] };
}

export default function decorate(block) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = [...block.children].map((row, index) => {
    const [valueCell, labelCell] = [...row.children];
    const item = document.createElement('div');
    item.className = 'counter';

    const icon = buildCounterIcon(index);
    const raw = valueCell.textContent.trim();
    const parsed = parse(raw);
    const value = document.createElement('p');
    value.className = 'counter-value';
    value.textContent = raw;
    value.setAttribute('aria-label', raw);

    const label = document.createElement('p');
    label.className = 'counter-label';
    label.textContent = labelCell?.textContent.trim() || '';

    item.append(icon, value, label);
    return { item, value, parsed };
  });

  block.textContent = '';
  block.append(...items.map((i) => i.item));
  if (reduce) return;

  const animate = ({ value, parsed }) => {
    if (!parsed) return;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      value.textContent = `${parsed.prefix}${Math.round(parsed.value * eased).toLocaleString('en-US')}${parsed.suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      animate(items.find((i) => i.item === e.target));
    });
  }, { threshold: 0.4 });
  items.forEach((i) => io.observe(i.item));
}
