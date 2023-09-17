import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
    currentPage: 1,
    DeckId: '',
    DeckName: '',
  },
  reducers: {
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setDeckId: (state, action: PayloadAction<string>) => {
      state.DeckId = action.payload
    },
    setDeckName: (state, action: PayloadAction<string>) => {
      state.DeckName = action.payload
    },
  },
})

export const { updateCurrentPage, setDeckId, setDeckName } = decksSlice.actions
