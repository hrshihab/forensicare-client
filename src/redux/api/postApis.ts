import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const postApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // POST: create user (server-backed)
        createUser: builder.mutation({
            query: (userData) => ({
                url: `${process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api'}/user`,
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: [tagTypes.user],
        }),
        // POST: reset password (server-backed)
        resetPassword: builder.mutation({
            query: (data) => ({
                url: `${process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api'}/User/resetpassword`,
                method: 'POST',
                body: data,
            }),
        }),
        // POST: save user info (create/update) (server-backed)
        saveUserInfo: builder.mutation({
            query: (userData) => ({
                url: `${process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api'}/User/save/userinfo`,
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: [tagTypes.user],
        }),

        // REPORTS: upsert (create/update draft) - LOCAL
        upsertReport: builder.mutation<any, any>({
            query: (data) => ({
                url: '/api/reports/local',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [tagTypes.report],
        }),
        // REPORTS: submit (locks) - LOCAL
        submitReport: builder.mutation<any, any>({
            query: (data) => ({
                url: '/api/reports/local',
                method: 'POST',
                body: { ...data, action: 'submit' },
            }),
            invalidatesTags: [tagTypes.report],
        }),
        // REPORTS: unlock (admin only) - LOCAL
        unlockReport: builder.mutation<any, { id: string | number; reason?: string }>({
            query: ({ id, reason }) => ({
                url: '/api/reports/local',
                method: 'POST',
                body: { id, action: 'unlock', lockReason: reason },
            }),
            invalidatesTags: [tagTypes.report],
        }),

        // MEDICAL REPORTS: upsert - LOCAL
        upsertMedicalReport: builder.mutation<any, any>({
            query: (data) => ({
                url: '/api/medical/local',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [tagTypes.medicalReport],
        }),
    }),
    overrideExisting: true,
});

export const { useCreateUserMutation, useResetPasswordMutation, useSaveUserInfoMutation, useUpsertReportMutation, useSubmitReportMutation, useUnlockReportMutation, useUpsertMedicalReportMutation } = postApis;


