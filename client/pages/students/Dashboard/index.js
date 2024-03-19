import RootLayout from "@/layouts/RootLayout";
import React from "react";
import 'chart.js/auto';
import { Box, useTheme } from "@mui/material";
import StatBox from "@/components/student/StatBox";
import SchoolIcon from '@mui/icons-material/School';
import { Doughnut } from "react-chartjs-2";
import StudentProfile from "@/components/student/StudentProfile";
// import sourceData from "@/data/sourceData.json"
import sourceData from "../../../data/sourceData.json"
import { useState, useEffect } from "react";

function Dashboard() {


  const [studentProfile, setStudentProfile] = useState(null);

  useEffect(() => {
    // Dummy student profile data
    const dummyData = {
      id: 1,
      name: "John Doe",
      department: "Computer Science",
      year: "3rd",
    };
    
    // Simulating API call with setTimeout
    setTimeout(() => {
      setStudentProfile(dummyData);
    }, 1000); // Simulating a delay of 1 second
  }, []);

  //actual api call
  // useEffect(() => {
  //   // Fetch student profile data from API
  //   fetch('your-api-endpoint')
  //     .then(response => response.json())
  //     .then(data => setStudentProfile(data))
  //     .catch(error => console.error('Error fetching student profile data:', error));
  // }, []);
  //student profile aboveapi
  const theme = useTheme();
  const colors = theme.palette.mode === "dark" ? theme.palette.primary : theme.palette.secondary;

  // Custom background color for StatBox components
  const statBoxBackgroundColor = '#334155'; // Custom color

  // Icon color for all StatBox components
  const iconColor = 'white';

  // Data for the StatBox components
  const statBoxData = [
    { subtitle: "Database", progress: 0.75, increase: "14%" },
    { subtitle: "Calculus", progress: 0.5, increase: "21%" },
    { subtitle: "Compiler", progress: 0.30, increase: "5%" },
    { subtitle: "Networking", progress: 0.80, increase: "43%" }
  ];

  return (
    <RootLayout>
      <Box m="20px">
        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* Render StatBox components dynamically */}
          {statBoxData.map((data, index) => (
            <Box
              key={index}
              gridColumn="span 3"
              backgroundColor={statBoxBackgroundColor}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                subtitle={data.subtitle}
                progress={data.progress}
                increase={data.increase}
                icon={<SchoolIcon sx={{ color: iconColor }} />}
              />
            </Box>
          ))}
          
          {/* Two components side by side below the StatBox components */}
          <Box gridColumn="span 12" display="flex" justifyContent="space-between" gap="20px">
            {/* Insert your first component here */}
            {/* <YourFirstComponent /> */}
         
            <Box backgroundColor="" width="90%" height="400px" sx={{ paddingLeft: '100px' }}><Doughnut
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: sourceData.map((data) => data.value),
                backgroundColor: [
                  "rgb(67, 86, 112)",
                  "rgb(77, 135, 189)",
                  "rgb(33,150,243)",
                ],
                borderColor: [
                  "rgba(67, 86, 112)",
                  "rgba(77, 135, 189)",
                  "rgba(33,150,243)",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "courses",
              },
            },
          }}
        /></Box>
            
            {/* Insert your second component here */}
            {/* <YourSecondComponent /> */}
            <Box width="100%" height="400px" padding="20px" marginTop="50px"> 
      {studentProfile && <StudentProfile {...studentProfile} />}
    </Box>
          </Box>
        </Box>
      </Box>
    </RootLayout>
  );
}

export default Dashboard;
