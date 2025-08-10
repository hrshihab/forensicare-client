import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const postApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // POST: create user
        createUser: builder.mutation({
            query: (userData) => ({
                url: '/user',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: [tagTypes.user],
        }),
        // POST: reset password
        resetPassword: builder.mutation({
            query: (data) => ({
                url: '/User/resetpassword',
                method: 'POST',
                body: data,
            }),
        }),
        // POST: save user info (create/update)
        saveUserInfo: builder.mutation({
            query: (userData) => ({
                url: '/User/save/userinfo',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: [tagTypes.user],
        }),
    }),
    overrideExisting: true,
});

export const { useCreateUserMutation, useResetPasswordMutation, useSaveUserInfoMutation } = postApis;


