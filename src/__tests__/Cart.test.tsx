import { configureStore, Store } from "@reduxjs/toolkit";
import cartReducer from '../state/cart/cartSlice';
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import Cart from '../pages/Cart';
import { BrowserRouter, Routes } from "react-router";

const sampleProducts = [
    {
        "name": "Apple Airpods 3",
        "price": 99,
        "quantity": 1
    },
    {
        "name": "Samsung Galaxy Buds 2",
        "price": 89,
        "quantity": 1
    },
]
let getByText: any;

describe(Cart, () => {
    it("should clear cart when clicking on the clear button", () => {
        //Initialize store
        const store: Store = configureStore({
            reducer: {
                cart: cartReducer
            },
            preloadedState: {
                cart: {
                    numberOfProducts: 2,
                    products: sampleProducts,
                    total: 188
                }
            }
        });
        //Render out the page
        ({ getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                        <Cart />
                </BrowserRouter>
            </Provider>
        ));
        //Get the button
        const button = getByText("Clear cart");
        //Fire the event
        fireEvent.click(button);
        //Get the updated state
        const updatedCart = store.getState();
        expect(updatedCart.cart.numberOfProducts).toEqual(0);
        expect(updatedCart.cart.products.length).toEqual(0);
        expect(updatedCart.cart.total).toEqual(0);
    })
})