import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';
import { User } from '@/types/user';

export const getApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get all users (server-backed)
      getAllUsers: builder.query({
        query: (params?: { pageNo?: number; pageSize?: number }) => ({
          url: `${process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api'}/User/getall`,
          params: { pageNo: 1, pageSize: 25, ...params },
        }),
        transformResponse: (response: any) => {
          return response.result?.data || [];
        },
        providesTags: [tagTypes.user],
      }),
  
      // Get user by ID (server-backed)
      getUserById: builder.query<User, number>({
        query: (id) => `${process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api'}/User/${id}`,
        providesTags: (_result, _error, id) => [{ type: tagTypes.user, id }],
      }),

      // Get user info by ID (server-backed)
      getUserInfo: builder.query({
        query: (id: number) => ({
          url: `${process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api'}/User/get/userinfo`,
          params: { id },
        }),
        transformResponse: (response: any) => {
          return response.result?.data || null;
        },
        providesTags: (_result, _error, id) => [{ type: tagTypes.user, id }],
      }),

      // GET all departments (server-backed)
      getDepartments: builder.query({
        query: (params?: { pageNo?: number; pageSize?: number }) => ({
          url: `${process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api'}/Department/getall`,
          params: { pageNo: 1, pageSize: 25, ...params },
        }),
        transformResponse: (response: any) => {
          return response.result?.data || [];
        },
        providesTags: [tagTypes.department],
      }),

      // GET single department by ID (server-backed)
      getDepartmentById: builder.query({
        query: (id) => `${process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api'}/department/${id}`,
        providesTags: (_result, _error, id) => [{ type: tagTypes.department, id }],
      }),

      // Investigation Reports (LOCAL - using Next.js API routes)
      getReports: builder.query<any[], { page?: number; pageSize?: number } | void>({
        query: () => ({
          url: '/api/reports/local',
        }),
        transformResponse: (response: any) => {
          return response?.data || [];
        },
        providesTags: [tagTypes.report],
      }),

      getReportById: builder.query<any, string | number>({
        query: (id) => ({ url: `/api/reports/local?id=${id}` }),
        transformResponse: (response: any) => {
          return response?.data || null;
        },
        providesTags: (_r, _e, id) => [{ type: tagTypes.report, id }],
      }),

      // Medical Reports (LOCAL - using Next.js API routes)
      getMedicalReports: builder.query<any[], { page?: number; pageSize?: number } | void>({
        query: () => ({
          url: '/api/medical/local',
        }),
        transformResponse: (response: any) => {
          return response?.data || [];
        },
        providesTags: [tagTypes.medicalReport],
      }),

      getMedicalReportById: builder.query<any, string | number>({
        query: (id) => ({ url: `/api/medical/local?id=${id}` }),
        transformResponse: (response: any) => {
          return response?.data || null;
        },
        providesTags: (_r, _e, id) => [{ type: tagTypes.medicalReport, id }],
      }),
    }),
    overrideExisting: true,
});

export const {   
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useGetUserInfoQuery,
    useGetDepartmentsQuery,
    useGetDepartmentByIdQuery,
    useGetReportsQuery,
    useGetReportByIdQuery,
    useGetMedicalReportsQuery,
    useGetMedicalReportByIdQuery, } = getApis;