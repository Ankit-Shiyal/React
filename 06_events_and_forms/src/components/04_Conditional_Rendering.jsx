import React, { useState } from "react";
import Props from "./03_Props";

const Conditional_Rendering = () => {
  const [login, setLogin] = useState(false);

  const [user, setUser] = useState(false);

  const handleClick = () => {
    setLogin(!login);
    setUser(!user);
  };

  return (
    <>
      <h1>{!user ? "click to login" : "welcome user"} </h1>

      <button onClick={handleClick}>{login ? "logOut" : "login"} </button>
      <br />
      <br />

      {user &&  "Hello User"}
    </>
  );
};

export default Conditional_Rendering;