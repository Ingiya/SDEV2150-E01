import Header from './components/Header';
import Filters from './components/Filters';
import Results from './components/Results';
import Details from './components/Details';
import PageLayout from './components/layout/PageLayout';

function App() {
  return (
    <PageLayout header={<Header tagline="Find the right resources, right away" />}>
      
      {/* All we're doing here is adding breakpoints so things take up different widths,
          but if you play with this example, consider:
            - below medium breakpoint, everything is single-column (appropriate for mobile)
            - between medium and large, elements fit tablet usage better
            - past large, we go back to our 3-column layout which fits better on laptop/desktop
          
          So the overall idea is, I have a modular layout (an assembly of individual cards)
          and the only real change I need to make to suit 3 completely different screen types / use cases
          is changing those breakpoints.
      
          Part of the thing that lets me do this really easily (and play around with it as necessary) is 
          the fact that I have a well-organised hierarchy of components.
      */}
      <aside className="md:col-span-3 lg:col-span-1">
        <Filters />
      </aside>

      <section className="md:col-span-2 lg:col-span-1">
        <Results />
      </section>

      <aside className="md:col-span-1 lg:col-span-1">
        <Details />
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
