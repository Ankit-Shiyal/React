import { useState } from "react";

const States = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);

  };

  return (
    <>
      <h1>count value {count}</h1>

      <button onClick={handleIncrement}> increment +1</button>

    </>
  );
};

export default Stattes
