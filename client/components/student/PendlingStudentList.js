import React, { useState } from "react";
import PendingStudentCard from "./PendingStudentCard";
import { pendingStudents } from "../../data/student";
import { useGetPendingStudentsQuery } from "../../api/api-slice";

function PendingStudentList() {
  const { data, isloading, isError, isSuccess } = useGetPendingStudentsQuery();
  const [pStudents, setPStudents] = useState(pendingStudents);

  function removeStudent(index) {
    const updatedStudents = [...pStudents];
    updatedStudents.splice(index, 1);
    setPStudents(updatedStudents);
  }
  if (isloading)
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-gray-900"></div>
      </div>
    );
  if (isError)
    return (
      <Typography variant="body" color="red" className="text-center mt-4 mx-16">
        Error loading teachers. Please try again later.
      </Typography>
    );
  if (isSuccess)
    return (
      <div className="grid grid-cols-3 gap-4 mx-16 overflow-y-auto h-[600px]" >
      {data.map((student) => (
        <PendingStudentCard key={student.id} student={student} />
      ))}
      </div>
    );
}

export default PendingStudentList;
