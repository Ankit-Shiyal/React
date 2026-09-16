import React, { useRef } from "react";

const UseRef = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input
        type="text"
        ref={inputRef}
        placeholder="Enter your name"
      />

      <br />
      <br />

      <button onClick={handleFocus}>Focus</button>
    </>
  );
};

export default UseRef;
