const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
  <section class="h-100">
    <div class="card h-100">
      <div class="card-header">
        <strong>Details</strong>
      </div>

      <!-- details will be injected here, by selecting for <slot> element and appending child nodes -->
      <div class="card-body"></div>

      <div class="card-footer d-flex gap-2">
        <button class="btn btn-outline-secondary" type="button">Copy email</button>
        <button class="btn btn-outline-primary" type="button">Open map</button>
      </div>
    </div>
  </section>`;

class ResourceDetails extends HTMLElement {
  #resource = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set resource(data) {
    this.#resource = data;
    this.render()
  }

  render() {
      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(template.content.cloneNode(true));

    if (this.#resource) {
      const detailsContainer = document.createElement('div');

      detailsContainer.innerHTML = `
        <h2 class="h5">${this.#resource.title}</h2>
        <p class="text-body-secondary mb-2">${this.#resource.summary}</p>

        <dl class="row mb-0">
          <dt class="col-4">Category</dt>
          <dd class="col-8">${this.#resource.category}</dd>

          <dt class="col-4">Location</dt>
          <dd class="col-8">${this.#resource.location}</dd>

          <dt class="col-4">Hours</dt>
          <dd class="col-8">${this.#resource.hours}</dd>

          <dt class="col-4">Contact</dt>
          <dd class="col-8">${this.#resource.contact}</dd>
        </dl>
      `;

      this.shadowRoot.querySelector('.card-body').appendChild(detailsContainer);

    } else {

      this.shadowRoot.querySelector('.card-body').innerHTML = `
        <div class="list-group-item">
          <p class="mb-0">Please select a result to view details.</p>
        </div>`;

    }
  }
}

customElements.define('resource-details', ResourceDetails);