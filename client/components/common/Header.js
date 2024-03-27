import React, { use, useEffect ,useState} from "react";
import { IoMdNotifications } from "react-icons/io";
import {getUserData} from "../../utils/sessions";

function TopHeader({ title }) {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
 

useEffect(() => {
  const item = localStorage.getItem('key')
  setEmail(localStorage.getItem('email'));
  setName(localStorage.getItem('name'));
  setRole(localStorage.getItem('role'));
}, [])
  return (
    <div className="flex items-center justify-between h-20 w-[96%] fumb-4 rounded-3xl bg-primary pr-14 pl-8 mx-auto my-6">
      <div className="relative">
        <div className="text-white text-sm rounded-xl pt-0.5 w-96 h-full">
          <p>{title}</p>
        </div>
      </div>
      <div className="flex items-center text-right">
        <div className="mr-4">
          <p className="text-sm text-white font-medium">{name}</p>
          <p className="text-xs text-white text-opacity-70">{role}</p>
        </div>
        <div className="ring-1 rounded-full ring-[#F4E4F4] p-1">
          {" "}
          {"" ? (
            <Image
              src={""}
              alt="Profile"
              width={50}
              height={50}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-400">
              <span className="font-medium text-xs leading-none text-white">
                "A"
                "K"
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
