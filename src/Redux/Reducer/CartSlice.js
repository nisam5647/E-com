// Redux/Reducer/CartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCartItems: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeFromCartItems: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addToCartItems, removeFromCartItems } = cartSlice.actions;
export default cartSlice.reducer;
