const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
  <section class="h-100">
    <div class="card h-100">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong>Results</strong>
        <span class="badge text-bg-secondary">4</span>
      </div>

      <div class="list-group list-group-flush">

        <!-- results will be injected here, by selecting for .list-group and embedding inner HTML -->

      </div>
    </div>
  </section>`;


class ResourceResults extends HTMLElement {
  #results = [];  // one place to store the *full, unfiltered* dataset of results (already exists: #results)
  #filters = {
    searchQuery: '',
    category: 'all',
    openNow: false,
    virtual: false,
  }; // a place to store my filters

  #_filteredResults = []; // another place to store *filtered* dataset
  // underscore in programming: usually communicates "don't use this directly"
  // I will never need a setter for this; we receive 'results' & 'filters' from *external* places (needs setters),
  // *but* we're producing the filtered results array internally

  set results(data) {
    /* this.#results is now just a data container for *all* results; we don't mutate it (would result in
      the permanent loss of whatever is filtered). 

      We want to render exclusively from filtered results now, but we don't really need to overcomplicate this.
      I only write to the results array when I'm doing my initial data load of possible results, so when I write to that,
      I may as well write that as the initial state of _filteredResults too (which we'll be rendering from).

      After all, we want nothing filtered initially, so everything shows.
    
      */
    this.#results          = data;
    this.#_filteredResults = [...data]; // don't reference the same value/array; copy its elements into a new one instead

    this.render();
  }
    

  set filters(filters) { // if I have a private array, I need a setter for it
    this.#filters = filters;
    this.#applyFilters();  // my actual logic for processing the filters payload will be complex, so I want it split into its own thing
    this.render() // whenever I apply new filters, I'll want to re-render
  }

  #applyFilters() {
    // this is called 'destructuring'; look it up if that's new to you!
    //   tl;dr - lets me pull out properties of an obj by name into standalone variables
    //           if I wanted, I could also only pull out select terms/properties
    const { searchQuery, category, openNow, virtual } = this.#filters;
  
    /* Let's plan out the logic that actually filters from the results array into the filtered array.

        1. Anytime I'm taking string inputs, I should clean them up (-> trim searchQuery)
           (The rest of the inputs are predefined strings, or booleans.)
        
        2. Actually filter from one array into the other. Let's practice Array.filter() :
    */
    
    this.#_filteredResults = this.#results.filter(
      // someArray.filter() creates a new array containing *only* elements that pass some condition/check inside this block.
      // also, see main.js if you need a refresher on the shape of the result data.
      (r) => {
        // a) if we got searchQuery text, check it against result's title, summary, location
        // b) if a category was selected, and it wasn't 'all', filter for only that category. if 'all' was selected, don't filter.
        // c) if openNow was selected, check each result's openNow
        // d) "  virtual "
      }
    )
  }


  constructor() {
    super();
    this._handleResultClick = this._handleResultClick.bind(this); 
    this.attachShadow({ mode: 'open' });
  }


  _handleResultClick(event) {
    const button = event.target.closest('button[data-id]');
    if (button) {
      this.shadowRoot.querySelector('button.active')?.classList.remove('active');
      button.classList.add('active');

      const resultID = button.getAttribute('data-id');
      const result = this.#results.find(r => r.id === resultID);  // note that we're finding the data object from the array, not the UI row!

      const resultSelectedEvent = new CustomEvent(
        'resource-selected',
        {
          detail: { result },
          bubbles: true,
          composed: true,
        }
      );

      this.dispatchEvent(resultSelectedEvent);
    }
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', this._handleResultClick);
    this.render();
  }

  disconnectedCallback () {
    this.shadowRoot.removeEventListener('click', this._handleResultClick);
  }
  
  render() {
    const content = template.content.cloneNode(true)
    const listGroup = content.querySelector('.list-group');

    // Now that we're set up to render from #filteredResults instead, let's actually implement that:
    if (this.#_filteredResults.length) {
      const resultsHTML = this.#_filteredResults.map(
        result => `
        <button type="button" class="list-group-item list-group-item-action" data-id="${result.id}">
          <div class="d-flex w-100 justify-content-between">
            <h2 class="h6 mb-1">${result.title}</h2>
            <small>${result.category}</small>
          </div>
          <p class="mb-1 small text-body-secondary">${result.summary}</p>
          <small class="text-body-secondary">${result.location}</small>
        </button>`
      ); 

      listGroup.innerHTML = resultsHTML.join(''); // resultsHTML is an array, so combine each HTML blob back-to-back into a string

    } else {
      listGroup.innerHTML = `
        <div class="list-group-item">
          <p class="mb-0">No results found.</p>
        </div>`;
    }

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(content);
  }
}

customElements.define('resource-results', ResourceResults);