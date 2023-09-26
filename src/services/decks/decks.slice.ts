import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Card } from '@/services/decks/types.ts'

export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
    DeckCards: [] as Card[],
    currentPage: 1,
    itemsPerPage: 10,
    DeckId: '',
    DeckPrivacy: false,
    DeckName: '',
    orderBy: '',
    cardId: '',
    answer: '',
    question: '',
    name: '',
  },
  reducers: {
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
    setDeckCards: (state, action: PayloadAction<Card[]>) => {
      state.DeckCards = action.payload
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
    setAnswer: (state, action: PayloadAction<string>) => {
      state.answer = action.payload
    },
    setQuestion: (state, action: PayloadAction<string>) => {
      state.question = action.payload
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
})

export const {
  updateCurrentPage,
  setItemsPerPage,
  setDeckCards,
  setDeckId,
  setDeckPrivacy,
  setDeckName,
  setOrderBy,
  setCardId,
  setQuestion,
  setAnswer,
  setName,
} = decksSlice.actions
