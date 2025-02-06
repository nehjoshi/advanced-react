import { configureStore, Store } from "@reduxjs/toolkit";
import cartReducer from '../state/cart/cartSlice';
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import Item from "../components/Item";

let sampleItem = {
    name: "Sample Item",
    price: 50,
    readOnly: false
}
let store: Store;
let getByTestId: any;
let getByText: any;

beforeEach(() => {
    store = configureStore({
        reducer: {
            cart: cartReducer
        },
        preloadedState: {
            cart: {
                numberOfProducts: 0,
                products: [],
                total: 0
            }
        }
    });
    ({getByText, getByTestId} = render(
        <Provider store={store}>
            <Item {...sampleItem} />
        </Provider>
    ))
});

describe(Item, () => {
    it("should add item to store when clicking on + sign", () => {
        const plusButton = getByText("+");
        fireEvent.click(plusButton);
        let currentStore = store.getState();
        expect(currentStore.cart.products).toContainEqual({
            name: "Sample Item",
            price: 50,
            quantity: 1
        })
        expect(currentStore.cart.numberOfProducts).toEqual(1);
        expect(currentStore.cart.total).toEqual(sampleItem.price);
    })
})