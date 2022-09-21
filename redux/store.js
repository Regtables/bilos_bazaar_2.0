import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth'
import itemsReducer from './items'
import cartReducer from './cart'

export const store = configureStore({
  reducer: {
    user: authReducer,
    items: itemsReducer,
    cart: cartReducer
  }
})