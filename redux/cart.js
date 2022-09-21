import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: []
  },
  reducers: {
    addCartItem: (state, action) => {
      state.cartItems.push(action.payload)
    }
  }
})

export const selectCart = (state) => state.cart.cartItems

export const { addCartItem } = cartSlice.actions

export default cartSlice.reducer