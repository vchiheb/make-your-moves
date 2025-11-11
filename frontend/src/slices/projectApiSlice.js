import { PROJECTS_URL } from "../constants";
import { UPLOADS_URL } from "../constants";

import { apiSlice } from "./apiSlice";

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: PROJECTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProject: builder.query({
      query: (projectId) => ({
        url: `${PROJECTS_URL}/${projectId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getProjectGoals: builder.query({
      query: (projectId) => ({
        url: `${PROJECTS_URL}/${projectId}/goals`,
      }),
      keepUnusedDataFor: 5,
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOADS_URL,
        method: "POST",
        body: data,
      }),
    }),
    addProject: builder.mutation({
      query: (data) => ({
        url: PROJECTS_URL,
        method: "PUT",
        body: data,
      }),
    }),
    updateProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/${data._id}`,
        method: "POST",
        body: data,
      }),
    }),
    updateProjectTaskList: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/${data._id}/tasks`,
        method: "POST",
        body: data,
      }),
    }),
    updateProjectGoalList: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/${data._id}/goals`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `${PROJECTS_URL}/${projectId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useUploadProductImageMutation,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectTaskListMutation,
  useUpdateProjectGoalListMutation,
} = projectApiSlice;
