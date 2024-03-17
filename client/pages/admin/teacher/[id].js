import React from "react";
import TopHeader from "@/components/common/Header";
import RootLayout from "@/layouts/RootLayout";
import { Avatar } from "@material-tailwind/react";
import Image from "next/image";

function TeacherProfile() {
  // Mock student data
  const student = {
    id: "CS330",
    fullName: "Jhone Doe",
    gender: "Female",
    email: "jhone@gmail.com",
    phoneNumber: "+251912345657",
    department: "Computer Science",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et doloreLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore",
    imageUrl: "https://res.cloudinary.com/eskalate/image/upload/c_scale,f_auto,q_auto,w_100/v1/gallery/Afrochat",
  };

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
          <div className="text-center mb-4">
            <h1 className="text-3xl font-semibold text-gray-800">
              {student.fullName}
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
                {student.phoneNumber}
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg mt-10 font-semibold text-gray-800 mb-4">
              About
            </h2>
            <p className="text-gray-600">{student.about}</p>
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

export default TeacherProfile;
