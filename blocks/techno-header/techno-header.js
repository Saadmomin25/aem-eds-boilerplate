export default async function decorate(block) {
  const data = {};

  [...block.children].forEach((row) => {
    const cols = [...row.children];

    if (cols.length < 2) return;

    const key = cols[0].textContent.trim().toLowerCase();
    data[key] = cols[1];
  });

  const getValue = (key) => data[key]?.textContent.trim() || '';

  const logoMarkup = data.logo?.innerHTML || '';

  block.innerHTML = `
    <header class="technowp-header">

      <div class="technowp-topbar">

        <div class="technowp-topbar-left">
          <span>📍 ${getValue('location')}</span>
          <span>📞 ${getValue('phone')}</span>
          <span>✉ ${getValue('email')}</span>
        </div>

        <div class="technowp-topbar-right">
          <span>🕒 ${getValue('hours')}</span>
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="Twitter">𝕏</a>
          <a href="#" aria-label="Instagram">◎</a>
        </div>

      </div>

      <div class="technowp-navbar">

        <div class="technowp-logo">
          <a href="/">
            ${logoMarkup}
          </a>
        </div>

        <nav class="technowp-nav">
          <ul class="technowp-nav-list"></ul>
        </nav>

        <div class="technowp-actions">

          <button
            class="search-btn"
            type="button"
            aria-label="Search">
            🔍
          </button>

          <a
            href="${getValue('button-link') || '#'}"
            class="quote-btn">
            ${getValue('button-label') || 'Get Quotes'}
          </a>

        </div>

        <button
          class="technowp-menu-toggle"
          aria-label="Toggle Navigation"
          type="button">
          ☰
        </button>

      </div>

    </header>
  `;

  const navList = block.querySelector('.technowp-nav-list');

  try {
    const navPath = getValue('nav') || '/technonav';

    const response = await fetch(`${navPath}.plain.html`);

    if (!response.ok) {
      throw new Error(`Unable to load navigation from ${navPath}`);
    }

    const text = await response.text();

    const rows = text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const menu = [];

    rows.slice(1).forEach((row) => {
      const idx = row.lastIndexOf('/');

      if (idx > 0) {
        const label = row.substring(0, idx).trim();
        const url = row.substring(idx).trim();

        menu.push(`
          <li>
            <a href="${url}">
              ${label}
            </a>
          </li>
        `);
      }
    });

    navList.innerHTML = menu.join('');
  } catch (error) {
    console.error(error);
  }

  const menuToggle = block.querySelector('.technowp-menu-toggle');
  const nav = block.querySelector('.technowp-nav');

  menuToggle?.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}
