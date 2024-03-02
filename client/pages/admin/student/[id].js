// import TopHeader from "@/components/common/Header";
// import React from "react";
// import RootLayout from "@/layouts/RootLayout";

// function SingleStudent() {
//   return (
//     <RootLayout>
//           <TopHeader />
//       <div className=" my-6 h-full">

//         <div className="bg-white my-6 h-full rounded-2xl shadow-2xl pb-24 overflow-auto ">
//           <div className=" p-12">
//             <div className="h-28 mt-12 mb-10 rounded-xl bg-[#EBD7E7] bg-opacity-40 px-14  flex items-center">
//               <div className="mt-16"></div>

//                   <div className="text-primary text-lg">Sina Tesfaye</div>
//                 </div>

//                   <div className="text-tableTitle font-bold my-4 ">
//                     {" "}
//                     Description
//                   </div>
//                   <div className="text-[#4C4C4C] text-sm overflow-auto ">
//                     lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
//                     do eiusmod tempor incididunt ut labore et dolore magna
//                     aliqua. Ut enim ad minim veniam, quis nostrud exercitation
//                     ullamco laboris nisi ut aliquip ex ea commodo consequat.
//                     Duis aute irure dolor in reprehenderit in voluptate velit
//                     esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
//                     occaecat cupidatat non proident, sunt in culpa qui officia
//                     deserunt mollit anim id est laborum
//                   </div>

//             </div>

//         </div>
//       </div>
//     </RootLayout>
//   );
// }

// export default SingleStudent;

import React from "react";
import TopHeader from "@/components/common/Header";
import RootLayout from "@/layouts/RootLayout";
import { Avatar } from "@material-tailwind/react";
import Image from "next/image";

function StudentProfile() {
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
      <TopHeader />
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

export default StudentProfile;
