import React, { useState } from "react";

import Add from "./components/Add";
import ProductList from "./components/ProductList";

const App = () => {
  return (
    <>
      <Add />
      <ProductList/>
    </>
  );
};

export default App;