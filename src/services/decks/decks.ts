import { baseApi } from '@/services/base-api'
import { DecksParams, DecksResponse } from '@/services/decks/types'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getDecks: builder.query<DecksResponse, DecksParams>({
      query: params => {
        return {
          url: 'v1/decks',
          params: params ?? {},
        }
      },
      providesTags: ['Decks'],
    }),
    createDecks: builder.mutation<any, { name: string }>({
      query: ({ name }) => ({
        url: 'v1/decks',
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: ['Decks'],
    }),
    deleteDeck: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `v1/decks/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: ['Decks'],
    }),
  }),

})

export const { useGetDecksQuery, useCreateDecksMutation,useDeleteDeckMutation } = decksApi
