/* You can pass props to a component either with:
    a) one variable that collects all arguments, e.g. Header(props)     -> accessed via props.tagline
    b) destructuring (each prop named)           e.g. Header({tagline}) -> as-is

   I recommend only ever using b), because that way someone can tell exactly what inputs your component expects.
   In a), they have to go looking in EVERY LINE of the component to see if there is a props.{something}, and keep mental track of it all.
*/
export default function Header({ tagline }) {

  return (
    <header className="mb-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold text-sky-600">NAIT Resource Directory</h1>
          <p className="text-sm text-gray-500">
            {/* If the condition is the same as the truthy case (e.g. tagline ? tagline : "falsey"), you can also just chain with OR (||):
              x || y   -> x OR y -> (x if x is truthy) (else y)
            */}
            {tagline || "Find student support services, labs, and campus resources."}
          </p>
        </div>
      </div>
    </header>
  );
}