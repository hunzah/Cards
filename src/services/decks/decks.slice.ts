import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
    currentPage: 1,
    itemsPerPage: 10,
    DeckId: '',
    DeckPrivacy: false,
    DeckName: '',
  },
  reducers: {
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
    setDeckId: (state, action: PayloadAction<string>) => {
      state.DeckId = action.payload
    },
    setDeckPrivacy: (state, action: PayloadAction<boolean>) => {
      state.DeckPrivacy = action.payload
    },
    setDeckName: (state, action: PayloadAction<string>) => {
      state.DeckName = action.payload
    },
  },
})

export const { updateCurrentPage, setItemsPerPage, setDeckId, setDeckPrivacy, setDeckName } =
  decksSlice.actions
