// I don't need to do anything to the template, because it's just an as-is input interface.
const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
  <aside class="h-100">
    <div class="card h-100">
      <div class="card-header">
        <strong>Filters</strong>
      </div>

      <div class="card-body">
        <form id="frm-filter">
          <label for="q" class="form-label">Search</label>
          <input id="q" class="form-control" type="text" placeholder="Try: tutoring, mental health, bursary" />

          <hr class="my-3" />

          <div class="mb-2"><strong>Category</strong></div>
          <div class="d-flex flex-wrap gap-2" aria-label="Category filters">
            <button class="btn btn-sm btn-outline-primary active" type="button">All</button>
            <button class="btn btn-sm btn-outline-primary" type="button">Academic</button>
            <button class="btn btn-sm btn-outline-primary" type="button">Wellness</button>
            <button class="btn btn-sm btn-outline-primary" type="button">Financial</button>
            <button class="btn btn-sm btn-outline-primary" type="button">Tech</button>
          </div>

          <hr class="my-3" />

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="openNow" />
            <label class="form-check-label" for="openNow">Open now</label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="virtual" />
            <label class="form-check-label" for="virtual">Virtual options</label>
          </div>

          <hr class="my-3" />

          <div class="d-flex gap-2">
            <button id="reset" class="btn btn-outline-secondary" type="button">Reset</button>
            <button class="btn btn-primary" type="submit">Filter</button>
          </div>
        </form>
      </div>
    </div>
  </aside>`;

class ResourceFilters extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // annoyingly, I 'need' to bind handler methods to the *instance* (belong to instance, not class template)
    //   explanation if curious: https://dev.to/aman_singh/why-do-we-need-to-bind-methods-inside-our-class-component-s-constructor-45bn
    this._handleCategoryClick = this._handleCategoryClick.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleReset = this._handleReset.bind(this);
    // next time, we'll use arrow functions and we won't have to do this at all!
  }

  connectedCallback() { // for when component mounts (i.e. loads into DOM)
    // I'm going to want "All" categories selected by default
    this.render(); // notice that I'm rendering the HTML *before* adding listeners
    
    // for 'internal events', i.e. don't need to care about DOM outside this component,
    // we *could* put those in the constructor as long as we were applying our HTML there too.
    this._form = this.shadowRoot.querySelector('#frm-filter');
    this._form.addEventListener('submit', this._handleSubmit);

    this._resetButton = this.shadowRoot.querySelector('#reset');
    this._resetButton.addEventListener('click', this._handleReset);

    // objectively gross, but just to demo CSS selectors a bit more:
    this._categoryGroup = this.shadowRoot.querySelector('[aria-label="Category filters"]')
    this._categoryGroup.addEventListener('click', this._handleCategoryClick);
   
  }

  disconnectedCallback() { // for when component unmounts (i.e. removed from DOM)
    this._form?.removeEventListener('submit', this._handleSubmit);
    this._resetButton?.removeEventListener('click', this._handleReset);
    this._categoryGroup?.removeEventListener('click', this._handleCategoryClick);
  }

  _handleCategoryClick(event) {
    const button = event.target.closest('button');

    if (!button || !this._categoryGroup.contains(button)) {
      // if no button could be identified, *or* the click occurred within this div but not on a button,
      // get out right away; we don't need to do anything - efficient!
      return;
    }
    // I don't need to nest everything after in an } else {}.
    // because of the return, I only reach these lines if the check above fails!

    const activeButton = this._categoryGroup.querySelector('.active');
    if (activeButton && activeButton !== button) {
      // if there's an active button &&and it's !==not the one that just got clicked, toggle it to inactive
      activeButton.classList.remove('active');
    }

    // with the above checks passed, we can safely set the button that just got clicked to active
    button.classList.add('active');
  }

  _handleSubmit(event) {
    // - clicking Filter fires custom event w/ filter configs sent as event message/payload
    event.preventDefault();
    // if I'm handling <form> submission with JS, I already know I need to do this to prevent page reload
  
    // collect values to put into message payload
    const searchQuery    = this.shadowRoot.querySelector('#q').value.trim();
    // getting the category requires a few steps of work: find button group -> find active button -> find its text value
    // this could technically all be one selector expression, but it'd be super grody - better to bias towards making it readable.
    const categoryGroup  = this.shadowRoot.querySelector('[aria-label="Category filters"]')
    const categoryButton = categoryGroup.querySelector('.active') || categoryGroup.querySelector('button');
    const category       = categoryButton ? categoryButton.textContent.trim().toLowerCase() : 'all' // selected category text *or* 'all' as a default

    const openNow        = this.shadowRoot.querySelector('#openNow').checked; // will give me a boolean
    const virtual        = this.shadowRoot.querySelector('#virtual').checked;

    const filters = { // if I just list these terms in an object, the variable name will be the property name
      searchQuery,    // searchQuery: "somevalue"
      category,
      openNow,
      virtual,
    }    

    const filtersEvent = new CustomEvent(
      'resource-filters-changed',
      {
        detail: filters,  // details: the message/payload sent with the event
        bubbles: true,     
        composed: true,
      }
    );

    this.dispatchEvent(filtersEvent);
  }

  _handleReset(event) {
    // - clicking Reset clears all filters / resets to initial state
  }

  render() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('resource-filters', ResourceFilters);
