import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: '',
    name: "",
    email:""
  },
  reducers: {
    setMeUserId: (state, action: PayloadAction<{ userId: string }>) => {
      state.userId = action.payload.userId
    },
    setName: (state, action: PayloadAction<{ name: string }>) => {
      state.name = action.payload.name
    },
    setEmail: (state, action: PayloadAction<{ email: string }>) => {
      state.email = action.payload.email
    },
  },
})

export const { setMeUserId , setName, setEmail} = authSlice.actions
