import {baseApi} from "@/services/base-api";
import {DecksResponse} from "@/services/decks/types";
import {LoginArgs, LoginResponse} from "@/services/auth/auth.types.";

const authService = baseApi.injectEndpoints({
    endpoints: builder => ({
        getMe: builder.query<any, void>({
            query: () => {
                return {
                    url: "v1/auth/me",
                    method: "GET",
                }
            }
        }),
        login: builder.mutation<LoginResponse,LoginArgs>({

            query: data => ({
                url: "v1/auth/login",
                method: "POST",
                body: data
            })
        })
    })
})
export const {useGetMeQuery, useLoginMutation} = authService