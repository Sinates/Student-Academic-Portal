import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import RootLayout from '@/layouts/RootLayout';
import Header from '@/components/common/Header'
const PushNotificationsPage = () => {
  const [formData, setFormData] = useState({
    batch: '',
    sender: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/teacher/sendnotifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error sending notification');
      }

      // Reset form after successful submission
      setFormData({
        batch: '',
        sender: '',
        message: ''
      });
      alert('Notification sent successfully!');
    }  catch (error) {
      console.error('Error sending notification:', error);
      if (error.response) {
        console.error('Response data:', await error.response.json());
      }
      alert('Error sending notification. Please try again.');
    }
    
  };

  return (
   
    <RootLayout>
       <Header/>
      <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
        <h1>Push Notifications</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Batch"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Sender"
            name="sender"
            value={formData.sender}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained">Send Notification</Button>
        </form>
      </Box>
    </RootLayout>
  );
};

export default PushNotificationsPage;
