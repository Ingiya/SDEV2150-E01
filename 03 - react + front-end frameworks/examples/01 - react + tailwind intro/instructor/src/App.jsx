import { useState } from 'react'

import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <Footer />
      {/* If a component doesn't have other components / HTML elements nested inside it, it self-terminates ( /> )
          Otherwise, we would e.g.  <VideoList> <Heading /> </VideoList> just like in HTML.
      */}

      <div className="ticks"></div>

     

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
