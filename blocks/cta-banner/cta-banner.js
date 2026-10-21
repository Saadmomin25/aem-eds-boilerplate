export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const cells = [...row.children];
  const [contentCell, mediaCell] = cells;
  if (!contentCell) return;

  const inner = document.createElement('div');
  inner.className = 'cta-inner';
  inner.append(...contentCell.childNodes);

  const first = inner.firstElementChild;
  if (first && first.tagName === 'P' && !first.querySelector('a') && first.nextElementSibling?.matches('h1, h2, h3')) {
    first.classList.add('cta-intro');
  }

  block.textContent = '';

  const picture = mediaCell?.querySelector('picture');
  if (picture) {
    const bg = document.createElement('div');
    bg.className = 'cta-bg';
    bg.append(picture);
    block.append(bg);
    block.classList.add('has-image');
  }

  block.append(inner);
}
