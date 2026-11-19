import { useState } from 'react';

import Header from './components/Header';
import Filters from './components/Filters';
import Results from './components/Results';
import Details from './components/Details';
import PageLayout from './components/layout/PageLayout';


/* We'll go by the readme, but once again you can also just use one object:

    [filters, setFilters] = useState({
      search: '',
      categories: [],
      openNow: false,
      virtual: false,
    })

  and then just pass one var/setter through components:

    <Filters filters={filters} onFiltersChange={setFilters} />
    <Results filters={filters} />

*/

function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  
  // this is going to live here because it establishes the link between Results and Details cards;
  // whatever is clicked in Results should be shown in Details
  const [selectedResource, setSelectedResource] = useState(null);

  return (
    <PageLayout header={<Header tagline="Find the right resources, right away" />}>
      <aside className="md:col-span-3 lg:col-span-1">
        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategories={selectedCategories}
          onCategoryToggle={setSelectedCategories}
          openNowOnly={openNowOnly}
          onOpenNowChange={setOpenNowOnly}
        />
      </aside>
      <section className="md:col-span-2 lg:col-span-1">
        <Results
          selectedResource={selectedResource}
          onSelectResource={setSelectedResource}
          searchTerm={searchTerm}
          selectedCategories={selectedCategories}
          openNowOnly={openNowOnly}
        />
      </section>
      <aside className="md:col-span-1 lg:col-span-1">
        {selectedResource ? (
          <Details selectedResource={selectedResource} />
        ) : ( 
          <div className="text-sm text-base-content/70">
            Please select a resource to view details.
          </div>
        )}
      </aside>
    </PageLayout>
    // <PageLayout
    //   header={<Header tagline="Find the right resources, right away" />}
    //   left={<Filters />}
    //   middle={<Results />}
    //   right={<Details />}
    // />

  );
}

export default App;
