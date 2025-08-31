import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getFromLocalStorage } from '@/utils/local-storage'
import { authKey } from '@/constants/authkey'
import { tagTypesList } from '../tag-types'

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '', // Empty baseUrl to handle both local and server endpoints
        prepareHeaders: (headers) => {
            const token = getFromLocalStorage(authKey)
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers
        },
    }),
    endpoints: () => ({}),
    tagTypes: tagTypesList,
})

