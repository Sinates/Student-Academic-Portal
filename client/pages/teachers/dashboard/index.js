import RootLayout from "@/layouts/RootLayout";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import Overview from "@/components/dashboard/TotalCountOverview";
//import{ useState} from 'react';
import axios from 'axios';
import { Container, Typography, Box, IconButton } from '@mui/material';
import { FileDownload } from '@mui/icons-material';

function Dashboard() {
    const user = {
        name: "Abebe Kebede",
        firstName: "Abebe",
        lastName: "Kebede",
        email: "abebe@gmail.com",
        role: "Teacher",
        profileImage: "",
    };

    const downloadStudentsList = async (courseId) => {
      const response = await axios.get(`http://localhost:8000/teacher/students/${courseId}`);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'students.xlsx');
      document.body.appendChild(link);
      link.click();
    };

    const courses = [{
      id: "English",
      courseid: "E12W6",
      courseName: "Communications English",
      year: "2023",
      credithour: "2",
    }, {
      id: "English1",
      courseid: "N34W1",
      courseName: "Fundamentals of Networking",
      year: "2023",
      credithour: "3",
    }, {
      id: "English2",
      courseid: "P1236",
      courseName: "Data Structures and Algorithm",
      year: "2023",
      credithour: "4",
    }];

    const batches = [{
      id: "English",
      courseid: "131",
      courseName: "Batch of Year 2022",
      year: "2023",
    }, {
      id: "English1",
      courseid: "122",
      courseName: "Batch of Year 2021",
      year: "2023",
      credithour: "3",
    }];

    return (
        <RootLayout>
    
            <div className="mx-16 mt-6 h-screen">
                <div className="flex items-center justify-between h-20 w-full mb-4 rounded-3xl bg-primary pr-14 pl-8">
                    <div className="relative">
                        <div className="text-white text-sm rounded-xl pt-0.5 w-96 h-full">
                            <p>Statistics Analysis</p>
                        </div>
                    </div>
                    <div className="flex items-center text-right">
                        <div className="mr-4">
                            <p className="text-sm text-white font-medium">
                                {user.name}
                            </p>
                            <p className="text-xs text-white text-opacity-70">
                                {user.role}
                            </p>
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
                                        {user.firstName[0]}
                                        {user.lastName[0]}
                                    </span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="h-[82%] rounded-xl overflow-scroll no-scrollbar">
                    <div className="">
                     <Overview />
                    </div>
                    <Container maxWidth="md">
                    <span className="w-full mt-5 text-[#334155] font-medium text-lg -ml-24 block">
            Courses
          </span>
      <Box sx={{ marginTop: 2, marginLeft: -17 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
          {courses.map((course) => (
              <Box bgcolor={'#DFE9F7'} sx={{mx: '30px', minWidth: '300px'}} width={'900px'} paddingY={'10px'} paddingX={'35px'} borderRadius={'16px'} >
            <div>
            <Typography color={'#334155'} variant="h6"  marginY={'15px'}>{course.courseName}</Typography>
            <Typography variant="body2" color={'#334155'} >Course Id: {course.courseid}</Typography>
            <IconButton color={'#334155'} sx={{marginLeft: -5}} onClick={() => downloadStudentsList(course.id)}>
             <Typography variant="body2" fontSize={10} color={'#334155'} marginLeft={'40px'} >{course.credithour}</Typography> <FileDownload  sx={{ color: '#334155' }} />
            </IconButton>
            </div>
          </Box>
          ))}
          </Box>
        {/* ))} */}
      </Box>
      <span className="w-full mt-9 text-[#334155] font-medium text-lg -ml-24 block">
            Current Batches
          </span>
      <Box sx={{ marginTop: 2, marginLeft: -17 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
          {batches.map((course) => (
              <Box bgcolor={'#FFFFFF'} sx={{mx: '30px', minWidth: '300px'}} width={'400px'} paddingY={'10px'} paddingX={'35px'} borderRadius={'16px'} >
            <div>
            <Typography color={'#334155'} variant="h6"  marginY={'15px'}>{course.courseName}</Typography>
            <Typography variant="body2" marginY={'24px'} >Number of Students: {course.courseid}</Typography>
            </div>
          </Box>
          ))}
          </Box>
        {/* ))} */}
      </Box>
    </Container>
                </div>
            </div>
        </RootLayout>
    );
}

export default Dashboard;
