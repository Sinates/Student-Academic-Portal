import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import RootLayout from '@/layouts/RootLayout';
import SendIcon from '@mui/icons-material/Send';

const GradeChangeRequestsPage = () => {
    const [gradeChangeRequests, setGradeChangeRequests] = useState([
        {
            id: 1,
            studentName: 'John Doe',
            studentId: '1',
            term: 'Spring 2024',
            reason: 'Request for reconsideration due to illness which caused me to not attend the final exam and there are also 50 corrections',
        },
        {
            id: 2,
            studentName: 'John Doe',
            studentId: '2',
            term: 'Spring 2024',
            reason: 'Request for reconsideration due to illness which caused me to not attend the final exam and there are also 50 corrections',
        },
        {
            id: 3,
            studentName: 'John Doe',
            studentId: '3',
            term: 'Spring 2024',
            reason: 'Request for reconsideration due to illness which caused me to not attend the final exam and there are also 50 corrections',
        },
        {
            id: 4,
            studentName: 'John Doe',
            studentId: '4',
            term: 'Spring 2024',
            reason: 'Request for reconsideration due to illness which caused me to not attend the final exam and there are also 50 corrections',
        },
        {
            id: 5,
            studentName: 'John Doe',
            studentId: '4',
            term: 'Spring 2024',
            reason: 'Request for reconsideration due to illness which caused me to not attend the final exam and there are also 50 corrections',
        },
        // Add more sample grade change requests as needed
    ]);

    const handleApprove = (id) => {
        // Logic to approve the grade change request with the given id
        // Send the result to the server
        // Example:
        // sendApprovalToServer(id).then(() => {
        //     setGradeChangeRequests(prevRequests => prevRequests.filter(request => request.id !== id));
        // });
        
        // For demonstration, let's just remove the request without server communication
        setGradeChangeRequests(prevRequests => prevRequests.filter(request => request.id !== id));
    };

    const handleReject = (id) => {
        // Logic to reject the grade change request with the given id
        // Send the result to the server
        // Example:
        // sendRejectionToServer(id).then(() => {
        //     setGradeChangeRequests(prevRequests => prevRequests.filter(request => request.id !== id));
        // });
        
        // For demonstration, let's just remove the request without server communication
        setGradeChangeRequests(prevRequests => prevRequests.filter(request => request.id !== id));
    };

    // Example functions to send approval and rejection to the server
    // const sendApprovalToServer = (id) => {
    //     return fetch(`/approve/${id}`, {
    //         method: 'POST',
    //         // Add headers and body as needed
    //     });
    // };
    
    // const sendRejectionToServer = (id) => {
    //     return fetch(`/reject/${id}`, {
    //         method: 'POST',
    //         // Add headers and body as needed
    //     });
    // };

    return (
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
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1px' }}>
                                        <Button onClick={() => handleApprove(request.id)} variant="contained" style={{ backgroundColor: '#4caf50', color: '#ffffff', marginLeft: '8px' }}>Approve</Button>
                                        <Button onClick={() => handleReject(request.id)} variant="contained" style={{ backgroundColor: '#f44336', color: '#ffffff', marginLeft: '8px' }}>Reject</Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </RootLayout>
    );
};

export default GradeChangeRequestsPage;
