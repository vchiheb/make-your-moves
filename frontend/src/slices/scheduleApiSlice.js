import { SCHEDULE_URL } from "../constants";

import { apiSlice } from "./apiSlice";

export const scheduleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSchedule: builder.query({
      query: (data) => ({
        url: SCHEDULE_URL,
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    addSchedule: builder.mutation({
      query: (data) => ({
        url: SCHEDULE_URL,
        method: "PUT",
        body: data,
      }),
    }),
    updateSchedule: builder.mutation({
      query: (data) => ({
        url: `${SCHEDULE_URL}/${data._id}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetScheduleQuery,
  useAddScheduleMutation,
  useUpdateScheduleMutation,
} = scheduleApiSlice;
