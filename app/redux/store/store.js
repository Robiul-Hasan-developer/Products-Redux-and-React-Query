
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../counter/counterSlice';
import cartReducer from '../cart/cartSlice';

 const store = configureStore({
    reducer: {
        counter: counterReducer,
        cart: cartReducer
    }
});

export default store;