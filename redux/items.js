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
    }
  }
})

export const selectActiveCategory = (state) => state.items.activeCategory

export const { setActiveCategory } = itemsSlice.actions

export default itemsSlice.reducer