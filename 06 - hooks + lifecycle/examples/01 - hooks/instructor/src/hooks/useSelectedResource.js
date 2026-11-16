export default function useSelectedResource() {

  // I want clicking a different results row to do the same thing as before (change info shown in Details card)
  // *but also* write to session storage.

  // as we'll see, that would be quite a lot of logic to jam into the Results component, and it only cares about
  // what the selected resource actually is, or whether a new one was clicked - ideally, Results.jsx just gets data
  // (i.e. selected resource, filters, student services data) and just renders it; it doesn't need to (and shouldn't)
  // hold standalone logic to also save any data to browser session storage.

}