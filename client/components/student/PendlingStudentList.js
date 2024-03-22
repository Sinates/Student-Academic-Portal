import React, { useState } from "react";
import PendingStudentCard from "./PendingStudentCard";
import { useGetPendingStudentsQuery } from "../../api/api-slice";
import { Typography } from "@material-tailwind/react";

function PendingStudentList() {
  const { data, isLoading, isError, isSuccess } = useGetPendingStudentsQuery();


  if (isError)
    return (
      <Typography variant="body" color="red" className="text-center mt-4 mx-16">
        Error loading students. Please try again later. 
      </Typography>
    );
  if (isSuccess)
  if (data.length === 0)
  return (
    <div className="flex items-center justify-center h-40">
      <div className=" text-blue-gray-900">No Pending Requests</div>
    </div>
  );
    return (
      <div className="grid grid-cols-3 gap-4 mx-16 overflow-y-auto h-[600px]">
        {data.map((student) => (
          <PendingStudentCard key={student.id} student={student} />
        ))}
      </div>
    );
}

export default PendingStudentList;
