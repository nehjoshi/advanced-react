import { PayloadAction } from "@reduxjs/toolkit";
import { CartProduct, CartSlice } from "./cartTypes";

export const clearCart = (state: CartSlice) => {
    state.total = 0;
    state.numberOfProducts = 0;
    state.products = [];
}
export const addProduct = (state: CartSlice, action: PayloadAction<CartProduct>) => {
    const productInCart = state.products.find(p => p.name === action.payload.name);
    if (productInCart) {
        productInCart.quantity += 1
    }
    else {
        state.products.push(action.payload);
    }
    state.total += action.payload.price;
    state.numberOfProducts += 1;
}
export const removeProduct = (state: CartSlice, action: PayloadAction<string>) => {
    const name = action.payload;
    const productExists = state.products.find(p => p.name === name);
    if (productExists) {
        if (productExists.quantity > 1) {
            productExists.quantity -= 1;
        }
        else {
            state.products = state.products.filter(p => p.name !== name);
        }
        state.numberOfProducts -= 1
        state.total -= productExists.price
    }
}