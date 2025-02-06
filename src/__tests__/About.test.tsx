import { fireEvent, render } from "@testing-library/react";
import About from "../pages/About";
import { configureStore, Store } from "@reduxjs/toolkit";
import counterReducer from '../state/counter/counterSlice';
import { Provider } from "react-redux";

let store: Store;
let getByTestId: any;
let getByText: any;
let getByPlaceholderText: any;

beforeEach(() => {
    // Create a fresh Redux store for each test
    store = configureStore({
        reducer: {
            counter: counterReducer,
        },
        preloadedState: {
            counter: { value: 0 }, // Initial state
        },
    });

    // Render the component before each test
    ({ getByTestId, getByText, getByPlaceholderText } = render(
        <Provider store={store}>
            <About />
        </Provider>
    ));
});

describe(About, () => {
    it("should increment by 1 when clicking the + sign", () => {
        //Get button element from DOM
        const incrementButton = getByText("Increment");
        //Fire the click event
        fireEvent.click(incrementButton);
        //Get the element to be tested
        const countStr = getByTestId("count").textContent!;
        //Check
        expect(countStr)
            .toEqual("Count: 1")
    });

    it("should decrement by 1 when clicking the - sign", () => {
        //Get button element from DOM
        const decrementButton = getByText("Decrement");
        //Fire the click event
        fireEvent.click(decrementButton);
        //Get the element to be tested
        const countStr = getByTestId("count").textContent!;
        //Check
        expect(countStr)
            .toEqual("Count: -1")
    })

    it("should increment by amount when using an input", () => {
        const numInput = getByPlaceholderText("Increment by number");
        const submitButton = getByText("Submit");
        fireEvent.change(numInput, { target: { value: "5" } });
        fireEvent.click(submitButton);
        const countStr = getByTestId("count").textContent!;
        expect(countStr).toEqual("Count: 5");
    })
})