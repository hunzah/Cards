import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const decksSlice = createSlice(({
  name: "decks",
  initialState : {
    currentPage:1
  }, reducers: {
updateCurrentPage:(state, action:PayloadAction<{currentPage}>)=> {
  state.currentPage = action.payload.page
}
  }
}))
