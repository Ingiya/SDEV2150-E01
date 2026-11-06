import { useState } from 'react';

import Card from './ui/Card';


// src/components/Filters.jsx
export default function Filters() {

  // with state: re-render every time onChange changes searchText
  const [searchText, setSearchText] = useState('')   // [variable, variableSetter] = useState(defaultValue)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [openNow, setOpenNow] = useState(false); // checkbox booleans
  const [virtual, setVirtual] = useState(false);

  /*
  Instead of having individual state per field, why not just use an object where
  every field is a property?

  I could replace alllllll my state above with this:

    const [filters, setFilters] = useState({
      searchText: '',
      selectedCategories: [],
      openNow: false,
      virtual: false,
    })

  What is the concrete change? Nothing in this case; when a value in one state-bound changes,
  the entire component (and therefore all other fields) re-render anyway.

  In more complex situations (TBA), this wouldn't be a great approach, but it's a great way to do it here
  and cleans up your code. 
  */

  // state is not just "store this data to render it to the UI";
  // we also use it to drive behaviour in the UI. in this case, we'll store
  // which categories the user has clicked in the multi-select so we can later send them to Results component to filter
  function toggleCategory(label) {
    // IMPORTANT: you have to *fully construct* the new value; you can't mutate a stateful var
    // so, if adding/removing one element to the list, you have to reconstruct *the whole (new) list* and then give that to the setter
    setSelectedCategories(
      (currentCategories) => {
        if (currentCategories.includes(label)) {
          return currentCategories.filter((c) => c !== label);  // .filter() gives us a new array where all elements pass the condition we give it
        }

        // recall: spread operator:  
        //   a = [1, 2, 3, 4, 5]  
        //   b = [...a, 6]        -> [1, 2, 3, 4, 5, ,6]
        return [...currentCategories, label]
      }
    )
  }


  function handleSubmit(e) {
    e.preventDefault(); // always have to do this to prevent <form> elements doing a reload-POST 
    // here, we'd somehow pass the inputted filters onto the results component and try to get it to re-render accordingly
    console.log('filters submitted');
  }


  return (
    <Card title="Filters">
      <div className="space-y-4 p-4">
        <form id="frm-filter" className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="q" className="block text-sm font-medium text-gray-700">
              Search
            </label>
            <input
              id="q"
              type="text"
              value={searchText}
              onChange={(e) => {setSearchText(e.target.value)}}
              placeholder="Try: tutoring, mental health, bursary"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
          </div>

          <p>The searchbox text value is:</p>

          <hr className="border-gray-200" />

          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-800">Category</div>
            <div className="flex flex-wrap gap-2" aria-label="Category filters">
              {['All', 'Academic', 'Wellness', 'Financial', 'Tech'].map((label) => (
                <button
                  key={label}
                  type="button"
                  className={`${selectedCategories.includes(label) && 'bg-sky-600 text-white'} rounded border border-sky-600 px-3 py-1 text-xs font-semibold text-sky-700`}
                  onClick={() => toggleCategory(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                id="openNow"
                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                checked={openNow}
                onChange={(e) => setOpenNow(e.target.checked)}
              />
              Open now
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                id="virtual"
                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                checked={virtual}
                onChange={(e) => setVirtual(e.target.checked)}
              />
              Virtual options
            </label>
          </div>

          <hr className="border-gray-200" />

          <div className="flex gap-2">
            <button
              type="button"
              className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
              onClick={handleSubmit}
            >
              Filter
            </button>
          </div>
        </form>
      </div>
    </Card >
  );
}
