const ARROW_SVG = {
  left: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>',
  right: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>',
};

/** Merge the first two headings (h1/h2/h3) into one heading with two lines. */
function mergeHeading(content, level) {
  const [first, second] = content.querySelectorAll('h1, h2, h3');
  if (!first) return;
  const heading = document.createElement(`h${level}`);
  heading.className = 'hero-title';
  const top = document.createElement('span');
  top.className = 'hero-title-top';
  top.textContent = first.textContent;
  heading.append(top);
  if (second) {
    const main = document.createElement('span');
    main.className = 'hero-title-main';
    main.textContent = second.textContent;
    heading.append(document.createTextNode(' '), main);
    second.remove();
  }
  first.replaceWith(heading);
}

/** A paragraph that only holds icons (or links wrapping icons) becomes the social row. */
function markSocial(container) {
  container.querySelectorAll('p').forEach((p) => {
    if (p.querySelector('.icon') && !p.textContent.trim()) {
      p.classList.add('social-links');
    }
  });
}

export default function decorate(block) {
  const rows = [...block.children];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const track = document.createElement('div');
  track.className = 'hero-slides';

  const slides = rows.map((row, i) => {
    const [content, media] = [...row.children];
    const slide = document.createElement('div');
    slide.className = 'hero-slide';
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${i + 1} of ${rows.length}`);

    const picture = media?.querySelector('picture');
    if (picture) {
      const bg = document.createElement('div');
      bg.className = 'hero-bg';
      const img = picture.querySelector('img');
      if (img) {
        img.alt = '';
        img.loading = i === 0 ? 'eager' : 'lazy';
        if (i === 0) img.setAttribute('fetchpriority', 'high');
      }
      bg.append(picture);
      slide.append(bg);
    }

    const inner = document.createElement('div');
    inner.className = 'hero-content';
    if (content) {
      mergeHeading(content, i === 0 ? 1 : 2);
      markSocial(content);
      inner.append(...content.childNodes);
    }
    slide.append(inner);
    track.append(slide);
    return slide;
  });

  block.textContent = '';
  block.append(track);
  block.setAttribute('role', 'region');
  block.setAttribute('aria-roledescription', 'carousel');
  block.setAttribute('aria-label', 'Highlights');

  let current = 0;
  let timer;
  const dots = [];

  const show = (n) => {
    current = (n + slides.length) % slides.length;
    slides.forEach((s, idx) => {
      const on = idx === current;
      s.classList.toggle('active', on);
      s.toggleAttribute('inert', !on);
    });
    dots.forEach((d, idx) => d.setAttribute('aria-current', String(idx === current)));
  };

  if (slides.length > 1) {
    const controls = document.createElement('div');
    controls.className = 'hero-controls';

    const arrow = (dir) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'hero-arrow';
      b.setAttribute('aria-label', dir < 0 ? 'Previous slide' : 'Next slide');
      b.innerHTML = dir < 0 ? ARROW_SVG.left : ARROW_SVG.right;
      b.addEventListener('click', () => show(current + dir));
      return b;
    };

    const dotWrap = document.createElement('div');
    dotWrap.className = 'hero-dots';
    slides.forEach((_, idx) => {
      const d = document.createElement('button');
      d.type = 'button';
      d.setAttribute('aria-label', `Show slide ${idx + 1}`);
      d.addEventListener('click', () => show(idx));
      dots.push(d);
      dotWrap.append(d);
    });

    controls.append(arrow(-1), dotWrap, arrow(1));
    block.append(controls);

    const stop = () => clearInterval(timer);
    const start = () => {
      if (reduce) return;
      stop();
      timer = setInterval(() => show(current + 1), 7000);
    };
    block.addEventListener('mouseenter', stop);
    block.addEventListener('mouseleave', start);
    block.addEventListener('focusin', stop);
    block.addEventListener('focusout', start);
    start();
  }
  show(0);
}
