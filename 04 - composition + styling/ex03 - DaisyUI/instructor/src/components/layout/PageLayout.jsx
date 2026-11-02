const theme = "dim"  // consider: if I can make this value parametric, I can make a theme switcher
// (all I'd have to do is make some sort of input component (e.g. dropdown)) that changes the string value,
// and then re-render the component with that theme.

// however: we currently have no way of persisting data across component re-renders.
// that's where React state comes in, which we're learning about next

export default function PageLayout({ header, children }) { //({ header, left, middle, right }) {
  
  // with tailwind, we'd specify exact colours, but with DaisyUI, we have base colours, primary colours etc.
  // that will be consistent across a theme.
  
  // DaisyUI reads data-theme attribute to assign styling. 
  // Flipping this to dark, our cards and header are still a clashing blinding white because they're fixed colours right now
  // rather than base-n00 relative colours in the DaisyUI theme.
  return (
    <div data-theme={theme} className="min-h-screen bg-base-200">
      <header className="border-b border-sky-600 bg-white px-6 py-4">
        {header}
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-6 md:grid-cols-3">
        {children}
      </main>

      {/* <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-6 md:grid-cols-3">
        <aside>{left}</aside>
        <section className="md:col-span-2">{middle}</section>
        <aside>{right}</aside>
      </main> */}
    </div>
  );
}

// Sample solution for the student layout variant exercise
/*
export default function PageLayout({ header, layout = 'standard', children }) {
  const layoutClasses = {
    standard:
      'grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6',
    wide:
      'grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6',
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white px-6 py-4">
        {header}
      </header>

      <main
        className={`mx-auto max-w-7xl px-6 py-6 ${
          layoutClasses[layout]
        }`}
      >
        {children}
      </main>
    </div>
  );
}*/