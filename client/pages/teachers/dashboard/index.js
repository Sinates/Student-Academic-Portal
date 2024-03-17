import RootLayout from '@/layouts/RootLayout';
import TopHeader from '@/components/common/Header';
import { useEffect } from 'react';
import React from 'react';
//import{ useState} from 'react';
//import axios from 'axios';
import { Container, Typography, CircularProgress, Box, Button, IconButton } from '@mui/material';
import { FileDownload } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

// REMOVE THIS CODE 
const Dashboard = () => {
    // const [teacher, setTeacher] = useState(null);
    // const [teacher, setTeacher] = useState(
    //   { id:"QS221" , email: "JohnDoegmailcom", gender: "male" , name: "John Doe",  }
    // );
    // const [courses, setCourses] = useState([]);
  
    // useEffect(() => {
    //   const fetchTeacher = async () => {
    //     const response = await axios.get('http://localhost:8000/teacher/register');
    //    // setTeacher(response.data);
    //     console.log(response.data);
    //   };
  
    //   const fetchCourses = async () => {
    //     const response = await axios.get('http://localhost:8000/teacher/assigned');
    //     setCourses(response.data);
    //   };
  
     // fetchTeacher();
    //   fetchCourses();
    // }, []);
  
    // const downloadStudentsList = async (courseId) => {
    //   const response = await axios.get(`http://localhost:8000/teacher/students/${courseId}`);
    //   const url = window.URL.createObjectURL(new Blob([response.data]));
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.setAttribute('download', 'students.xlsx');
    //   document.body.appendChild(link);
    //   link.click();
    // };
  
    // if (!teacher || !courses) {
    //   return <CircularProgress />;
    // }
  
    return ( 
        <RootLayout>
          <TopHeader/>
       <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          border: '2px solid',
        // borderColor: teacher.gender === 'female' ? 'pink' : 'blue',
        //  borderColor:'pink',  
          width: 100,
          height: 100,
          position: 'relative',
        }}
      >


         {/* {teacher.gender === 'female' ? (
          <img src={teacher.image} alt="Female Profile Icon" width="30" height="30" />
        ) : (
          <img src={teacher.image} alt="Male Profile Icon" width="30" height="30" />
        )}  */}
        
          
        
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            padding: 1,
          }}
        >
          {/* <Typography variant="body1">{teacher.id}</Typography>
          <Typography variant="body1">{teacher.name}</Typography>
          <Typography variant="body1">{teacher.email}</Typography> */}
        </Box>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        {/* {courses.map((course) => ( */}
          {/* <Box key={course.id} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}> */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
            {/* <Box>
            <Typography variant="body1">course.courseName</Typography>
            <Typography variant="body1">course.batch</Typography>
            <IconButton onClick={() => downloadStudentsList(course.id)} alignItems={'flex-end'} >
              <FileDownload />
            </IconButton>
          </Box>
          <Box>
            <Typography variant="body1">course.courseName</Typography>
            <Typography variant="body1">course.batch</Typography>
            <IconButton onClick={() => downloadStudentsList(course.id)} color='blue' >
              <FileDownload  />
            </IconButton>
          </Box> */}
          <Box bgcolor={'lightblue'} padding={'20px'} paddingX={'35px'} borderRadius={'10px'} >
            <div>
            <Typography variant="h5" margin={'5px'}>Unix</Typography>
            <Typography variant="body2" marginLeft={'50px'} >DRB1902</Typography>
            <IconButton color='lightblue' onClick={() => downloadStudentsList(course.id)}>
             <Typography variant="body2" fontSize={10} color={'gray'} marginLeft={'40px'} >Student List</Typography> <FileDownload /> 
            </IconButton>
            </div>
          </Box>
          <Box bgcolor={'lightblue'} padding={'20px'} paddingX={'35px'} borderRadius={'10px'} >
            <div>
            <Typography variant="h5" margin={'5px'}>Unix</Typography>
            <Typography variant="body2" marginLeft={'50px'} >DRB1902</Typography>
            <IconButton color='lightblue' onClick={() => downloadStudentsList(course.id)}>
             <Typography variant="body2" fontSize={10} color={'gray'} marginLeft={'40px'} >Student List</Typography> <FileDownload /> 
            </IconButton>
            </div>
          </Box>
          <Box bgcolor={'lightblue'} padding={'20px'} paddingX={'35px'} borderRadius={'10px'} >
            <div>
            <Typography variant="h5" margin={'5px'}>Unix</Typography>
            <Typography variant="body2" marginLeft={'50px'} >DRB1902</Typography>
            <IconButton color='lightblue' onClick={() => downloadStudentsList(course.id)}>
             <Typography variant="body2" fontSize={10} color={'gray'} marginLeft={'40px'} >Student List</Typography> <FileDownload /> 
            </IconButton>
            </div>
          </Box>
          </Box>
        {/* ))} */}
      </Box>
    </Container>
        </RootLayout>
     );
}
 
export default Dashboard;



