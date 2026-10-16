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
    const q = searchQuery.trim().toLowerCase();
    
    this.#_filteredResults = this.#results.filter(
      // someArray.filter() creates a new array containing *only* elements that pass some condition/check inside this block.
      // also, see main.js if you need a refresher on the shape of the result data.
      (r) => {
        /* Similar to the AND && operator (x && y -> both x and y must be true for overall value to be true),
           We can use the OR || operator  (x || y -> *either* x *or* y must resolve to true)

             overallBoolean = condition1 || condition2 || condition3 ...

           Returns the *first* truthy condition, OR the last term.
           It is an expressively concise replacement for spamming if..elif..else chains.

           We're repurposing this as:
             matchesFilter = !filterWasUsed || condition1 || condition2 ...
        */

        // a) if we got searchQuery text, check it against result's title, summary, location
        //    Array.join('') turns e.g. [1, 2, 3] into "123" -> combine all array elements into one string (that I can then search)
        //    The argument passed to join is a separator; we don't care about that here. (e.g. [1, 2, 3].join("x") -> "1x2x3") 
        const matchesSearchQuery = !q || [r.title, r.summary, r.location].join('').toLowerCase().includes(q);
        /*
            Empty strings are falsey so, the series of checkes here are:
            1) is searchbox empty/unused -> q is "" -> !q would be true -> return true, check passes
            2) if .includes() finds a substring match -> return true, check passes. no match? return false, check fails.
        */
        
        // b) if a category was selected, and it wasn't 'all', filter for only that category. if 'all' was selected, don't filter.
        const matchesCategory = !category || category === 'all' || r.category.toLowerCase() === category.toLowerCase();
        
        /* Checkboxes are kind of counterintuitive because they're a verbal headache:
           If I want an unused filter to return true, then an unused checkbox (which returns false) needs to somehow return true,
        */
        
        // c) if openNow was selected, check each result's openNow
        const matchesOpenNow = !openNow || r.openNow; // either filter was unused, *or* the boolean needs to match
                                                      // "if checkbox was checked, only include result if its openNow is true"
        // d) "  virtual "
        const matchesVirtual = !openNow || r.virtual;

        // each result must pass *all* the checks above in order to be included in the array.
        // .filter() expression should return *one* true or false that decides whether element gets included in new array
        // && - AND operator; everything chained with && must be true in order for the overall expression to be true
        return matchesSearchQuery && matchesCategory && matchesOpenNow && matchesVirtual
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