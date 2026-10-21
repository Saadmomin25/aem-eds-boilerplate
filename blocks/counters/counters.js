const ICONS = {
  rocket: '<path fill-rule="evenodd" d="M12 1.5c3.2 2.2 5 5.8 5 9.6l2.2 3.1c.2.3.3.6.3 1V18l-3.6-1.6H8.1L4.5 18v-2.8c0-.4.1-.7.3-1L7 11.1c0-3.8 1.8-7.4 5-9.6zm0 6.3a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6z"/><path d="M9.6 18.6h4.8L12 22.5z"/>',
  user: '<path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="M12 2.5c-2.6 0-4.4 2-4.4 4.7 0 2.6 1.6 4.8 4.4 4.8s4.4-2.2 4.4-4.8c0-2.7-1.8-4.7-4.4-4.7z"/><path d="M2.5 22v-3.4c0-1.8 1.4-3.2 3.6-3.9l3.3-1.1L12 16l2.6-2.4 3.3 1.1c2.2.7 3.6 2.1 3.6 3.9V22z"/><path fill="#fff" d="M12 16l-1.6 1.2L11.3 22h1.4l.9-4.8z"/>',
  headset: '<path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" d="M4.5 13v-2a7.5 7.5 0 0 1 15 0v2"/><rect x="2.5" y="10.5" width="4.5" height="8" rx="2"/><rect x="17" y="10.5" width="4.5" height="8" rx="2"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M19.3 18.5v.8c0 1.2-1 2.2-2.2 2.2H13"/>',
  trophy: '<path d="M6.5 2.5h11v6.2a5.5 5.5 0 0 1-11 0z"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M6.5 4.5H3.2v2.3c0 1.9 1.4 3.4 3.5 3.7M17.5 4.5h3.3v2.3c0 1.9-1.4 3.4-3.5 3.7"/><rect x="10.8" y="13.5" width="2.4" height="4"/><rect x="7.5" y="17.5" width="9" height="4.5" rx=".6"/>',
};
const ICON_ORDER = ['rocket', 'user', 'headset', 'trophy'];

function pickIconName(label, index) {
  const l = label.toLowerCase();
  if (/project|launch|deliver/.test(l)) return 'rocket';
  if (/partner|team|people|member/.test(l)) return 'user';
  if (/client|support|customer|service/.test(l)) return 'headset';
  if (/award|win|trophy|achiev/.test(l)) return 'trophy';
  return ICON_ORDER[index % ICON_ORDER.length];
}

function buildSvg(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.innerHTML = ICONS[name];
  return svg;
}

/** Turn whatever was authored into [{ icon, value, label }] */
function parseStats(block) {
  const rows = [...block.children];
  const multiCell = rows.some((r) => r.children.length >= 2);
  const stats = [];

  if (multiCell) {
    rows.forEach((row) => {
      const cells = [...row.children];
      let icon = null;
      if (cells.length >= 3 || cells[0].querySelector('img, svg, .icon')) {
        const iconCell = cells.shift();
        icon = iconCell.querySelector('img, svg, .icon');
      }
      const [valueCell, labelCell] = cells;
      if (!valueCell || !labelCell) return;
      stats.push({
        icon,
        value: valueCell.textContent.trim(),
        label: labelCell.textContent.trim(),
      });
    });
  } else {
    // flat list of paragraphs/divs: number, label, number, label ...
    const items = [...block.querySelectorAll('p, div')]
      .filter((el) => !el.querySelector('p, div'))
      .map((el) => el.textContent.trim())
      .filter(Boolean);
    for (let i = 0; i + 1 < items.length; i += 2) {
      stats.push({ icon: null, value: items[i], label: items[i + 1] });
    }
  }
  return stats;
}

/** "523+" -> { number: 523, suffix: "+" } ; "1,200 +" -> { 1200, "+" } */
function splitValue(raw) {
  const match = raw.match(/^([\d.,]+)\s*(.*)$/);
  if (!match) return { number: null, suffix: '', text: raw };
  const number = parseFloat(match[1].replace(/,/g, ''));
  return { number, suffix: match[2], hasComma: match[1].includes(',') };
}

function animate(el, target, hasComma) {
  const fmt = (n) => (hasComma ? n.toLocaleString('en-US') : String(n));
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = fmt(target);
    return;
  }
  const duration = 1600;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - t) ** 3; // ease-out cubic
    el.textContent = fmt(Math.round(target * eased));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export default function decorate(block) {
  const stats = parseStats(block);
  if (!stats.length) return;

  const list = document.createElement('ul');
  list.className = 'counters-list';

  stats.forEach((stat, i) => {
    const { number, suffix, hasComma } = splitValue(stat.value);
    const li = document.createElement('li');
    li.className = 'counters-item';

    // icon
    const iconWrap = document.createElement('div');
    iconWrap.className = 'counters-icon';
    if (stat.icon && stat.icon.tagName !== 'svg') {
      iconWrap.append(stat.icon);
    } else {
      iconWrap.append(buildSvg(pickIconName(stat.label, i)));
    }

    // number + suffix
    const valueEl = document.createElement('p');
    valueEl.className = 'counters-value';
    const numEl = document.createElement('span');
    numEl.className = 'counters-number';
    numEl.textContent = number === null ? stat.value : (hasComma ? number.toLocaleString('en-US') : String(number));
    valueEl.append(numEl);
    if (suffix) {
      const sufEl = document.createElement('span');
      sufEl.className = 'counters-suffix';
      sufEl.textContent = suffix;
      valueEl.append(sufEl);
    }
    valueEl.setAttribute('aria-label', `${stat.value} ${stat.label}`);

    // label
    const labelEl = document.createElement('p');
    labelEl.className = 'counters-label';
    labelEl.textContent = stat.label;

    li.append(iconWrap, valueEl, labelEl);
    li.dataset.target = number === null ? '' : number;
    li.dataset.comma = hasComma ? 'true' : 'false';
    list.append(li);
  });

  block.textContent = '';
  block.append(list);

  // count up once, when the block scrolls into view
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        list.querySelectorAll('.counters-item').forEach((li) => {
          if (li.dataset.target === '') return;
          animate(li.querySelector('.counters-number'), Number(li.dataset.target), li.dataset.comma === 'true');
        });
      });
    }, { threshold: 0.4 });
    io.observe(block);
  }
}
