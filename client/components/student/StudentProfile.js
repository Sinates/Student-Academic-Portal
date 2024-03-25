import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const StudentProfile = ({ id, name, department, year }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Student Profile
      </Typography>
      <Divider sx={{ marginBottom: '10px' }} />
      <Typography variant="subtitle1">
        <strong>Id:</strong> {id}
      </Typography>
      <Typography variant="subtitle1">
        <strong>Name:</strong> {name}
      </Typography>
      <Typography variant="subtitle1">
        <strong>Department:</strong> {department}
      </Typography>
      <Typography variant="subtitle1">
        <strong>Year:</strong> {year}
      </Typography>
    </Box>
  );
};

export default StudentProfile;
