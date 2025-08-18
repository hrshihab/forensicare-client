import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Local API slice for calling Next.js route handlers (baseUrl = '')
export const localApi = createApi({
  reducerPath: 'localApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: () => ({}),
  tagTypes: ['local'],
})


