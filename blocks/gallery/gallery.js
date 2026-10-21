export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'gallery-grid';

  [...block.children].forEach((row) => {
    const [mediaCell, titleCell, catCell] = [...row.children];
    const li = document.createElement('li');
    li.className = 'gallery-item';

    const figure = document.createElement('figure');
    const picture = mediaCell?.querySelector('picture');
    if (picture) figure.append(picture);

    const caption = document.createElement('figcaption');
    const h3 = document.createElement('h3');
    const link = titleCell?.querySelector('a');
    if (link) {
      link.className = 'gallery-link';
      h3.append(link);
    } else {
      h3.textContent = titleCell?.textContent.trim() || '';
    }
    const cat = document.createElement('p');
    cat.textContent = catCell?.textContent.trim() || '';
    caption.append(h3, cat);

    figure.append(caption);
    li.append(figure);
    list.append(li);
  });

  block.textContent = '';
  block.append(list);
}
