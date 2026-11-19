import { useState } from 'react';

import useSelectedResource from './hooks/useSelectedResource';

import Header from './components/Header';
import Filters from './components/Filters';
import Results from './components/Results';
import Details from './components/Details';
import PageLayout from './components/layout/PageLayout';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [virtualOnly, setVirtualOnly] = useState(false);

  // note: I renamed "setSelectedResource" from the hook,
  // because as a sanity/consistency convention, I only want to use "set..." for
  // state that is local to a component/hook, so someone seeing "set..." immediately knows
  // that state lives in the layer they're looking at.
  const [selectedResource, updateSelectedResource] = useSelectedResource(null);


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
          virtualOnly={virtualOnly}
          onVirtualOnlyChange={setVirtualOnly}
        />
      </aside>
      <section className="md:col-span-2 lg:col-span-1">
        <Results
          selectedResource={selectedResource}
          // note: I renamed "setSelectedResource" from the hook,
          // because as a sanity/consistency convention, I only want to use "set..." for
          // state that is local to a component/hook, so someone seeing "set..." immediately knows
          // that state lives in the layer they're looking at.
          onSelectResource={updateSelectedResource}
          searchTerm={searchTerm}
          selectedCategories={selectedCategories}
          openNowOnly={openNowOnly}
          virtualOnly={virtualOnly}
        />
      </section>
      <aside className="md:col-span-1 lg:col-span-1">
        {selectedResource ? (
          <Details resource={selectedResource} />
        ) : (
          <div className="text-sm text-base-content/70">
            Select a resource to view details.
          </div>
        )}
      </aside>
    </PageLayout>
  );
}

export default App;
