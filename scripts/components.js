// Componentes reutilizáveis para o Portal de Compras Governamentais

// Componente de Card
class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title');
    const description = this.getAttribute('description');
    const icon = this.getAttribute('icon');
    const link = this.getAttribute('link');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          overflow: hidden;
        }
        :host(:hover) {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .icon {
          font-size: 2.5rem;
          color: #1351B4;
          margin-bottom: 1rem;
        }
        .title {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #333;
        }
        .description {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
        .link {
          color: #1351B4;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          background: #f5f5f5;
          transition: background-color 0.3s;
        }
        .link:hover {
          background: #e0e0e0;
        }
      </style>
      <div class="card-content">
        <i class="${icon} icon"></i>
        <h3 class="title">${title}</h3>
        <p class="description">${description}</p>
        <a href="${link}" class="link">Acessar</a>
      </div>
    `;
  }
}

// Componente de Breadcrumb
class Breadcrumb extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const items = JSON.parse(this.getAttribute('items') || '[]');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        .item {
          color: #1351B4;
          text-decoration: none;
        }
        .separator {
          margin: 0 0.5rem;
          color: #666;
        }
        .current {
          color: #666;
        }
      </style>
      ${items.map((item, index) => `
        ${index > 0 ? '<span class="separator">/</span>' : ''}
        ${index === items.length - 1
          ? `<span class="current">${item.text}</span>`
          : `<a href="${item.link}" class="item">${item.text}</a>`
        }
      `).join('')}
    `;
  }
}

// Componente de Menu
class Menu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const items = JSON.parse(this.getAttribute('items') || '[]');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .menu-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          transition: background-color 0.3s;
          text-decoration: none;
          color: #333;
        }
        .menu-item:hover {
          background-color: #f5f5f5;
        }
        .icon {
          color: #1351B4;
          font-size: 1.5rem;
          margin-right: 0.75rem;
        }
      </style>
      <div class="menu">
        ${items.map(item => `
          <a href="${item.link}" class="menu-item">
            <i class="${item.icon} icon"></i>
            <span>${item.text}</span>
          </a>
        `).join('')}
      </div>
    `;
  }
}

// Registrando os componentes
customElements.define('app-card', Card);
customElements.define('app-breadcrumb', Breadcrumb);
customElements.define('app-menu', Menu);
