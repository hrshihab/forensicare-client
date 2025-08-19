import { localApi } from './localApi'

export const reportApis = localApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all local reports
    getLocalReports: builder.query<any[], void>({
      query: () => ({ url: '/api/reports/local' }),
      transformResponse: (resp: any) => resp?.data ?? [],
      providesTags: ['local'],
    }),
    // Get single report by id
    getLocalReportById: builder.query<any, string | number>({
      query: (id) => ({ url: `/api/reports/local?id=${id}` }),
      transformResponse: (resp: any) => resp?.data ?? null,
      providesTags: ['local'],
    }),
    // Create or update (upsert) report
    saveLocalReport: builder.mutation<any, any>({
      query: (data) => ({
        url: '/api/reports/local',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['local'],
    }),
    submitLocalReport: builder.mutation<any, any>({
      query: (data) => ({
        url: '/api/reports/local',
        method: 'POST',
        body: { ...data, action: 'submit' },
      }),
      invalidatesTags: ['local'],
    }),
    unlockLocalReport: builder.mutation<any, { id: string; reason?: string }>({
      query: ({ id, reason }) => ({
        url: '/api/reports/local',
        method: 'POST',
        body: { id, action: 'unlock', lockReason: reason },
      }),
      invalidatesTags: ['local'],
    }),
  }),
  overrideExisting: true,
})

export const { useGetLocalReportsQuery, useGetLocalReportByIdQuery, useSaveLocalReportMutation, useSubmitLocalReportMutation, useUnlockLocalReportMutation } = reportApis


