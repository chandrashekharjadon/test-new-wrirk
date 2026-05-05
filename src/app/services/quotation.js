// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const quotationApi = createApi({
  reducerPath: 'quotationApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/siteapi/` }),
  endpoints: (builder) => ({
   
    getService: builder.query({
      query: () => `service_type/header`,
    }),
    getServiceType: builder.query({
      query: () => `service_type`,
    }),
    getSalesTeam: builder.query({
      query: () => `sales_team`,
    }),
    getAllDataQuotation: builder.query({
      query: (id) => `getAll/${id}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetServiceQuery, useGetServiceTypeQuery, useGetSalesTeamQuery, useGetAllDataQuotationQuery } = quotationApi