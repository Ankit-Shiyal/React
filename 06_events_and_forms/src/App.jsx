import React, { useState } from 'react'
import OnClick from './components/01_OnClick'
import Events from './components/02_Events'
import Props from './components/03_Props'
import Conditional_Rendering from './components/04_Conditional_Rendering'

const App = () => {

  // const [input, setInput] = useState("");

  // const [name, setName] = useState([]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   setName((prev) => [...prev, input]);
  // };


  return (
    <>
      <h1>Hello</h1>
      {/* <OnClick/> */}
      {/* <Events/> */}

      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter your name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>submit</button>
      </form>

      <Props name={name} />
      <br /> */}

      <Conditional_Rendering/>
    </>
  )
}

export default App