import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/services/base-query-with-reauth'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Me', 'Decks'],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})

//в билдэре первый дженерик возвращаемое значение, второе то что передаётся
