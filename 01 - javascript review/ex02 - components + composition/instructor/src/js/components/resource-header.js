// I'm going to store the HTML for the component in a 'safe' place we'll *copy* from.
// That way, we don't risk permanently / irreversibly mutating the HTML.
const template = document.createElement('template'); // an unattached DOM element/node where we'll inject our HTML
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">

  <header class="mb-4">
      <div class="d-flex flex-wrap justify-content-between align-items-end gap-2">
        <div>
          <h1 class="h3 mb-1">NAIT Resource Directory</h1>
          <p class="text-body-secondary mb-0">
            Find student support services, labs, and campus resources.
          </p>
        </div>
      </div>
    </header>
`

class ResourceHeader extends HTMLElement {
  /* a callback is a function that is meant to be passed in as an argument *to another function*.
       the idea being, it's something meant to fire upon something else being triggered.
  */

  // connectedCallback is the fixed name for the function that runs when custom element loads into the DOM
  connectedCallback() { 
    this.attachShadow({ mode: 'open' }); // attach a new shadow DOM
    this.shadowRoot.appendChild(         // add a new node inside that shadow DOM
      template.content.cloneNode(true)   // that, here, is a *copy* of the templated HTM
    );
  // in future examples, I'll be doing the 'best practices' approach of setting up the shadow DOM in the constructor
  // (i.e. when the instance is created, *not* waiting until the instance is created AND THEN loaded into the DOM)
  // right now, I just want to keep things incremental and manageable.
  }
}

customElements.define('resource-header', ResourceHeader);
