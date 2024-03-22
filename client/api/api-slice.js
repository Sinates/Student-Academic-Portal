// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  tagTypes: ["courses", "pendingStudents", "pendingTeachers"],
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
    }),
    addCourse: builder.mutation({
      query: ({ data }) => {
        return {
          url: "/admin/courses",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["courses"],
    }),
    getTeachers: builder.query({
      query: () => ({
        url: "/admin/getteachers",
        method: "GET",
      }),
    }),
    getStudents: builder.query({
      query: () => ({
        url: "/admin/getstudents",
        method: "GET",
      }),
    }),
    getBatches: builder.query({
      query: () => ({
        url: "/admin/getbatches",
        method: "GET",
      }),
    }),
    getCourses: builder.query({
      query: () => ({
        url: "/admin/courselist",
        method: "GET",
      }),
      providesTags: ["courses"],
    }),
    getPendingStudents: builder.query({
      query: () => ({
        url: "/admin/pendingapproval",
        method: "GET",
      }),
      providesTags: ["pendingStudents"],
    }),
    approvePendingStudents: builder.mutation({
      query: ({ data }) => ({
        url: `/admin/verifystudent`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["pendingStudents"],
    }),
    rejectPendingStudents: builder.mutation({
      query: ({ data }) => ({
        url: `/admin/rejectstudent`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["pendingStudents"],
    }),
    getPendingTeachers: builder.query({
      query: () => ({
        url: `/admin/pendingapprovalTeacher`,
        method: "GET",
      }),
      invalidatesTags: ["pendingTeachers"],
    }),
    registerStudent: builder.mutation({
      query: ({ data }) => ({
        url: `/student/register`,
        method: "POST",
        body: data,
      }),
      formdata: true,
    }),
    deleteCourse: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["courses"],
    }),
    getStudent: builder.query({
      query: (id) => ({
        url: `/admin/students/${id}`,
        method: "GET",
      }),
    }),
    getTeacher: builder.query({
      query: ( id ) => ({
        url: `/admin/teachers/${id}`,
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddCourseMutation,
  useGetTeachersQuery,
  useGetStudentsQuery,
  useGetCoursesQuery,
  useGetPendingStudentsQuery,
  useApprovePendingStudentsMutation,
  useRejectPendingStudentsMutation,
  useGetPendingTeachersQuery,
  useRegisterStudentMutation,
  useRegisterTeacherMutation,
  useDeleteCourseMutation,
  useGetTeacherQuery,
} = apiSlice;
