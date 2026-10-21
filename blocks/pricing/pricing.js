import { icon } from '../../scripts/technowp.js';

function splitPrice(text) {
  const m = text.trim().match(/^(\D*\d[\d.,]*)\s*(.*)$/);
  return m ? { amount: m[1], period: m[2] } : { amount: text.trim(), period: '' };
}

export default function decorate(block) {
  const rows = [...block.children];

  const plans = rows.map((row) => {
    const [nameCell, priceCell, featureCell, ctaCell] = [...row.children];
    const plan = document.createElement('div');
    plan.className = 'plan';

    const name = document.createElement('h3');
    name.textContent = nameCell?.textContent.trim() || '';

    const { amount, period } = splitPrice(priceCell?.textContent || '');
    const price = document.createElement('p');
    price.className = 'plan-price';
    const a = document.createElement('span');
    a.className = 'plan-amount';
    a.textContent = amount;
    price.append(a);
    if (period) {
      const p = document.createElement('span');
      p.className = 'plan-period';
      p.textContent = period;
      price.append(p);
    }

    const list = featureCell?.querySelector('ul');
    if (list) {
      list.className = 'plan-features';
      list.querySelectorAll(':scope > li').forEach((li) => {
        const ic = icon('check');
        if (ic) li.prepend(ic);
      });
    }

    const cta = document.createElement('div');
    cta.className = 'plan-cta';
    ctaCell?.querySelectorAll('a').forEach((link) => {
      link.className = 'button';
      cta.append(link);
    });

    plan.append(name, price);
    if (list) plan.append(list);
    plan.append(cta);
    return plan;
  });

  // highlight the middle plan when there are 3 (or any odd number >= 3)
  if (plans.length >= 3 && plans.length % 2 === 1) {
    plans[Math.floor(plans.length / 2)].classList.add('featured');
  }

  block.textContent = '';
  block.append(...plans);
}
