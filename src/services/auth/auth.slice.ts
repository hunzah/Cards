import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: '',
    name: '',
    email: '',
    avatar: '',
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
    setAvatar: (state, action: PayloadAction<{ avatar: string }>) => {
      state.email = action.payload.avatar
    },
  },
})

export const { setMeUserId, setName, setEmail, setAvatar } = authSlice.actions
