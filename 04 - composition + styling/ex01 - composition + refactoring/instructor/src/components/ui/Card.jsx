// card that recreates the generic appearance of filters/results/details cards
// the only things that change between them are the title text & nested content, so we can just reuse this visual skeleton

export default function Card({ title, children }) {
  // children -> we can pass the 'inside' content of the card
  return (
    <section className="h-full rounded border border-gray-200 bg-white shadow-sm">
      <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h2 className="leading-relaxed font-bold text-sm text-gray-900">{title}</h2>
      </header>
      <div>
        {children}
      </div>
    </section>
  );
}
