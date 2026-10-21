export default function decorate(block) {
  const track = document.createElement('div');
  track.className = 'testimonials-track';

  [...block.children].forEach((row) => {
    const [avatarCell, whoCell, saidCell] = [...row.children];
    const card = document.createElement('article');
    card.className = 'testimonial';

    const header = document.createElement('div');
    header.className = 'testimonial-header';

    const avatarWrap = document.createElement('div');
    avatarWrap.className = 'testimonial-avatar';

    const avatar = avatarCell?.querySelector('picture, img');
    if (avatar) {
      avatarWrap.append(avatar.cloneNode(true));
    } else {
      const fallback = document.createElement('span');
      fallback.className = 'testimonial-avatar-fallback';
      fallback.textContent = 'A';
      avatarWrap.append(fallback);
    }

    const meta = document.createElement('div');
    meta.className = 'testimonial-meta';

    const whoItems = whoCell ? [...whoCell.children].filter((el) => el.textContent.trim()) : [];

    if (whoItems.length > 0) {
      const [primaryNode, secondaryNode] = whoItems;
      const name = document.createElement('h3');
      name.className = 'testimonial-name';
      name.textContent = primaryNode.textContent.trim();
      meta.append(name);

      if (secondaryNode) {
        const role = document.createElement('div');
        role.className = 'testimonial-role';
        role.textContent = secondaryNode.textContent.trim();
        meta.append(role);
      }
    } else if (whoCell) {
      const text = whoCell.textContent.trim();
      const parts = text.split(/\s*\n\s*|\s*\/\s*|\s{2,}/).filter(Boolean);
      const [first, second] = parts;

      if (first) {
        const name = document.createElement('h3');
        name.className = 'testimonial-name';
        name.textContent = first;
        meta.append(name);
      }

      if (second) {
        const role = document.createElement('div');
        role.className = 'testimonial-role';
        role.textContent = second;
        meta.append(role);
      }
    }

    header.append(avatarWrap, meta);

    const stars = document.createElement('div');
    stars.className = 'testimonial-stars';
    stars.setAttribute('role', 'img');
    stars.setAttribute('aria-label', '5 out of 5 stars');
    for (let i = 0; i < 5; i += 1) {
      const star = document.createElement('span');
      star.className = 'testimonial-star';
      star.textContent = '★';
      stars.append(star);
    }

    const quote = document.createElement('blockquote');
    quote.className = 'testimonial-quote';

    const paragraphs = saidCell ? [...saidCell.querySelectorAll('p')] : [];
    if (paragraphs.length) {
      paragraphs.forEach((p) => {
        const quoteText = document.createElement('p');
        quoteText.textContent = p.textContent.trim();
        quote.append(quoteText);
      });
    } else if (saidCell) {
      const fallback = document.createElement('p');
      fallback.textContent = saidCell.textContent.trim();
      quote.append(fallback);
    }

    card.append(header, stars, quote);
    track.append(card);
  });

  block.textContent = '';
  block.append(track);
}
