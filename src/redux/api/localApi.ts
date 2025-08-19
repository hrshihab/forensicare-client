import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { authKey } from '@/constants/authkey'
import { getFromLocalStorage } from '@/utils/local-storage'

// Local API slice for calling Next.js route handlers (baseUrl = '')
export const localApi = createApi({
  reducerPath: 'localApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers) => {
      try {
        const token = getFromLocalStorage(authKey) || Cookies.get('accessToken')
        if (token) headers.set('authorization', `Bearer ${token}`)
        // Provide a dev-friendly fallback so server can identify actor when token is absent
        const rawUser = typeof window !== 'undefined' ? localStorage.getItem('userInfo') : null
        if (rawUser) {
          try {
            const parsed = JSON.parse(rawUser)
            const username = parsed?.user?.username || parsed?.user?.userName || parsed?.user?.name
            const role = (parsed?.user?.role || parsed?.user?.departmentName || '').toString().toLowerCase()
            const isSuper = Boolean(parsed?.user?.isSuperUser ?? parsed?.user?.IsSuperUser)
            if (username) headers.set('x-actor-username', username)
            if (role) headers.set('x-actor-role', role)
            headers.set('x-actor-super', String(isSuper))
          } catch {}
        }
      } catch {}
      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['local'],
})


