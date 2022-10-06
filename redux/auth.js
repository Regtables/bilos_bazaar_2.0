import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from '../api/index'

export const fetchUser = createAsyncThunk('auth/fetchUser', async (id) => {
  try{
    const response = await api.fetchUser(id)

    const data = await response.json()
    console.log(data)

    return data
  } catch (error) {

    console.log(error)
  }
})

export const signin = createAsyncThunk('auth/signin', async (formData) => {
  try{
    const response = await api.signin(formData)
    
    const data = await response.json()
    console.log(data)

    return data

  } catch (error) {

    console.log(error)
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
        console.log('signing in')
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

      //fetch
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true
        state.hasError = false
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.hasError = false
        state.user = action.payload[0]
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false
        state.hasError = true
      })
  }
})

export const selectUser = (state) => state.user.user
export const isLoadingUser = (state) => state.user.isLoading

export default authSlice.reducer