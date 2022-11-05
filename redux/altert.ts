import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    toggleAlert: false,
    title: '',
    content: ''
  },
  reducers: {
    setToggleAlert: (state, action) => {
      const { toggle, title, content } = action.payload
      state.toggleAlert = toggle
      state.title = title
      state.content = content
    }
  }
})

export const { setToggleAlert } = alertSlice.actions

export const selectAlert = (state: any) => state.alert 

export default alertSlice.reducer