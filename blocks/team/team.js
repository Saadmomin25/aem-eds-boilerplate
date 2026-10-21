import { iconizeLinks } from '../../scripts/technowp.js';

export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'team-grid';

  [...block.children].forEach((row) => {
    const [mediaCell, bodyCell] = [...row.children];
    const li = document.createElement('li');
    li.className = 'team-member';

    const photo = document.createElement('div');
    photo.className = 'team-photo';
    photo.append(...(mediaCell ? mediaCell.childNodes : []));

    const body = document.createElement('div');
    body.className = 'team-body';
    body.append(...(bodyCell ? bodyCell.childNodes : []));

    const social = body.querySelector('ul');
    if (social) {
      social.className = 'team-social';
      iconizeLinks(social);
    }

    li.append(photo, body);
    list.append(li);
  });

  block.textContent = '';
  block.append(list);
}
