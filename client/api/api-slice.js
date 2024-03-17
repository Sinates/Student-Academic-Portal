// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
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
          url: '/admin/courses',
          method: 'POST',
          body: data,
        };
      },
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
    

    
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddCourseMutation,useGetTeachersQuery,useGetStudentsQuery } = apiSlice;
