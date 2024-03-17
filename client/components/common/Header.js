import React from "react";
import { IoMdNotifications } from "react-icons/io";

function TopHeader({title}) {
  return (
    <div className=" flex justify-between items-center h-20 w-[92%] mb-10 mt-4 mx-auto rounded-3xl bg-primary px-14 text-white text-lg ">
      <span className="">{title}</span>
      <div className="flex items-center ml-auto">
        <IoMdNotifications className="w-8 h-8" />
        <div className="bg-red-500 rounded-full h-6 w-6 flex items-center justify-center mb-6">
          <span className="text-white text-xs">3</span>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
