import RootLayout from "@/layouts/RootLayout";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import Overview from "@/components/dashboard/TotalCountOverview";
//import{ useState} from 'react';
import axios from "axios";
import { Container, Typography, Box, IconButton } from "@mui/material";
import { useGetCoursesQuery } from "@/api/api-slice";
import { FileDownload } from "@mui/icons-material";
import Link from "next/link";
import TopHeader from '@/components/common/Header';

function Dashboard() {
  const user = {
    name: "Abebe Kebede",
    firstName: "Abebe",
    lastName: "Kebede",
    email: "abebe@gmail.com",
    role: "Teacher",
    profileImage: "",
  };

  const { data, isLoading, isError, isSuccess } = useGetCoursesQuery();
  console.log(data);

  const courses = data?.slice(0, 3);

  const batches = [
    {
      id: "English",
      courseid: "131",
      courseName: "Batch of Year 2022",
      year: "2023",
    },
    {
      id: "English1",
      courseid: "122",
      courseName: "Batch of Year 2021",
      year: "2023",
      credithour: "3",
    },
    {
      id: "English1",
      courseid: "122",
      courseName: "Batch of Year 2021",
      year: "2023",
      credithour: "3",
    },
    {
      id: "English1",
      courseid: "122",
      courseName: "Batch of Year 2021",
      year: "2023",
      credithour: "3",
    },
  ];

  return (
    <RootLayout>
      <div className="mx-16 mt-6 h-screen">
       <TopHeader title="Dashboard" />
        <div className="h-[82%] rounded-xl overflow-scroll no-scrollbar">
          <div className="">
            <Overview />
          </div>
          <div>
            <div className="w-full mt-5 ml-4  flex justify-between">
              <span className=" text-[#334155] font-medium text-lg ">
                Courses
              </span>
              <Link
                className="ml-2 mr-10 text-sm text-primary hover:underline focus:outline-none"
                href="/admin/course"
              >
                View All
              </Link>
            </div>
            {isLoading && (
              <div className="flex items-center justify-center h-40 my-8 mx-auto">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-gray-900"></div>
              </div>
            )}
            {isSuccess && (
              <Box sx={{ marginTop: 2}}>
                <Box className="flex justify-between mb-1 mx-4">
                  {courses.map((course) => (
                    <Box
                      bgcolor={"#DFE9F7"}
                      paddingY={"10px"}
                      paddingX={"35px"}
                      className="h-40"
                      borderRadius={"16px"}
                      width={"350px"}
                    >
                      <div>
                        <Typography
                          color={"#334155"}
                          variant="h6"
                          marginY={"15px"}
                        >
                          {course.courseName}
                        </Typography>
                        <Typography variant="body2" color={"#334155"}>
                          Course Code: {course.courseid}
                        </Typography>
                      </div>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            <span className="w-full mt-9 ml-4 text-[#334155] font-medium text-lg block">
              Current Batches
            </span>
            <Box sx={{ marginTop: 2 }}>
              <Box className="flex mb-1 mx-4">
                {batches.map((course) => (
                  <Box
                    bgcolor={"#FFFFFF"}
                    paddingY={"10px"}
                    paddingX={"35px"}
                    borderRadius={"16px"}
                    className="mr-4"
                  >
                    <div>
                      <Typography
                        color={"#334155"}
                        variant="h6"
                        marginY={"15px"}
                      >
                        {course.courseName}
                      </Typography>
                      <Typography variant="body2" marginY={"24px"}>
                        Number of Students: {course.courseid}
                      </Typography>
                    </div>
                  </Box>
                ))}
              </Box>
              {/* ))} */}
            </Box>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

export default Dashboard;
