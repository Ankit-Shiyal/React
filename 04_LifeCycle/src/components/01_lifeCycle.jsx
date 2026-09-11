import React, { useEffect, useState } from 'react'

const LifeCycle = () => {

  const [name, setName] = useState("");

  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((p) => p + 1);
  };

  // useEffect(() => {
  //   console.log("component")
  // })

  // mounting
  // useEffect(() => {
  //   console.log("mounting")
  // },[])

  // updating
  // useEffect(() => {
  //   console.log("updating")
  // },[count])
  

  return (
    <>
      <h1>Count {count}</h1>

      <button onClick={handleClick}>+1</button>
      <br />
      <br />
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

    </>
  )
}

export default LifeCycle