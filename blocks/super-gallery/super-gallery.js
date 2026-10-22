export default function decorate(block) {
  const rows = [...block.children];

  const grid = document.createElement('div');
  grid.className = 'super-gallery-grid';

  rows.forEach((row) => {
    const cols = [...row.children];

    if (cols.length < 3) {
      return;
    }

    const imageCol = cols[0];
    const titleCol = cols[1];
    const categoryCol = cols[2];

    const card = document.createElement('div');
    card.className = 'super-gallery-card';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'super-gallery-image';

    const picture = imageCol.querySelector('picture');

    if (picture) {
      imageWrapper.append(picture);
    }

    const content = document.createElement('div');
    content.className = 'super-gallery-content';

    const title = document.createElement('h3');
    title.textContent = titleCol.textContent.trim();

    const category = document.createElement('p');
    category.textContent = categoryCol.textContent.trim();

    content.append(title, category);

    card.append(imageWrapper);
    card.append(content);

    grid.append(card);
  });

  block.innerHTML = '';
  block.append(grid);
}
