import RootLayout from '@/layouts/RootLayout';
import TopHeader from '@/components/common/Header';
import React from 'react'
import { useState } from "react";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";




function Upload() {
  const [teacherAssigned] = useState([
    { id: 1, coursename: "Unix", bacth: "DRB1902" },
    { id: 2, coursename: "DB", bacth: "DRB1901" },
  ]);

  const handleUploadGrade = (courseId) => {
    // handle upload grade logic here
    console.log("Upload grade for course:", courseId);
  };

  const handleUploadAttendance = (courseId) => {
    // handle upload attendance logic here
    console.log("Upload attendance for course:", courseId);
  };
  return (
    <RootLayout>
      <TopHeader />
    {/* maxWidth="md" */}
    <Container className='mx-10 my-10'>
      <Typography variant="h4" component="h2" gutterBottom>
        {/* Upload Grades and Attendance */}
      </Typography>
      <Paper elevation={3}>
        <Grid container className='  border-black ' flexDirection={'column'} spacing={2} >
          {teacherAssigned.map((course) => (
            // <Grid container key={course.id} alignItems="center" spacing={2}>
            <Grid item xs={8} key={course.id}>
              <Grid container  alignItems="center" >
                <Grid item xs className='mx-10 my-5' >
                  <Typography variant="h6">{course.coursename}</Typography>
                  {/* <Typography variant="body1">Batch: {course.bacth}</Typography> */}
                </Grid>
                <Grid item xs > <Typography variant="body1">Batch: {course.bacth}</Typography> </Grid>
                
                <Grid item  className=' ml-10 ' >
                  <IconButton
                    color="primary"
                    onClick={() => handleUploadGrade(course.id)}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
                <Grid item className=' ml-10 '>
                  <IconButton
                    color="secondary"
                    onClick={() => handleUploadAttendance(course.id)}
                  >
                    <AttachFileIcon />
                  </IconButton>
                </Grid>  
                
              </Grid>
              {/* <Grid item xs={12}  color={'gray'}/> */}
            </Grid>
            
          ))}
        </Grid>
        
      </Paper>
    </Container>
    {/* </div> */}
    </RootLayout>
  )
}

export default Upload;