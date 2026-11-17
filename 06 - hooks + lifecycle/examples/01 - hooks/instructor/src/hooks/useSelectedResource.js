import { useState } from 'react';

  // I want clicking a different results row to do the same thing as before (change info shown in Details card)
  // *but also* write to session storage.

  // as we'll see, that would be quite a lot of logic to jam into the Results component, and it only cares about
  // what the selected resource actually is, or whether a new one was clicked - ideally, Results.jsx just gets data
  // (i.e. selected resource, filters, student services data) and just renders it; it doesn't need to (and shouldn't)
  // hold standalone logic to also save any data to browser session storage.


/* This will be a custom hook built *around* useState.

   We're going to change a stateful variable, *but also*
   read/write changes from/to persistent browser session storage.

   This is why we're using a custom hook in the first place -- 
   we want to work with state, but also do related i/o with
   an external system.
*/

export default function useSelectedResource() {

  const [selectedResource, setSelectedResource] = useState(null);

  /* sessionStorage is a key-value store, built in to web behaviour (no need to import anything). 
   Below, I'm defining which 'key' I'll be writing the resource value to.
*/
  const STORAGE_KEY = 'selectedResource'; // variables in ALL_CAPS usually mean they're constants (hardcoded)

  // I'm not writing the data updating logic 'nakedly' in the root scope of this hook,
  // because it would fire every time the hook is loaded, rather than specifically when I want it to.
  function updateSelectedResource(resource) {
    // 1. change the value in React state
    setSelectedResource(resource);

    // 2. also write the new value to session storage in the browser

    // 2.a) if the 'resource' we get is null, remove the key from sessionStorage entirely 
    //      (there's no real point in storing {someKey: null}, because if I go to read a key that doesn't have a value,
    //      that'll already be null by default).
    if (resource === null) {
      sessionStorage.removeItem(STORAGE_KEY)  // sessionStorage is something you have access to by default, like document in vanilla JS
    } else {
      // 2.b) if 'resource' is non-null, write whatever that data is to the session storage key
      sessionStorage.setItem(
        STORAGE_KEY,             // arg 1: name of key
        JSON.stringify(resource) // arg 2: value to write, encoded as JSON
      )
    }


  }

  return [selectedResource, updateSelectedResource]

}