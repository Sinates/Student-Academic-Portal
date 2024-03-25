import React, { useState, useEffect } from "react";
import { useGetNotificationQuery } from "@/api/api-slice";
import {
  Typography,
} from "@material-tailwind/react";
function Notification({ open, handler }) {
  const { data, isLoading, isSuccess, isError } = useGetNotificationQuery(
    "65f18f340f14be25afd0b82e"
  );
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-gray-900"></div>
      </div>
    );
  if (isError)
    return (
      <Typography variant="body" color="red" className="text-center mt-4 mx-16">
        Error loading notification. Please try again later.
      </Typography>
    );
  if (isSuccess)
    return (
      <div className="p-8">
        {data?.notifications.map((item) => (
          <div
            key={item._id}
            className="flex justify-between bg-[#DCDCDC]  bg-opacity-20 p-4 rounded-md border my-4 border-gray-300"
          >
            <span className="text-sm">{item.sender}</span>
            <span className="text-sm">{item.message}</span>
            <span className="text-xs text-gray-500 ">
              {new Date(item.time).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
}

export default Notification;
