import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
    reducerPath: 'job',
    baseQuery: fetchBaseQuery({baseUrl: '/api/proxy'}),
    endpoints: (builder) => ({
        getJobs: builder.query({
            query: () => "",
        }),
        getJobById: builder.query({
            query: (id) => `/${id}`,
        })
    }),
});

export const { useGetJobsQuery } = jobApi;
