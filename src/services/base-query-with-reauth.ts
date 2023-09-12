import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.flashcards.andrii.es',
  credentials: 'include',
  prepareHeaders: headers => {
    // headers.append('x-auth-skip', 'true')
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      {
        url: '/v1/auth/refresh-token',
        method: 'POST',
      },
      api,
      extraOptions
    )

    if (refreshResult.meta?.response?.status === 204) {
      // retry initial token
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
