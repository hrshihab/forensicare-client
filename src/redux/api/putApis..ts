import { ChangePasswordRequest, UpdateProfileRequest } from "@/types/auth";
import { tagTypes } from "../tag-types";
import { User } from "@/types/user";
import { baseApi } from "./baseApi";

export const putApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Update profile image
        updateProfileImage: builder.mutation<{ message: string; user: User }, UpdateProfileRequest>({
            query: (data) => ({
                url: '/users/updateImage',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: [tagTypes.user],
        }),

        // Change password
        changePassword: builder.mutation<{ message: string }, ChangePasswordRequest>({
            query: (data) => ({
                url: '/users/changePassword',
                method: 'PUT',
                body: data,
            }),
        }),
    }),
});

export const { useUpdateProfileImageMutation, useChangePasswordMutation } = putApis;