import {
  LoginArgs,
  LoginResponse,
  meResponseType,
  resetPasswordRequest,
  SingUpResponseType,
  SingUpType,
} from '@/services/auth/auth.types'
import { baseApi } from '@/services/base-api'

const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<meResponseType, void>({
      async queryFn(_name, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: 'v1/auth/me',
          method: 'GET',
        })

        if (result.error) {
          return { data: { success: false } }
        }

        return { data: result.data }
      },
      extraOptions: { maxRetries: 0 },
      providesTags: ['Me'],
    }),
    login: builder.mutation<LoginResponse, LoginArgs>({
      query: data => ({
        url: 'v1/auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Me'],
    }),
    singUp: builder.mutation<SingUpResponseType, SingUpType>({
      query: data => ({
        url: '/v1/auth/sign-up',
        method: 'POST',
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<any, { html: string; email: string }>({
      query: data => ({
        url: '/v1/auth/recover-password',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<any, resetPasswordRequest>({
      query: data => ({
        url: `/v1/auth/reset-password/${data.token}`,
        method: 'POST',
        body: { password: data.password },
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: 'v1/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Me'],
    }),
  }),
})

export const {
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useSingUpMutation,
  useGetMeQuery,
  useLoginMutation,
  useLogOutMutation,
} = authService
