import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from '@/practicsRoutertRtkQuery/services/base-api.ts'

export const storePrac = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppDispatch = typeof storePrac.dispatch
export type RootState = ReturnType<typeof storePrac.getState>
