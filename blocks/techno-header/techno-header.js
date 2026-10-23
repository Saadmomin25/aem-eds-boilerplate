export default function decorate(block) {
  const data = {};

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

  block.innerHTML = `
    <header class="technowp-header">

      <div class="technowp-topbar">
        <div class="technowp-topbar-left">
          <span>📍 ${getValue('location')}</span>
          <span>📞 ${getValue('phone')}</span>
          <span>✉️ ${getValue('email')}</span>
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
          <ul class="technowp-nav-list">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/service">Service</a></li>
            <li><a href="/pages">Pages</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>

        <div class="technowp-actions">

          <button
            class="search-btn"
            type="button"
            aria-label="Search">
            🔍
          </button>

          <a
            href="${getValue('button-link') || '/contact'}"
            class="quote-btn">
            ${getValue('button-label') || 'Get Quotes'}
          </a>

        </div>

        <button
          class="technowp-menu-toggle"
          type="button"
          aria-label="Toggle Menu">
          ☰
        </button>

      </div>

    </header>
  `;

  const menuButton = block.querySelector('.technowp-menu-toggle');
  const nav = block.querySelector('.technowp-nav');

  menuButton?.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}
