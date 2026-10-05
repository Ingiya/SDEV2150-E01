/* Here, we'll simply display data. When we'll finish writing this to handle that,
   you'll notice that it contains no additional logic. It's literally just a container
   that receives the data it's meant to display, and displays it.
*/

const template = document.createElement('template');
// TODO: Update the template to support dynamic resource details
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
  <section class="h-100">
    <div class="card h-100">
      <div class="card-header">
        <strong>Details</strong>
      </div>

      <div class="card-body">
        <!-- no content in here at first -->
      </div>

      <div class="card-footer d-flex gap-2">
        <button class="btn btn-outline-secondary" type="button">Copy email</button>
        <button class="btn btn-outline-primary" type="button">Open map</button>
      </div>
    </div>
  </section>`;


class ResourceDetails extends HTMLElement {
  // TODO: Create private field for resource data
  #resource = null;

  set resource(data) {
    this.#resource = data;
    this.render();
  }

  constructor() {
    // note how we create the shadow root in the constructor
    // (i.e. when the instance is created, *not* waiting till it's loaded into the DOM)
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // we only render when the component loads into the DOM (otherwise there's nowhere to render)
    // we have a separate render method since we want to re-render when data changes
    // (it's being fired in here, because the initial on-load render should also happen)
    this.render();
  }

  // TODO: Implement setter for resource data, remember to render

  render() {
    // TODO: Render resource details if available
    this.shadowRoot.innerHTML = ''; // clear container before rendering so we don't duplicate contents
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const cardBody = this.shadowRoot.querySelector('.card-body'); // grab this after template is appended so it actually exists


    if (this.#resource) {
      // render out content *if* data exists
      const detailsContainer = document.createElement('div'); // I'm just making a 'floating' node/element to start building; will place it later
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

      // once that 'floating' element/node is built, attach it to DOM
      // which I can safely do, because I cleared out the HTML in this component first
      cardBody.appendChild(detailsContainer);
    } else {
      cardBody.innerHTML = `
        <div class="list-group-item">
          <p class="mb-0">Please select a result to view details.</p>
        </div>
      `;
    }
  }
}

customElements.define('resource-details', ResourceDetails);