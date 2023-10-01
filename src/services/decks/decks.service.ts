import { omit } from 'remeda'

import { baseApi } from '@/services/base-api'
import {
  Card,
  CardsFromDeckRequest,
  CardsFromDeckResponse,
  createCardRequest,
  DeckRequestParams,
  DecksParams,
  DecksPatchParams,
  DecksPostParams,
  DecksResponse,
  DeckType,
  GetCardById,
  LearnRequest,
  LearnResponse,
  PostLearn,
  UpdateCardWithFormDataRequest,
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
    getDeck: builder.query<DeckType, DeckRequestParams>({
      query: params => {
        return {
          url: `v1/decks/${params.id}`,
        }
      },
      providesTags: ['Decks'],
    }),
    createDeck: builder.mutation<DeckType, DecksPostParams>({
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
          console.error(error)
        }
      },
      invalidatesTags: ['Decks'],
    }),
    deleteDeck: builder.mutation<
      void,
      {
        id: string
      }
    >({
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
    updateDeck: builder.mutation<DeckType, DecksPatchParams>({
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
    getCardsFromDeck: builder.query<CardsFromDeckResponse, CardsFromDeckRequest>({
      query: params => {
        return {
          url: `v1/decks/${params.id}/cards`,
          params: omit(params, ['id']) ?? {},
        }
      },
      providesTags: ['Cards'],
    }),
    createCard: builder.mutation<Card, createCardRequest>({
      query: params => {
        //const { id, ...requestBodyWithoutId } = params

        return {
          url: `v1/decks/${params.id}/cards`,
          method: 'POST',
          body: params.formData /*{ ...requestBodyWithoutId }*/,
        }
      },
      invalidatesTags: ['Cards'],
    }),
    deleteCard: builder.mutation<
      void,
      {
        id: string
      }
    >({
      query: params => {
        return {
          url: `v1/cards/${params.id}`,
          method: 'DELETE',
          body: params,
        }
      },
      invalidatesTags: ['Cards'],
    }),
    updateCard: builder.mutation<Card, UpdateCardWithFormDataRequest>({
      query: params => {
        return {
          url: `v1/cards/${params.id}`,
          method: 'PATCH',
          body: params.formData,
        }
      },
      invalidatesTags: ['Cards'],
    }),
    getCard: builder.query<Card, GetCardById>({
      query: params => {
        return {
          url: `/v1/cards/${params.id}`,
        }
      },
      providesTags: ['Learn'],
    }),
    getLearn: builder.query<LearnResponse, LearnRequest>({
      query: params => {
        return {
          url: `v1/decks/${params.id}/learn`,
        }
      },
      providesTags: ['Decks'],
    }),
    postLearn: builder.mutation<void, PostLearn>({
      query: params => {
        return {
          url: `v1/decks/${params.id}/learn`,
          method: 'POST',
          body: { cardId: params.cardId, grade: params.grade },
        }
      },
      invalidatesTags: ['Decks'],
    }),
    clearFilter: builder.mutation<any, any>({
      query: () => {
        return {
          url: 'v1/decks',
        }
      },
      invalidatesTags: ['Decks'],
    }),
  }),
})

export const {
  useGetDeckQuery,
  useGetDecksQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
  useGetCardsFromDeckQuery,
  useCreateCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
  useGetLearnQuery,
  usePostLearnMutation,
  useGetCardQuery,
} = decksApi
