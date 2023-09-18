import { baseApi } from '@/services/base-api'
import {
  Deck,
  DecksParams,
  DecksPatchParams,
  DecksPostParams,
  DecksResponse,
} from '@/services/decks/types'
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
    createDeck: builder.mutation<Deck, DecksPostParams>({
      query: params => ({
        url: 'v1/decks',
        method: 'POST',
        body: params,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        const state = getState() as RootState
        const { currentPage, itemsPerPage } = state.decks
        const { minCurrentSliderValue, maxCurrentSliderValue } = state.slider

        try {
          const response = await queryFulfilled

          dispatch(
            decksApi.util.updateQueryData(
              'getDecks',
              {
                currentPage: currentPage,
                itemsPerPage: itemsPerPage,
                minCardsCount: minCurrentSliderValue,
                maxCardsCount: maxCurrentSliderValue,
              },
              draft => {
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
        const { currentPage, itemsPerPage } = state.decks
        const { minCurrentSliderValue, maxCurrentSliderValue } = state.slider
        const patchResult = dispatch(
          decksApi.util.updateQueryData(
            'getDecks',
            {
              currentPage: currentPage,
              itemsPerPage: itemsPerPage,
              minCardsCount: minCurrentSliderValue,
              maxCardsCount: maxCurrentSliderValue,
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
    updateDeck: builder.mutation<Deck, DecksPatchParams>({
      query: params => ({
        url: `v1/decks/${params.id}`,
        method: 'PATCH',
        body: params.params,
      }),
      async onQueryStarted({ params, id }, { dispatch, queryFulfilled, getState }) {
        const state = getState() as RootState
        const { currentPage, itemsPerPage } = state.decks
        const { minCurrentSliderValue, maxCurrentSliderValue } = state.slider
        const patchResult = dispatch(
          decksApi.util.updateQueryData(
            'getDecks',
            {
              currentPage: currentPage,
              itemsPerPage: itemsPerPage,
              minCardsCount: minCurrentSliderValue,
              maxCardsCount: maxCurrentSliderValue,
            },
            draft => {
              draft.items = draft.items.map(item =>
                item.id === id ? { ...item, ...params } : item
              )
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
  }),
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
} = decksApi
