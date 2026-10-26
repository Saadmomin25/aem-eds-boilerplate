export default function decorate(block) {
  const rows = [...block.children];

  const cards = [];
  let heading = 'Contact Us';

  rows.forEach((row) => {
    const cols = [...row.children];

    if (cols.length === 3) {
      cards.push({
        type: cols[0]?.textContent.trim().toLowerCase(),
        title: cols[1]?.textContent.trim(),
        description: cols[2]?.innerHTML,
      });
    }

    if (cols.length === 1) {
      heading = cols[0].textContent.trim();
    }
  });

  const iconMap = {
    location: '📍',
    phone: '📱',
    email: '✉️',
  };

  block.innerHTML = `
    <div class="technowp-contact-wrapper">

      <div class="contact-info">

        ${cards.map((card) => `
          <div class="contact-card">

            <div class="contact-icon">
              ${iconMap[card.type] || 'ℹ️'}
            </div>

            <div class="contact-content">
              <h3>${card.title}</h3>
              <p>${card.description}</p>
            </div>

          </div>
        `).join('')}

      </div>

      <div class="contact-form-wrapper">

        <h2>${heading}</h2>

        <form class="contact-form">

          <div class="field-group">
            <input type="text" placeholder="Name" required />
            <input type="tel" placeholder="Phone" required />
          </div>

          <div class="field-group">
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Subject" />
          </div>

          <textarea
            placeholder="Message"
            rows="8"
            required>
          </textarea>

          <button type="submit">
            Submit Request
          </button>

        </form>

      </div>

    </div>
  `;
}
