import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: '',
  },
  reducers: {
    setMeUserId: (state, action: PayloadAction<{ userId: string }>) => {
      state.userId = action.payload.userId
    },
  },
})

export const { setMeUserId } = authSlice.actions
