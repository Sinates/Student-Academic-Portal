import { Box, Button, Container, FormControl, FormHelperText, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { UploadFile } from '@mui/icons-material';
import { useState } from 'react';
import RootLayout from '@/layouts/RootLayout';
// Sample data for the assigned courses table
const assignedCoursesData = [
  { courseCode: 'CS101', courseName: 'Introduction to Computer Science', teacherName: 'John Doe', batch: '2023A' },
  { courseCode: 'MATH10110', courseName: 'Introduction to Mathematics', teacherName: 'Jane Smith', batch: '2023B' },
  { courseCode: 'CS1048', courseName: 'Introduction to Computer Science', teacherName: 'John Doe', batch: '2023A' },
  { courseCode: 'MATH101', courseName: 'Introduction to Mathematics', teacherName: 'Jane Smith', batch: '2023B' },
  { courseCode: 'CS107', courseName: 'Introduction to Computer Science', teacherName: 'John Doe', batch: '2023A' },
  { courseCode: 'MATH201', courseName: 'Introduction to Mathematics', teacherName: 'Jane Smith', batch: '2023B' },
  { courseCode: 'CS102', courseName: 'Introduction to Computer Science', teacherName: 'John Doe', batch: '2023A' },
  { courseCode: 'MATH301', courseName: 'Introduction to Mathematics', teacherName: 'Jane Smith', batch: '2023B' },
  { courseCode: 'CS103', courseName: 'Introduction to Computer Science', teacherName: 'John Doe', batch: '2023A' },
  { courseCode: 'MATH401', courseName: 'Introduction to Mathematics', teacherName: 'Jane Smith', batch: '2023B' },
  { courseCode: 'CS104', courseName: 'Introduction to Computer Science', teacherName: 'John Doe', batch: '2023A' },
  { courseCode: 'MATH501', courseName: 'Introduction to Mathematics', teacherName: 'Jane Smith', batch: '2023B' },
  // Add more sample data if needed
];

const AssignCoursePage = () => {
  const [courseCode, setCourseCode] = useState('');// files that are sent to the server that assigns a course to a teacher
  const [courseName, setCourseName] = useState('');
  const [teacher, setTeacher] = useState('');
  const [batch, setBatch] = useState('');
  const [file, setFile] = useState(null);

  const handleAssignCourse = () => {
    // Implement the logic to send the assignment data to the server
    console.log('Assignment data:', { courseCode, courseName, teacher, batch, file });
  };

  return (
    <RootLayout>
    <Container>
      <Typography variant="h4" gutterBottom>
        Assign Course
      </Typography>
      <Box sx={{ display:'Block', gap: '20px' }}>
      <Box sx={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6" gutterBottom>
      Assign Course Form
    </Typography>
    <TextField
      fullWidth
      label="Course Code"
      value={courseCode}
      onChange={(e) => setCourseCode(e.target.value)}
      sx={{ my: 2 }}
    />
    <TextField
      fullWidth
      label="Course Name"
      value={courseName}
      onChange={(e) => setCourseName(e.target.value)}
      sx={{ my: 2 }}
    />
    <TextField
      fullWidth
      label="Teacher"
      value={teacher}
      onChange={(e) => setTeacher(e.target.value)}
      sx={{ my: 2 }}
    />
    <TextField
      fullWidth
      label="Batch"
      value={batch}
      onChange={(e) => setBatch(e.target.value)}
      sx={{ my: 2 }}
    />
    <Button
      variant="contained"
      component="label"
      startIcon={<UploadFile />}
      sx={{ my: 2 }}
    >
      Upload Student List
      <input type="file" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
    </Button>
    <Box sx={{ my: 2 }}>
      <Button variant="outlined" color="primary" onClick={handleAssignCourse}>Assign</Button>
    </Box>
  </Paper>
</Box>



        
        <Box sx={{ flex: '1',marginTop: '20px'}}>
          <Paper sx={{ p: 2,marginTop: '20px'}}>
            <Typography variant="h6" gutterBottom>
              Assigned Courses
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Course Code</TableCell>
                    <TableCell>Course Name</TableCell>
                    <TableCell>Teacher</TableCell>
                    <TableCell>Batch</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assignedCoursesData.map((row) => (
                    <TableRow key={row.courseCode}>
                      <TableCell>{row.courseCode}</TableCell>
                      <TableCell>{row.courseName}</TableCell>
                      <TableCell>{row.teacherName}</TableCell>
                      <TableCell>{row.batch}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </Container>
    </RootLayout>
  );
};

export default AssignCoursePage;
