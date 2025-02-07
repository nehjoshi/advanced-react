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
    
});

describe(Item, () => {
    it("should add item to store when clicking on + sign", () => {
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
    });

    it("should remove item from store when clicking on - sign", () => {
        //Assume item is in store already:
        store = configureStore({
            reducer: {
                cart: cartReducer
            },
            preloadedState: {
                cart: {
                    numberOfProducts: 1,
                    products: [{
                        name: "Sample Item",
                        quantity: 1,
                        price: 50
                    }],
                    total: 50
                }
            }
        });
        //Render the component with the above store:
        ({getByText, getByTestId} = render(
            <Provider store={store}>
                <Item {...sampleItem} />
            </Provider>
        ))
        //Get the - button
        const minusButton = getByText("-");
        //Fire the event
        fireEvent.click(minusButton);
        //Get state of the store after the event
        const currentStore = store.getState();
        expect(currentStore.cart.products.length).toEqual(0);
        expect(currentStore.cart.total).toEqual(0);
        expect(currentStore.cart.numberOfProducts).toEqual(0);
    })
})