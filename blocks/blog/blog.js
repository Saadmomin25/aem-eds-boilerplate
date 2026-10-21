import { icon, carouselControls } from '../../scripts/technowp.js';

/**
 * Each row: [ picture | category, heading with link, excerpt, "Read More" link ]
 */
export default function decorate(block) {
  const track = document.createElement('ul');
  track.className = 'blog-track';
  track.tabIndex = 0;
  track.setAttribute('aria-label', 'Latest news');

  [...block.children].forEach((row) => {
    const [mediaCell, bodyCell] = [...row.children];
    const li = document.createElement('li');
    li.className = 'blog-card';

    const paragraphs = [...(bodyCell?.querySelectorAll('p') || [])];
    const category = paragraphs[0] && !paragraphs[0].querySelector('a') ? paragraphs[0].textContent.trim() : '';
    const excerpt = paragraphs.find((p, i) => i > 0 && !p.querySelector('a'));
    const title = bodyCell?.querySelector('h2, h3, h4');
    const titleLink = title?.querySelector('a');
    const moreLink = [...(bodyCell?.querySelectorAll('p a') || [])].pop() || titleLink;

    const media = document.createElement('div');
    media.className = 'blog-media';
    const picture = mediaCell?.querySelector('picture');
    if (picture) media.append(picture);
    if (category) {
      const tag = document.createElement('span');
      tag.className = 'blog-category';
      tag.textContent = category;
      media.append(tag);
    }

    const body = document.createElement('div');
    body.className = 'blog-body';
    const h3 = document.createElement('h3');
    if (titleLink) {
      titleLink.className = 'blog-link';
      h3.append(titleLink);
    } else {
      h3.textContent = title?.textContent.trim() || '';
    }
    body.append(h3);
    if (excerpt) {
      excerpt.className = 'blog-excerpt';
      body.append(excerpt);
    }
    if (moreLink) {
      const more = document.createElement('span');
      more.className = 'blog-more';
      more.append(document.createTextNode(moreLink.textContent.trim()), icon('arrow-right'));
      body.append(more);
    }

    li.append(media, body);
    track.append(li);
  });

  block.textContent = '';
  block.append(track, carouselControls(track));
}
