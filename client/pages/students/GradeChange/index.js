import RootLayout from "@/layouts/RootLayout";
import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const GradeChange = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    term: '',
    courseCode: '',
    courseTitle: '',
    gradeChangeFrom: '',
    gradeChangeTo: '',
    reasonForChange: '',
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
        const response = await fetch('YOUR_BACKEND_ENDPOINT', {
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
    }
  };

  return (
    <RootLayout>
      <Container maxWidth="sm" sx={{
    background: 'rgb(51 65 85 / var(--tw-bg-opacity))', // Set the background color
    padding: 4, // Add padding around the form
    borderRadius: 8, // Add border radius for rounded corners
  }}>
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            marginTop: 8,
            padding: '20px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Student Information
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              margin="normal"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
            />
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              margin="normal"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            <TextField
              fullWidth
              label="Student ID"
              variant="outlined"
              margin="normal"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              error={!!formErrors.studentId}
              helperText={formErrors.studentId}
            />
            <TextField
              fullWidth
              label="Term"
              variant="outlined"
              margin="normal"
              name="term"
              value={formData.term}
              onChange={handleChange}
              error={!!formErrors.term}
              helperText={formErrors.term}
            />
            <TextField
              fullWidth
              label="Course Code"
              variant="outlined"
              margin="normal"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              error={!!formErrors.courseCode}
              helperText={formErrors.courseCode}
            />
            <TextField
              fullWidth
              label="Course Title"
              variant="outlined"
              margin="normal"
              name="courseTitle"
              value={formData.courseTitle}
              onChange={handleChange}
              error={!!formErrors.courseTitle}
              helperText={formErrors.courseTitle}
            />
            <TextField
              fullWidth
              label="Grade Change from"
              variant="outlined"
              margin="normal"
              name="gradeChangeFrom"
              value={formData.gradeChangeFrom}
              onChange={handleChange}
              error={!!formErrors.gradeChangeFrom}
              helperText={formErrors.gradeChangeFrom}
            />
            <TextField
              fullWidth
              label="Grade Change to"
              variant="outlined"
              margin="normal"
              name="gradeChangeTo"
              value={formData.gradeChangeTo}
              onChange={handleChange}
              error={!!formErrors.gradeChangeTo}
              helperText={formErrors.gradeChangeTo}
            />
            <TextField
              fullWidth
              label="Reason for Change"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              name="reasonForChange"
              value={formData.reasonForChange}
              onChange={handleChange}
              error={!!formErrors.reasonForChange}
              helperText={formErrors.reasonForChange}
            />
          <Button
  type="submit"
  variant="outlined"

>
  Submit
</Button>





          </Box>
        </Box>
      </Container>
    </RootLayout>
  );
};

export default GradeChange;
