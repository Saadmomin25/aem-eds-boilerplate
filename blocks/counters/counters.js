function parse(text) {
  const m = text.trim().match(/^([^\d]*)([\d][\d,.]*)(.*)$/);
  if (!m) return null;
  return { prefix: m[1], value: Number(m[2].replace(/,/g, '')), suffix: m[3] };
}

export default function decorate(block) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = [...block.children].map((row) => {
    const [valueCell, labelCell] = [...row.children];
    const item = document.createElement('div');
    item.className = 'counter';

    const raw = valueCell.textContent.trim();
    const parsed = parse(raw);
    const value = document.createElement('p');
    value.className = 'counter-value';
    value.textContent = raw;
    value.setAttribute('aria-label', raw);

    const label = document.createElement('p');
    label.className = 'counter-label';
    label.textContent = labelCell?.textContent.trim() || '';

    item.append(value, label);
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
