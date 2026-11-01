// src/components/Results.jsx
import ResultsItem from "./ResultsItem";

export default function Results({ resources }) {
  return (
    <section className="h-full mb-4">
      <div className="h-full rounded border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <strong className="text-sm text-gray-900">Results</strong>
          <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
            {/* 
              If I care about rendering something specific for success and failure cases, I'll use a ternary:
                {condition ? <Component /> : "Condition was not met; here's default text."
                
              If I *don't care* about rendering anything for a failure case, I can use the && AND operator,
              and only deal with the success condition:
                {condition && <Component />}

              In the example below, I'm safeguarding against e.g. getting {null} instead of an array,
              and the entire component crashing because null.length doesn't exist.
            */}
            {resources?.length } 
            {/* replaces {resources && resources.length}
              thing?.attribute   -> "if thing is non-null, check its attribute"
              -> in either way of writing this, we just don't want to crash the app trying to read .length of null
            */}

            {/* Bonus: If the success condition is the same as what should be rendered if true, you can use the || OR operator:
                objectOrNull || "Sorry, object was null."
            */}
          </span>
        </div>

        <ul className="divide-y divide-gray-200">
          {/* Changing key to ID because it should be an ID-like field. 
          
              You can remove the key attribute entirely and look in the JS console to see what React says.
              It won't brick your application/break rendering, but things will get messy when you try to filter, 
              reorder, etc. list elements.
              
              key attribute is necessary to give a unique ID to teach list element React has to keep track of.
          */}
          {resources.map((item) => (
            <ResultsItem key={item.id} 
              title={item.title}
              category={item.category}
              summary={item.summary}
              location={item.location}
            >
              {/* Why not just put this inside ResultsItem instead of overcomplicating it?
                  Let's say, for example, I wanted to reuse Results/ResultsItem in different places,
                  but this was the only place I wanted to show these badges.
              */}
              {item.openNow &&
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                open now
              </span>}
            </ResultsItem>
          ))}
        </ul>
      </div>
    </section>
  );
}