import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/services/base-query-with-reauth.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Me'],
  baseQuery: baseQueryWithReauth /*(/!*{
    /!*baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',*!/
    /!*prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },*!/
  }*!/)*/,
  endpoints: () => ({}),
})

//в билдэре первый дженерик возвращаемое значение, второе то что передаётся
