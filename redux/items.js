import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    allItems: [],
    products: [],
    activeCategory: 'all'
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload
    },
    setAllItems: (state, action) => {
      state.allItems = action.payload
    },
    setProducts: (state, action) => {
      state.products = action.payload
    }
  }
})

export const selectActiveCategory = (state) => state.items.activeCategory
export const selectProducts = (state) => state.items.products

export const { setActiveCategory, setAllItems, setProducts } = itemsSlice.actions

export default itemsSlice.reducer