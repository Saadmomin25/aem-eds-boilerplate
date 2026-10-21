import { icon } from '../../scripts/technowp.js';

/**
 * Row 1:   [ picture | intro (eyebrow h4, h2, paragraph) ]
 * Row 2+:  [ question | answer ]
 */
export default function decorate(block) {
  const [introRow, ...qaRows] = [...block.children];
  const [mediaCell, introCell] = [...introRow.children];

  const media = document.createElement('div');
  media.className = 'faq-media';
  media.append(...mediaCell.childNodes);

  const body = document.createElement('div');
  body.className = 'faq-body';

  const intro = document.createElement('div');
  intro.className = 'faq-intro';
  intro.append(...introCell.childNodes);
  body.append(intro);

  const list = document.createElement('div');
  list.className = 'faq-list';
  qaRows.forEach((row, i) => {
    const [q, a] = [...row.children];
    const details = document.createElement('details');
    details.name = 'technowp-faq'; // only one answer open at a time
    if (i === 0) details.open = true;

    const summary = document.createElement('summary');
    const label = document.createElement('span');
    label.textContent = q.textContent.trim();
    summary.append(label, icon('plus', 'faq-toggle'));

    const answer = document.createElement('div');
    answer.className = 'faq-answer';
    answer.append(...a.childNodes);

    details.append(summary, answer);
    list.append(details);
  });
  body.append(list);

  block.textContent = '';
  block.append(media, body);
}
