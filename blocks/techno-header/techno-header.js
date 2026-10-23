export default async function decorate(block) {
  const data = {};

  // Parse block table
  [...block.children].forEach((row) => {
    const cols = [...row.children];

    if (cols.length < 2) return;

    const key = cols[0].textContent.trim().toLowerCase();
    data[key] = cols[1];
  });

  const getValue = (key) => data[key]?.textContent.trim() || '';

  const logoMarkup =
    data.logo?.querySelector('picture')?.outerHTML ||
    data.logo?.querySelector('img')?.outerHTML ||
    data.logo?.innerHTML ||
    '';

  const navPath = getValue('nav') || '/technonav';

  block.innerHTML = `
    <header class="technowp-header">

      <div class="technowp-topbar">
        <div class="technowp-topbar-left">
          <span class="top-item">📍 ${getValue('location')}</span>
          <span class="top-item">📞 ${getValue('phone')}</span>
          <span class="top-item">✉️ ${getValue('email')}</span>
        </div>

        <div class="technowp-topbar-right">
          <span class="top-item">🕒 ${getValue('hours')}</span>

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

        <button
          class="technowp-menu-toggle"
          aria-label="Toggle Navigation"
        >
          ☰
        </button>

        <nav class="technowp-nav">
          <ul class="technowp-nav-list"></ul>
        </nav>

        <div class="technowp-actions">
          <button
            class="search-btn"
            aria-label="Search"
            type="button"
          >
            🔍
          </button>

          <a
            href="${getValue('button-link') || '#'}"
            class="quote-btn"
          >
            ${getValue('button-label') || 'Get Quotes'}
          </a>
        </div>

      </div>

    </header>
  `;

  // Load navigation fragment
  try {
    const response = await fetch(`${navPath}.plain.html`);

    if (!response.ok) {
      throw new Error(`Unable to load ${navPath}`);
    }

    const html = await response.text();

    const temp = document.createElement('div');
    temp.innerHTML = html;

    const navList = block.querySelector('.technowp-nav-list');
    const links = [...temp.querySelectorAll('a')];

    navList.innerHTML = links
      .map(
        (link) => `
          <li>
            <a href="${link.getAttribute('href')}">
              ${link.textContent.trim()}
            </a>
          </li>
        `,
      )
      .join('');
  } catch (error) {
    console.error('Navigation loading failed:', error);
  }

  // Mobile menu
  const menuToggle = block.querySelector('.technowp-menu-toggle');
  const nav = block.querySelector('.technowp-nav');

  menuToggle?.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}
