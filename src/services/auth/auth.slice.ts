import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type MeType = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    me: {
      avatar: '',
      id: '',
      email: '',
      isEmailVerified: false,
      name: '',
      created: '',
      updated: '',
    },
  },
  reducers: {
    setMe: (state, action: PayloadAction<MeType>) => {
      state.me = { ...action.payload }
    },
  },
})

export const { setMe } = authSlice.actions
