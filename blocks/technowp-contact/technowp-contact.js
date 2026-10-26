export default function decorate(block) {
  const rows = [...block.children];

  const cards = [];
  let heading = 'Contact Us';
  let buttonText = 'Submit Request';

  rows.forEach((row) => {
    const cols = [...row.children];

    if (!cols.length) return;

    const type = cols[0]?.textContent
      .trim()
      .toLowerCase();

    if (type === 'contact-card') {
      cards.push({
        icon: cols[1]?.textContent.trim().toLowerCase(),
        title: cols[2]?.textContent.trim(),
        description: cols[3]?.innerHTML || '',
      });
    }

    if (type === 'form-heading') {
      heading = cols[1]?.textContent.trim() || heading;
    }

    if (type === 'button-text') {
      buttonText = cols[1]?.textContent.trim() || buttonText;
    }
  });

  const icons = {
    location: `
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 10.5A3.5 3.5 0 1 1 12 5.5a3.5 3.5 0 0 1 0 7z"/>
      </svg>
    `,
    phone: `
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 1H7C5.9 1 5 1.9 5 3v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 17H7V4h10v14z"/>
      </svg>
    `,
    email: `
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    `,
  };

  block.innerHTML = `
    <div class="contact-info">

      ${cards
        .map(
          (card) => `
            <div class="contact-card">

              <div class="contact-icon">
                ${icons[card.icon] || icons.location}
              </div>

              <div class="contact-content">
                <h3>${card.title}</h3>
                <div>${card.description}</div>
              </div>

            </div>
          `,
        )
        .join('')}

    </div>

    <div class="contact-form-wrapper">

      <h2>${heading}</h2>

      <form class="contact-form">

        <div class="field-group">
          <input type="text" placeholder="Name" />
          <input type="tel" placeholder="Phone" />
        </div>

        <div class="field-group">
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Subject" />
        </div>

        <textarea rows="8" placeholder="Message"></textarea>

        <button type="submit">
          ${buttonText}
        </button>

      </form>

    </div>
  `;
}
