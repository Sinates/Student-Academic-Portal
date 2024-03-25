import React from "react";
import PendingTeacherCard from "./PendingTeacherCard";
import { useGetPendingTeachersQuery } from "@/api/api-slice";
import { Typography } from "@material-tailwind/react";

function PendingTeacherList() {
  const { data, isLoading, isSuccess, isError, error } =
    useGetPendingTeachersQuery();
  if (isLoading)
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
    if (data?.length === 0)
      return (
        <div className="flex items-center justify-center h-40">
          <div className=" text-blue-gray-900">No Pending Requests</div>
        </div>
      );
  return (
    <div className="grid grid-cols-3 gap-4 mx-16 overflow-y-auto h-[600px]">
      {data?.map((teacher) => (
        <PendingTeacherCard teacher={teacher} />
      ))}
    </div>
  );
}

export default PendingTeacherList;
