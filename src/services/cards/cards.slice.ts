import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    currentPageForDeck: 1,
    itemsPerPageForDeck: 10,
    deckIdWithCards: '',
    cardIdFromDeck: '',
    answerCard: '',
    questionCard: '',
    questionImgCard: '',
    answerImgCard: '',
    nameDeck: '',
    editCardModalIsOpen: false,
  },
  reducers: {
    updateCurrentPageForDeck: (state, action: PayloadAction<number>) => {
      state.currentPageForDeck = action.payload
    },
    setItemsPerPageForDeck: (state, action: PayloadAction<number>) => {
      state.itemsPerPageForDeck = action.payload
    },
    setDeckIdWithCards: (state, action: PayloadAction<string>) => {
      state.deckIdWithCards = action.payload
    },
    setCardIdFromDeck: (state, action: PayloadAction<string>) => {
      state.cardIdFromDeck = action.payload
    },
    setAnswerCard: (state, action: PayloadAction<string>) => {
      state.answerCard = action.payload
    },
    setQuestionCard: (state, action: PayloadAction<string>) => {
      state.questionCard = action.payload
    },
    setQuestionImgCard: (state, action: PayloadAction<string>) => {
      state.questionImgCard = action.payload
    },
    setAnswerImgCard: (state, action: PayloadAction<string>) => {
      state.answerImgCard = action.payload
    },
    setNameDeck: (state, action: PayloadAction<string>) => {
      state.nameDeck = action.payload
    },
    setEditCardModalIsOpen: (state, action: PayloadAction<boolean>) => {
      state.editCardModalIsOpen = action.payload
    },
  },
})

export const {
  updateCurrentPageForDeck,
  setItemsPerPageForDeck,
  setDeckIdWithCards,
  setCardIdFromDeck,
  setAnswerCard,
  setQuestionCard,
  setQuestionImgCard,
  setAnswerImgCard,
  setNameDeck,
  setEditCardModalIsOpen,
} = cardsSlice.actions
