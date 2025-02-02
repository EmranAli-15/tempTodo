import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000'
    }),
    tagTypes: ['todo'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: (priority) => {
                const params = new URLSearchParams();
                if(priority){
                    params.append('priority', priority);
                };

                return {
                    url: '/todos',
                    method: 'GET',
                    params: params
                }
            },
            providesTags: ['todo']
        }),

        addTodo: builder.mutation({
            query: (data) => {
                console.log(data)
                return {
                    url: '/todo',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['todo']
        }),
    })
});

export const { useGetTodosQuery, useAddTodoMutation } = baseApi;