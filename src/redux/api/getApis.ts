import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';
import { User } from '@/types/user';

export const getApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get all users
      getAllUsers: builder.query({
        query: (params?: { pageNo?: number; pageSize?: number }) => ({
          url: '/User/getall',
          params: { pageNo: 1, pageSize: 25, ...params },
        }),
        transformResponse: (response: any) => {
          return response.result?.data || [];
        },
        providesTags: [tagTypes.user],
      }),
  
      // Get user by ID
      getUserById: builder.query<User, number>({
        query: (id) => `/User/${id}`,
        providesTags: (_result, _error, id) => [{ type: tagTypes.user, id }],
      }),

      // Get user info by ID
      getUserInfo: builder.query({
        query: (id: number) => ({
          url: '/User/get/userinfo',
          params: { id },
        }),
        transformResponse: (response: any) => {
          return response.result?.data || null;
        },
        providesTags: (_result, _error, id) => [{ type: tagTypes.user, id }],
      }),

      // GET all departments
      getDepartments: builder.query({
        query: (params?: { pageNo?: number; pageSize?: number }) => ({
          url: '/Department/getall',
          params: { pageNo: 1, pageSize: 25, ...params },
        }),
        transformResponse: (response: any) => {
          return response.result?.data || [];
        },
        providesTags: [tagTypes.department],
      }),

      // Reports (server-backed)
      getReports: builder.query<any[], { page?: number; pageSize?: number } | void>({
        query: (params) => ({
          url: '/reports',
          params: params ? { page: params.page ?? 1, pageSize: params.pageSize ?? 25 } : undefined,
        }),
        transformResponse: (response: any) => {
          if (Array.isArray(response)) return response;
          return response?.result?.data ?? response?.data ?? [];
        },
        providesTags: [tagTypes.report],
      }),

      getReportById: builder.query<any, string | number>({
        query: (id) => ({ url: `/reports/${id}` }),
        transformResponse: (response: any) => {
          return response?.result?.data ?? response?.data ?? response ?? null;
        },
        providesTags: (_r, _e, id) => [{ type: tagTypes.report, id }],
      }),

      // Medical Reports (server-backed)
      getMedicalReports: builder.query<any[], { page?: number; pageSize?: number } | void>({
        query: (params) => ({
          url: '/medical-reports',
          params: params ? { page: params.page ?? 1, pageSize: params.pageSize ?? 25 } : undefined,
        }),
        transformResponse: (response: any) => {
          if (Array.isArray(response)) return response;
          return response?.result?.data ?? response?.data ?? [];
        },
        providesTags: [tagTypes.medicalReport],
      }),

      getMedicalReportById: builder.query<any, string | number>({
        query: (id) => ({ url: `/medical-reports/${id}` }),
        transformResponse: (response: any) => {
          return response?.result?.data ?? response?.data ?? response ?? null;
        },
        providesTags: (_r, _e, id) => [{ type: tagTypes.medicalReport, id }],
      }),

    // GET single department by ID
      getDepartmentById: builder.query({
        query: (id) => `/department/${id}`,
        providesTags: (_result, _error, id) => [{ type: tagTypes.department, id }],
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