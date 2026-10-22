import { decorateBlock, loadBlock, toClassName } from '../../scripts/aem.js';

// Blocks that may be authored as a table inside a column cell.
// Add more names here (for example 'cards') to allow them too.
const NESTED_BLOCKS = ['accordion'];

/**
 * A table nested in a Word / Google Docs cell reaches the page as a plain <table>.
 * Turn it into the same <div> structure EDS produces for a normal block.
 * Header cell: "accordion" or "accordion (single, open-first)".
 */
function tableToBlock(table) {
  const rows = [...table.querySelectorAll('tr')];
  if (!rows.length) return null;

  const header = rows.shift().textContent.trim().toLowerCase();
  const match = header.match(/^([^(]+?)\s*(?:\(([^)]*)\))?$/);
  if (!match) return null;
  const name = toClassName(match[1]);
  if (!NESTED_BLOCKS.includes(name)) return null;
  const variants = (match[2] || '').split(',').map((v) => toClassName(v)).filter(Boolean);

  const block = document.createElement('div');
  block.className = [name, ...variants].join(' ');

  rows.forEach((tr) => {
    const row = document.createElement('div');
    [...tr.children].forEach((td) => {
      const cell = document.createElement('div');
      cell.append(...td.childNodes);
      // bare text in a table cell: wrap it so it behaves like authored paragraph text
      if (cell.children.length === 0 && cell.textContent.trim()) {
        const p = document.createElement('p');
        p.textContent = cell.textContent.trim();
        cell.replaceChildren(p);
      }
      row.append(cell);
    });
    block.append(row);
  });

  table.replaceWith(block);
  return block;
}

export default async function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns (standard boilerplate behaviour)
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is the only content in the column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  // nested blocks: tables (document authoring) or ready-made block divs (Universal Editor)
  const nested = [
    ...[...block.querySelectorAll('table')].map(tableToBlock),
    ...NESTED_BLOCKS.flatMap((n) => [...block.querySelectorAll(`.${n}:not(.block)`)]),
  ].filter(Boolean);

  const unique = [...new Set(nested)];
  unique.forEach((el) => decorateBlock(el));
  await Promise.all(unique.map((el) => loadBlock(el)));
}
