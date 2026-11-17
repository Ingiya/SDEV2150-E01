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

  /* sessionStorage is a key-value store, built in to web behaviour (no need to import anything). 
    Below, I'm defining which 'key' I'll be writing the resource value to.
  */
  const STORAGE_KEY = 'selectedResource'; // variables in ALL_CAPS usually mean they're constants (hardcoded)

  /* Instead of a hardcoded default value, we'll read initial state from sessionStorage.
      
      Rather than just delivering that value as a one-off, we'll write a callback function
      to also a bit of safety-checking when reading the value (bc e.g. sessionStorage isn't protected
      the same way React state is; logic elsewhere could overwrite the value at that same key).
  */
  const [selectedResource, setSelectedResource] = useState(
    () => { // this is a callback function; the idea is, it's what *should* run when needed,
            // *not* a function that is being called immediately. also known as "lazy initialisation"
            // this callback function will not run until useState() fires and looks for that initial value, which we'll return
      const stored = sessionStorage.getItem(STORAGE_KEY);

      if (stored) {
        // I'm try{}ing this because if we try to access a key that doesn't exist, it will throw an error
        try {
          return JSON.parse(stored);
        } catch {
					// I know I don't need to write "return null"; I can just write "return".
					// Here, I'm choosing to be explicit, because I'm deliberately returning that value,
					// rather than just using 'return' as a way to escape scope of logic.
          return null;
        }
      }

      return null; // I'm using if-return instead of if-else.
    }
  );


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

/* NOTES: 

a) you can use localStorage (persists across browser sessions) the same way you would use sessionStorage

b) remember, the "ideal form" of a React component is just something that takes in data and renders out UI (returns JSX), i.e. no or minimal internal logic.
   so the other win here is, we've abstracted out behaviour that talks to an external system (browser storage is external to the scope of our app, jsut like a REST API
   or a db would be).

c) imagine if this hook, instead of writing to browser storage, wrote to a db or POSTed to a REST API instead

*/