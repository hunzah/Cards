import { baseApi } from '@/services/base-api'
import {
  Deck,
  DeckDeleteParams,
  DeckDeleteResponse,
  DeckPostResponse,
  DecksParams,
  DecksPostParams,
  DecksResponse,
} from '@/services/decks/types'

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
    createDecks: builder.mutation<DeckPostResponse, DecksPostParams>({
      query: (params) => ({
        url: 'v1/decks',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Decks'],
    }),
    deleteDeck: builder.mutation<DeckDeleteResponse, DeckDeleteParams>({
      query: (params) => ({
        url: `v1/decks/${params["id"]}`,
        method: 'DELETE',
        body: params,
      }),
      invalidatesTags: ['Decks'],
    }),
    updateDeck: builder.mutation<Deck, DecksPostParams>({
      query: (params) => ({
        url: `v1/decks/${params["id"].id}`,
        method: 'PATCH',
        body: params.params.params
      }),
      invalidatesTags: ['Decks'],
    }),
  }),

})

export const { useGetDecksQuery, useCreateDecksMutation, useDeleteDeckMutation, useUpdateDeckMutation } = decksApi


