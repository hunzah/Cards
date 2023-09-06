import {baseApi} from "@/services/base-api";
import {DecksResponse} from "@/services/decks/types";

const decksApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getDecks: builder.query<DecksResponse, void>({
                query: (params) => {
                    return {
                        url: "v1/decks",
                        params: params ?? {}
                    }
                },
                providesTags: ["Decks"],
            }
        ),
        createDecks: builder.mutation<any, { name: string }>({
            query: ({name}) => ({
                url: "v1/decks",
                method: "POST",
                body: {name}
            }),
            invalidatesTags: ["Decks"]
        })
    }),
})
export const {useGetDecksQuery, useCreateDecksMutation} = decksApi