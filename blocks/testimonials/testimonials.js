import { icon, carouselControls } from '../../scripts/technowp.js';

export default function decorate(block) {
  const track = document.createElement('div');
  track.className = 'testimonials-track';
  track.tabIndex = 0;
  track.setAttribute('role', 'region');
  track.setAttribute('aria-label', 'Customer testimonials');

  [...block.children].forEach((row) => {
    const [avatarCell, whoCell, saidCell] = [...row.children];
    const card = document.createElement('figure');
    card.className = 'testimonial';

    const stars = document.createElement('div');
    stars.className = 'testimonial-stars';
    stars.setAttribute('role', 'img');
    stars.setAttribute('aria-label', '5 out of 5 stars');
    for (let i = 0; i < 5; i += 1) stars.append(icon('star'));

    const paragraphs = saidCell ? [...saidCell.querySelectorAll('p')] : [];
    const quoteText = paragraphs.length > 1 ? paragraphs.slice(1) : paragraphs;
    const headline = paragraphs.length > 1 ? paragraphs[0].textContent.trim() : '';

    const quote = document.createElement('blockquote');
    if (headline) {
      const h = document.createElement('p');
      h.className = 'testimonial-headline';
      h.textContent = headline;
      quote.append(h);
    }
    quoteText.forEach((p) => quote.append(p));

    const person = document.createElement('figcaption');
    const avatar = avatarCell?.querySelector('picture');
    if (avatar) {
      const wrap = document.createElement('div');
      wrap.className = 'testimonial-avatar';
      wrap.append(avatar);
      person.append(wrap);
    }
    const who = document.createElement('div');
    who.className = 'testimonial-who';
    who.append(...(whoCell ? whoCell.childNodes : []));
    person.append(who);

    const mark = icon('quote', 'testimonial-mark');
    card.append(mark, stars, quote, person);
    track.append(card);
  });

  block.textContent = '';
  block.append(track, carouselControls(track));
}
