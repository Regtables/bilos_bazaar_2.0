import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    toggleCart: false,
    cartItems: {},
    totalCartItems: 0,
    cartTotal: 0
  },
  reducers: {
    toggleCart: (state, action) => {
      state.toggleCart = action.payload
    },
    addCartItem: (state, action ) => {
      const { id } = action.payload.variant
      const qty = action.payload.qty
      const { price } = action.payload.item

      if(state.cartItems[id]){
        state.cartItems[id].qty = state.cartItems[id].qty + qty
        state.cartTotal = state.cartTotal + qty*price
        state.totalCartItems = state.totalCartItems + qty

      } else {
        state.cartItems[id] = action.payload
        state.cartTotal = state.cartTotal + qty*price
        state.totalCartItems = state.totalCartItems + qty
      }
  

    },
    removeCartItem: (state, action) => {
      const { id } = action.payload.variant
      const qty = action.payload.qty
      const { price } = action.payload.item

      const cartItems = Object.values(state.cartItems).filter(({ variant }) => variant.id !== id )

      const newCartItems = {}

      for(let i = 0; cartItems.length; i ++){
        newCartItems[cartItems[i].variant.id] = cartItems[i] 
      }

      state.cartItems = newCartItems
      state.cartTotal = state.cartTotal - qty*price
    },
    incQty: (state, action) => {
      const { id } = action.payload.variant

      state.cartItems[id].qty = state.cartItems[id].qty + 1
    }
  }
})

export const selectCartItems = (state) => state.cart.cartItems
export const selectShowCart = (state) => state.cart.toggleCart
export const selectCartTotal = (state) => state.cart.cartTotal

export const { addCartItem, toggleCart, removeCartItem } = cartSlice.actions

export default cartSlice.reducer