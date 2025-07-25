import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../Reducer/CartSlice';

export const store = configureStore({
    reducer : {
        cart: cartReducer,
    }
})