/* Here, we'll define a custom event for when one of the result items is selected in the result component,
   and handle emitting it. We'll also highlight the selected item so the UI reacts to the user's actions and 
   stays 1:1 with how data is changing.
*/

const template = document.createElement('template');
// TODO: Update the template to support dynamic results (NOTE: we are not altering the badge count at this time)
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
  <section class="h-100">
    <div class="card h-100">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong>Results</strong>
        <span class="badge text-bg-secondary">4</span>
      </div>

      <div class="list-group list-group-flush">

        <!-- replace with array-generated HTML in render method -->
      </div>
    </div>
  </section>`;

class ResourceResults extends HTMLElement {
  // TODO: Create a private field for results data
  /* !! important to understand !! -> we use private fields
     mostly to get inside a function every time we change data,
     because once we're inside a function, we can also fire *other*
     behaviour. In this case, we want a re-render to occur every time
     data changes (i.e. render the new data).

     If we *didn't* have this, then whatever code outside this object
     (e.g. ResourceResults.data = [1,2,3] in some other file) would always
     have to remember to fire ResourceResults.render() every time. 

     Now, imagine keeping track of 10 different stateful fields, and an app that
     has 20 files all of which interact with this component. That would be terrible in general,
     but also very bug-prone (all it takes is forgetting to manually fire that render() once, and
     the entire app state is bugged). 
  */   
  #results = [];

  // TODO: Implement setter for results data, remember to render
  set results(data) {
    // I really just care about forcing data mutation to go through a setter function,
    // since when I'm in a function, I can fire anything else too (e.g. re-rendering).
    this.#results = data;
    this.render();
  }

  constructor() {
    super();
    // TODO: Bind the handleResultClick method to this instance
    this._handleResultClick = this._handleResultClick.bind(this);
    /* WTF is this and why do we need to do it? 
       -> https://dev.to/aman_singh/why-do-we-need-to-bind-methods-inside-our-class-component-s-constructor-45bn

      If you read to the end, you'll see how we could've just used arrow functions and not needed to bind,
      but this illustrates class vs. instance behavioural differences.
    */
    this.attachShadow({ mode: 'open' });
  }


  // TODO: Add an event handler method for result selection
  _handleResultClick(event) {
    // let's leave this empty for now and first deal with where this handler
    // needs to be called in order to wire together our event-driven behaviour

    // game plan:
    // 1. I look at the click in the Results card, and see if it came from a specific, valid result/row
    const button = event.target.closest('button[data-id]'); // looks at exactly what got clicked, starts going upstream till match
    if (button) {
      const resultID = button.getAttribute('data-id');
      const result   = this.#results.find(result => result.id === resultID);
      // use the data-id attribute to find the corresponding object in the array (if any).
      // I don't want to parse values from HTML; I just want to go straight to the data source
      // as a consistent source of truth. Once again: operate on data, cascade consequences down into
      // 'display-only' UI.
    }

    // 2. I create a custom event w/ that row's data object as the paylod/message
    //    docs: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/

    const resultSelectedEvent = new CustomEvent(
      'resource-selected', // *we* get to decide the event name,
      {
        detail:  { result }, // send matched data obj as event msg. don't pre-filter data, let receiver decide what's relevant
        bubbles: true,       // if true, bubbles up the DOM till it finds a listener, incl. past shadow root
                             // -> sender & receiever don't have to be directly wired together for listening to occus
        composed: true,      // if true, events can cross shadow DOM boundary
      }
    );

    // 3. I blast the event off
    this.dispatchEvent(resultSelectedEvent);
  }

  connectedCallback() { // <- when the component loads/attaches into the DOM...
    // TODO: Add a click event listener to handle result selection
    // Notice how I'm listening for a click *anywhere*, rather than attaching a listener
    // to each row.
    this.shadowRoot.addEventListener('click', this._handleResultClick);
    this.render();
  }

  // TODO: Clean up event listener in disconnectedCallback

  

  render() {
    // in here, I'm going to want to figure out a way to render individual results from my results data array
    // TODO: Update to render from the private results field, if it's empty, show "No results found" message
    // Step 1: collect relevant DOM elements
    const content   = template.content.cloneNode(true)
    const listGroup = content.querySelector('.list-group') // where I'll actually be rendering results into

    // Step 2: compose the HTML we'll be injecting

    // Here's sample HTML; I'm going to want to replace the static values with values from
    // the main.js resultsData. 


    if (this.#results.length) { // 0 is a falsey number in JS, so we don't explicitly need "if x > 0"
      // for each result in the array, generate HTML to hold/display data
      // -> pack it all inside a sneaky <button> so we can later easily highlight it when active with bootstrap classes      
      const resultsHTML = this.#results.map(
        result => `
        <button type="button" class="list-group-item list-group-item-action" data-id="${result.id}">
          <div class="d-flex w-100 justify-content-between">
            <h2 class="h6 mb-1">${result.title}</h2>
            <small>${result.category}</small>
          </div>
          <p class="mb-1 small text-body-secondary">${result.summary}</p>
          <small class="text-body-secondary">${result.location}</small>
        </button>
        `
      )
      // this was broken when we left it here, because if this.#results was empty,
      // the {resultsHTML} variable never gets created.

      // let's start fixing that by only trying to access that variable if there is any data,

      // Step 3: actually add/inject that HTML to the DOM
      // HTML doesn't know what an array is, so let's join all the elements into one big string
      listGroup.innerHTML = resultsHTML.join('');
    } else {
      // If #results contains no items, display some default text.
      // Always communicate to the user in UI design! An empty card might have them wondering if something's broken.
      listGroup.innerHTML = `
        <div class="list-group-item">
          <p class="mb-0">No results found.</p>
        </div>
      `;
    } // builds an array of HTML strings

    // super important, when updating data -> ui (overwriting),
    // always make sure to clear the HTML that's there first,
    // otherwise you easily risk appending to existing stuff, duplicating, etc.

    this.shadowRoot.innerHTML = ''; // clear current contents first; we're fully rendering
    this.shadowRoot.appendChild(content);

  }
}

customElements.define('resource-results', ResourceResults);