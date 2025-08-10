import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const deleteApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // DELETE: delete user
        deleteUser: builder.mutation({
            query: (id: number) => ({
                url: `/User/delete?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.user],
        }),
        // DELETE: delete department
        deleteDepartment: builder.mutation({
            query: (ids: number[]) => ({
                url: `/Department/delete/${ids.join(',')}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.department],
        }),
    }),
    overrideExisting: true,
});

export const { useDeleteUserMutation, useDeleteDepartmentMutation } = deleteApis;
