import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from '../api/index'

export const signin = createAsyncThunk('auth/signin', async (formData) => {
  try{
    const { data } = await api.signin(formData)

    return data
  } catch (error) {
    
    const { response: { data: { message } } } = error
     
    Promise.reject()
  }
})

export const signup = createAsyncThunk('auth/signup', async (formData) => {
  try{
    const { data } = await api.signup(formData)

    return data
  } catch (error) {
    console.log(error.message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    isLoading: false,
    hasError: false
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      //sign in
      .addCase(signin.pending, (state) => {
        state.isLoading = true
        state.hasError = false
      })
      .addCase(signin.fulfilled, (state, action) => {
        console.log(action.payload)
        const { existingUser: user, token } = action?.payload
        state.user = user[0]
        state.token = token
        state.isLoading = false
        state.hasError = false
      })
      .addCase(signin.rejected, (state, action) => {
        console.log(action.payload)
        state.isLoading = false
        state.hasError = true
      })

      //sign up
      .addCase(signup.pending, (state) => {
        state.isLoading = true
        state.hasError = false
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { result: user, token } = action?.payload
        state.user = user
        state.token = token
        state.isLoading = false
        state.hasError = false
      })
      .addCase(signup.rejected, (state) => {
        state.isLoading = false
        state.hasError = false
      })
  }
})

export const selectUser = (state) => state.user.user

export default authSlice.reducer