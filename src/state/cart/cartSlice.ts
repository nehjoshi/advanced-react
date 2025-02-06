import { createSlice } from "@reduxjs/toolkit"
import { addProduct, clearCart, removeProduct } from "./cartActions"
import { CartSlice } from "./cartTypes"


const initialState: CartSlice = {
    total: 0,
    products: [],
    numberOfProducts: 0
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clear: clearCart,
        add: addProduct,
        remove: removeProduct
    },
})

export const {clear, add, remove} = cartSlice.actions;

export default cartSlice.reducer;