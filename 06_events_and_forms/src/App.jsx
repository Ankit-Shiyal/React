import React, { useState } from 'react'
import OnClick from './components/01_OnClick'
import Events from './components/02_Events'
import Props from './components/03_Props'
import Conditional_Rendering from './components/04_Conditional_Rendering'
import Conditional from './components/05_Conditional_Rendering'
import Controlled_Components from './components/06_Controlled_Components'
import Uncontrolled_Components from './components/07_Uncontrolled_Components'
import Validation from './components/08_Validation'

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

      {/* <Conditional_Rendering/> */}

      {/* <Conditional/> */}

      {/* <Controlled_Components /> */}

      <Uncontrolled_Components/>
      <Validation/>
    </>
  )
}

export default App