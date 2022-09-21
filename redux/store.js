import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth'
import itemsReducer from './items'

export const store = configureStore({
  reducer: {
    user: authReducer,
    items: itemsReducer
  }
})