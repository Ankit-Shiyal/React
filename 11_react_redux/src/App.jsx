import React, { useState } from "react";

import Add from "./components/Add";
import ProductList from "./components/ProductList";
import InventoryStats from "./components/InventoryStats";

const App = () => {
  return (
    <>
      <InventoryStats />
      <br />
      <Add />
      <br />
      <ProductList />
    </>
  );
};

export default App;