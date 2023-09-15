import { baseApi } from '@/services/base-api.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    logIn: builder.mutation<void, { email: string; password: string }>({
      query: params => {
        return {
          url: 'v1/login',
          method: 'GET',
          params: params ?? {},
        }
      },
      invalidateTags: ['Me'],
    }),

  }),
})

export const { useLogInMutation } = authApi
