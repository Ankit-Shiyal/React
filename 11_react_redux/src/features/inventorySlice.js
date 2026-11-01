import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [
        {
            name: "phone",
            qty: 1,
            price: 100000,
            category: "electronics",
        },
    ],
    editValue: null,
};
const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        add: (state, action) => {
            const newProduct = {
                id: new Date().getTime(),
                ...action.payload,
            };

            state.products.push(newProduct);

            console.log("product list", [...state.products]);
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(
                (item) => item.id !== action.payload
            );
        },

        setEditValue: (state, action) => {
            state.editValue = state.products.find((l) => l.id === action.payload);
        },
    },
});

export const { add, deleteProduct, setEditValue } = inventorySlice.actions;

export default inventorySlice.reducer;