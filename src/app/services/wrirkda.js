// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const wrirkdaApi = createApi({
  reducerPath: 'wrirkdaApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://repo.wrirk.com/api/` }),
  endpoints: (builder) => ({
   
    getAreas: builder.query({
      query: () => `research_areas`,
    }),
    getDomains: builder.query({
      query: () => `domains`,
    }),
    
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAreasQuery, useGetDomainsQuery } = wrirkdaApi