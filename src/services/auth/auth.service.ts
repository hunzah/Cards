import {baseApi} from "@/services/base-api";
import {LoginArgs, LoginResponse} from "@/services/auth/auth.types.";

const authService = baseApi.injectEndpoints({
    endpoints: builder => ({
        getMe: builder.query<any, void>({
            async queryFn(_name, _api, _extraOptions, baseQuery) {
                const result = await baseQuery({
                    url: "v1/auth/me",
                    method: "GET",
                })
                if (result.error) {

                    return {data:{success:false}}
                }

   return {data: result.data}

            },
            extraOptions:{maxRetries:0},
            providesTags: ['Me'],
        }),
        login: builder.mutation<LoginResponse,LoginArgs>({
            query: data => ({
                url: "v1/auth/login",
                method: "POST",
                body: data
            }),
            invalidateTags: ['Me'],
        }),
        logOut: builder.mutation({
            query: () => ({
                url:"v1/auth/logout",
                method:"POST"
            }),
            invalidateTags: ['Me'],
        })
    })
})
export const {useGetMeQuery, useLoginMutation, useLogOutMutation} = authService