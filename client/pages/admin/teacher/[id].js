import React, { use } from "react";
import TopHeader from "@/components/common/Header";
import RootLayout from "@/layouts/RootLayout";
import { Avatar } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useGetTeacherQuery } from "@/api/api-slice";
import { scales } from "chart.js";

function TeacherProfile() {
  // Mock student data
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError, isSuccess } = useGetTeacherQuery(id);
  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    if (isSuccess) setTeacher(data);
  }, [data, isSuccess]);
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-gray-900"></div>
      </div>
    );
  if (isSuccess)
    return (
      <RootLayout>
        <TopHeader title={"Teacher"} />
        <div className="mt-16 mx-auto max-w-5xl">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-center justify-center mb-8">
              <Avatar
                color="lightBlue"
                size="large"
                src="https://via.placeholder.com/150"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Personal Information
              </h2>
              <div className="flex flex-col space-y-2">
                <div>
                  <span className="font-semibold text-gray-600">ID:</span>{" "}
                  {teacher.id}
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Gender:</span>{" "}
                  {teacher.gender}
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Email:</span>{" "}
                  {teacher.email}
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Phone:</span>{" "}
                  {teacher.phone}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg mt-10 font-semibold text-gray-800 mb-4">
                About
              </h2>
              <p className="text-gray-600">
                " "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                tempor incididunt ut labore et doloreLorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                labore et dolore""
              </p>
            </div>
          </div>
        </div>
      </RootLayout>
    );
}

export default TeacherProfile;
