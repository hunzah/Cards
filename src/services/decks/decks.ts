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
    getDecks: builder.query<DecksResponse,{authorId?:string, currentPage?:number, } /*DecksParams*/>({
      query: params => {
        return {
          url: 'v1/decks',
          method:"GET",
          params,
        }
      },
      providesTags: ['Decks'],
    }),
    createDecks: builder.mutation<DeckPostResponse, {name:string}>({
      query: (params) => ({
        url: 'v1/decks',
        method: 'POST',
        body: params,
      }),
      async onQueryStarted({ name:string }, { dispatch, queryFulfilled }) {

       try {
         const response = await queryFulfilled
         console.log(response)
          dispatch(
             decksApi.util.updateQueryData(
                 'getDecks',
                 { currentPage:4}, (draft) => {
                   draft.item = [response.data, ...draft.item]
                 }
             )
         )
       }catch (error){
         console.log(error)
       }
      },
      invalidatesTags: ['Decks'],
    }),
    deleteDeck: builder.mutation<DeckDeleteResponse, {id:string}>({
      query: (params) => ({
        url: `v1/decks/${params["id"]}`,
        method: 'DELETE',
        body: params,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
            decksApi.util.updateQueryData(
                'getDecks',
                {id}, (draft) => {
                  draft.item.filter(item => item.id !== id)
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
      query: (params) => ({
        url: `v1/decks/${params["id"].id}`,
        method: 'PATCH',
        body: params.params.params
      }),
      invalidatesTags: ['Decks'],
    }),
  })
  })



export const { useGetDecksQuery, useCreateDecksMutation, useDeleteDeckMutation, useUpdateDeckMutation } = decksApi


