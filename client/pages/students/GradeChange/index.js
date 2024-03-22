import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import DropdownComponent from "@/components/student/dropDown";
import CourseDropdown from "@/components/student/dropdownCourse";
import RootLayout from '@/layouts/RootLayout';

const GradeChange = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    teacherId: '', // Added teacherId to formData
    message: '',
    mid: '',
    final: '',
    assessment: '',
    course: '', // Added course to formData
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // Remove error message when input field is edited
    setFormErrors({ ...formErrors, [name]: '' });
  };

  // Updated handleTeacherChange to set teacherId in formData
  const handleTeacherChange = (teacherId) => {
    setFormData({ ...formData, teacherId });
  };

  // Updated handleCourseChange to set course in formData
  const handleCourseChange = (course) => {
    setFormData({ ...formData, course });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const errors = {};
    // Check if any fields are empty
    for (const key in formData) {
      // Check if the value is a string before calling trim()
      if (typeof formData[key] === 'string' && formData[key].trim() === '') {
        errors[key] = 'This field is required';
      }
    }
    // Update errors state
    setFormErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      // Serialize formData, filtering out non-serializable values
      const serializedFormData = {};
      for (const key in formData) {
        if (typeof formData[key] !== 'function' && typeof formData[key] !== 'object') {
          serializedFormData[key] = formData[key];
        }
      }
  
      // All fields are filled, send data to server
      try {
        
        const response = await fetch('http://localhost:8000/student/gradeChangeRequest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(serializedFormData),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Data sent successfully:', data);
          // Optionally, you can perform additional actions after successful data submission
        } else {
          console.error('Failed to send data:', response.statusText);
          // Handle error accordingly
        }
      } catch (error) {
        console.error('Error sending data:', error.message);
        // Handle error accordingly
      }
    } else {
      console.error('Form has errors:', errors);
    }
  };
  

  return (
    <RootLayout>
      <Container maxWidth="sm">
        <Box
          sx={{
            background: 'rgb(51 65 85 / var(--tw-bg-opacity))',
            padding: 4,
            borderRadius: 8,
            border: '1px solid #ccc',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Student Information
          </Typography>
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField fullWidth label="Student ID" name="studentId" value={formData.studentId} onChange={handleChange} error={!!formErrors.studentId} helperText={formErrors.studentId} />
            <DropdownComponent name="teacherId" label="Teacher ID" onChange={handleTeacherChange} value={formData.teacherId} error={formErrors.teacherId} helperText={formErrors.teacherId} />
            <TextField fullWidth label="Message" name="message" multiline rows={4} value={formData.message} onChange={handleChange} error={!!formErrors.message} helperText={formErrors.message} />
            <TextField fullWidth label="Mid" name="mid" value={formData.mid} onChange={handleChange} error={!!formErrors.mid} helperText={formErrors.mid} />
            <TextField fullWidth label="Final" name="final" value={formData.final} onChange={handleChange} error={!!formErrors.final} helperText={formErrors.final} />
            <TextField fullWidth label="Assessment" name="assessment" value={formData.assessment} onChange={handleChange} error={!!formErrors.assessment} helperText={formErrors.assessment} />
            <CourseDropdown onChange={handleCourseChange} value={formData.course} error={formErrors.course} />
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </RootLayout>
  );
};

export default GradeChange;
