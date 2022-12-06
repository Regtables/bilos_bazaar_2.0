import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";

import { BillingInfo, Item } from "../types";

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

export const googleAuth = createAsyncThunk('auth/googleAuth', async (data: any) => {
  try{
    const response  = await api.googleAuth(data)

    return response

  } catch (error) {
    console.log(error)
  }
})

export const saveBillingInfo = createAsyncThunk('auth/saveBillingInfo', async (data: any) => {
  console.log(data)
  try{
    const response = await api.saveBillingInfo(data)

    return response
  } catch (error) {
    console.log(error)
  }
})

export const addToWishlist = createAsyncThunk('auth/addToWishlist', async (item: Item) => {
  try{
    const response = await api.addToWishlist(item)
    console.log(response)
    
    return response

  } catch (error){
    console.log(error)
  }
})

export const removeFromWishlist = createAsyncThunk('auth/removeFromWishlist', async (item: Item) => {
  try{
    const response = await api.removeFromWishlist(item)

    return response

  } catch (error) {
    console.log(error)
  }
})

export const deleteUser = createAsyncThunk('auth/deleteProfile', async () => {
  try{
    const data = await api.deleteUser()

    return data
  } catch (error) {

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
        streetAddress: '',
        address: ''
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
    },
    addItemToWishlist: (state, action) => {
      const wishlist = state.user.wishlist

      if(wishlist === null){
        state.user.wishlist = [action.payload]
      } else if(wishlist !== null){
        const containsItem = wishlist.filter((item: Item) => item?._id === action.payload._id)[0]

        if(containsItem){
          const newWishlist = wishlist.filter((item: Item) => item?._id !== action.payload._id)
          state.user.wishlist = newWishlist

        } else{
          state.user.wishlist.push(action.payload)
        }
      }
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
      
      //deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
        state.hasError = false
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = {
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
            streetAddress: '',
            address: ''
          },
          wishlist: [],
          payments: []
        }
        state.hasError = false
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false
        state.hasError = true
      })

      //wishlist
      // .addCase(addToWishlist.pending, (state) => {
      //   state.isLoading = true
      //   state.hasError = false
      // })
      // .addCase(addToWishlist.fulfilled, (state, action) => {
      //   state.isLoading = false
      //   state.hasError = false
      //   state.user = action.payload 
      // })
      // .addCase(addToWishlist.rejected, (state) => {
      //   state.isLoading = false
      //   state.hasError = true
      // })
    }
  })

  
  export const { setUserBillingInfo, setUser, addItemToWishlist } = authSlice.actions
  
  export const logout = (dispatch: any) => {
    localStorage.clear()
    authSlice.actions.setUser('')
  }

  export const selectUser = (state: any) => state.user.user
  export const isLoadingUser = (state: any) => state.user.isLoading
  
  export default authSlice.reducer