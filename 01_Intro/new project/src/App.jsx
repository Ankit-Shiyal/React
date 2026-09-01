import JSX from "./components/01_JSX";
import React from "react";
import Fragments from "./components/02_fragments";
import Functional from "./components/03_functional";
import ClassComponent from "./components/04_class";

const App = () => {
  return (
    <>
      <h1>hello</h1>

      <JSX />
      <Fragments/>
      <Functional/>
      <ClassComponent/>
      </>
  );
};

export default App