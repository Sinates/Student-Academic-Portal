import RootLayout from "@/layouts/RootLayout";
import CourseList from "@/components/course/CourseList";
import TopHeader from "@/components/common/Header";
import React from "react";
import AddCourse from "@/components/course/AddCourse";

function Course() {
  return (
    <RootLayout>
      <TopHeader />
      <AddCourse />
      <CourseList />
    </RootLayout>
  );
}

export default Course;
