import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import DropdownComponent from "@/components/student/dropDown";
import CourseDropdown from "@/components/student/dropdownCourse";

const GradeChange = () => {
  const [formData, setFormData] = useState({
    teacherId: '',
    studentId: '',
    message: '',
    mid: '',
    final: '',
    assessment: '',
    course: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // Remove error message when input field is edited
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    // Check if any fields are empty
    for (const key in formData) {
      if (formData[key].trim() === '') {
        errors[key] = 'This field is required';
      }
    }
    // Update errors state
    setFormErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      // All fields are filled, send data to server
      try {
        const response = await fetch('http://localhost:8000/student/gradechangeRequest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
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
          <DropdownComponent name="teacherId" label="Teacher ID" onChange={handleChange} value={formData.teacherId} error={formErrors.teacherId} helperText={formErrors.teacherId} />
          <TextField fullWidth label="Student ID" name="studentId" value={formData.studentId} onChange={handleChange} error={!!formErrors.studentId} helperText={formErrors.studentId} />
          <TextField fullWidth label="Message" name="message" multiline rows={4} value={formData.message} onChange={handleChange} error={!!formErrors.message} helperText={formErrors.message} />
          <TextField fullWidth label="Mid" name="mid" value={formData.mid} onChange={handleChange} error={!!formErrors.mid} helperText={formErrors.mid} />
          <TextField fullWidth label="Final" name="final" value={formData.final} onChange={handleChange} error={!!formErrors.final} helperText={formErrors.final} />
          <TextField fullWidth label="Assessment" name="assessment" value={formData.assessment} onChange={handleChange} error={!!formErrors.assessment} helperText={formErrors.assessment} />
          <CourseDropdown onChange={handleChange} value={formData.course} error={formErrors.course} />
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default GradeChange;
