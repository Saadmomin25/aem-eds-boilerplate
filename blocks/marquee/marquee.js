import { icon } from '../../scripts/technowp.js';

export default function decorate(block) {
  const words = [...block.querySelectorAll(':scope > div > div')]
    .map((cell) => cell.textContent.trim())
    .filter(Boolean);
  block.textContent = '';
  if (!words.length) return;

  const makeList = (hidden) => {
    const ul = document.createElement('ul');
    ul.className = 'marquee-list';
    if (hidden) ul.setAttribute('aria-hidden', 'true');
    // each half must be wider than the viewport so the loop never shows a gap
    const reps = Math.max(1, Math.ceil(10 / words.length));
    for (let r = 0; r < reps; r += 1) {
      words.forEach((word) => {
        const li = document.createElement('li');
        li.append(icon('star'), document.createTextNode(word));
        ul.append(li);
      });
    }
    return ul;
  };

  const track = document.createElement('div');
  track.className = 'marquee-track';
  // two identical halves; the animation moves exactly one half
  track.append(makeList(false), makeList(true));
  block.append(track);
}
