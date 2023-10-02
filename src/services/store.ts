import { configureStore } from '@reduxjs/toolkit'

import { sliderSlice } from '@/components/ui/slider/slider.slice'
import { authSlice } from '@/services/auth/auth.slice'
import { baseApi } from '@/services/base-api'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [decksSlice.name]: decksSlice.reducer,
    [cardsSlice.name]: cardsSlice.reducer,
    [sliderSlice.name]: sliderSlice.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

//rtk hooks ts
