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
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [batch, setBatch] = useState('');

  const handleAssignCourse = async () => {
    try {
      const response = await fetch('http://localhost:8000/admin/assignCourses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, course, batch }),
      });

      if (!response.ok) {
        throw new Error('Failed to assign course');
      }

      alert('Course assigned successfully!');
    } catch (error) {
      console.error('Error assigning course:', error);
      alert('Error assigning course. Please try again.');
    }
  };

  return (
    <RootLayout>
      <Container>
        <Typography variant="h4" gutterBottom>
          Assign Course
        </Typography>
        <Box sx={{ display: 'Block', gap: '20px' }}>
          <Box sx={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Assign Course Form
              </Typography>
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ my: 2 }}
              />
              <TextField
                fullWidth
                label="Course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                sx={{ my: 2 }}
              />
              <TextField
                fullWidth
                label="Batch"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                sx={{ my: 2 }}
              />
              <Box sx={{ my: 2 }}>
                <Button variant="outlined" color="primary" onClick={handleAssignCourse}>Assign</Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </RootLayout>
  );
};

export default AssignCoursePage;