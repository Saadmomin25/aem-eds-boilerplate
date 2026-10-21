import { icon } from '../../scripts/technowp.js';

export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;
  const [mediaCell, bodyCell] = [...row.children];

  const media = document.createElement('div');
  media.className = 'about-media';
  media.append(...mediaCell.childNodes);

  const body = document.createElement('div');
  body.className = 'about-body';
  body.append(...bodyCell.childNodes);

  body.querySelectorAll('ul > li').forEach((li) => {
    const ic = icon('check');
    if (ic) li.prepend(ic);
  });

  block.textContent = '';
  block.append(media, body);
}
