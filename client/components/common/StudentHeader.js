import React from "react";
import { IoMdNotifications } from "react-icons/io";

function StudentHeader({ title }) {
  const user = {
    name: "Sina Tesfaye",
    firstName: "Abebe",
    lastName: "Kebede",
    email: "sinatesfaye38@gmail.com",
    role: "Student",
    profileImage: "",
  };
  return (
    <div className="flex items-center justify-between h-20 w-[90%] fumb-4 rounded-3xl bg-primary pr-14 pl-8 mx-auto my-6">
      <div className="relative">
        <div className="text-white text-sm rounded-xl pt-0.5 w-96 h-full">
          <p>{title}</p>
        </div>
      </div>
      <div className="flex items-center text-right">
        <div className="mr-4">
          <p className="text-sm text-white font-medium">{user.name}</p>
          <p className="text-xs text-white text-opacity-70">{user.role}</p>
        </div>
        <div className="ring-1 rounded-full ring-[#F4E4F4] p-1">
          {" "}
          {user.profileImage ? (
            <Image
              src={user.profileImage}
              alt="Profile"
              width={50}
              height={50}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-400">
              <span className="font-medium text-xs leading-none text-white">
                {user.firstName[0] + user.lastName[0]}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentHeader;
