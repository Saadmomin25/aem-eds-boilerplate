let uid = 0;

/**
 * Rows: [ question | answer ]
 * Variants (add in brackets after the block name):
 *   Accordion (open-first)  first item starts open
 *   Accordion (single)      opening one item closes the others
 */
export default function decorate(block) {
  uid += 1;
  const single = block.classList.contains('single');
  const openFirst = block.classList.contains('open-first');
  const items = [];

  const setOpen = (item, open) => {
    item.classList.toggle('is-open', open);
    item.querySelector('.accordion-trigger').setAttribute('aria-expanded', String(open));
    item.querySelector('.accordion-panel').toggleAttribute('inert', !open);
  };

  [...block.children].forEach((row, i) => {
    const [question, answer] = [...row.children];
    if (!question || !answer) return;

    const item = document.createElement('div');
    item.className = 'accordion-item';

    const heading = document.createElement('h3');
    heading.className = 'accordion-heading';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'accordion-trigger';
    trigger.id = `accordion-${uid}-trigger-${i}`;
    trigger.setAttribute('aria-controls', `accordion-${uid}-panel-${i}`);

    const label = document.createElement('span');
    label.className = 'accordion-label';
    label.textContent = question.textContent.trim();

    const chevron = document.createElement('span');
    chevron.className = 'accordion-chevron';
    chevron.setAttribute('aria-hidden', 'true');

    trigger.append(label, chevron);
    heading.append(trigger);

    const panel = document.createElement('div');
    panel.className = 'accordion-panel';
    panel.id = `accordion-${uid}-panel-${i}`;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', trigger.id);

    const content = document.createElement('div');
    content.className = 'accordion-content';
    const body = document.createElement('div');
    body.className = 'accordion-body';
    body.append(...answer.childNodes);
    content.append(body);
    panel.append(content);

    item.append(heading, panel);
    items.push(item);

    trigger.addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      if (single && willOpen) items.forEach((other) => other !== item && setOpen(other, false));
      setOpen(item, willOpen);
    });
  });

  block.textContent = '';
  block.append(...items);
  // everything starts collapsed unless the open-first variant is used
  items.forEach((item, i) => setOpen(item, openFirst && i === 0));
}
