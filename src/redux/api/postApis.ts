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

        // REPORTS: upsert (create/update draft)
        upsertReport: builder.mutation<any, any>({
            query: (data) => ({
                url: '/reports',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [tagTypes.report],
        }),
        // REPORTS: submit (locks)
        submitReport: builder.mutation<any, any>({
            query: (data) => ({
                url: '/reports/submit',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [tagTypes.report],
        }),
        // REPORTS: unlock (admin only)
        unlockReport: builder.mutation<any, { id: string | number; reason?: string }>({
            query: ({ id, reason }) => ({
                url: `/reports/${id}/unlock`,
                method: 'POST',
                body: { reason },
            }),
            invalidatesTags: [tagTypes.report],
        }),

        // MEDICAL REPORTS: upsert
        upsertMedicalReport: builder.mutation<any, any>({
            query: (data) => ({
                url: '/medical-reports',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [tagTypes.medicalReport],
        }),
    }),
    overrideExisting: true,
});

export const { useCreateUserMutation, useResetPasswordMutation, useSaveUserInfoMutation, useUpsertReportMutation, useSubmitReportMutation, useUnlockReportMutation, useUpsertMedicalReportMutation } = postApis;


