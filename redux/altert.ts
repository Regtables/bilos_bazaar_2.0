import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    toggleAlert: false,
    title: '',
    content: '',
    option: {},
    secondOption: {},
    confirmed: false
  },
  reducers: {
    setToggleAlert: (state, action) => {
      const { toggle, title, content, option, secondOption } = action.payload
      state.toggleAlert = toggle
      state.title = title
      state.content = content
      state.option = option 
      state.secondOption = secondOption
    },
    setConfirmed: (state, action) => {
      console.log(action.payload)
      state.confirmed = action.payload
    }
  }
})

export const { setToggleAlert, setConfirmed } = alertSlice.actions

export const selectAlert = (state: any) => state.alert 
export const selectConfirmed = (state: any) => state.alert.confirmed

export default alertSlice.reducer