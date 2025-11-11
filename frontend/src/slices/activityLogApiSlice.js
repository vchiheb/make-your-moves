import { ACTIVITYLOG_URL } from "../constants";

import { apiSlice } from "./apiSlice";

export const activityLogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActivityLogs: builder.query({
      query: (data) => ({
        url: ACTIVITYLOG_URL,
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    addActivityLog: builder.mutation({
      query: (data) => ({
        url: ACTIVITYLOG_URL,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetActivityLogsQuery, useAddActivityLogMutation } =
  activityLogApiSlice;
