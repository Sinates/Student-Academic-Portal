import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, ThemeProvider, createTheme } from '@mui/material';
import RootLayout from '@/layouts/RootLayout';

const GradeChangeRequestsPage = () => {
    const [gradeChangeRequests, setGradeChangeRequests] = useState([
        {
            id: 1,
            studentName: 'Darwin Nunez',
            studentId: '123456',
            term: 'Spring 2024',
            reason: 'Request for reconsideration',
        },
        {
            id: 2,
            studentName: 'mohammed salah',
            studentId: '654321',
            term: 'Fall 2023',
            reason: 'Request for grade adjustment',
        },
        {
            id: 3,
            studentName: 'Jane Smith',
            studentId: '654321',
            term: 'Fall 2023',
            reason: 'Request for grade adjustment',
        },
        {
            id: 4,
            studentName: 'suarez',
            studentId: '654321',
            term: 'Fall 2023',
            reason: 'Request for grade adjustment',
        },
        {
            id: 5,
            studentName: 'divock origi',
            studentId: '654321',
            term: 'Fall 2023',
            reason: 'Request for grade adjustment',
        },
        // Add more sample grade change requests as needed
    ]);

    const handleAction = (id, action) => {
        // Send the action (approve or reject) along with the request
        sendActionToServer(id, action).then(() => {
            // Remove the request from the list after action is completed
            setGradeChangeRequests(prevRequests => prevRequests.filter(request => request.id !== id));
        });
    };

    const sendActionToServer = (id, action) => {
        // Replace 'action_endpoint' with your actual combined action endpoint URL
        return fetch(`action_endpoint/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action }), // Send the action in the request body
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to ${action} grade change request`);
            }
            return response.json();
        })
        .catch(error => {
            console.error(`Error ${action} grade change request:`, error);
        });
    };

    // Create a custom theme with the desired button colors
    const theme = createTheme({
        palette: {
            primary: {
                main: '#2196f3', // Primary button color
            },
            secondary: {
                main: '#f44336', // Secondary button color
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <RootLayout>
            <Grid container spacing={2}>
                {gradeChangeRequests.map(request => (
                    <Grid item xs={12} key={request.id}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2} justifyContent="space-around">
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h5" component="h2">
                                            Student Name: {request.studentName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography color="textSecondary">
                                            Student ID: {request.studentId}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="body2" component="p">
                                            Term: {request.term}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="body2" component="p">
                                            Reason: {request.reason}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                                            <Button onClick={() => handleAction(request.id, 'approve')} variant="outlined" color="primary" style={{ marginLeft: '8px' }}>Approve</Button>
                                            <Button onClick={() => handleAction(request.id, 'reject')} variant="outlined" color="secondary" style={{ marginLeft: '8px' }}>Reject</Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            </RootLayout>
        </ThemeProvider>
    );
};

export default GradeChangeRequestsPage;
