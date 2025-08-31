import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

// Shape loosely based on usages in UserProfileWrapper
type Employee = {
  EmployeeName?: string;
  PhoneNumber?: string;
  Department?: { DepartmentName?: string };
  Address?: string;
  DateOfBirth?: string;
  JoinDate?: string;
  PhotoUrl?: string;
};

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch employee info by userId from server
    getEmployeeByUserId: builder.query<Employee | null, string | number | undefined>({
      query: (userId) => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api';
        // Assuming server route: /Employee/user/{userId}
        return `${baseUrl}/Employee/user/${userId}`;
      },
      transformResponse: (response: any) => {
        // Support both { result: { data: ... } } and direct object
        if (response?.result?.data) return response.result.data as Employee;
        return (response ?? null) as Employee | null;
      },
      providesTags: (_r, _e, userId) => [{ type: tagTypes.employee, id: String(userId) }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetEmployeeByUserIdQuery } = employeesApi;


