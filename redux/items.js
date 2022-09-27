import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    allItems: [],
    activeCategory: 'all'
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload
    },
    setAllItems: (state, action) => {
      state.allItems = action.payload
    }
  }
})

export const selectActiveCategory = (state) => state.items.activeCategory

export const { setActiveCategory, setAllItems } = itemsSlice.actions

export default itemsSlice.reducer