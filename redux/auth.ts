import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";

import { BillingInfo } from "../types";

import * as api from '../api/index'

export const fetchUser = createAsyncThunk('auth/fetchUser', async (id: any) => {
  try{
    const response = await api.fetchUser(id)

    return response
  } catch (error) {

    console.log(error)
  }
})

export const signin = createAsyncThunk('auth/signin', async (formData: any) => {
  try{
    const response = await api.signin(formData)
    
    const data = await response.json()
    console.log(data)

    return data

  } catch (error: any) {

    console.log(error)
  }
})

export const signup = createAsyncThunk('auth/signup', async (formData: any) => {
  try{
    const data = await api.signup(formData)
    console.log(data)

    return data
  } catch (error: any) {
    console.log(error.message)
  }
})

export const saveBillingInfo = createAsyncThunk('auth/saveBillingInfo', async (data: any) => {
  console.log(data)
  try{
    console.log('test')
    const response = await api.saveBillingInfo(data)
    console.log(response)

    return response
  } catch (error) {
    console.log(error)
  }
})

const authSlice: Slice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      _id: '',
      billingInfo: {
        name: '',
        surname: '',
        phoneNumber: '',
        email: '',
        city: '',
        province: '',
        zip: '',
        apt: '',
        streetAddress: ''
      },

    },
    token: '',
    isLoading: false,
    hasError: false
  },
  reducers: {
    setUserBillingInfo: (state, action) => {
      state.user.billingInfo = action.payload
    }
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
        const { user, token } = action?.payload
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
        console.log(action.payload)
        const { user, token } = action?.payload
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
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false
        state.hasError = true
      })

      //saveBillingInfo
      .addCase(saveBillingInfo.pending, (state) => {
        state.isLoading = true
        state.hasError = false
      })
      .addCase(saveBillingInfo.fulfilled, (state, action) => {
        state.isLoading = false
        state.hasError = false
        state.user.billingInfo = action.payload
      })
      .addCase(saveBillingInfo.rejected, (state) => {
        state.isLoading = false
        state.hasError = true
      })
  }
})

export const { setUserBillingInfo } = authSlice.actions

export const selectUser = (state: any) => state.user
export const isLoadingUser = (state: any) => state.user.isLoading

export default authSlice.reducer