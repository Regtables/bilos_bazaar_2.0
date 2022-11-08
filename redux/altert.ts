import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    toggleAlert: false,
    title: '',
    content: '',
    option: {},
    secondOption: {}
  },
  reducers: {
    setToggleAlert: (state, action) => {
      const { toggle, title, content, option, secondOption } = action.payload
      state.toggleAlert = toggle
      state.title = title
      state.content = content
      state.option = option 
      state.secondOption = secondOption
    }
  }
})

export const { setToggleAlert } = alertSlice.actions

export const selectAlert = (state: any) => state.alert 

export default alertSlice.reducer