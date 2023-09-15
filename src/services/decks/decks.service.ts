import { baseApi } from '@/services/base-api'
import { Deck, DecksParams, DecksResponse } from '@/services/decks/types'
import { RootState } from '@/services/store.ts'

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
      async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        const state = getState() as RootState

        try {
          const response = await queryFulfilled

          dispatch(
            decksApi.util.updateQueryData(
              'getDecks',
              { authorId: '1', currentPage: state.decks.currentPage },
              draft => {
                // Object.assign(draft, patch)
                draft.items.unshift(response.data)
              }
            )
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
      async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
        const state = getState() as RootState
        const patchResult = dispatch(
          decksApi.util.updateQueryData(
            'getDecks',
            {
              authorId: '1',
              currentPage: state.decks.currentPage,
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
    updateDeck: builder.mutation<Deck, any>({
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
