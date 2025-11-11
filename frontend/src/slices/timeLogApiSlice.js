import { TIMELOG_URL } from "../constants";

import { apiSlice } from "./apiSlice";

export const timeLogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTimeLogs: builder.query({
      query: (data) => ({
        url: TIMELOG_URL,
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    addTimeLog: builder.mutation({
      query: (data) => ({
        url: TIMELOG_URL,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetTimeLogsQuery, useAddTimeLogMutation } = timeLogApiSlice;
