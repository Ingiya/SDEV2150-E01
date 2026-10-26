import './App.css'

import Header  from './components/Header'
import Filters from './components/Filters'
import Results from './components/Results'
import Details from './components/Details'


function App() {

  // every React component must return one single node.
  // instead of wrapping stuff in empty divs to achieve this purpose (which is bloat and might mess up styling),
  // we can use the fragment, a placeholder empty node in React:
  //   <>   </>
  return (
    <div className="p-6">
      <Header />

      {/* breakpoints, just like in bootstrap: a window wider than "lg" (1024px) will create 3 columns; anything below, 1 column */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 lg:items-stretch gap-x-6">
        <div className="w-full">
          <Filters />
        </div>
        <div className="w-full">
          <Results />
        </div>
        <div className="w-full">
          <Details />
        </div>
      </div>
    </div>
  )
}

export default App
