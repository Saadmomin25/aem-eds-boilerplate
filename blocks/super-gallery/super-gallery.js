export default function decorate(block) {
  const rows = [...block.children];

  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'super-gallery-wrapper';

  rows.forEach((row) => {
    const cols = [...row.children];

    if (cols.length < 3) {
      return;
    }

    const [imageCol, titleCol, categoryCol] = cols;

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

    wrapper.append(card);
  });

  block.append(wrapper);
}
