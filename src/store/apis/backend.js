import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backendApi = createApi({
    reducerPath: 'prediction',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://ml-ajkk2vma5q-ew.a.run.app'
    }),
    endpoints(builder) {
        return {
            fetchPrediction: builder.mutation({
                query: (payload) => {
                    return {
                        url: '/predict',
                        method: 'POST',
                        body: JSON.stringify(payload),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                }
            }),
            fetchPlot: builder.mutation({
                query: (body) => {
                    return {
                        url: '/plot',
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                }
            }),
        }
    }
})

export const { useFetchPredictionMutation, useFetchPlotMutation } = backendApi;
export { backendApi };