import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
    currentPage: 1,
    itemsPerPage: 10,
    DeckId: '',
    DeckPrivacy: false,
    DeckName: '',
    orderBy: '',
    cardId: '',
    cardType: '',
    answer: '',
    question: '',
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
    setOrderBy: (state, action: PayloadAction<string>) => {
      state.DeckName = action.payload
    },
    setCardId: (state, action: PayloadAction<string>) => {
      state.cardId = action.payload
    },
    setCardType: (state, action: PayloadAction<string>) => {
      state.cardId = action.payload
    },
    setAnswer: (state, action: PayloadAction<string>) => {
      state.answer = action.payload
    },
    setQuestion: (state, action: PayloadAction<string>) => {
      state.question = action.payload
    },
  },
})

export const {
  updateCurrentPage,
  setItemsPerPage,
  setDeckId,
  setDeckPrivacy,
  setDeckName,
  setOrderBy,
  setCardId,
  setCardType,
  setQuestion,
  setAnswer,
} = decksSlice.actions
