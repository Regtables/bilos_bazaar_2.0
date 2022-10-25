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

    return data
  } catch (error: any) {
    console.log(error.message)
  }
})

export const saveBillingInfo = createAsyncThunk('auth/saveBillingInfo', async (data: any) => {
  try{
    const response = await api.saveBillingInfo(data)

    return response
  } catch (error) {
    console.log(error)
  }
})

export const googleAuth = createAsyncThunk('auth/googleAuth', async (data: any) => {
  try{
    const response  = await api.googleAuth(data)
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
      username: '',
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
      wishlist: [],
      payments: []
    },
    token: '',
    isLoading: false,
    hasError: false
  },
  reducers: {
    setUserBillingInfo: (state, action) => {
      state.user.billingInfo = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
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
        const { user, token } = action.payload
        
        state.user = user
        state.isLoading = false
        state.hasError = false
        
        localStorage.setItem('biloToken', JSON.stringify(token))
      })
      .addCase(signin.rejected, (state, action) => {
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
        const { user, token } = action.payload
        
        state.user = user
        state.isLoading = false
        state.hasError = false

        localStorage.setItem('biloToken', JSON.stringify(token))
      })
      .addCase(signup.rejected, (state) => {
        state.isLoading = false
        state.hasError = false
      })

      //google
      .addCase(googleAuth.pending, (state) => {
        state.isLoading = true
        state.hasError = false
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        const { user, token } = action.payload

        state.user = user
        state.isLoading = false
        state.hasError = false

        localStorage.setItem('biloToken', JSON.stringify(token))
      })
      .addCase(googleAuth.rejected, (state) => {
        state.isLoading = false,
        state.hasError = true
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
        state.user = action.payload 
      })
      .addCase(saveBillingInfo.rejected, (state) => {
        state.isLoading = false
        state.hasError = true
      })
    }
  })

  
  export const { setUserBillingInfo, setUser } = authSlice.actions
  
  export const logout = (dispatch: any) => {
    localStorage.clear()
    authSlice.actions.setUser('')
  }

  export const selectUser = (state: any) => state.user.user
  export const isLoadingUser = (state: any) => state.user.isLoading
  
  export default authSlice.reducer