import React from "react";
import TopHeader from "@/components/common/Header";
import RootLayout from "@/layouts/RootLayout";
import { Avatar } from "@material-tailwind/react";
import { useEffect, useState } from "react";
// import Image from 'next/image';
import { useRouter } from "next/router";
import { useGetStudentQuery } from "@/api/api-slice";

function StudentProfile() {
  // Mock student data
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError, isSuccess } = useGetStudentQuery(id);

  const [student, setStudent] = useState([]);

  useEffect(() => {
    if (isSuccess) setStudent(data);
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
        <TopHeader title={"Student"} />
        <div className="mt-16 mx-auto max-w-5xl">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-center justify-center mb-8">
              <Avatar
                color="lightBlue"
                size="large"
                src="https://via.placeholder.com/150"
              />
            </div>
            <div className="text-center mb-4">
              <h1 className="text-3xl font-semibold text-gray-800">
                {student.name}
              </h1>
              <p className="text-gray-500">{student.department}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Personal Information
              </h2>
              <div className="flex flex-col space-y-2">
                <div>
                  <span className="font-semibold text-gray-600">ID:</span>{" "}
                  {student.id}
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Gender:</span>{" "}
                  {student.gender}
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Email:</span>{" "}
                  {student.email}
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Phone:</span>{" "}
                  {student.phone}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg mt-10 font-semibold text-gray-800 mb-4">
                About
              </h2>
              <p className="text-gray-600">{student.aboutYou}</p>
            </div>
            {/* <div className="mt-4">
            <Image
              src={student.imageUrl}
              alt="Student"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div> */}
          </div>
        </div>
      </RootLayout>
    );
}

export default StudentProfile;
