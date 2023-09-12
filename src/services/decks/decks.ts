import { baseApi } from '@/services/base-api'
import { Deck, DecksParams, DecksPostParams, DecksResponse } from '@/services/decks/types'

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
    createDeck: builder.mutation<Deck, { name: string }>({
      query: params => ({
        url: 'v1/decks',
        method: 'POST',
        body: params,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled

          dispatch(
            decksApi.util.updateQueryData('getDecks', { authorId: '1', currentPage: 1 }, draft => {
              // Object.assign(draft, patch)
              draft.items.unshift(response.data)
            })
          )
        } catch (error) {
          console.log(error)
        }
      },
      invalidatesTags: ['Decks'],
    }),
    deleteDeck: builder.mutation<void, { id: string }>({
      query: params => ({
        url: `v1/decks/${params['id']}`,
        method: 'DELETE',
        body: params,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          decksApi.util.updateQueryData(
            'getDecks',
            {
              authorId: '1',
              currentPage: 1,
            },
            draft => {
              draft.items = draft.items.filter(item => item.id !== id)
            }
          )
        )

        try {
          await queryFulfilled
        } catch (error) {
          patchResult.undo()
        }
      },
      invalidatesTags: ['Decks'],
    }),
    updateDeck: builder.mutation<Deck, DecksPostParams>({
      query: params => ({
        url: `v1/decks/${params['id'].id}`,
        method: 'PATCH',
        body: params.params.params,
      }),
      invalidatesTags: ['Decks'],
    }),
  }),
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
} = decksApi
