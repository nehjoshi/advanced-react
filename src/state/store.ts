import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import cartReducer from './cart/cartSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        cart: cartReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;