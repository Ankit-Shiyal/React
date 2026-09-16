// import { useState } from "react";
import { useRef } from "react";

const UseRefExample = () => {
//   const [inputValue, setInputValue] = useState("");

  const inputRef = useRef(null);

  const handleValue = () => {
    console.log(inputRef);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter your name"
        // value={inputValue}
        // onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={handleValue}>
        Get Value
      </button>
    </>
  );
};

export default UseRefExample;