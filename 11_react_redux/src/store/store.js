import { configureStore } from "@reduxjs/toolkit";

import inventorySlice from "../features/inventorySlice.js";

const store = configureStore({
    reducer: {
        inventory: inventorySlice,
    },
});

export default store;