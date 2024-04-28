import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const foodSecApi = createApi({
    reducerPath: 'ipc',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.hungermapdata.org'
    }),
    endpoints(builder) {
        return {
            fetchIPC: builder.query({
                query: (country) => {
                    return {
                        url: '/v1/ipc/peaks',
                        method: 'GET',
                    }
                }
            }),
            fetchInfo: builder.query({
                query: (country) => {
                    return {
                        url: 'v2/info/country',
                        method: 'GET',
                    }
                }
            }),
            fetchHazard: builder.query({
                query: (country) => {
                    return {
                        url: 'v1/climate/hazards',
                        method: 'GET',
                    }
                }
            })
        }
    }
})

export const { useFetchIPCQuery, useFetchHazardQuery, useFetchInfoQuery } = foodSecApi;
export { foodSecApi };
