import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth'
import itemsReducer from './items'
import cartReducer from './cart'
import alertReducer from './altert'
import infoReducer from './info'

export const store = configureStore({
  reducer: {
    user: authReducer,
    items: itemsReducer,
    cart: cartReducer,
    alert: alertReducer,
    info: infoReducer
  }
})

export type AppDispatch = typeof store.dispatch