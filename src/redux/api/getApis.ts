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
    useGetDepartmentByIdQuery, } = getApis;