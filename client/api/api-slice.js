import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Need to use the React-specific entry point to import createApi

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  tagTypes: [
    "courses",
    "pendingStudents",
    "pendingTeachers",
    "students",
    "teachers",
    "payments",
    "GradeChangeRequest"
  ],
  endpoints: (builder) => ({
    // Students
    signin: builder.mutation({
      query: ({ data }) => ({
        url: `/auth/signin`,
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: ({ data }) => ({
        url: `/auth/signup`,
        method: "POST",
        body: data,
      }),
    }),
    getPendingStudents: builder.query({
      query: () => ({
        url: "/admin/pendingapproval",
        method: "GET",
      }),
      providesTags: ["pendingStudents", "students"],
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
    getStudents: builder.query({
      query: () => ({
        url: "/admin/getstudents",
        method: "GET",
      }),
      providesTags: ["students"],
    }),
    registerStudent: builder.mutation({
      query: ({ data }) => ({
        url: `/student/register`,
        method: "POST",
        body: data,
      }),
      formdata: true,
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/admin/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["students"],
    }),
    getStudent: builder.query({
      query: (id) => ({
        url: `/admin/students/${id}`,
        method: "GET",
      }),
    }),
    getNotification: builder.query({
      query: (id) => ({
        url: `/student/getnotification/${id}`,
        method: "GET",
      }),
    }),

    // Teachers
    getPendingTeachers: builder.query({
      query: () => ({
        url: `/admin/pendingapprovalTeacher`,
        method: "GET",
      }),
      providesTags: ["pendingTeachers"],
    }),
    approvePendingTeachers: builder.mutation({
      query: (id) => ({
        url: `/admin/verifyteacher/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["pendingTeachers", "teachers"],
    }),
    rejectPendingTeachers: builder.mutation({
      query: (id) => ({
        url: `/admin/rejectteacher/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["pendingTeachers"],
    }),
    getTeachers: builder.query({
      query: () => ({
        url: "/admin/getteachers",
        method: "GET",
      }),
      providesTags: ["teachers"],
    }),
    registerTeacher: builder.mutation({
      query: ({ data }) => ({
        url: `/teacher/register`,
        method: "POST",
        body: data,
      }),
      formdata: true,
    }),
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/admin/teachers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teachers"],
    }),
    getTeacher: builder.query({
      query: (id) => ({
        url: `/admin/teachers/${id}`,
        method: "GET",
      }),
    }),
    assignCourseBatch:builder.mutation({
      query: ({ id,data }) => ({
        url: `/admin/assignCourseBatch/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    // Courses
    getAllCourses: builder.query({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
    }),
    addCourse: builder.mutation({
      query: ({ data }) => ({
        url: "/admin/courses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
    getCourses: builder.query({
      query: () => ({
        url: "/admin/courselist",
        method: "GET",
      }),
      providesTags: ["courses"],
    }),
    getStudentCourses: builder.query({
      query: (id) => ({
        url: `/student/getStudentCourses/${id}`,
        method: "GET",
      }),
    }),
    deleteCourse: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["courses"],
    }),

    //payment

    uploadPayment: builder.mutation({
      query: ({ data, id }) => ({
        url: `/student/uploadpayment/${id}`,
        method: "POST",
        body: data,
      }),
      formdata: true,
    }),

    getPayments: builder.query({
      query: () => ({
        url: "/admin/getpayments",
        method: "GET",
      }),
      providesTags: ["payments"],
    }),
    verifyPayment: builder.mutation({
      query: (id) => ({
        url: `/admin/verifypayment/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["payments"],
    }),
    declinePayment: builder.mutation({
      query: (id) => ({
        url: `/admin/declinepayment/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["payments"],
    }),
    //batches
    getBatches: builder.query({
      query: () => ({
        url: "/batch",
        method: "GET",
      }),
    }),

    //gradechangerequest
    gradeChangeRequest: builder.mutation({
      query: ({ data }) => ({
        url: "/student/gradeChangeRequest",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["GradeChangeRequest"],
    }),

    getGradeChangeRequest: builder.query({
      query: (id) => ({
        url: `/teacher/gradeChangeRequest/teacher/${id}`,
        method: "GET",
      }),
      providesTags: ["GradeChangeRequest"],
    }),
    updateGradeChangeRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `teacher/gradeChangeRequest/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["GradeChangeRequest"],
    }),
    deleteGradeChangeRequest: builder.mutation({
      query: (id) => ({
        url: `teacher/gradeChangeRequest/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GradeChangeRequest"],
    }),

  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // Students
  useSigninMutation,
  useSignupMutation,
  useGetPendingStudentsQuery,
  useApprovePendingStudentsMutation,
  useRejectPendingStudentsMutation,
  useGetStudentsQuery,
  useRegisterStudentMutation,
  useDeleteStudentMutation,
  useGetStudentQuery,
  useGetNotificationQuery,

  // Teachers
  useGetPendingTeachersQuery,
  useApprovePendingTeachersMutation,
  useRejectPendingTeachersMutation,
  useGetTeachersQuery,
  useRegisterTeacherMutation,
  useDeleteTeacherMutation,
  useGetTeacherQuery,
  useAssignCourseBatchMutation,

  // Courses
  useGetAllCoursesQuery,
  useAddCourseMutation,
  useGetCoursesQuery,
  useDeleteCourseMutation,
  useGetStudentCoursesQuery,

  //payments
  useGetPaymentsQuery,
  useVerifyPaymentMutation,
  useDeclinePaymentMutation,


  //batches
  useGetBatchesQuery,

  //grade change request
  useGradeChangeRequestMutation,
  useGetGradeChangeRequestQuery,
  useUpdateGradeChangeRequestMutation,
  useDeleteGradeChangeRequestMutation,
  useUploadPaymentMutation
} = apiSlice;
