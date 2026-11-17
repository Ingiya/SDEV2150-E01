import { useState } from 'react';

/* This will be a custom hook built *around* useState.

   We're going to change a stateful variable, *but also*
   read/write changes from/to persistent browser session storage.

   This is why we're using a custom hook in the first place -- 
   we want to work with state, but also do related i/o with
   an external system.
*/

export default function useSelectedResource() {

  const [selectedResource, setSelectedResource] = useState(null);

  // I want clicking a different results row to do the same thing as before (change info shown in Details card)
  // *but also* write to session storage.

  // as we'll see, that would be quite a lot of logic to jam into the Results component, and it only cares about
  // what the selected resource actually is, or whether a new one was clicked - ideally, Results.jsx just gets data
  // (i.e. selected resource, filters, student services data) and just renders it; it doesn't need to (and shouldn't)
  // hold standalone logic to also save any data to browser session storage.

  // I'm not writing the data updating logic 'nakedly' in the root scope of this hook,
  // because it would fire every time the hook is loaded, rather than specifically when I want it to.
  function updateSelectedResource(resource) {
    // 1. change the value in React state
    setSelectedResource(resource);

    // 2. also write the new value to session storage in the browser
  }

  return [selectedResource, updateSelectedResource]

}