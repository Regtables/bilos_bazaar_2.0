import { createSlice } from "@reduxjs/toolkit";


const infoSlice = createSlice({
  name: 'info',
  initialState: {
    contact: {}
  },
  reducers: {
    setContact: (state, action) => {
      state.contact = action.payload
    }
  }
})

export const { setContact } = infoSlice.actions

export const selectContact = (state) => state.info.contact

export default infoSlice.reducer