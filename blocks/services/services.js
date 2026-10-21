import { icon } from '../../scripts/technowp.js';

export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'services-grid';

  [...block.children].forEach((row) => {
    const [iconCell, titleCell, textCell] = [...row.children];
    const li = document.createElement('li');
    li.className = 'service';

    const badge = document.createElement('div');
    badge.className = 'service-icon';
    const ic = icon(iconCell?.textContent.trim());
    if (ic) badge.append(ic);

    const title = document.createElement('h3');
    const link = titleCell?.querySelector('a');
    if (link) {
      link.className = 'service-link';
      title.append(link);
    } else {
      title.textContent = titleCell?.textContent.trim() || '';
    }

    const text = document.createElement('p');
    text.textContent = textCell?.textContent.trim() || '';

    li.append(badge, title, text);
    list.append(li);
  });

  block.textContent = '';
  block.append(list);
}
